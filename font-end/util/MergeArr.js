/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 10/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

function MergeArr(arr1, arr2) {
    let objArr1 = {};
    let objArr2 = {};
    arr1.map((item) => (objArr1[item.id] = item));
    arr2.map((item) => (objArr2[item.id] = item));
    const obj = { ...objArr1, ...objArr2 };
    return [...Object.values(obj)];
}

export default MergeArr;
