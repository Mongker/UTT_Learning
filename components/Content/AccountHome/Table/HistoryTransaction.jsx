/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 12/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, List, Tabs } from 'antd';
import useTransactionBase from '../../../hooks/LogicData/useTransactionBase';
import useUserBase from '../../../hooks/LogicData/useUserBase';
import useProductBase from '../../../hooks/LogicData/useProductBase';
import useCartBase from '../../../hooks/LogicData/useCartBase';
import { url_base_img } from 'util/TypeUI';
import convertDateVN from 'util/convertDateVN';

const { TabPane } = Tabs;
const TYPE_TAB = {
    CHO_XAC_NHAN: 'Chờ xác nhận',
    DA_XAC_NHAN: 'Đã xác nhận',
    DA_GUI: 'Đã gửi đơn hàng',
    THANH_CONG: 'Thành công',
    HUY_DON: 'Hủy đơn hàng',
};

function HistoryTransaction() {
    const { transaction, getListTransaction, putTransaction } = useTransactionBase();
    const { productObj } = useProductBase();
    const { cartObj } = useCartBase();
    const { myUser } = useUserBase();

    const callback = (key) => {};
    const handleRemove = (item) => {
        item.status_transaction = 4;
        putTransaction(item);
    };
    const handleStartTransaction = (item) => {
        item.status_transaction = 0;
        putTransaction(item);
    };
    const Cart = (item) => (
        <React.Fragment>
            <div className={'flex_col'} style={{ justifyContent: 'center' }}>
                {typeof item.list_cart === 'object' &&
                    item.list_cart.map((id) => {
                        const dataProduct =
                            id && cartObj[id] && cartObj[id].product_id && productObj[cartObj[id].product_id];
                        if (!dataProduct) return null;
                        return (
                            <React.Fragment>
                                <div
                                    className={'flex_row'}
                                    style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}
                                >
                                    <div
                                        className={'flex_row'}
                                        style={{ justifyContent: 'flex-start', alignItems: 'center' }}
                                    >
                                        <img
                                            src={`${url_base_img}${
                                                dataProduct && dataProduct.image_link && dataProduct.image_link
                                            }`}
                                            style={{ width: 50, height: 50, objectFit: 'cover' }}
                                        />
                                        <div style={{ fontSize: 20, color: 'red', marginLeft: 5 }}>
                                            {dataProduct && dataProduct.name}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: 20, color: 'green', marginLeft: 5 }}>
                                        {(cartObj[id].sale
                                            ? dataProduct.price - dataProduct.price * (cartObj[id].sale / 100)
                                            : dataProduct.price
                                        )
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' $'}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
            </div>
            {item.status_transaction < 1 && (
                <Button type='primary' danger onClick={() => handleRemove(item)}>
                    Hủy đơn hàng
                </Button>
            )}
            {item.status_transaction === 4 && (
                <Button type='primary' onClick={() => handleStartTransaction(item)}>
                    Đặt lại
                </Button>
            )}
        </React.Fragment>
    );

    const transactionFilterStatus = (number) => {
        const arr = transaction.filter((item) => item['status_transaction'] === number);
        return arr;
    };

    React.useEffect(() => {
        getListTransaction({ user_id: myUser.id });
    }, []);

    // JSX
    const Title = (item) => (
        <div className={'flex_col'}>
            <div className={'flex_row'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: 'red' }}>Mã đơn hàng: {item.id}</h1>
                <h1 style={{ color: 'green' }}>
                    Giá tiền: {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '$'}
                </h1>
            </div>
            <div className={'flex_col'}>Tin nhắn: {item.message}</div>
            <div className={'flex_col'}>Số điện thoại nhận hàng: {item.phone}</div>
            <div className={'flex_col'}>Địa chỉ nhận: {item.address}</div>
            <div className={'flex_col'}>
                Ngày đặt hàng: {item.created && convertDateVN(item.created)}
                {/*Ngày đặt hàng: {item.created && new Date(item.created).toLocaleDateString()}*/}
            </div>
        </div>
    );

    return (
        <div>
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

HistoryTransaction.propTypes = {};

HistoryTransaction.defaultProps = {};

export default HistoryTransaction;
