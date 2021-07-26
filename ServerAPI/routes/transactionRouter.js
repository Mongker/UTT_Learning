/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 11/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
const TransactionRouter = express.Router();

// container
const {
    CREATE,
    UPDATE,
    GET_LIST,
    DELETE,
} = require('../controller/transaction.controller');

TransactionRouter.route('/api/transaction').post(CREATE).get(GET_LIST).put(UPDATE);
TransactionRouter.route('/api/transaction/:id').delete(DELETE);

module.exports = TransactionRouter;
