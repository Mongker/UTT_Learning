/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 11/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

module.exports = {
    create: function (con, querySQL, callback) {
        con.query(`INSERT INTO cart SET ` + querySQL, callback);
    },

    update: function (con, id, querySQL, callback) {
        const query = `UPDATE cart SET ${querySQL} WHERE id = ${id}`;
        con.query(query, callback);
    },

    getList: function (con, querySQL, callback) {
        const query =
            querySQL.length > 0
                ? `SELECT * FROM cart WHERE ` + querySQL
                : `SELECT * FROM cart`;
        console.log('query', query); // MongLV log fix bug
        con.query(query, callback);
    },

    delete: function (con, id, callback) {
        con.query(`DELETE FROM cart WHERE id = ${id}`, callback);
    },
};
