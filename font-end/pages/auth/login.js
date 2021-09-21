/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 19/03/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
// import PropTypes from 'prop-types';
import style from 'styles/login.module.css';
import { useRouter } from 'next/router';
import { message } from 'antd';

// Component
import MetaView from '../../components/MetaView';

// hooks
import useDispatchUtil from 'hooks/useDispatchUtil';
import CONFIG_TYPE_ACTION from '../../config/configTypeAction';

function Login() {
    // state
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // hooks
    const dispatchUtil = useDispatchUtil();

    const router = useRouter();

    // handle func
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSave = () => {
        dispatchUtil(CONFIG_TYPE_ACTION.SAGA.USER.LOGIN, { email: 'admin@utt.com', password: '123456' });
        // if (email.length > 0 && password.length > 0) {
        // Code ở đây
        // } else message.warn('Không được bỏ trống thông tin');
    };
    const handleSingUp = (e) => {
        e.preventDefault();
        router.push('/singup');
    };
    // React.useEffect(() => {
    //     user && router.push('/');
    // }, [user]);
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
                                <input
                                    onChange={handleChangeEmail}
                                    placeholder={'Email tài khoản'}
                                    className={style.input0}
                                />
                            </div>
                            <div className={style.wrap_input}>
                                <input
                                    type={'password'}
                                    onChange={handleChangePassword}
                                    placeholder={'Mật khẩu'}
                                    className={style.input0}
                                />
                            </div>
                            <div className={style.title_login} onClick={handleSave}>
                                Đăng nhập
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

export default Login;
