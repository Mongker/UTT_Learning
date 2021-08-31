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
import axios from 'axios';

// Context
import ContextApp from '../util/ContextApp';

// Component
import MetaView from '../components/MetaView';
import { url_api, url_base } from '../util/TypeUI';

const getLoginUser = async (data, dataUser) => {
    try {
        return axios
            .post(`${url_base}${url_api.USER}/login`, data)
            .then((res) => res.data)
            .then((result) => {
                console.log('result', result); // MongLV log fix bug
                // dataUser(res.data['user']);
                if (result.message === 'OK') {
                    console.log('message', result.message); // MongLV log fix bug
                    dataUser(result['user']);
                } else {
                    message.warning(result.message);
                }
            })
            .catch((error) => message.error('Lỗi đường truyền, kiểm tra lại mạng:', error));
    } catch (e) {
        message.error(e);
    }
};

function Login(props) {
    // state
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // context
    const { user, setUser } = React.useContext(ContextApp);

    const router = useRouter();

    // handle func
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSave = () => {
        if (email.length > 0 && password.length > 0) {
            getLoginUser(
                {
                    email: email,
                    password: password,
                },
                setUser,
            );
        } else message.warn('Không được bỏ trống thông tin');
    };
    const handleSingUp = (e) => {
        e.preventDefault();
        router.push('/singup');
    };
    React.useEffect(() => {
        user && router.push('/');
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
