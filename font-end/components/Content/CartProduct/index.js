import React from 'react';
import style from './styles.module.scss';
import { Avatar, Button, List } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import useCartBase from '../../hooks/LogicData/useCartBase';
import useProductBase from '../../hooks/LogicData/useProductBase';
import useUserBase from '../../hooks/LogicData/useUserBase';
import { url_base_img } from '../../../util/TypeUI';
// import PropTypes from 'prop-types';

function CartProduct() {
    // hooks
    const router = useRouter();
    const { cart, deleteCart } = useCartBase();
    const { productObj } = useProductBase();
    const { usersObj } = useUserBase();

    // const
    const cartFilter = cart.filter((item) => item.status === 0);

    // handle func
    const removeCart = (id) => {
        deleteCart(id);
    };
    const sumMoney = () => {
        let sum = 0;

        cartFilter.map((item) => {
            const money = productObj[item.product_id].sale
                ? productObj[item.product_id].price -
                  productObj[item.product_id].price * (productObj[item.product_id].sale / 100)
                : productObj[item.product_id].price;
            return (sum = sum + money);
        });
        return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '$';
    };

    return (
        <div className={style.form_cart}>
            <div className={style.u_bread_cart}>
                <div className={style.container}>
                    <span>Giỏ hàng ({cartFilter.length} khóa học)</span>
                </div>
            </div>
            <div className={style.unica_order_cart}>
                <div className={style.container}>
                    <div className={style.controller_left}>
                        <div className={style.u_box_cart2}>
                            <List
                                itemLayout='horizontal'
                                dataSource={cartFilter}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <div>
                                                <p
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {/*{productObj[item.product_id] &&*/}
                                                    {/*    productObj[item.product_id].price*/}
                                                    {/*        .toString()*/}
                                                    {/*        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}*/}
                                                    {/*$*/}
                                                    {`${
                                                        productObj[item.product_id].sale
                                                            ? productObj[item.product_id].price -
                                                              productObj[item.product_id].price *
                                                                  (productObj[item.product_id].sale / 100)
                                                            : productObj[item.product_id].price
                                                    }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '$'}
                                                </p>
                                                {/*<span*/}
                                                {/*    style={{*/}
                                                {/*        textDecoration: 'line-through',*/}
                                                {/*    }}*/}
                                                {/*>*/}
                                                {/*    700,000{' '}*/}
                                                {/*    <sup style={{ fontSize: '10px' }}>*/}
                                                {/*        đ*/}
                                                {/*    </sup>*/}
                                                {/*</span>*/}
                                            </div>,
                                            <div onClick={() => removeCart(item.id)}>
                                                <CloseOutlined
                                                    style={{
                                                        color: '#f00',
                                                        fontSize: '16px',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </div>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <img
                                                    src={`${url_base_img}${productObj[item.product_id].image_link}`}
                                                    style={{ width: 129, height: 64 }}
                                                />
                                            }
                                            title={
                                                <div style={{ fontWeight: 'bold' }}>
                                                    {item.product_id &&
                                                        productObj[item.product_id] &&
                                                        productObj[item.product_id].name}
                                                </div>
                                            }
                                            description={
                                                'Giảng viên: ' +
                                                (item.product_id &&
                                                    productObj[item.product_id] &&
                                                    productObj[item.product_id].author_id &&
                                                    usersObj[productObj[item.product_id].author_id].name)
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                    <div className={style.controller_rigth}>
                        <div className={style.price}>
                            <div className={style.price_cart1}>{sumMoney()}</div>
                            {/*<span style={{ textDecoration: 'line-through' }}>*/}
                            {/*    700,000 <sup style={{ fontSize: '10px' }}>đ</sup>*/}
                            {/*</span>*/}
                        </div>
                        <div>
                            <Button
                                style={{
                                    width: 262,
                                    height: 43,
                                    color: '#fff',
                                    backgroundColor: '#ec5252',
                                    borderRadius: 5,
                                    fontSize: 16,
                                }}
                                onClick={() => router.push('/thanhtoan')}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CartProduct.propTypes = {};

CartProduct.defaultProps = {};

export default CartProduct;
