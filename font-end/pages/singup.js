/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
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
import { url_api, url_base } from '../util/TypeUI';
import validateEmail from '../util/validateEmail';

export function postUser(data, setUser) {
    try {
        return axios
            .post(`${url_base}${url_api.USER}`, data)
            .then((res) => res.data)
            .then((result) => {
                if (result.message === 'OK') {
                    message.success('Tạo thành công');
                    setUser(result.user);
                } else if (result.message === 'LIMIT') {
                    message.warn('Đã tồn tại email hoặc số điện thoại');
                } else {
                    message.error('Lỗi truyền');
                }
            })
            .catch((error) => message.error('Lỗi: ' + error));
    } catch (e) {
        message.error(e);
    }
}

function SingUp(props) {
    // state
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordCheck, setPasswordCheck] = React.useState('');

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
    const handleChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
    };
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleSave = () => {
        if (email.length > 0 && password.length > 0 && passwordCheck.length > 0 && phone.length > 0) {
            if (phone.toString().length >= 9 && phone.toString().length <= 11) {
                if (validateEmail(email)) {
                    password === passwordCheck
                        ? postUser(
                              {
                                  email: email,
                                  password: password,
                                  phone: `${phone}`,
                              },
                              setUser,
                          )
                        : message.warn('Mật khẩu không khớp nhau');
                } else {
                    message.warn('Đây phải là 1 email');
                }
            } else {
                message.warn('Số điện thoại không hợp lệ!');
            }
        } else message.warn('Không được bỏ trống thông tin');
    };

    React.useEffect(() => {
        user && router.push('/');
    }, [user]);
    return (
        <div className={style.limiter}>
            <div className={style.container_login}>
                <div className={`${style.text_center} ${style.form_group}`} onClick={() => router.push('/')}>
                    UTT Learning
                </div>
                <div className={style.login}>
                    <div className={style.form_login}>
                        <div className={style.title}>
                            <h3>ĐĂNG KÝ</h3>
                        </div>
                        <div className={style.wrap_input}>
                            <input
                                type='email'
                                onChange={handleChangeEmail}
                                placeholder={'Email đăng ký'}
                                className={style.input0}
                            />
                        </div>
                        <div className={style.wrap_input}>
                            <input
                                type={'number'}
                                onChange={handleChangePhone}
                                placeholder={'Số điện thoại đăng ký'}
                                className={style.input0}
                            />
                        </div>
                        <div className={style.wrap_input}>
                            <input
                                type={'password'}
                                onChange={handleChangePassword}
                                placeholder={'Mật khẩu của bạn'}
                                className={style.input0}
                            />
                        </div>
                        <div className={style.wrap_input}>
                            <input
                                type={'password'}
                                onChange={handleChangePasswordCheck}
                                placeholder={'Mật khẩu xác nhận'}
                                className={style.input0}
                            />
                        </div>
                        <div className={style.title_login} onClick={handleSave}>
                            Đăng ký
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingUp;
