/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

// Component
import ContentController from './ContentController';

ContentView.propTypes = {
    activeMenu: PropTypes.string.isRequired,
};

ContentView.defaultProps = {};
function ContentView({ activeMenu }) {
    return (
        <React.Fragment>
            <Breadcrumb style={{ margin: '10px 0' }}>
                {/*<Breadcrumb.Item>*/}
                {/*    <HomeOutlined />*/}
                {/*</Breadcrumb.Item>*/}
                {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
            </Breadcrumb>
            <div className='site-layout-background' style={{ padding: 24, minHeight: '95%' }}>
                <ContentController activeMenu={activeMenu} />
            </div>
        </React.Fragment>
    );
}

export default ContentView;
