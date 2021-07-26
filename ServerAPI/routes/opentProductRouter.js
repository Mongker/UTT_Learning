/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 13/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
const express = require('express');
const OpenProductRouter = express.Router();

// container
const { OPEN_PRODUCT } = require('../controller/open.product.controller');

OpenProductRouter.route('/api/open').get(OPEN_PRODUCT);

module.exports = OpenProductRouter;
