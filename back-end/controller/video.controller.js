/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 05/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const VideoModel = require('../model/videoModel');

module.exports = {
    CREATE: function (req, res) {
        let querySQL = '';

        Object.entries(req.body).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0
                ? (querySQL = `${key} = ${value}`)
                : (querySQL = querySQL + ', ' + `${key} = ${value}`);
        });

        const querySQLGet = querySQL.replace(/,/g, ' and ');
        if (querySQL.length > 0 && req.body && req.body['study_program_id']) {
            VideoModel.create(req.con, querySQL, function (err) {
                if (err) return res.status(404).json({ message: err });
                VideoModel.getList(req.con, querySQLGet, function (err, row) {
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
        VideoModel.getList(req.con, querySQL, function (err, row) {
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
            VideoModel.update(req.con, id, querySQL, function (err) {
                if (err) return res.status(200).json({ message: err });
                else return res.status(200).json({ message: 'OK' });
            });
        } else
            return res.status(200).json({ message: 'Không có dữ liệu nào được gửi lên' });
    },
    DELETE: function (req, res) {
        VideoModel.delete(req.con, req.params.id, function (err, row) {
            if (err) return res.status(404).json({ message: err });
            return res.status(200).json({ message: 'OK' });
        });
    },
};
