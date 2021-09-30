/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 03/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const jwt = require('jsonwebtoken');

/**
 * private function generateToken
 * @param user
 * @param secretSignature
 * @param tokenLife
 */
const generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
        const userData = {
            _id: user._id || user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        // Thực hiện ký và tạo token
        jwt.sign(
            { data: userData },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            },
        );
    });
};

/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */
const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
};

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
};
