/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

module.exports = {
    create: function (con, data, callback) {
        con.query(
            `INSERT INTO category SET rootId = '${data.rootId}',
                icon = '${data.icon}',
                status = '${data.status}',
                name = '${data.name}', 
                description = '${data.description}', 
                sort_order = '${data.sort_order}'
                `,
            callback,
        );
    },
    update: function (con, data, callback) {
        con.query(`UPDATE category SET rootId = '${data.rootId}', icon = '${data.icon}', status = '${data.status}', name = '${data.name}', description = '${data.description}', sort_order = '${data.sort_order}' WHERE id = '${data.id}'`, callback);
    },
    getList: function (con, callback) {
        con.query('SELECT * FROM category', callback);
    },
    getByName: function (con, name, callback) {
        con.query(`SELECT * FROM category WHERE name = '${name}'`, callback);
    },
    delete: function (con, id, callback) {
        con.query(`DELETE FROM category WHERE id = ${id}`, callback);
    },
};
