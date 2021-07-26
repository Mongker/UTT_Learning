/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 05/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
const StudyProgramRouter = express.Router();

// container
const { CREATE, UPDATE, GET_LIST } = require('../controller/study.program.controller');

StudyProgramRouter.route('/api/studyprogram').post(CREATE).get(GET_LIST).put(UPDATE);

module.exports = StudyProgramRouter;
