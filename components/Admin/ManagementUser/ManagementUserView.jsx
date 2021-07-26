/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Avatar, Button, Drawer, Form, Input, Modal, Select, Tabs } from 'antd';
import { useDispatch } from 'react-redux';

// action
import { getList } from 'redux/actions/userAction';

// component
import TableView from './Table/TableView';
import { UserOutlined } from '@ant-design/icons';

// util
import ContextApp from 'util/ContextApp';
import EditorBase from '../../base/EditerBase';
import useCategoryBase from '../../hooks/LogicData/useCategoryBase';
import useCartBase from '../../hooks/LogicData/useCartBase';
import useUserBase from '../../hooks/LogicData/useUserBase';

// const
const { TabPane } = Tabs;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const tailLayout = {
    wrapperCol: { offset: 10, span: 16 },
};
const TypeTabs = {
    USER: 'user',
    TEACHER: 'teacher',
    ADMIN: 'admin',
    ALL: 'ALL',
};

const arrRole = [
    { id: 'user', name: 'Người dùng bình thường' },
    {
        id: 'teacher',
        name: 'Giảng viên',
    },
];

function ManagementUserView() {
    // hooks
    const { user } = React.useContext(ContextApp);
    const { category } = useCategoryBase();
    const { updateUser } = useUserBase();
    const [form] = Form.useForm();

    // state
    const [keyActive, setKeyActive] = React.useState(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [idEdit, setIdEdit] = React.useState(null);
    const [content, setContent] = React.useState(null);

    // ref
    // const typeRef = React.useRef('user');

    // handle func
    const callback = (key) => {
        setKeyActive(key);
    };

    const onFinish = (values) => {
        let info = {};
        try {
            info = {
                introduce: content,
                categoryFollow: values['categoryFollow'],
            };
        } catch (e) {}
        const dataPut = {
            info: JSON.stringify(info),
            role: values['role'],
            id: idEdit,
        };
        idEdit && updateUser(dataPut, reset);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        reset();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        reset();
    };
    const reset = () => {
        form.resetFields();
        setIdEdit(null);
        setContent(null);
        setIsModalVisible(false);
    };

    const handleEdit = (value) => {
        form.setFieldsValue(value);
        setIdEdit(value.id);
        value.introduce && setContent(value.introduce);
        showModal();
    };

    React.useEffect(() => {
        setKeyActive(
            localStorage.getItem('ManagementUserView') ? localStorage.getItem('ManagementUserView') : TypeTabs.ALL,
        );
    }, []);

    // JSX
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
            render: (text, data) => (
                <a>
                    {text} {user.id === data.id ? '(Chính bạn)' : ''}
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
    return (
        <React.Fragment>
            <Tabs onChange={callback} type='card' activeKey={keyActive}>
                <TabPane tab={'Tất cả thành viên'} key={TypeTabs.ALL}>
                    <TableView columnsTable={columnsTableUser} type={keyActive} handleEdit={handleEdit} />
                </TabPane>
                <TabPane tab={'Người dùng'} key={TypeTabs.USER}>
                    <TableView columnsTable={columnsTableUser} type={keyActive} handleEdit={handleEdit} />
                </TabPane>
                <TabPane tab={'Giảng viên'} key={TypeTabs.TEACHER}>
                    <TableView columnsTable={columnsTableUser} type={keyActive} handleEdit={handleEdit} />
                </TabPane>
                <TabPane tab={'Quản trị viên'} key={TypeTabs.ADMIN}>
                    <TableView columnsTable={columnsTableUser} type={keyActive} handleEdit={handleEdit} />
                </TabPane>
            </Tabs>
            <Modal
                title={'Chỉnh sửa người của quản trị viên'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={'60%'}
            >
                <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
                    <Form.Item name={['introduce']} label='Giới thiệu'>
                        <EditorBase content={content} setContent={setContent} />
                    </Form.Item>
                    <Form.Item name={['role']} label='Nâng cấp quyền'>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder='Chọn khóa học cho giảng viên'
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {arrRole.map((item) => (
                                <Select.Option value={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={['categoryFollow']} label='Giảng viên môn'>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder='Chọn khóa học cho giảng viên'
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {category.map((item) => (
                                <Select.Option value={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type='primary' htmlType='submit'>
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    );
}

ManagementUserView.propTypes = {};

ManagementUserView.defaultProps = {};

export default ManagementUserView;
