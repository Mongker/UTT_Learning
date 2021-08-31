/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 16/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @phone: +84373668113
 * @slogan: "Mọi thứ đều bắt đầu từ việc nhỏ, những khát vọng phải lớn"
 */

import React from 'react';
import Image from 'next/image';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SearchOutlined, ShoppingCartOutlined, UnlockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

// context
import ContextApp from 'util/ContextApp';

// util
import { url_base_img } from 'util/TypeUI';
// styles
import styles from './styles/index.module.scss';
import { Badge, Dropdown, Input, Menu, Modal } from 'antd';
import useCartBase from '../../hooks/LogicData/useCartBase';
import UseLogoutUser from '../../hooks/useLogoutUser';
import useOpenProduct from '../../hooks/LogicData/useOpenProduct';
import useProductBase from '../../hooks/LogicData/useProductBase';

function HeaderUNICAView(props) {
    // hooks
    const router = useRouter();
    const { cart, getListCart } = useCartBase();
    const { handleOpenProduct } = useOpenProduct();
    const { getListProduct } = useProductBase();
    const { user, setTextSearch } = React.useContext(ContextApp);
    const handleLogOut = UseLogoutUser();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [code, setCode] = React.useState('');

    // const
    const cartFilter = cart.filter((item) => item.status === 0);

    // handle func
    const handleClickLogin = (e) => {
        e.preventDefault();
        router.push('/login');
    };
    const handleClickSingUp = (e) => {
        e.preventDefault();
        router.push('/singup');
    };
    const handleClickGoAdmin = (e) => {
        e.preventDefault();
        router.push('/admin');
    };

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    };
    const handleSearchText = (event) => {
        setTextSearch(event.target.value);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCallBack = () => {
        getListCart({ user_id: user.id });
        getListProduct();
        router.push('/account?show=1');
    };

    const handleOk = () => {
        handleOpenProduct({ code: code }, handleCallBack);
        setIsModalVisible(false);
        setCode('');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCode('');
    };

    const handleMenu = (event) => {
        event.key === 'PRODUCT' && router.push('/account?show=1');
        event.key === 'USER' && router.push('/account?show=2');
        event.key === 'LOGOUT' && handleLogOut();
    };

    // Vòng đời
    React.useEffect(() => {
        user && user.id && getListCart({ user_id: user.id });
    }, [user]);

    // JSX
    const menu = (
        <Menu className={styles.menu} onClick={handleMenu}>
            <Menu.Item key={'USER'}>Tài khoản</Menu.Item>
            <Menu.Item key={'PRODUCT'}>Khóa học của tôi</Menu.Item>
            <Menu.Item key={'LOGOUT'}>Đăng xuất</Menu.Item>
        </Menu>
    );
    return (
        <div className={styles.header}>
            <div className={styles.grid}>
                <div className={styles.header_grid}>
                    <div className={styles.header_logo} onClick={() => router.push('/')}>
                        <p>UTT Learning</p>
                    </div>
                    <div className={styles.header_input}>
                        <form className={styles['header_input-form']} action=''>
                            <input
                                className={styles['header_input-input']}
                                type='text'
                                placeholder='Tìm khóa học nhanh theo tên và giá tiền'
                                onChange={handleSearchText}
                            />
                            <button className={styles['header_input-button']} type='submit'>
                                <SearchOutlined />
                            </button>
                        </form>
                    </div>
                    <div className={styles.header_giohang}>
                        <div className={styles['header_giohang-link-kichhoat']} onClick={showModal}>
                            <p>Kích hoạt khóa học</p>
                            <UnlockOutlined />
                        </div>
                        <Modal
                            title={'Mã kích hoạt khóa học của bạn'}
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <div className={'flex_col'}>
                                <div>Mã khóa học của bạn là:</div>
                                <Input onChange={handleChangeCode} />
                            </div>
                        </Modal>
                        <a className={styles['header_giohang-icon']} onClick={() => router.push('/cart')}>
                            <Badge count={cartFilter.length}>
                                <ShoppingCartOutlined
                                    style={{
                                        color: 'red',
                                        fontSize: '25px',
                                        borderRadius: '100%',
                                    }}
                                />
                            </Badge>
                        </a>
                        <ul className={styles['header_giohang-list']}>
                            {user && typeof user === 'object' ? (
                                <Dropdown overlay={menu}>
                                    <div className={'info_user'} style={{ cursor: 'pointer', padding: '-5px' }}>
                                        <img
                                            src={`${url_base_img}${
                                                user.avatar ? user.avatar : '765-default-avatar.png'
                                            }`}
                                            alt='ssss'
                                            style={{
                                                borderRadius: '100%',
                                                width: 30,
                                                height: 30,
                                            }}
                                        />
                                        <p
                                            style={{
                                                color: 'red',
                                                fontSize: 20,
                                                marginLeft: 5,
                                                marginRight: 5,
                                            }}
                                        >
                                            {user.email}
                                        </p>
                                        {/*<p style={{ marginRight: 5 }}>({user.role})</p>*/}
                                    </div>
                                </Dropdown>
                            ) : (
                                <React.Fragment>
                                    <li className={styles['header_giohang-list-item']}>
                                        <a className={styles['list-link-dn']} onClick={handleClickLogin}>
                                            ĐĂNG NHẬP
                                        </a>
                                    </li>
                                    <li className={classNames(styles['header_giohang-list-item'], styles['dk'])}>
                                        <a className={styles['list-link-dk']} onClick={handleClickSingUp}>
                                            ĐĂNG KÝ
                                        </a>
                                    </li>
                                </React.Fragment>
                            )}
                            {user && user.role !== 'user' && (
                                <li className={classNames(styles['header_giohang-list-item'], styles['dk'])}>
                                    <a className={styles['list-link-dk']} onClick={handleClickGoAdmin}>
                                        Quản lý khóa học
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

HeaderUNICAView.propTypes = {};

HeaderUNICAView.defaultProps = {};

export default HeaderUNICAView;
