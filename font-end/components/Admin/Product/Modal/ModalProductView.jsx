/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 04/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import React from 'react';
import { Button, Drawer, Form, Input, Checkbox, InputNumber, message, Select } from 'antd';
import PropTypes from 'prop-types';
import useUserBase from '../../../hooks/LogicData/useUserBase';
import useProductBase from '../../../hooks/LogicData/useProductBase';
import { useSelector } from 'react-redux';
import { typeStore, url_base_img } from 'util/TypeUI';
import UploadFileView from '../../Category/UploadFileView';
import styles from '../Modal/styles/index.module.scss';
import EditerBase from '../../../base/EditerBase';
import { Player } from 'video-react';

// const
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
};

let dataSale = [];
for (let i = 0; i <= 100; i++) {
    dataSale.push(i);
}
const ModalProductView = React.forwardRef(({ idCategory }, ref) => {
    console.log('123', 123); // MongLV log fix bug
    // hooks
    const [form] = Form.useForm();
    const { myUser } = useUserBase();
    const { postProduct, updateProduct } = useProductBase();
    const category = useSelector((state) => state[typeStore.CATEGORY]);

    // state
    const [typeModal, setTypeModal] = React.useState('ADD'); // Note: type này để xác "EDIT" sửa hay "ADD"
    const [visible, setVisible] = React.useState(false);
    const [imgFile, setImgFile] = React.useState('');
    const [videoFile, setVideoFile] = React.useState('');
    const [IdCategory, setIdCategory] = React.useState(null);
    const [dataEdit, setDataEdit] = React.useState({}); // Note: dành cho trạng thái typeModal === "EDIT"
    const [content, setContent] = React.useState();

    // ref
    const refImgFile = React.useRef(null);
    const refVideoFile = React.useRef(null);
    const refEditor = React.useRef(null);

    // const
    const arr = IdCategory ? category.filter((item) => item.id === IdCategory) : [];
    const nameCategory = arr.length > 0 && arr[0].name;

    // handle func
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
        onReset();
    };

    const onReset = () => {
        form.resetFields();
        setImgFile('');
        setVideoFile('');
        setTypeModal('ADD');
        setIdCategory(null);

        refVideoFile.current && refVideoFile.current.setLinkFile('');
        refVideoFile.current && refVideoFile.current.setFileList([]);

        refImgFile.current && refImgFile.current.setLinkFile('');
        refImgFile.current && refImgFile.current.setFileList([]);
        setContent(null);
    };

    const onFill = () => {
        form.setFieldsValue({});
    };

    const onFinish = (values) => {
        debugger; // MongLV
        if (imgFile && videoFile) {
            values['image_link'] = imgFile;
            values['trailer_link'] = videoFile;
            values['catalog_id'] = IdCategory;
            myUser &&
                myUser.role === 'teacher' &&
                myUser.categoryFollow &&
                (values['catalog_id'] = myUser.categoryFollow);
            values['content_full'] = content;

            delete values['name_category'];
            if (typeModal === 'ADD') {
                values['author_id'] = myUser.id;
                postProduct(values);
            } else {
                values['id'] = dataEdit.id;
                updateProduct(values);
            }
            onReset();
            onClose();
        } else message.warn('Thiếu file đính kèm');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSelect = (optionA, optionB) => {
        return optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase());
    };

    React.useImperativeHandle(ref, () => ({
        visible,
        showDrawer,
        onClose,
        setTypeModal,
        form,
        refImgFile,
        refVideoFile,
        setIdCategory,
        setDataEdit,
        setContent,
    }));
    React.useEffect(() => {
        idCategory && !IdCategory && setIdCategory(idCategory);
    }, [idCategory]);
    React.useEffect(() => {
        form.setFieldsValue({ name_category: nameCategory });
    }, [IdCategory]);
    React.useEffect(() => {
        dataEdit['content_full'] && setContent(dataEdit['content_full']);
    }, [visible]);

    return (
        <React.Fragment>
            <Drawer
                style={{
                    position: 'absolute',
                }}
                title={typeModal === 'ADD' ? 'Thêm khóa học' : 'Sửa khóa học'}
                placement='right'
                onClose={onClose}
                visible={visible}
                width={'40%'}
            >
                <Form
                    {...layout}
                    form={form}
                    name='basic'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label='Tên khóa học'
                        name='name'
                        rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Nội dung khóa học'
                        name='content'
                        rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label='Giới thiệu chi tiết'>
                        <EditerBase content={content} setContent={setContent} refFunc={refEditor} />
                    </Form.Item>
                    <Form.Item
                        label='Giá khóa học'
                        name='price'
                        rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                    >
                        <InputNumber
                            style={{ width: 200 }}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item label='Sale khóa học' name='sale'>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder='Chọn % giảm giá'
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={handleSelect}
                        >
                            {dataSale.map((item) => (
                                <Select.Option value={item}>{`${item} %`}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Ảnh nền' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
                        <UploadFileView
                            refFunc={refImgFile}
                            styles={styles}
                            Image={{ width: 260, height: 130 }}
                            callback={setImgFile}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Video Trailer'
                        rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                        callback={setImgFile}
                    >
                        <UploadFileView
                            type={'mp4'}
                            refFunc={refVideoFile}
                            styles={styles}
                            Image={{ width: 260, height: 130 }}
                            imgDefault={`${url_base_img}video.png`}
                            callback={setVideoFile}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Danh mục'
                        name='name_category'
                        rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type='primary' htmlType='submit'>
                            {typeModal === 'ADD' ? 'Thêm' : 'Lưu cập nhật'}
                        </Button>
                    </Form.Item>
                    {videoFile && (
                        <div className={'flex_row'} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <video style={{ width: 260, height: 130, marginLeft: 20 }} controls>
                                <source src={`${url_base_img}${videoFile}`} type='video/mp4' />
                            </video>
                        </div>
                    )}
                </Form>
            </Drawer>
        </React.Fragment>
    );
});

ModalProductView.propTypes = {
    idCategory: PropTypes.string,
};

ModalProductView.defaultProps = {
    idCategory: '',
};

export default React.memo(ModalProductView);
