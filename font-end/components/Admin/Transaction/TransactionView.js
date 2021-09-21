/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 13/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import { Avatar, Button, Card, List, Tabs } from 'antd';
import useTransactionBase from '../../hooks/LogicData/useTransactionBase';
import useProductBase from '../../hooks/LogicData/useProductBase';
import useCartBase from '../../hooks/LogicData/useCartBase';
import useUserBase from '../../hooks/LogicData/useUserBase';
import { url_base_img } from '../../../util/TypeUI';
// import PropTypes from 'prop-types';

// style
import styles from './styles/index.module.scss';
import { UserOutlined } from '@ant-design/icons';
import ContextApp from '../../../util/context/ContextApp';
import convertDateVN from '../../../util/convertDateVN';

// const
const { TabPane } = Tabs;
const TYPE_TAB = {
    CHO_XAC_NHAN: 'Chờ xác nhận',
    DA_XAC_NHAN: 'Đã xác nhận',
    DA_GUI: 'Đã gửi đơn hàng',
    THANH_CONG: 'Thành công',
    HUY_DON: 'Hủy đơn hàng',
};
function TransactionView() {
    const { transaction, getListTransaction, putTransaction } = useTransactionBase();
    const { productObj } = useProductBase();
    const { cartObj, getListCart } = useCartBase();
    const { myUser, usersObj } = useUserBase();
    const { textSearch } = React.useContext(ContextApp);

    const callback = (key) => {};
    const handleNext = (item) => {
        item.status_transaction = item.status_transaction + 1;
        putTransaction(item);
    };
    const handleRemove = (item) => {
        item.status_transaction = 4;
        putTransaction(item);
    };
    const handleStartTransaction = (item) => {
        item.status_transaction = 0;
        putTransaction(item);
    };

    const transactionFilterStatus = (number) => {
        const arr = transaction.filter((item) => item['status_transaction'] === number);
        return handleSearch(arr.reverse());
    };
    const handleSearch = (arr) => {
        if (textSearch.length > 0)
            return arr.filter(
                (item) =>
                    item.phone.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                    `${item.amount}`.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                    usersObj[item.user_id].name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                    usersObj[item.user_id].email.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1,
            );
        else return arr;
    };

    React.useEffect(() => {
        getListTransaction();
        getListCart({ code: true });
    }, []);

    // JSX
    const Cart = (item) => {
        return (
            <React.Fragment>
                <div className={'flex_col'} style={{ justifyContent: 'center' }}>
                    {item.list_cart &&
                        item.list_cart.map((id) => {
                            const dataProduct =
                                cartObj[id] && cartObj[id].product_id && productObj[cartObj[id].product_id];
                            return (
                                <React.Fragment>
                                    <div
                                        className={'flex_row'}
                                        style={{ justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <div
                                            className={'flex_row'}
                                            style={{ justifyContent: 'flex-start', alignItems: 'center' }}
                                        >
                                            <img
                                                src={`${url_base_img}${dataProduct && dataProduct.image_link}`}
                                                style={{ width: 50, height: 50, objectFit: 'cover' }}
                                            />
                                            <div style={{ fontSize: 20, color: 'red', marginLeft: 5 }}>{`${
                                                dataProduct && dataProduct.name
                                            }`}</div>
                                        </div>
                                        <div style={{ fontSize: 20, color: 'green', marginLeft: 5 }}>
                                            {`${
                                                id && cartObj[id] && cartObj[id].sale
                                                    ? dataProduct.price - dataProduct.price * (cartObj[id].sale / 100)
                                                    : (dataProduct && dataProduct.price) || 0
                                            }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' $'}
                                        </div>
                                        <div style={{ fontSize: 20, color: 'green', marginLeft: 5 }}>
                                            Mã code: {id && cartObj[id] && cartObj[id].code}
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    <div className={'flex_row'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        {item.status_transaction < 3 && (
                            <Button type='primary' style={{ width: 200 }} onClick={() => handleNext(item)}>
                                Xác nhận
                            </Button>
                        )}
                        {item.status_transaction < 3 && (
                            <Button type='primary' style={{ width: 200 }} danger onClick={() => handleRemove(item)}>
                                Hủy đơn hàng
                            </Button>
                        )}
                        {item.status_transaction === 4 && (
                            <Button type='primary' style={{ width: 200 }} onClick={() => handleStartTransaction(item)}>
                                Đặt lại
                            </Button>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    };
    const Title = (item) => (
        <div className={'flex_col'}>
            <div className={'flex_row'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: 'red' }}>Mã đơn hàng: {item.id}</h1>
                <h1 style={{ color: 'green' }}>
                    Giá tiền: {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '$'}
                </h1>
            </div>
            <div className={'flex_row'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <div className={'flex_col'}>Tin nhắn: {item.message}</div>
                <div className={'flex_col'}>
                    <Avatar
                        size={100}
                        icon={<UserOutlined />}
                        src={`${url_base_img}${
                            item.user_id && usersObj[item.user_id] && usersObj[item.user_id].avatar
                        }`}
                    />
                </div>
            </div>
            <div className={'flex_row'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <div className={'flex_col'}>Số điện thoại nhận hàng: {item.phone}</div>
                <div className={'flex_col'}>
                    Email: {item.user_id && usersObj[item.user_id] && usersObj[item.user_id].email}
                </div>
            </div>
            <div className={'flex_row'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <div className={'flex_col'}>Địa chỉ nhận: {item.address}</div>
                <div className={'flex_col'}>
                    Tên: {item.user_id && usersObj[item.user_id] && usersObj[item.user_id].name}
                </div>
            </div>
            <div className={'flex_row'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <div className={'flex_col'}>Ngày đặt hàng: {item.created && convertDateVN(item.created)}</div>
            </div>
        </div>
    );
    return (
        <div className={styles.controller} id={'maimong'} style={{ overflow: 'auto' }}>
            <Tabs onChange={callback} type='card'>
                <TabPane tab={TYPE_TAB.CHO_XAC_NHAN} key={TYPE_TAB.CHO_XAC_NHAN}>
                    <List
                        dataSource={transactionFilterStatus(0)}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={Title(item)}>{Cart(item)}</Card>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab={TYPE_TAB.DA_XAC_NHAN} key={TYPE_TAB.DA_XAC_NHAN}>
                    <List
                        dataSource={transactionFilterStatus(1)}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={Title(item)}>{Cart(item)}</Card>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab={TYPE_TAB.DA_GUI} key={TYPE_TAB.DA_GUI}>
                    <List
                        dataSource={transactionFilterStatus(2)}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={Title(item)}>{Cart(item)}</Card>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab={TYPE_TAB.THANH_CONG} key={TYPE_TAB.THANH_CONG}>
                    <List
                        dataSource={transactionFilterStatus(3)}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={Title(item)}>{Cart(item)}</Card>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab={TYPE_TAB.HUY_DON} key={TYPE_TAB.HUY_DON}>
                    <List
                        dataSource={transactionFilterStatus(4)}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={Title(item)}>{Cart(item)}</Card>
                            </List.Item>
                        )}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
}

TransactionView.propTypes = {};

TransactionView.defaultProps = {};

export default TransactionView;
