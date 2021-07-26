import React from 'react';
import dynamic from 'next/dynamic';
import bluebird from 'bluebird';
import redis from 'redis';

import MetaView from '../../components/MetaView';
import baseAPI from 'redux/api/baseAPI';
import { url_api } from '../../util/TypeUI';
import useUserBase from '../../components/hooks/LogicData/useUserBase';

// const component
const HeaderUNICAView = dynamic(() => import('../../components/Header/UNICA/HeaderUNICAView'));
const ContentDetail = dynamic(() => import('../../components/Content/DetailProduct/ContentDetailProduct'));
const Footer = dynamic(() => import('../../components/Footer/Footer'));
// import PropTypes from 'prop-types';

/* Note bye MongLV: static  */
// export async function getStaticPaths() {
//     return { paths: [], fallback: true };
// }
//
// export async function getStaticProps(params) {
//     const { data } = await baseAPI.getAll(url_api.PRODUCT, {
//         id: params['params'].id,
//     });
//     return {
//         props: { ...data[0] },
//         revalidate: 10,
//     };
// }

/* Note by MongLV: Server side render */
export async function getServerSideProps(context) {
    bluebird.promisifyAll(redis.RedisClient.prototype);
    const cache = redis.createClient(6379);
    let dataCache = {};
    const { params } = context;
    const id = params.id.toString();
    await cache.existsAsync(id).then(async (reply) => {
        if (reply !== 1) {
            console.log('reply', reply); // MongLV log fix bug
            // cache miss, need to fetch
            const { data } = await baseAPI.getAll(url_api.PRODUCT, {
                id: params.id,
            });
            await cache.set(id, JSON.stringify(data), 'EX', 60); // 60s
            dataCache = data;
            console.log('dataCache 1:', dataCache); // MongLV log fix bug
        } else {
            // cache hit, will get data from redis
            dataCache = JSON.parse(await cache.getAsync(id));
            console.log('dataCache 2:', dataCache); // MongLV log fix bug
        }
    });
    return { props: { ...dataCache[0] } };
}

function DetailProduct(props) {
    const { name, author_id } = props;
    const { getListUser } = useUserBase();
    React.useEffect(() => {
        getListUser({ id: author_id });
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MetaView title={`${name} - UTT Learning`} />
            <HeaderUNICAView />
            <ContentDetail {...props} />
            <Footer />
        </div>
    );
}

DetailProduct.propTypes = {};

DetailProduct.defaultProps = {};

export default DetailProduct;
