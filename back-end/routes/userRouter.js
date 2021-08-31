/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mong_Le_Van on 25/09/2020
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
const UserRouter = express.Router();

// container
const { CREATE, LOGIN, GET_LIST, UPDATE } = require('../controller/user.controller');

UserRouter.route('/api/user').post(CREATE).get(GET_LIST).put(UPDATE);
UserRouter.route('/api/user/login').post(LOGIN);

module.exports = UserRouter;
