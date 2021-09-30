/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 27/07/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
const CategoryModel = require('../../model/categoryModel');
const convertArrayToItems = require('../../util/convertArrayToItems');

const GET_LIST = async (req, res) => {
    try {
        await CategoryModel.getList(req.con, function (err, arrayItem) {
            if (err) return res.status(404).json({ message: err });
            const items = convertArrayToItems(arrayItem);
            return res.status(200).json({
                message: 200,
                data: {
                    HasCategory: {
                        root: {
                            itemIds: Object.keys(items),
                        },
                    },
                    Category: items,
                },
            });
        });
    } catch (e) {
        console.log('e', e);
    }
};
const CREATE = async (req, res) => {
    // Lấy ra phần tử vừa được tạo
    if (req.category && req.break) {
        try {
            const id = req.category[0] && req.category[0].id;
            return res.status(200).json({
                message: 200,
                data: {
                    HasCategory: {
                        root: {
                            itemIds: [`${id}`],
                        },
                    },
                    Category: {
                        [id]: { ...req.category[0], id: `${id}` },
                    },
                },
            });
        } catch (e) {
            console.log('e', e);
        }
    } else {
        return res.status(200).json({ message: req.statusCode });
    }
};

const UPDATE = async (req, res) => {
    if (req.break) {
        return res.status(200).json({ message: 200 });
    } else {
        return res.status(200).json({ message: 404 });
    }
};
const DELETE = async (req, res) => {
    if (req.dataJwtDecoded.role === 'admin') {
        await CategoryModel.delete(req.con, req.params.id, function (err, row) {
            if (err) return res.status(404).json({ message: err });
            return res.status(200).json({ message: 200 });
        });
    } else {
        return res.status(200).json({ message: 404 });
    }
};
module.exports = {
    GET_LIST,
    CREATE,
    UPDATE,
    DELETE,
};
