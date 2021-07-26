/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 02/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import axiosClient from './axiosClient';
import queryString from 'query-string';

const baseAPI = {
    getAll(url, data) {
        const paramsString = queryString.stringify(data);
        return axiosClient.get(`${url}?${paramsString}`);
    },

    add(url, data) {
        return axiosClient.post(url, data);
    },
    update(url, data) {
        return axiosClient.put(url, data);
    },
    delete(_url, id) {
        const url = `${_url}/${id}`;
        return axiosClient.delete(url);
    },
};
export default baseAPI;
