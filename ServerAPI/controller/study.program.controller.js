/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 05/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const StudyProgramModel = require('../model/studiProgramModel');

module.exports = {
    CREATE: function (req, res) {
        let querySQL = '';
        let querySQLGet = '';
        Object.entries(req.body).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0
                ? (querySQL = `${key} = ${value}`)
                : (querySQL = querySQL + ', ' + `${key} = ${value}`);
        });
        delete req.body.content;
        Object.entries(req.body).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0
                ? (querySQLGet = `${key} = ${value}`)
                : (querySQLGet = querySQLGet + ' and ' + `${key} = ${value}`);
        });
        if (querySQL.length > 0 && req.body && req.body['product_id']) {
            StudyProgramModel.create(req.con, querySQL, function (err) {
                if (err) return res.status(404).json({ message: err });
                StudyProgramModel.getList(req.con, querySQLGet, function (err, row) {
                    return res.status(200).json({ message: 'OK', data: row[0] });
                });
            });
        } else {
            return res.status(200).json({ message: 'Các trường thông tin không đầy đủ' });
        }
    },
    GET_LIST: function (req, res) {
        let querySQL = '';
        Object.entries(req.query).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0
                ? (querySQL = `${key} = ${value}`)
                : (querySQL = querySQL + ' and ' + `${key} = ${value}`);
        });
        StudyProgramModel.getList(req.con, querySQL, function (err, row) {
            if (err) return res.status(404).json({ message: err });
            return res.status(200).json({ message: 'OK', data: row });
        });
    },
    UPDATE: function (req, res) {
        let querySQL = '';
        const id = req.body && req.body.id;
        delete req.body.id;
        Object.entries(req.body).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0
                ? (querySQL = `${key} = ${value}`)
                : (querySQL = querySQL + ', ' + `${key} = ${value}`);
        });
        if (querySQL.length > 0) {
            StudyProgramModel.update(req.con, id, querySQL, function (err) {
                if (err) return res.status(200).json({ message: err });
                else return res.status(200).json({ message: 'OK' });
            });
        } else
            return res.status(200).json({ message: 'Không có dữ liệu nào được gửi lên' });
    },
};
