/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 12/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import style from '../style.module.scss';
import { Button, List } from 'antd';
import useUserBase from '../../../hooks/LogicData/useUserBase';
import useProductBase from '../../../hooks/LogicData/useProductBase';
import { url_base_img } from '../../../../util/TypeUI';
import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';

function MyVideo() {
    const { myUser } = useUserBase();
    const router = useRouter();
    const { productObj } = useProductBase();
    let arrMyProduct = [];
    try {
        const { list_product_open } = myUser;

        list_product_open && (arrMyProduct = JSON.parse(list_product_open));
    } catch (e) {
        console.log('e', e); // MongLV log fix bug
    }
    const handleNextPageView = (id) => {
        router.push(`/detail/${id}`);
    };

    const Cart = (id) => {
        if (!productObj[id]) return null;
        return (
            <div
                className={'flex_row'}
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    cursor: 'pointer',
                }}
                onClick={() => handleNextPageView(id)}
            >
                <div className={'flex_row'} style={{ justifyContent: 'flex-start' }}>
                    <img
                        src={`${url_base_img}${
                            productObj[id] && productObj[id].image_link && productObj[id].image_link
                        }`}
                        style={{ width: 263, height: 136, objectFit: 'cover' }}
                    />
                    <div className={'flex_col'} style={{ justifyContent: 'flex-start' }}>
                        <div style={{ fontSize: 20, color: 'red', marginLeft: 10 }}>{productObj[id].name}</div>
                        <div style={{ fontSize: 15, marginLeft: 10 }}>{productObj[id].content}</div>
                    </div>
                </div>
            </div>
        );
    };
    if (!myUser) return null;
    return (
        <div className={style.content_main_user}>
            <div className={style.container}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 20,
                    }}
                >
                    {arrMyProduct.length > 0 ? (
                        <List
                            itemLayout='horizontal'
                            dataSource={arrMyProduct}
                            renderItem={(id) => <List.Item>{Cart(id)}</List.Item>}
                        />
                    ) : (
                        <React.Fragment>
                            <span>
                                Chào mừng Lê Văn MONG đến với học viện Online Unica. Nơi bạn có thể học tập, rèn luyện
                                các kỹ năng thông qua hơn 2.000 khóa học online được biên tập cẩn thận, chu đáo.
                                <br /> Bạn muốn tìm kiếm khóa học phù hợp? hãy cho chúng tôi biết nhu cầu và mong muốn
                                của bạn nhé
                            </span>
                            {/*<div className={style.div_goi_y}>*/}
                            {/*    <Button className={style.btn_goi_y}>Gợi ý khóa học cho tôi</Button>*/}
                            {/*</div>*/}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

MyVideo.propTypes = {};

MyVideo.defaultProps = {};

export default MyVideo;
