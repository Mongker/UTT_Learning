/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 05/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
const VideoRouter = express.Router();

// container
const { CREATE, UPDATE, GET_LIST, DELETE } = require('../controller/video.controller');

VideoRouter.route('/api/video').post(CREATE).get(GET_LIST).put(UPDATE);
VideoRouter.route('/api/video/:id').delete(DELETE);

module.exports = VideoRouter;
