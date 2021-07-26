/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import React from 'react';
import { Menu } from 'antd';
import { DesktopOutlined, PicRightOutlined, TeamOutlined, TransactionOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

// util
import { TYPE_MENU } from 'util/TypeMenu';
import useUserBase from '../../hooks/LogicData/useUserBase';

// const
function MenuView(props) {
    const { TYPE_MENU, setActiveMenu, activeMenu } = props;
    const { myUser } = useUserBase();
    const role = myUser && myUser.role;

    function handleClick(event) {
        setActiveMenu(event.key);
    }
    return (
        <Menu theme='dark' selectedKeys={[activeMenu]} mode='inline' onClick={handleClick}>
            {role === 'admin' && (
                <Menu.Item key={TYPE_MENU.CATEGORY} icon={<PicRightOutlined />}>
                    Quản lý danh mục
                </Menu.Item>
            )}
            {role !== 'user' && (
                <Menu.Item key={TYPE_MENU.PRODUCT} icon={<DesktopOutlined />}>
                    Quản lý khóa học
                </Menu.Item>
            )}
            {role === 'admin' && (
                <Menu.Item key={TYPE_MENU.USER} icon={<TeamOutlined />}>
                    Quản lý người dùng
                </Menu.Item>
            )}
            {role === 'admin' && (
                <Menu.Item key={TYPE_MENU.TRANSACTION} icon={<TransactionOutlined />}>
                    Quản lý hóa đơn
                </Menu.Item>
            )}
        </Menu>
    );
}

MenuView.propTypes = {
    TYPE_MENU: PropTypes.object.isRequired,
    setActiveMenu: PropTypes.func.isRequired,
    activeMenu: PropTypes.func.isRequired,
};

MenuView.defaultProps = {};

export default React.memo(MenuView);
