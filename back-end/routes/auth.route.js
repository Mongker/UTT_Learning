/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 03/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
const express = require('express');
const authorRoutes = express.Router();

// container
const { REFRESH_TOKEN, LOGIN } = require('../controller/auth.controller');

// middleware
const { checkEmail } = require('../middleware/auth.middleware');

authorRoutes.route('/api/login').post(checkEmail, LOGIN);
authorRoutes.route('/api/refresh-token').post(REFRESH_TOKEN);

module.exports = authorRoutes;
