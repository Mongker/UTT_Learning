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

// middleware
const checkEmail = require('../middleware/checkEmail.middleware');

authorRoutes.route('/api/login').post(checkEmail, login);
authorRoutes.route('/api/refresh-token').post(refreshToken);

module.exports = authorRoutes;
