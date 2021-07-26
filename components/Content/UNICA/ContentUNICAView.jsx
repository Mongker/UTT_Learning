/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 16/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @phone: +84373668113
 * @slogan: "Mọi thứ đều bắt đầu từ việc nhỏ, những khát vọng phải lớn"
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Carousel, Empty, message, Rate } from 'antd';
import { url_base_img } from '../../../util/TypeUI';
import useCategoryBase from '../../hooks/LogicData/useCategoryBase';
import { UserOutlined } from '@ant-design/icons';
import useProductBase from '../../hooks/LogicData/useProductBase';
import useUserBase from '../../hooks/LogicData/useUserBase';
import { useRouter } from 'next/router';
import ContextApp from '../../../util/ContextApp';

// const
const contentStyle = {
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
};
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

function ContentUNICAView(prop) {
    const router = useRouter();
    const { category } = useCategoryBase();
    const { product } = useProductBase();
    const { usersObj } = useUserBase();
    const { textSearch } = useContext(ContextApp);

    const handleClickDetailProduct = (e, item) => {
        e.preventDefault();
        router.push(`/detail/${item.id}`);
    };
    const hanNexPageCategory = (e, item) => {
        e.preventDefault();
        router.push(`/category/${item.id}?rootId=${item.rootId}`);
    };

    const handleFilterSearch = (product) => {
        if (textSearch.length > 0)
            return product.filter(
                (item) =>
                    item.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                    `${item.price}`.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                    usersObj[item.author_id].name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                    usersObj[item.author_id].email.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1,
            );
        return product;
    };

    return (
        <div className='contentc'>
            <div className='grid'>
                <div className='grid__row'>
                    <div className='content_category'>
                        <ul className='content_category-list'>
                            {category.map(
                                (item) =>
                                    item.rootId === 1 && (
                                        <li className='content_category-list-item'>
                                            <div
                                                className='content_category-list-item-link'
                                                onClick={(e) => hanNexPageCategory(e, item)}
                                            >
                                                <Avatar
                                                    size={14}
                                                    shape='square'
                                                    icon={<UserOutlined />}
                                                    src={`${url_base_img}${item.icon}`}
                                                />
                                                <p style={{ paddingLeft: 8 }}>{item.name}</p>
                                            </div>
                                            <div className='menuhover'>
                                                <div className='menuhover_row'>
                                                    <ul>
                                                        {category.map(
                                                            (value) =>
                                                                value.rootId === item.id && (
                                                                    <li className='menuhover_row-item'>
                                                                        <div
                                                                            onClick={(e) =>
                                                                                hanNexPageCategory(e, value)
                                                                            }
                                                                            className='menuhover-link'
                                                                        >
                                                                            {value.name}
                                                                        </div>
                                                                    </li>
                                                                ),
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    ),
                            )}
                        </ul>
                    </div>
                    <div className='content_slider'>
                        <Carousel autoplay>
                            {[
                                'https://i.imgur.com/g2xGyrS.jpg',
                                'https://i.imgur.com/66L8dGe.jpg',
                                'https://i.imgur.com/IA0qQah.jpg',
                            ].map((item) => (
                                <div>
                                    <img src={item} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className='content_card'>
                        <div className='content_card-title'>
                            <h4>KHÓA HỌC MỚI</h4>
                            {/*<a className='content_card-title-link' href=''>*/}
                            {/*    Xem thêm*/}
                            {/*    <i className='fa fa-angle-double-right'></i>*/}
                            {/*</a>*/}
                        </div>
                        <div className='content_card-chung'>
                            {handleFilterSearch(product).length === 0 && (
                                <div
                                    className={'flex_row'}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '300',
                                    }}
                                >
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </div>
                            )}
                            {handleFilterSearch(product).map((item) => (
                                <div className='content_card-chung-item'>
                                    <div
                                        className='content_card-chung-item-link'
                                        onClick={(e) => handleClickDetailProduct(e, item)}
                                    >
                                        {item.sale !== 0 && <span className='sale-off'>Sale: {item.sale} %</span>}
                                        <div className='img-course'>
                                            <img
                                                className='img-course-tieubieu'
                                                src={url_base_img + item.image_link}
                                                alt=''
                                            />
                                        </div>
                                        <div className='content-title'>
                                            <h3 className='content-tltle-sourse'>{item.name}</h3>
                                            <div className='name-gv'>
                                                <b>
                                                    {Object.keys(usersObj).length > 0 &&
                                                        usersObj[`${item.author_id}`].name}
                                                </b>
                                                {item.sale !== 0 && (
                                                    <span className='giamgia'>
                                                        {item.price
                                                            .toFixed(2)
                                                            .toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                                                        $
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className='saovagiatien'>
                                            <div className='chuasao'>
                                                <Rate tooltips={desc} value={5} />
                                                <div className='chuagiatien'>
                                                    <span className='chuagiatien-price'>
                                                        {(item.sale
                                                            ? item.price - item.price * (item.sale / 100)
                                                            : item.price
                                                        )
                                                            .toFixed(2)
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
                    {/*<div className='content_card'>*/}
                    {/*    <div className='content_card-title'>*/}
                    {/*        <h4>SIÊU ƯU ĐÃI HÔM NAY</h4>*/}
                    {/*        <a className='content_card-title-link' href=''>*/}
                    {/*            Xem thêm*/}
                    {/*            <i className='fa fa-angle-double-right'></i>*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*    <div className='content_card-chung'>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai1.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai2.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai3.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai4.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai5.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai6.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai7.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai8.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className='xem-them-khoa-hoc'>*/}
                    {/*    <div className='cackhoahocchinh'>*/}
                    {/*        <div className='title-news'>*/}
                    {/*            <h4>Mới ra mắt</h4>*/}
                    {/*            <a href=''>Xem Thêm</a>*/}
                    {/*        </div>*/}

                    {/*        <div className='cackhoahocchinh-chitiet'>*/}
                    {/*            <a className='chitiet-link' href=''>*/}
                    {/*                <div className='chitiet-link-anh'>*/}
                    {/*                    <img className='chitiet-link-anh-img' src='./img/ramat1.jpg' alt='' />*/}
                    {/*                </div>*/}

                    {/*                <div className='title-choanh'>*/}
                    {/*                    <h3> Kỹ năng an toàn bảo mật thông tin cho nhân viên văn phòng </h3>*/}
                    {/*                    <p>Nguyễn Khánh Tùng</p>*/}
                    {/*                    <span className='giamgiakhoahoc'>*/}
                    {/*                        <div className='p1'>*/}
                    {/*                            299.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                        <div className='p2'>*/}
                    {/*                            399.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*            <a className='chitiet-link' href=''>*/}
                    {/*                <div className='chitiet-link-anh'>*/}
                    {/*                    <img className='chitiet-link-anh-img' src='./img/ramat1.jpg' alt='' />*/}
                    {/*                </div>*/}

                    {/*                <div className='title-choanh'>*/}
                    {/*                    <h3> Kỹ năng an toàn bảo mật thông tin cho nhân viên văn phòng </h3>*/}
                    {/*                    <p>Nguyễn Khánh Tùng</p>*/}
                    {/*                    <span className='giamgiakhoahoc'>*/}
                    {/*                        <div className='p1'>*/}
                    {/*                            299.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                        <div className='p2'>*/}
                    {/*                            399.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*            <a className='chitiet-link' href=''>*/}
                    {/*                <div className='chitiet-link-anh'>*/}
                    {/*                    <img className='chitiet-link-anh-img' src='./img/ramat1.jpg' alt='' />*/}
                    {/*                </div>*/}

                    {/*                <div className='title-choanh'>*/}
                    {/*                    <h3> Kỹ năng an toàn bảo mật thông tin cho nhân viên văn phòng </h3>*/}
                    {/*                    <p>Nguyễn Khánh Tùng</p>*/}
                    {/*                    <span className='giamgiakhoahoc'>*/}
                    {/*                        <div className='p1'>*/}
                    {/*                            299.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                        <div className='p2'>*/}
                    {/*                            399.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    <div className='cackhoahocchinh'>*/}
                    {/*        <div className='title-news'>*/}
                    {/*            <h4>Xem nhiều</h4>*/}
                    {/*            <a href=''>Xem Thêm</a>*/}
                    {/*        </div>*/}

                    {/*        <div className='cackhoahocchinh-chitiet'>*/}
                    {/*            <a className='chitiet-link' href=''>*/}
                    {/*                <div className='chitiet-link-anh'>*/}
                    {/*                    <img className='chitiet-link-anh-img' src='./img/ramat1.jpg' alt='' />*/}
                    {/*                </div>*/}

                    {/*                <div className='title-choanh'>*/}
                    {/*                    <h3> Kỹ năng an toàn bảo mật thông tin cho nhân viên văn phòng </h3>*/}
                    {/*                    <p>Nguyễn Khánh Tùng</p>*/}
                    {/*                    <span className='giamgiakhoahoc'>*/}
                    {/*                        <div className='p1'>*/}
                    {/*                            299.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                        <div className='p2'>*/}
                    {/*                            399.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*            <a className='chitiet-link' href=''>*/}
                    {/*                <div className='chitiet-link-anh'>*/}
                    {/*                    <img className='chitiet-link-anh-img' src='./img/ramat1.jpg' alt='' />*/}
                    {/*                </div>*/}

                    {/*                <div className='title-choanh'>*/}
                    {/*                    <h3> Kỹ năng an toàn bảo mật thông tin cho nhân viên văn phòng </h3>*/}
                    {/*                    <p>Nguyễn Khánh Tùng</p>*/}
                    {/*                    <span className='giamgiakhoahoc'>*/}
                    {/*                        <div className='p1'>*/}
                    {/*                            299.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                        <div className='p2'>*/}
                    {/*                            399.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*            <a className='chitiet-link' href=''>*/}
                    {/*                <div className='chitiet-link-anh'>*/}
                    {/*                    <img className='chitiet-link-anh-img' src='./img/ramat1.jpg' alt='' />*/}
                    {/*                </div>*/}

                    {/*                <div className='title-choanh'>*/}
                    {/*                    <h3> Kỹ năng an toàn bảo mật thông tin cho nhân viên văn phòng </h3>*/}
                    {/*                    <p>Nguyễn Khánh Tùng</p>*/}
                    {/*                    <span className='giamgiakhoahoc'>*/}
                    {/*                        <div className='p1'>*/}
                    {/*                            299.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                        <div className='p2'>*/}
                    {/*                            399.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    <div className='cackhoahocchinh'>*/}
                    {/*        <div className='title-news'>*/}
                    {/*            <h4>khóa học vip</h4>*/}
                    {/*            <a href=''>Xem Thêm</a>*/}
                    {/*        </div>*/}

                    {/*        <div className='cackhoahocchinh-chitiet'>*/}
                    {/*            <a className='chitiet-link' href=''>*/}
                    {/*                <div className='chitiet-link-anh'>*/}
                    {/*                    <img className='chitiet-link-anh-img' src='./img/ramat1.jpg' alt='' />*/}
                    {/*                </div>*/}

                    {/*                <div className='title-choanh'>*/}
                    {/*                    <h3> Kỹ năng an toàn bảo mật thông tin cho nhân viên văn phòng </h3>*/}
                    {/*                    <p>Nguyễn Khánh Tùng</p>*/}
                    {/*                    <span className='giamgiakhoahoc'>*/}
                    {/*                        <div className='p1'>*/}
                    {/*                            299.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                        <div className='p2'>*/}
                    {/*                            399.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*            <a className='chitiet-link' href=''>*/}
                    {/*                <div className='chitiet-link-anh'>*/}
                    {/*                    <img className='chitiet-link-anh-img' src='./img/ramat1.jpg' alt='' />*/}
                    {/*                </div>*/}

                    {/*                <div className='title-choanh'>*/}
                    {/*                    <h3> Kỹ năng an toàn bảo mật thông tin cho nhân viên văn phòng </h3>*/}
                    {/*                    <p>Nguyễn Khánh Tùng</p>*/}
                    {/*                    <span className='giamgiakhoahoc'>*/}
                    {/*                        <div className='p1'>*/}
                    {/*                            299.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                        <div className='p2'>*/}
                    {/*                            399.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*            <a className='chitiet-link' href=''>*/}
                    {/*                <div className='chitiet-link-anh'>*/}
                    {/*                    <img className='chitiet-link-anh-img' src='./img/ramat1.jpg' alt='' />*/}
                    {/*                </div>*/}

                    {/*                <div className='title-choanh'>*/}
                    {/*                    <h3> Kỹ năng an toàn bảo mật thông tin cho nhân viên văn phòng </h3>*/}
                    {/*                    <p>Nguyễn Khánh Tùng</p>*/}
                    {/*                    <span className='giamgiakhoahoc'>*/}
                    {/*                        <div className='p1'>*/}
                    {/*                            299.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                        <div className='p2'>*/}
                    {/*                            399.000<sup>đ</sup>*/}
                    {/*                        </div>*/}
                    {/*                    </span>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className='content_card'>*/}
                    {/*    <div className='content_card-title'>*/}
                    {/*        <h4>Kinh doanh khởi nghiệp</h4>*/}
                    {/*        <a className='content_card-title-link' href=''>*/}
                    {/*            Xem thêm*/}
                    {/*            <i className='fa fa-angle-double-right'></i>*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*    <div className='content_card-chung'>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai1.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai2.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai3.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai4.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai5.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai6.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai7.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*        <div className='content_card-chung-item'>*/}
                    {/*            <a className='content_card-chung-item-link' href=''>*/}
                    {/*                <span className='sale-off'>-22%</span>*/}
                    {/*                <div className='img-course'>*/}
                    {/*                    <img className='img-course-tieubieu' src='./img/uudai8.jpg' alt='' />*/}
                    {/*                </div>*/}
                    {/*                <div className='content-title'>*/}
                    {/*                    <h3 className='content-tltle-sourse'>Tập yoga cơ bản tại nhà với Nguyễn Hiếu</h3>*/}
                    {/*                    <div className='name-gv'>*/}
                    {/*                        <b>Nguyễn Hiếu</b>*/}
                    {/*                        <span className='giamgia'>*/}
                    {/*                            700.000 <sup>đ</sup>*/}
                    {/*                        </span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className='saovagiatien'>*/}
                    {/*                    <div className='chuasao'>*/}
                    {/*                        <p>*/}
                    {/*                            <span className='chuanamsao'>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                <i className='fa fa-star co-or'></i>*/}
                    {/*                                (5)*/}
                    {/*                            </span>*/}
                    {/*                        </p>*/}
                    {/*                        <div className='chuagiatien'>*/}
                    {/*                            <span className='chuagiatien-price'>*/}
                    {/*                                549.000*/}
                    {/*                                <sup>đ</sup>*/}
                    {/*                            </span>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}

ContentUNICAView.propTypes = {};

ContentUNICAView.defaultProps = {};

export default ContentUNICAView;
