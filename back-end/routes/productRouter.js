/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
const ProductRouter = express.Router();

// container
const { CREATE, UPDATE, GET_LIST } = require('../controller/product.controller');

ProductRouter.route('/api/product').post(CREATE).get(GET_LIST).put(UPDATE);

module.exports = ProductRouter;
