/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 13/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const UserModel = require('../model/userModel');
const CartModel = require('../model/cartModel');
const ProductModel = require('../model/productModel');

module.exports = {
    OPEN_PRODUCT: function (req, res) {
        let querySQL = '';
        const code = req.query.code;
        CartModel.getList(req.con, `code = '${code}'`, function (err, row) {
            if (err) return res.status(404).json({ message: err });

            if (row.length === 1 && row[0].status === 1) {
                ProductModel.getList(req.con, `id = ${row[0].product_id}`, function (err, row1) {
                    if (err) return res.status(404).json({ message: err });
                    if (row.length === 1 && row1[0]) {
                        const dataUpdate = row1[0];
                        const mer_list_number = JSON.parse(row1[0].list_number);
                        mer_list_number.push(row[0].user_id);
                        console.log('mer_list_number', mer_list_number); // MongLV log fix bug
                        const list_number = JSON.stringify(mer_list_number);

                        ProductModel.update(
                            req.con,
                            dataUpdate.id,
                            `list_number = '${list_number}' , number_user = ${mer_list_number.length}`,
                            function (err) {
                                if (err) return res.status(200).json({ message: err });
                                else {
                                    CartModel.update(req.con, row[0].id, `status = ${2}`, function (err) {
                                        if (err) return res.status(200).json({ message: err });
                                        else {
                                            UserModel.getList(req.con, `id = ${row[0].user_id}`, function (err, uses) {
                                                console.log('uses', uses); // MongLV log fix bug
                                                if (uses.length === 1 && uses[0]) {
                                                    const list_product_open = JSON.parse(uses[0].list_product_open);
                                                    list_product_open.push(row1[0].id);
                                                    UserModel.update(
                                                        req.con,
                                                        row[0].user_id,
                                                        `list_product_open = '${JSON.stringify(list_product_open)}'`,
                                                        function (err, data) {
                                                            if (err) return res.status(200).json({ message: err });
                                                            else
                                                                return res
                                                                    .status(200)
                                                                    .json({
                                                                        message: 'OK',
                                                                        data: {
                                                                            ...uses[0],
                                                                            list_product_open: JSON.stringify(
                                                                                list_product_open,
                                                                            ),
                                                                        },
                                                                    });
                                                        },
                                                    );
                                                }
                                            });
                                        }
                                    });
                                }
                            },
                        );
                    }
                });
            } else {
                return res.status(200).json({ message: 'Mã này không đúng rồi' });
            }
        });
    },
};
