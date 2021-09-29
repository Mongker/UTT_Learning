/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
// const moment = require('moment'); // require
// const mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss').toString();
// var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds
// var currentTimeInMilliseconds=Date.now(); // unix timestamp in milliseconds
module.exports = {
    getList: (con, querySQL, callback) => {
        const query = querySQL.length > 0 ? `SELECT * FROM user WHERE ` + querySQL : `SELECT * FROM user`;
        con.query(query, callback);
    },

    checkEmail: (con, data, callback) => {
        const query = `SELECT * FROM user WHERE email =` + con.escape(data.email);
        con.query(query, callback);
    },
    checkPhone: (con, data, callback) => {
        con.query(`SELECT * FROM user WHERE phone = '${data.phone}'`, callback);
    },
    checkUidGoogle: (con, data, callback) => {
        con.query(`SELECT * FROM user WHERE uid_google = '${data.uid}'`, callback);
    },

    create: (con, data, callback) => {
        const query = `INSERT INTO user SET name = '${data.name}', 
                phone = '${data.phone}', 
                email = '${data.email}', 
                password = '${data.password}', 
                address = '',
                info = '{}', 
                role = 'user', 
                coin = '0',
                status_user = '1',
                position='Người dùng',
                list_product_open = '[]',
                type= '${data.type}',
                uid_google= '${data.uid.toString()}',
                avatar= '${data.avatar.toString()}',
                timestamp_create= '${data.timestamp}'
                `;
        console.log('query', query); // MongLV log fix bug
        con.query(query, callback);
    },
    update: (con, id, querySQL, callback) => {
        const query = `UPDATE user SET ${querySQL} WHERE id = ${id}`;
        con.query(query, callback);
    },
};
