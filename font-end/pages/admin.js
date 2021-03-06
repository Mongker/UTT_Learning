/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Layout, notification, Spin } from 'antd';
import { useSelector } from 'react-redux';
// component
import MetaView from '../components/MetaView';

// util
import { TYPE_MENU } from 'util/TypeMenu';
// import ModalProductView from '../components/Admin/Product/Modal/ModalProductView';

// style
import styles from '../components/Admin/styles/index.module.scss';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

// const
const { Header, Content, Sider } = Layout;

// component
const ContentView = dynamic(import('../components/Admin/Content/ContentView'), { ssr: false });
const HeaderView = dynamic(import('../components/Admin/Header/HeaderView'), { ssr: false });
const MenuView = dynamic(import('../components/Admin/Menu/MenuView'), { ssr: false });
// const ImageUI = dynamic(import('designUI/ImageUI'));

notification.config({
    duration: 2,
});

Admin.propTypes = {
    signOut: PropTypes.func,
};

Admin.defaultProps = {
    signOut: () => null,
};

function Admin({ signOut }) {
    // context
    const router = useRouter();

    // redux
    const meId = useSelector((state) => state.HasUser.getIn(['root', 'meId']));
    const meData = useSelector((state) => state.User.get(meId) || Map());
    const roleMe = meData.get('role');

    // state
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeMenu, setActiveMenu] = React.useState('');
    const [collapsed, setCollapsed] = React.useState(false);

    // handle func
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };
    const handleSetActiveMenu = (value) => {
        localStorage.setItem('activeMenuAdmin', value);
        setActiveMenu(value);
    };

    React.useEffect(() => {
        const handleLoading = setTimeout(() => setIsLoading(false), 1000);
        const defaultActiveMenu = localStorage.getItem('activeMenuAdmin')
            ? localStorage.getItem('activeMenuAdmin')
            : TYPE_MENU.CATEGORY;
        handleSetActiveMenu(defaultActiveMenu);
        return () => clearTimeout(handleLoading);
    }, []);

    // TODO by MongLV: chan khi chua dang nhap
    if (
        (typeof localStorage !== 'undefined' &&
            !localStorage.getItem('meId') &&
            !localStorage.getItem('accessToken')) ||
        roleMe === 'user'
    ) {
        router.replace('/');
        return null;
    }

    // JSX
    const ComponentContent = (
        <Layout style={{ minHeight: '100vh' }}>
            <MetaView title={'Quản trị  UTT Learning'} />
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                {!collapsed && (
                    <div className={styles.logo} onClick={() => router.push('/')}>
                        UTT Learning
                    </div>
                )}
                <MenuView setActiveMenu={handleSetActiveMenu} activeMenu={activeMenu} TYPE_MENU={TYPE_MENU} />
            </Sider>
            <Layout className='site-layout'>
                <Header className='site-layout-background-header' style={{ padding: 0 }}>
                    <HeaderView activeMenu={activeMenu} signOut={signOut} />
                </Header>
                <Content style={{ margin: '0 10px' }}>
                    <ContentView activeMenu={activeMenu} />
                </Content>
            </Layout>
        </Layout>
    );
    return (
        <React.Fragment>
            {isLoading ? (
                <div className={styles.spin_loading}>
                    <Spin size='large' />
                </div>
            ) : (
                ComponentContent
            )}
        </React.Fragment>
    );
}

export default React.memo(Admin);
