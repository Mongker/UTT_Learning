/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author monglv@bkav.com on 13/05/2021
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import React, { useContext } from 'react';
import useCategoryBase from '../../hooks/LogicData/useCategoryBase';
// import PropTypes from 'prop-types';
import { Empty, message } from 'antd';
// styles
import style from './styles.module.scss';
import { url_base_img } from '../../../util/TypeUI';
import { Rate } from 'antd';
import useProductBase from '../../hooks/LogicData/useProductBase';
import useUserBase from '../../hooks/LogicData/useUserBase';
import MergeArr from '../../../util/MergeArr';
import { useRouter } from 'next/router';
import ContextApp from '../../../util/ContextApp';

// const
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

function CategoryView({ id }) {
    // hooks
    const { categoryObj } = useCategoryBase();
    const { product } = useProductBase();
    const { usersObj } = useUserBase();
    const router = useRouter();
    const { textSearch } = useContext(ContextApp);

    const handleSearch = (arr) => {
        if (textSearch.length > 0) {
            if (textSearch.length > 0)
                return arr.filter(
                    (item) =>
                        item.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                        `${item.price}`.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                        usersObj[item.author_id].name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                        usersObj[item.author_id].email.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1,
                );
        } else return arr;
    };

    // const
    const productFilter = () => {
        const arr = product.filter((item) => item.catalog_id === Number(id));
        const arrChildren = product.filter(
            (item) => categoryObj[item.catalog_id] && categoryObj[item.catalog_id].rootId === Number(id),
        );
        return handleSearch(MergeArr(arr, arrChildren));
    };

    const handleClickDetailProduct = (e, item) => {
        e.preventDefault();
        router.push(`/detail/${item.id}`);
    };

    if (!(categoryObj[id] && categoryObj[id]))
        return (
            <div className={`${style.title} flex_row`} style={{ marginTop: 65, height: 500, backgroundColor: '#fff' }}>
                <div className={style.loader} />
            </div>
        );
    return (
        <div style={{ marginTop: 65 }} className={'flex_col'}>
            <div className={`${style.title} flex_row`}>Danh mục: {categoryObj[id].name}</div>
            <div className='content_card'>
                <div className='content_card-title'>
                    {/*<a className='content_card-title-link' href=''>*/}
                    {/*    Xem thêm*/}
                    {/*    <i className='fa fa-angle-double-right'></i>*/}
                    {/*</a>*/}
                </div>
                <div className='content_card-chung'>
                    {productFilter().length === 0 && (
                        <div
                            className={`${style.title} flex_row`}
                            style={{ marginTop: 65, height: 500, backgroundColor: '#fff' }}
                        >
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    )}
                    {productFilter().map((item) => (
                        <div className='content_card-chung-item'>
                            <div
                                className='content_card-chung-item-link'
                                onClick={(e) => handleClickDetailProduct(e, item)}
                            >
                                {item.sale !== 0 && <span className='sale-off'>Sale: {item.sale} %</span>}
                                <div className='img-course'>
                                    <img className='img-course-tieubieu' src={url_base_img + item.image_link} alt='' />
                                </div>
                                <div className='content-title'>
                                    <h3 className='content-tltle-sourse'>{item.name}</h3>
                                    <div className='name-gv'>
                                        <b>{Object.keys(usersObj).length > 0 && usersObj[`${item.author_id}`].name}</b>
                                        {item.sale !== 0 && (
                                            <span className='giamgia'>
                                                {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className='saovagiatien'>
                                    <div className='chuasao'>
                                        <Rate tooltips={desc} value={5} />
                                        <div className='chuagiatien'>
                                            <span className='chuagiatien-price'>
                                                {(item.sale ? item.price - item.price * (item.sale / 100) : item.price)
                                                    .toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                                                $
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

CategoryView.propTypes = {};

CategoryView.defaultProps = {};

export default CategoryView;
