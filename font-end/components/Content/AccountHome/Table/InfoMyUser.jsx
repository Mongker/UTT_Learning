/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 12/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import style from '../style.module.scss';
import { KeyOutlined, MailOutlined, PhoneOutlined, SaveOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Radio } from 'antd';
import useUserBase from '../../../hooks/LogicData/useUserBase';
import { useRouter } from 'next/router';
import UploadFileView from '../../../base/UploadLoadFile';
import { url_base_img } from 'util/TypeUI';
// import PropTypes from 'prop-types';

// const
const layout = {
    wrapperCol: { span: 24 },
};
const { TextArea } = Input;

function InfoMyUser() {
    // hooks
    const { myUser, updateUser } = useUserBase();
    const [form] = Form.useForm();
    const router = useRouter();

    // state
    const [linkFile, setLinkFile] = React.useState('');
    const [fileList, setFileList] = React.useState([]);

    // handle func
    const onFinish = (values) => {
        values['id'] = myUser.id;
        linkFile && (values['avatar'] = linkFile);
        updateUser(values);
    };

    // Vòng đời
    React.useEffect(() => {
        if (myUser) {
            form.setFieldsValue(myUser);
            if (myUser.avatar) {
                setLinkFile(myUser.avatar);
                setFileList([
                    {
                        uid: myUser.avatar,
                        name: myUser.avatar,
                        status: 'done',
                        url: url_base_img + myUser.avatar,
                    },
                ]);
            }
        }
    }, [myUser]);

    console.log('myUser', myUser); // MongLV log fix bug
    return (
        <div className={style.content_main_user}>
            <div className={style.container}>
                <div className={style.right}>
                    <div className={style.panel_default}>
                        <div className={style.panel_heading}>
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    color: ' #333333',
                                }}
                            >
                                <UserOutlined
                                    style={{
                                        color: ' #333333',
                                        marginRight: 10,
                                    }}
                                />
                                Thông tin cá nhân
                            </span>
                            <div className={style.pull_right}>
                                <Button
                                    className={style.margin_left}
                                    icon={<SyncOutlined />}
                                    onClick={() => router.push('/newpassword')}
                                >
                                    Thay đổi mật khẩu
                                </Button>
                                {/*<Button className={style.margin_right} icon={<KeyOutlined />}>*/}
                                {/*    Khóa tài khoản*/}
                                {/*</Button>*/}
                            </div>
                        </div>
                        <div className={style.panel_body}>
                            <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
                                <div
                                    style={{
                                        display: 'flex',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '50%',
                                            paddingRight: 20,
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginBottom: 50,
                                                width: '100%',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    marginBottom: 20,
                                                }}
                                            >
                                                Ảnh đại diện:
                                            </div>
                                            <Form.Item>
                                                <UploadFileView
                                                    setFileListUtil={setFileList}
                                                    setLinkFileUtil={setLinkFile}
                                                    fileListUtil={fileList}
                                                    linkFileUtil={linkFile}
                                                    imgDefault={url_base_img + '765-default-avatar.png'}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    marginBottom: 3,
                                                }}
                                            >
                                                Địa chỉ :
                                            </div>
                                            <Form.Item
                                                name='address'
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <TextArea rows={4} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: '50%',
                                            paddingRight: 20,
                                        }}
                                    >
                                        <div>
                                            <div>Họ và tên :</div>
                                            <Form.Item
                                                name='name'
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <div>
                                                <MailOutlined
                                                    style={{
                                                        color: 'red',
                                                        marginRight: 5,
                                                    }}
                                                />{' '}
                                                Email :
                                            </div>
                                            <Form.Item
                                                name='email'
                                                rules={[
                                                    {
                                                        type: 'email',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <div>
                                                <PhoneOutlined
                                                    style={{
                                                        color: '#5bb369',
                                                        marginRight: 5,
                                                    }}
                                                />{' '}
                                                Số điện thoại :
                                            </div>
                                            <Form.Item
                                                name='phone'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your phone number!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '50%',
                                                }}
                                            >
                                                <div>Giới tính :</div>
                                                <Form.Item
                                                    name='gender'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your phone number!',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group>
                                                        <Radio value={1}>Nam</Radio>
                                                        <Radio value={2}>Nữ</Radio>
                                                        <Radio value={3}>Khác</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                width: '50%',
                                            }}
                                        >
                                            <Form.Item>
                                                <Button
                                                    type='primary'
                                                    htmlType='submit'
                                                    icon={<SaveOutlined />}
                                                    style={{
                                                        backgroundColor: '#449d44',
                                                        border: '#449d44',
                                                        borderRadius: 15,
                                                    }}
                                                >
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

InfoMyUser.propTypes = {};

InfoMyUser.defaultProps = {};

export default InfoMyUser;
