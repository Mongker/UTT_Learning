/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { Map } from 'immutable';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Input, Row, Col, Tooltip } from 'antd';

// Util
import { TYPE_MENU } from 'util/TypeMenu';
import ContextApp from 'util/context/ContextApp';

// styles
import styles from './styles/index.module.scss';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import convertUrl from 'util/function/convertUrl';

// hooks
// import UseLogoutUser from '../../hooks/useLogoutUser';

const { Search } = Input;
const ColUI = styled(Col)`
    height: 65px;
`;
HeaderView.propTypes = {
    activeMenu: PropTypes.string.isRequired,
    signOut: PropTypes.func,
};

HeaderView.defaultProps = {
    signOut: () => null,
};

function HeaderView({ activeMenu, signOut }) {
    const { setTextSearch } = React.useContext(ContextApp);
    // hooks
    const router = useRouter();
    const meId = useSelector((state) => state.HasUser.getIn(['root', 'meId']));
    const meData = useSelector((state) => state.User.get(meId) || Map());

    // const
    const name = meData.get('name');
    const email = meData.get('email');
    const avatar = meData.get('avatar');

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
    const onSearch = (value) => {
        setTextSearch(value);
    };
    function onLogin() {
        signOut();
        localStorage.clear();
        router.push('/');
    }

    // JSX
    return (
        <React.Fragment>
            <Row align='middle' className={styles.controller}>
                <ColUI flex={2}>
                    <Search placeholder={'Tìm kiếm nhanh'} className={styles.search} onSearch={onSearch} enterButton />
                </ColUI>
                <ColUI flex={6}>
                    <p className={styles.title}>{text}</p>
                </ColUI>
                <ColUI flex={1}>
                    <Row align='middle'>
                        <ColUI className={classNames(styles.item)}>
                            <Avatar
                                style={{ backgroundColor: '#87d068' }}
                                icon={<UserOutlined />}
                                src={convertUrl(avatar)}
                            />
                        </ColUI>
                        <ColUI className={classNames(styles.item, styles.name)}>
                            {name} ({email})
                        </ColUI>
                    </Row>
                </ColUI>
                <ColUI flex={0.4}>
                    <Tooltip placement='bottom' title={'Đăng xuất'}>
                        <LogoutOutlined style={{ fontSize: '24px' }} onClick={onLogin} />
                    </Tooltip>
                </ColUI>
            </Row>
        </React.Fragment>
    );
}

export default HeaderView;
