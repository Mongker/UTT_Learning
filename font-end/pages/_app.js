import { wrapper } from 'redux/store';
import React from 'react';
// import * as gtag from '../lib/gtag';
// import '../styles/antd-custom.less';
import '../styles/index.css';
import '../styles/base.css';
import '../styles/header.css';
import '../styles/content.css';
import '../styles/reset.css';
import 'video-react/dist/video-react.css';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
require('firebase/auth');
import firebaseConfig from '../config/firebaseConfig';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

// context
import ContextApp from 'util/context/ContextApp';

// hooks
import useDispatchUtil from '../hooks/useDispatchUtil';
import CONFIG_TYPE_ACTION from '../config/configTypeAction';
export function reportWebVitals(metric) {
    if (metric.label === 'custom') {
        console.log('metric:', metric); // TODO by MongLV: log ra xem hiệu năng của website
    }
}

let render;
function App(props) {
    const { Component, pageProps } = props;
    // Sử dụng bố cục được xác định ở cấp trang, nếu có (https://nextjs.org/docs/basic-features/layouts)
    const getLayout = Component.getLayout || ((page) => page);

    const dispatch = useDispatchUtil();
    const pathname = props.router.pathname;

    React.useEffect(() => {
        if (!render) {
            dispatch(CONFIG_TYPE_ACTION.SAGA.USER.CHECK_POINT);
            render = render + 1;
        }
    }, []);

    React.useEffect(() => {
        switch (pathname) {
            case '/admin':
                dispatch(CONFIG_TYPE_ACTION.SAGA.CATEGORY.GET_LIST);
                break;
            case '/':
                dispatch(CONFIG_TYPE_ACTION.SAGA.CATEGORY.GET_LIST);
                break;
            default:
                break;
        }
    }, [pathname]);

    // store context
    const valueContextApp = React.useMemo(() => ({}), []);
    const WrappedComponentProps = withFirebaseAuth({ providers, firebaseAppAuth })(Component);
    return getLayout(
        <ContextApp.Provider value={valueContextApp}>
            <WrappedComponentProps {...pageProps} />
        </ContextApp.Provider>,
    );
}
let firebaseAppAuth = firebase.auth();
let providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default wrapper.withRedux(App);
