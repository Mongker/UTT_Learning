/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const jwtHelper = require('../../helpers/jwt.helper');
// const debug = console.log.bind(console);

// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
let tokenList = {};

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1h';
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '3650d';
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

/**
 * controller login
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
    try {
        delete req.user.password;

        let userData = { ...req.user };
        delete userData.introduce;

        // console.log(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]`);
        let accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);

        // console.log(`Thực hiện tạo mã Refresh Token, [thời gian sống 10 năm] =))`);
        let refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);

        // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
        // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
        tokenList[refreshToken] = { accessToken, refreshToken };

        // console.log(`Gửi Token và Refresh Token về cho client...`);
        let list_product_open = [];
        try {
            req.user && req.user.list_product_open && (list_product_open = JSON.parse(req.user.list_product_open));
        } catch (e) {
            console.log(e);
        }
        const user = { ...req.user, list_product_open };
        return await res.status(200).json({
            message: 200,
            auth: {
                accessToken,
                refreshToken,
                meId: req.user.id,
            },
            data: {
                HasUser: {
                    root: {
                        itemIds: [`${req.user.id}`],
                        meId: `${req.user.id}`,
                    },
                },
                User: {
                    [req.user.id]: user,
                },
            },
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};
module.exports = login;
