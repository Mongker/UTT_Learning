/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
const CategoryRouter = express.Router();

// container
const { CREATE, UPDATE, GET_LIST, DELETE } = require('../controller/category.controller');

CategoryRouter.route('/api/category').post(CREATE).put(UPDATE).get(GET_LIST);
CategoryRouter.route('/api/category/:id').delete(DELETE);

module.exports = CategoryRouter;
