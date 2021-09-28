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

// Component
import MetaView from '../../components/MetaView';

// hooks
import useDispatchUtil from 'hooks/useDispatchUtil';
import CONFIG_TYPE_ACTION from '../../config/configTypeAction';

function Sigup(props) {
    // state
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordCheck, setPasswordCheck] = React.useState('');

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
    const handleChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
    };
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleSave = () => {
        dispatchUtil(CONFIG_TYPE_ACTION.SAGA.USER.SIG_UP, { email, phone, password: password }, funcSuccess, funcError);
    };
    const funcSuccess = () => {
        message.success('Đăng ký thành công', 2);
        router.push('/auth/login');
    };
    const funcError = () => {
        message.warn('Email hoặc số điện thoại đã có người dùng', 2);
    };

    return (
        <div className={style.limiter}>
            <MetaView title={'Đăng ký | UTT Learning'} />
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

export default Sigup;
