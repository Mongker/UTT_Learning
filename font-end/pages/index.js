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
import dynamic from 'next/dynamic';

// Component
import MetaView from 'components/MetaView';
import FooterApp from 'components/FooterFolder/Footer';

// const
const { Header, Content } = Layout;
const RingPhone = dynamic(() => import('components/RingPhoneFolder/RingPhone'));

// icon
function Index() {
    return (
        <React.Fragment>
            <RingPhone />
            <Layout>
                <MetaView />
                <Header>Header</Header>
                <Content />
                <FooterApp />
            </Layout>
        </React.Fragment>
    );
}

Index.propTypes = {
    dataMeta: PropTypes.object,
};

export default Index;
