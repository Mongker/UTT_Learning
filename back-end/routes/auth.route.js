/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 03/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
const express = require('express');
const authorRoutes = express.Router();

// container
const refreshToken = require('../controller/auth/refreshToken.controller');
const login = require('../controller/auth/login.controller');
const createUser = require('../controller/auth/resquister.controller');

// middleware
const checkLogin = require('../middleware/checkLogin.middleware');
const checkEmailRegister = require('../middleware/checkEmailRegister.middleware');
const checkPhoneRegister = require('../middleware/checkPhoneRegister.middleware');
const checkAccount = require('../middleware/checkAccount.middleware');

authorRoutes.route('/api/login').post(checkAccount, checkLogin, login);
authorRoutes.route('/api/register').post(checkAccount, checkEmailRegister, checkPhoneRegister, createUser);
authorRoutes.route('/api/refresh-token').post(refreshToken);

module.exports = authorRoutes;
