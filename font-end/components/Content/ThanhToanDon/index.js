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
        } catch (e) {}

        debugger; // MongLV
        values['user_id'] = Number(myUser.id);
        delete values['name'];
        delete values['email'];
        postTransaction(values, () => router.push('/account?show=3'));
    };

    // V??ng ?????i
    React.useEffect(() => {
        myUser ? form.setFieldsValue(myUser) : router.push('login');
    }, [myUser]);
    return (
        <div className={style.form_than_toan}>
            {/*<div className={style.u_bread_cart}>*/}
            {/*    <div className={style.container}>*/}
            {/*        <Steps current={current} onChange={onChange}>*/}
            {/*            <Step title='Th??ng tin' />*/}
            {/*            <Step title='Thanh to??n' />*/}
            {/*            <Step title='V??o h???c' />*/}
            {/*        </Steps>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={style.unica_order_cart}>
                <div className={style.container}>
                    <div className={style.controller_left}>
                        <p className={style.title_left}>Th??ng tin ng?????i ?????t h??ng</p>
                        <div className={style.u_box_cart2}>
                            <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
                                <div>
                                    <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                        H??? t??n <p style={{ color: 'red', marginLeft: 5 }}>*</p>
                                    </div>
                                    <Form.Item
                                        name='name'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Kh??ng ???????c b??? tr???ng!',
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
                                        ??i???n tho???i <p style={{ color: 'red', marginLeft: 5 }}>*</p>
                                    </div>
                                    <Form.Item
                                        name='phone'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Kh??ng ???????c b??? tr???ng!',
                                            },
                                            // {
                                            //     type: 'number',
                                            //     message: 'Kh??ng ph???i s??? ??i???n tho???i ',
                                            // },
                                        ]}
                                    >
                                        <Input style={{ width: '100%' }} />
                                    </Form.Item>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                        ?????a ch??? nh???n h??ng <p style={{ color: 'red', marginLeft: 5 }}>*</p>
                                    </div>
                                    <Form.Item
                                        name='address'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Kh??ng ???????c b??? tr???ng!',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea />
                                        {/*<Select placeholder='Ch???n t???nh th??nh' allowClear>*/}
                                        {/*    <Option value='HN'>H?? N???i</Option>*/}
                                        {/*    <Option value='HY'>H??ng Y??n</Option>*/}
                                        {/*    <Option value='TH'>Thanh H??a</Option>*/}
                                        {/*</Select>*/}
                                    </Form.Item>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                        L???i nh???n <p style={{ color: 'red', marginLeft: 5 }}>*</p>
                                    </div>
                                    <Form.Item name='message' rules={[{ required: true }]}>
                                        <Input.TextArea />
                                    </Form.Item>
                                </div>
                                <div className={style.btn}>
                                    <Button className={style.btn_next} htmlType={'submit'}>
                                        Thanh to??n
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className={style.controller_rigth}>
                        <div className={style.u_box_cart2}>
                            <div className={style.u_c_title}>
                                <p>????n h??ng ({cartFilter.length} kh??a h???c)</p>
                                <div onClick={() => router.push('/cart')} style={{ color: 'blue', cursor: 'pointer' }}>
                                    <EditOutlined style={{ marginRight: 5 }} />
                                    S???a
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
                                            {/*549,000 <sup style={{ fontSize: 14 }}>??</sup>*/}
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
                                        {/*<sup>??</sup>*/}
                                    </div>
                                </div>
                            ))}

                            <div className={style.total_cart}>
                                <p>Th??nh ti???n</p>
                                <span className='thanh_tien'>
                                    {sumMoney()}
                                    {/*1,028,000<sup>??</sup>*/}
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
