/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

export default function createActionNoAppID(
    type,
    payload = {},
    original = {},
    condition = {},
) {
    return { type, payload, original, condition, timestamp: Date.now() };
}
