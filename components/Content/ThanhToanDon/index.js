import React, { useState } from 'react';
import { useRouter } from 'next/router';
import style from './styles.module.scss';
import { Button, Form, Input, InputNumber, Select, Steps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import useUserBase from '../../hooks/LogicData/useUserBase';
import useCartBase from '../../hooks/LogicData/useCartBase';
import useProductBase from '../../hooks/LogicData/useProductBase';
import useTransactionBase from '../../hooks/LogicData/useTransactionBase';
import withPageRouter from '../../HOC/withPageRouter';
// import PropTypes from 'prop-types';
const { Step } = Steps;
const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const { Option } = Select;
function ContentThanhToan(props) {
    const { router: routerCheck } = props;
    const { query } = routerCheck;
    // hooks
    const [form] = Form.useForm();
    const router = useRouter();
    const { myUser } = useUserBase();
    const { cart } = useCartBase();
    const { productObj } = useProductBase();
    const { postTransaction } = useTransactionBase();

    // const
    const cartFilter =
        query && query.id
            ? cart.filter((item) => item.status === 0 && item.id === Number(query.id))
            : cart.filter((item) => item.status === 0);

    const list_cart = query && query.id ? [Number(query.id)] : cartFilter.map((item) => item.id);

    // handle func
    const sumMoney = () => {
        if (Object.keys(productObj).length > 0) {
            let sum = 0;
            cartFilter.map(
                (item) =>
                    (sum =
                        sum +
                        productObj[item.product_id].price -
                        (productObj[item.product_id].price * productObj[item.product_id].sale) / 100),
            );
            return (
                sum
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '$'
            );
        }
        return '0 $';
    };
    const onFinish = (values) => {
        let sum = 0;
        cartFilter.map((item) => {
            const money = productObj[item.product_id].sale
                ? productObj[item.product_id].price -
                  productObj[item.product_id].price * (productObj[item.product_id].sale / 100)
                : productObj[item.product_id].price;
            return (sum = sum + money);
        });
        values['amount'] = sum;
        try {
            values['list_cart'] = JSON.stringify(list_cart);
        } catch (e) {
            console.log('e', e); // MongLV log fix bug
        }

        debugger; // MongLV
        values['user_id'] = Number(myUser.id);
        delete values['name'];
        delete values['email'];
        postTransaction(values, () => router.push('/account?show=3'));
    };

    // Vòng đời
    React.useEffect(() => {
        myUser ? form.setFieldsValue(myUser) : router.push('login');
    }, [myUser]);
    return (
        <div className={style.form_than_toan}>
            {/*<div className={style.u_bread_cart}>*/}
            {/*    <div className={style.container}>*/}
            {/*        <Steps current={current} onChange={onChange}>*/}
            {/*            <Step title='Thông tin' />*/}
            {/*            <Step title='Thanh toán' />*/}
            {/*            <Step title='Vào học' />*/}
            {/*        </Steps>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={style.unica_order_cart}>
                <div className={style.container}>
                    <div className={style.controller_left}>
                        <p className={style.title_left}>Thông tin người đặt hàng</p>
                        <div className={style.u_box_cart2}>
                            <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
                                <div>
                                    <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                        Họ tên <p style={{ color: 'red', marginLeft: 5 }}>*</p>
                                    </div>
                                    <Form.Item
                                        name='name'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không được bỏ trống!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                        Email <p style={{ color: 'red', marginLeft: 5 }}>*</p>
                                    </div>
                                    <Form.Item
                                        name='email'
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                        Điện thoại <p style={{ color: 'red', marginLeft: 5 }}>*</p>
                                    </div>
                                    <Form.Item
                                        name='phone'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không được bỏ trống!',
                                            },
                                            // {
                                            //     type: 'number',
                                            //     message: 'Không phải số điện thoại ',
                                            // },
                                        ]}
                                    >
                                        <Input style={{ width: '100%' }} />
                                    </Form.Item>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                        Địa chỉ nhận hàng <p style={{ color: 'red', marginLeft: 5 }}>*</p>
                                    </div>
                                    <Form.Item
                                        name='address'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không được bỏ trống!',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea />
                                        {/*<Select placeholder='Chọn tỉnh thành' allowClear>*/}
                                        {/*    <Option value='HN'>Hà Nội</Option>*/}
                                        {/*    <Option value='HY'>Hưng Yên</Option>*/}
                                        {/*    <Option value='TH'>Thanh Hóa</Option>*/}
                                        {/*</Select>*/}
                                    </Form.Item>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                        Lời nhắn <p style={{ color: 'red', marginLeft: 5 }}>*</p>
                                    </div>
                                    <Form.Item name='message' rules={[{ required: true }]}>
                                        <Input.TextArea />
                                    </Form.Item>
                                </div>
                                <div className={style.btn}>
                                    <Button className={style.btn_next} htmlType={'submit'}>
                                        Thanh toán
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className={style.controller_rigth}>
                        <div className={style.u_box_cart2}>
                            <div className={style.u_c_title}>
                                <p>Đơn hàng ({cartFilter.length} khóa học)</p>
                                <div onClick={() => router.push('/cart')} style={{ color: 'blue', cursor: 'pointer' }}>
                                    <EditOutlined style={{ marginRight: 5 }} />
                                    Sửa
                                </div>
                            </div>
                            {cartFilter.map((item) => (
                                <div className={style.u_cart_course}>
                                    <div className={style.title_cart_course}>
                                        {item.product_id &&
                                            productObj[item.product_id] &&
                                            productObj[item.product_id].name}
                                    </div>
                                    <div className={style.price_cart}>
                                        <p style={{ float: 'right' }}>
                                            {/*549,000 <sup style={{ fontSize: 14 }}>đ</sup>*/}
                                            {(productObj[item.product_id] && productObj[item.product_id].sale
                                                ? productObj[item.product_id].price -
                                                  productObj[item.product_id].price *
                                                      (productObj[item.product_id].sale / 100)
                                                : productObj[item.product_id].price
                                            )
                                                .toFixed(2)
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                                            $
                                        </p>
                                        {/*<span>700,000</span>*/}
                                        {/*<sup>đ</sup>*/}
                                    </div>
                                </div>
                            ))}

                            <div className={style.total_cart}>
                                <p>Thành tiền</p>
                                <span className='thanh_tien'>
                                    {sumMoney()}
                                    {/*1,028,000<sup>đ</sup>*/}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ContentThanhToan.propTypes = {};

ContentThanhToan.defaultProps = {};

export default withPageRouter(ContentThanhToan);
