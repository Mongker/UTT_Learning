/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 27/07/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
const CategoryRouter = express.Router();

// middleware
const isAuth = require('../../middleware/isAuth.middleware');
const checkName = require('../../middleware/category/checkName.middleware');
const create = require('../../middleware/category/create.middleware');
const update = require('../../middleware/category/update.middleware');

// container
const { GET_LIST, CREATE, UPDATE, DELETE } = require('../../controller/version2/category.controller');

const path = '/api/category-v2';

CategoryRouter.route(path).get(GET_LIST).post(isAuth, checkName, create, checkName, CREATE).put(isAuth, update, UPDATE);
CategoryRouter.route(`${path}/:id`).delete(isAuth, DELETE);

module.exports = CategoryRouter;
