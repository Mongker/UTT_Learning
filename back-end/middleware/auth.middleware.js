/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 02/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const jwtHelper = require('../helpers/jwt.helper');
const UserModel = require('../model/user.model');
// const debug = console.log.bind(console);

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let isAuth = async (req, res, next) => {
    // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
    const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token'];

    if (tokenFromClient) {
        // Nếu tồn tại token
        try {
            // Thực hiện giải mã token xem có hợp lệ hay không?
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);

            // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
            req.jwtDecoded = decoded;

            // Cho phép req đi tiếp sang controller.
            next();
        } catch (error) {
            // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
            // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
            // debug('Error while verify token:', error);
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};

/**
 * checkEmail: Kiểm tra xem thông tin đăng nhập
 * - Kiểm tra xem tài khoản có bị khóa không
 * - Kiểm tra xem mật khẩu có chính xác không
 * - Kiểm tra xem email đã có trong dữ liệu chưa
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const checkEmail = async (req, res, next) => {
	await UserModel.checkEmail(req.con, req.body, (err, rows) => {
		if (err) return res.status(404).json({ message: err });
		if (rows.length > 0) {
			const dataUser = rows[0];
			if (dataUser.status_user === 0) return res.status(200).json({ message: 'Tài khoản đã bị khóa' });
			if (dataUser.password === req.body.password) {
				let info = {};
				try {
					info = JSON.parse(dataUser.info);
				} catch (e) {}
				delete dataUser.info;
				req.user = { ...dataUser, ...info };
				next();
			} else {
				return res.status(200).json({ message: 'Mật khẩu sai' });
			}
		} else return res.status(200).json({ message: 'Không tìm thấy Email' });
	});
}
module.exports = {
    isAuth: isAuth,
	checkEmail: checkEmail,
};
