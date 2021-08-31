/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 02/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
const name = localStorage.getItem('name') ? localStorage.getItem('name') : null;
const columnsTableUser = [
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        width: 50,
        render: (text) => <Avatar icon={<UserOutlined />} src={text} />,
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: (text) => (
            <a>
                {text} {}
            </a>
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
    },
    {
        title: 'Cấp bậc',
        dataIndex: 'rank',
        key: 'rank',
        width: 150,
    },
    {
        title: 'Quyền hạn',
        dataIndex: 'role',
        key: 'role',
        width: 150,
    },
    {
        title: 'Giảng viên môn',
        dataIndex: 'teacher_category',
        key: 'teacher_category',
        width: 200,
    },
];
export { columnsTableUser };
