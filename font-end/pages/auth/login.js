/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 19/03/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import style from 'styles/login.module.scss';
import { useRouter } from 'next/router';
import { message } from 'antd';
// import withFirebaseAuth from 'react-with-firebase-auth';
// import * as firebase from 'firebase/app';
// require('firebase/auth');
// import firebaseConfig from '../../config/firebaseConfig';

// styles
import styled from 'styled-components';

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// Component
import MetaView from '../../components/MetaView';

// hooks
import useDispatchUtil from 'hooks/useDispatchUtil';
import CONFIG_TYPE_ACTION from '../../config/configTypeAction';
import validateEmail from '../../util/function/validateEmail';
import InputValidation from '../../designUI/InputFolder/InputValidation';

// const style
const InputValidationCustom = styled(InputValidation)`
    border-radius: 20px;
    font-size: 18px;
`;

function Login({ signInWithGoogle, user }) {
    // state
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // hooks
    const dispatchUtil = useDispatchUtil();

    const router = useRouter();
    // typeof window !== 'undefined' && (window.signOut = signOut);

    if (typeof localStorage !== 'undefined' && localStorage.getItem('meId') && localStorage.getItem('accessToken')) {
        router.push('/');
        return null;
    }

    // handle func
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    function funcSuccess() {
        message.warn('Đăng nhập thành công');
        router.push('/');
    }
    function handleSingUp(e) {
        e.preventDefault();
        router.push('/auth/sigup');
    }
    function funcError() {
        message.warn('Tài khoản hoặc mật khẩu không chính xác');
    }
    function handleSave() {
        if (email.length > 0 && password.length > 0) {
            dispatchUtil(
                CONFIG_TYPE_ACTION.SAGA.USER.LOGIN,
                { email: email, password: password },
                funcSuccess,
                funcError,
            );
        } else {
            message.warn('Bắt buộc phải nhập thông tin để đang nhập');
        }
    }

    function handleValidateEmail() {
        if (email.length === 0) return false;
        return validateEmail(email);
    }
    function handleValidatePass(password) {
        if (password.length === 0) return false;
        else if (password.length < 6) return false;
        return true;
    }

    React.useEffect(() => {
        // const mong = {
        // 	displayName: 'Mong Lê Văn',
        // 	email: 'monglv.bkav@gmail.com',
        // 	phoneNumber: null,
        // 	photoURL: 'https://lh3.googleusercontent.com/a-/AOh14Gj66HK4R1Ten1sB2xkBAHRVJUvJXhKKW7ZHyjI=s96-c',
        // 	providerId: 'google.com',
        // 	uid: '109936776856068640422',
        // };
        if (user && user.providerData && user.providerData[0]) {
            const dataUserGoogle = user && user.providerData && user.providerData[0] && user.providerData[0];
            dispatchUtil(CONFIG_TYPE_ACTION.SAGA.USER.LOGIN, dataUserGoogle, funcSuccess, funcError);
        }
    }, [user]);

    return (
        <React.Fragment>
            <MetaView title={'Login - Unica'} />
            <div className={style.limiter}>
                <div className={style.container_login}>
                    <div className={`${style.text_center} ${style.form_group}`} onClick={() => router.push('/')}>
                        UTT Learning
                    </div>
                    <div className={style.login}>
                        <div className={style.form_login}>
                            <div className={style.title}>
                                <h3>ĐĂNG NHẬP</h3>
                            </div>
                            <div className={style.wrap_input}>
                                <InputValidationCustom
                                    onChange={handleChangeEmail}
                                    visible={!handleValidateEmail(email)}
                                    value={email}
                                    className={style.input0}
                                    title={
                                        email.length > 0
                                            ? 'Đây phải là một email hoặc số điện thoại'
                                            : 'Trường này không được để trống'
                                    }
                                    placeholder={'Email hoặc số điện thoại'}
                                />
                            </div>
                            <div className={style.wrap_input}>
                                <InputValidationCustom
                                    onChange={handleChangePassword}
                                    visible={!handleValidatePass(password)}
                                    value={password}
                                    className={style.input_password}
                                    title={
                                        password.length === 0
                                            ? 'Mật khẩu không được để trống'
                                            : password.length <= 6 && 'Mật khẩu không đủ 6 ký tự'
                                    }
                                    placeholder={'Mật khẩu'}
                                    type={'password'}
                                />
                            </div>
                            <div role={'presentation'} className={style.title_login} onClick={handleSave}>
                                Đăng nhập
                            </div>
                            <div role={'presentation'} className={style.title_login} onClick={signInWithGoogle}>
                                Đăng nhập Với Google
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyItems: 'center',
                                }}
                            >
                                <div style={{ marginRight: 10 }}>Bạn chưa có tài khoản ?</div>
                                <a onClick={handleSingUp}>Đăng ký</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
// let firebaseAppAuth = firebaseApp.auth();
// let providers = {
//     googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

// export default withFirebaseAuth({ providers, firebaseAppAuth })(Login);
export default Login;
