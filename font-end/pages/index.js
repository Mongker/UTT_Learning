/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 19/03/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
// import dynamic from 'next/dynamic';

// Component
import MetaView from '../components/MetaView';

const { Header, Footer, Content } = Layout;

// icon
function Index() {
    return (
        <Layout>
            <MetaView />
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    );
}

Index.propTypes = {
    dataMeta: PropTypes.object,
};

export default Index;
