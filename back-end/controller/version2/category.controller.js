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
                category: {
                    itemIds: Object.keys(items),
                    items,
                },
            });
        });
    } catch (e) {
        console.log('e', e);
    }
};

module.exports = { GET_LIST };
