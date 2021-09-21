import { wrapper } from 'redux/store';
import React, { useEffect, useState } from 'react';
// import * as gtag from '../lib/gtag';
// import '../styles/antd-custom.less';
import '../styles/index.css';
import '../styles/base.css';
import '../styles/header.css';
import '../styles/content.css';
import '../styles/reset.css';
import 'video-react/dist/video-react.css';

// context
import ContextApp from 'util/context/ContextApp';
export function reportWebVitals(metric) {
    if (metric.label === 'custom') {
        console.log('metric:', metric); // TODO by MongLV: log ra xem hiệu năng của website
    }
}

function App({ Component, pageProps }) {
    // Sử dụng bố cục được xác định ở cấp trang, nếu có (https://nextjs.org/docs/basic-features/layouts)
    const getLayout = Component.getLayout || ((page) => page);

    // store context
    const valueContextApp = React.useMemo(() => ({}), []);

    return getLayout(
        <ContextApp.Provider value={valueContextApp}>
            <Component {...pageProps} />
        </ContextApp.Provider>,
    );
}

export default wrapper.withRedux(App);
