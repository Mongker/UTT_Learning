/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Input } from 'antd';

// Util
import { TYPE_MENU } from 'util/TypeMenu';
import ContextApp from 'util/ContextApp';

// styles
import styles from './styles/index.module.scss';

// hooks
import UseLogoutUser from '../../hooks/useLogoutUser';

const { Search } = Input;

function HeaderView({ activeMenu }) {
    const { user, setTextSearch } = React.useContext(ContextApp);
    const handleLogOut = UseLogoutUser();

    // const
    const name = user && user.name ? user.name : 'Chưa đặt tên';
    const email = user && user.email ? user.email : '****@gmail.com';
    const role = user && user.role ? user.role : 'Người dùng';
    // const name = user && user.name ? user.name : 'Ẩn danh';
    // logic
    let text;
    switch (activeMenu) {
        case TYPE_MENU.CATEGORY:
            text = 'Quản lý danh mục';
            break;
        case TYPE_MENU.USER:
            text = 'Quản lý người dùng';
            break;
        case TYPE_MENU.PRODUCT:
            text = 'Quản lý khóa học';
            break;
        case TYPE_MENU.TRANSACTION:
            text = 'Quản lý khóa học';
            break;
        default:
            text = 'Quản trị hệ thống Unica';
            break;
    }

    // handle func
    const handleClick = (event) => {
        event.key === 'LOGOUT' && handleLogOut();
    };

    const onSearch = value => {
        console.log(value);
        setTextSearch(value);
    };

    // JSX
    const menu = (
        <Menu className={styles.menu} onClick={handleClick}>
            {/*<Menu.Item key='0'>1st menu item</Menu.Item>*/}
            {/*<Menu.Item key='1'>2nd menu item</Menu.Item>*/}
            <Menu.Item key='LOGOUT' icon={<LogoutOutlined />}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
    return (
        <React.Fragment>
            <div className={styles.search}><Search placeholder={'Tìm kiếm nhanh'} onSearch={onSearch} enterButton /></div>
            <div className={styles.controller}>
                <div className={styles.title}>{text}</div>
                <div style={{ width: '70%' }} />
                <Dropdown overlay={menu} overlayClassName={styles.dropdown}>
                    <div className={'flex_row'}>
                        <div className={classNames(styles.item)}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} src={''} />
                        </div>
                        <div className={classNames(styles.item, styles.name)}>
                            {name} ({email} - {role})
                        </div>
                    </div>
                </Dropdown>
            </div>
        </React.Fragment>
    );
}

HeaderView.propTypes = {};

HeaderView.defaultProps = {};

export default HeaderView;
