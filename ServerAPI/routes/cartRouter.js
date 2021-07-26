/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 11/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
const CartRouter = express.Router();

// container
const { CREATE, UPDATE, GET_LIST, DELETE } = require('../controller/cart.controller');

CartRouter.route('/api/cart').post(CREATE).get(GET_LIST).put(UPDATE);
CartRouter.route('/api/cart/:id').delete(DELETE);

module.exports = CartRouter;
