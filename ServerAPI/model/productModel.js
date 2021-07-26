/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

module.exports = {
    create: function (con, querySQL, callback) {
        con.query(`INSERT INTO product SET ` + querySQL, callback);
    },
    update: function (con, id, querySQL, callback) {
        const query = `UPDATE product SET ${querySQL} WHERE id = ${id}`;
        console.log('query', query); // MongLV log fix bug
        con.query(query, callback);
    },
    getList: function (con, querySQL, callback) {
        const query = querySQL.length > 0 ? `SELECT * FROM product WHERE ` + querySQL : `SELECT * FROM product`;
        con.query(query, callback);
    },
    getByName: function (con, name, callback) {
        con.query(`SELECT * FROM product WHERE name = '${name}'`, callback);
    },
};
