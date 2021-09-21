/**
 * Copyright 2020 present, Lê Văn Mong
 * All rights reserved.
 * @author Mongker on 27/07/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

function convertArrayToItems(array = []) {
    let items = {};
    try {
        array.map((item) => {
            if (item.id) {
                item.id = item.id.toString(); // Chuyển id sang dạng string để dễ đồng bộ với client
                items[item.id] = item;
            }
        });
    } catch (e) {}
    return items;
}
module.exports = convertArrayToItems;
