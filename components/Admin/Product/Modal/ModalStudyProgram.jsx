/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 05/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import Link from 'next/link';
import { Button, Collapse, Drawer, Form, Input, message, Modal, Switch } from 'antd';
import PropTypes from 'prop-types';
import {
    DeleteOutlined,
    EditOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    VideoCameraAddOutlined,
    CloudDownloadOutlined,
} from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { Player } from 'video-react';
// import tinymce from 'tinymce';

import useStudyProgramBase from '../../../hooks/LogicData/useStudyProgramBase';

// styles
import styles from './styles/index.module.scss';
import { url_base_img } from '../../../../util/TypeUI';
import UploadFileView from '../../Category/UploadFileView';
import useVideoBase from '../../../hooks/LogicData/useVideoBase';
import EditerBase from '../../../base/EditerBase';

const { Panel } = Collapse;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
function ModalStudyProgram({ refCallBack }) {
    // hooks
    const [form] = Form.useForm();
    const { studyProgram, postStudyProgram, getListStudyProgram, putStudyProgram } = useStudyProgramBase();
    const { video, postStudyVideo, getListStudyVideo, putStudyVideo, deleteVideo } = useVideoBase();

    // ref
    const refVideo = React.useRef();

    // state
    const [visible, setVisible] = React.useState(false);
    const [visibleStudyProgram, setVisibleStudyProgram] = React.useState(false);
    const [visibleModalVideo, setVisibleModalVideo] = React.useState(false);
    const [checkedSwitch, setCheckedSwitch] = React.useState(false);
    const [TypeStudyProgram, setTypeStudyProgram] = React.useState(0); // MongLV: 0 -- add, 1 -> edit
    const [objEditVideo, setObjEditVideo] = React.useState(null); // MongLV: null -- add, tồn tại -> edit
    const [idEditStudyProgram, setIdEditStudyProgram] = React.useState(null);
    const [dataProduct, setDataProduct] = React.useState(null);
    const [content, setContent] = React.useState('');
    const [keyCollapse, setKeyCollapse] = React.useState(null);
    const [linkFile, setLinkFile] = React.useState('');
    const [linkFileZip, setLinkFileZip] = React.useState('');
    const [linkFileImg, setLinkFileImg] = React.useState('');
    const [fileList, setFileList] = React.useState([]);
    const [fileListImg, setFileListImg] = React.useState([]);
    const [fileListZip, setFileListZip] = React.useState([]);

    const [objVideoActive, setObjVideoActive] = React.useState(null);

    // Handle Func
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    const callback = (key) => {
        console.log('key', key);
        console.log('key[key.length - 1]', key[key.length - 1]);
        setKeyCollapse(key[key.length - 1]);
    };

    const onFinish = (values) => {
        values['product_id'] = dataProduct['id'];

        // Note case: thực hiện tác vụ liên quan đến study program
        if (visibleStudyProgram) {
            values['content'] = content;
            if (!TypeStudyProgram) {
                postStudyProgram(values);
            } else {
                values['id'] = idEditStudyProgram;
                putStudyProgram(values);
            }
            onReset();
        } else if (linkFile) {
            values['isPreview'] = checkedSwitch ? 1 : 0;

            // Note case: thực hiện tác vụ liên quan đến video
            values['link_video'] = linkFile;
            values['study_program_id'] = idEditStudyProgram;
            linkFileZip && (values['file_document'] = linkFileZip);
            linkFileImg && (values['img'] = linkFileImg);

            if (objEditVideo) {
                delete values['study_program_id'];
                putStudyVideo({ ...objEditVideo, ...values });
            } else {
                postStudyVideo(values);
            }
            onReset();
        } else {
            message.warn('Không được thiết file đính kèm');
        }
    };

    const onReset = () => {
        form.resetFields();
        setVisibleStudyProgram(false);
        setContent(null);
        setTypeStudyProgram(0);
        setIdEditStudyProgram(null);
        setFileListZip([]);
        setLinkFileZip('');
        setFileList([]);
        setLinkFile('');
        setVisibleModalVideo(false);
        setObjEditVideo(null);
        setCheckedSwitch(false);
    };

    const handleOk = () => {
        setVisibleStudyProgram(false);
    };
    const handleOkVideo = () => {
        setVisibleModalVideo(false);
    };

    const handleCancel = () => {
        setVisibleStudyProgram(false);
        onReset();
    };
    const handleCancelVideo = () => {
        setVisibleModalVideo(false);
        onReset();
    };

    const handleActiveVideo = (obj) => {
        setObjVideoActive(obj);
    };
    const handleCloseModalVideoWatch = () => {
        setObjVideoActive(null);
    };

    const handleEditVideo = (obj) => {
        debugger; // MongLV
        const data = {
            uid: '-1',
            name: obj.link_video,
            status: 'done',
            url: url_base_img + obj.link_video,
        };
        obj['isPreview'] ? setCheckedSwitch(true) : setCheckedSwitch(false);
        setObjEditVideo(obj);
        form.setFieldsValue({ ...obj });

        obj['link_video'] && setLinkFile(obj['link_video']);
        obj['file_document'] && setLinkFileZip(obj['file_document']);
        obj['img'] && setLinkFileImg(obj['img']);

        obj.link_video &&
            setFileList([
                {
                    uid: '-1',
                    name: obj.link_video,
                    status: 'done',
                    url: url_base_img + obj.link_video,
                },
            ]);

        obj.file_document &&
            setFileListZip([
                {
                    uid: '-1',
                    name: obj.file_document,
                    status: 'done',
                    url: url_base_img + obj['file_document'],
                },
            ]);

        obj.img &&
            setFileListImg([
                {
                    uid: '-1',
                    name: obj.img,
                    status: 'done',
                    url: url_base_img + obj.img,
                },
            ]);

        setVisibleModalVideo(true);
    };
    const handleDeleteVideo = (id) => {
        deleteVideo(id);
    };

    // const
    const studyProgramFilterStatus = dataProduct
        ? studyProgram.filter((item) => item.status && item.product_id === dataProduct.id)
        : [];

    // Vòng đời
    React.useEffect(() => {
        refCallBack.current = {
            showDrawer,
            setDataProduct,
        };
    });
    React.useEffect(() => {
        getListStudyProgram();
        dataProduct && dataProduct.id && getListStudyVideo({ product_id: dataProduct.id });
    }, [dataProduct]);

    // JSX
    const GenExtra = ({ itemStudyProgram }) => (
        <div className={'flex_row'} style={{ justifyContent: 'space-between', alignItems: 'center', width: 50 }}>
            <EditOutlined
                style={{ color: '#0343c6', cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setTypeStudyProgram(1);
                    form.setFieldsValue({ ...itemStudyProgram });
                    setVisibleStudyProgram(true);
                    setIdEditStudyProgram(itemStudyProgram.id);
                    setContent(itemStudyProgram.content);
                }}
            />
            <DeleteOutlined
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    itemStudyProgram.status = itemStudyProgram.status === 1 ? 0 : 1;
                    putStudyProgram(itemStudyProgram);
                }}
            />
            <VideoCameraAddOutlined
                style={{ color: 'green', cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setVisibleModalVideo(true);
                    setIdEditStudyProgram(itemStudyProgram.id);
                }}
            />
        </div>
    );
    const title = (
        <div className={'flex_row'} style={{ alignItems: 'center', justifyContent: 'space-around' }}>
            <div className={styles.title}>
                {dataProduct && dataProduct.name
                    ? 'Quản lý chương trình học: ' + dataProduct.name
                    : 'Quản lý chương trình học:'}
            </div>
            <Button onClick={() => setVisibleStudyProgram(true)} type='primary'>
                Thêm chương trình học
            </Button>
            <div />
        </div>
    );
    const titleStudyProgram = (
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>
            {' '}
            {TypeStudyProgram ? 'Chỉnh sửa chương trình' : 'Thêm chương trình học'}
        </h1>
    );
    const titleVideo = (
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>
            {' '}
            {TypeStudyProgram ? 'Chỉnh sửa video' : 'Thêm video'}
        </h1>
    );

    const componentStudyProgram = (
        <React.Fragment>
            <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
                <Form.Item
                    name='name'
                    label='Tên chương trình'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name='content' label='Nội dung chương trình'>
                    <EditerBase setContent={setContent} content={content} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
    const componentVideo = (
        <div className={styles.controller_video}>
            <Form {...layout} name='video' form={form} initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item label='Tên' name='name' rules={[{ required: true, message: 'Không được bỏ trống tên!' }]}>
                    <Input width={260} />
                </Form.Item>
                <Form.Item label='Video học thử' rules={[{ required: true, message: 'Không được bỏ trống tên!' }]}>
                    <Switch checked={checkedSwitch} onChange={(checked) => setCheckedSwitch(checked)} />
                </Form.Item>

                <Form.Item label='Ảnh nền'>
                    <UploadFileView
                        fileListUtil={fileListImg}
                        linkFileUtil={linkFileImg}
                        setLinkFileUtil={setLinkFileImg}
                        setFileListUtil={setFileListImg}
                        styles={styles}
                    />
                </Form.Item>
                <Form.Item label='Video'>
                    <UploadFileView
                        fileListUtil={fileList}
                        linkFileUtil={linkFile}
                        setLinkFileUtil={setLinkFile}
                        setFileListUtil={setFileList}
                        styles={styles}
                        imgDefault={`${url_base_img}video.png`}
                    />
                </Form.Item>

                <Form.Item label='File đính kèm'>
                    <UploadFileView
                        fileListUtil={fileListZip}
                        linkFileUtil={linkFileZip}
                        setLinkFileUtil={setLinkFileZip}
                        setFileListUtil={setFileListZip}
                        styles={styles}
                        imgDefault={`${url_base_img}file.png`}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

    const componentRight = (
        <div className={'flex_col'} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div className={styles.title}>
                Phần {Number(keyCollapse) + 1}:{' '}
                {keyCollapse && studyProgramFilterStatus[keyCollapse] && studyProgramFilterStatus[keyCollapse].name}
            </div>
            <div style={{ padding: 20, width: '100%', overflow: 'auto' }}>
                {keyCollapse && studyProgramFilterStatus[keyCollapse] && studyProgramFilterStatus[keyCollapse].content && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: studyProgramFilterStatus[keyCollapse].content,
                        }}
                    />
                )}
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <Drawer
                className={styles.drawer_container}
                style={{ position: 'absolute' }}
                width={'100%'}
                title={title}
                placement='right'
                onClose={onClose}
                visible={visible}
            >
                <div className={styles.controller_study_program}>
                    <Collapse onChange={callback} expandIconPosition={'left'}>
                        {dataProduct &&
                            studyProgram
                                .filter((item) => item.status && item.product_id === dataProduct.id)
                                .map((item, index) => (
                                    <Panel
                                        header={`Phần ${index + 1}: ${item.name}`}
                                        key={index}
                                        extra={<GenExtra itemStudyProgram={item} />}
                                    >
                                        {video
                                            .filter((v) => v && v.study_program_id && v.study_program_id === item.id)
                                            .map((v) => (
                                                <div className={styles.item_video} onClick={() => handleActiveVideo(v)}>
                                                    <div>
                                                        {objVideoActive && objVideoActive.id === v.id ? (
                                                            <PauseCircleOutlined
                                                                style={{
                                                                    marginLeft: 10,
                                                                    color: 'red',
                                                                }}
                                                            />
                                                        ) : (
                                                            <PlayCircleOutlined
                                                                style={{
                                                                    marginLeft: 10,
                                                                    color: 'green',
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    <div>{v.name}</div>
                                                    <div
                                                        className={'flex_row'}
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <EditOutlined
                                                            style={{
                                                                color: '#0343c6',
                                                                cursor: 'pointer',
                                                                marginRight: 3,
                                                            }}
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                handleEditVideo(v);
                                                            }}
                                                        />
                                                        <DeleteOutlined
                                                            style={{
                                                                color: 'red',
                                                                cursor: 'pointer',
                                                                marginRight: 3,
                                                                marginLeft: 5,
                                                            }}
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                handleDeleteVideo(v.id);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                    </Panel>
                                ))}
                    </Collapse>
                    <div className={styles.content_right}>{keyCollapse && componentRight}</div>
                </div>
                {/* Modal StudyProgram */}
                <Modal
                    title={titleStudyProgram}
                    visible={visibleStudyProgram}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    width={1000}
                >
                    {componentStudyProgram}
                </Modal>
                {/* Modal Video */}
                <Modal
                    title={titleVideo}
                    visible={visibleModalVideo}
                    onOk={handleOkVideo}
                    onCancel={handleCancelVideo}
                    footer={null}
                    width={500}
                >
                    {componentVideo}
                </Modal>
            </Drawer>
            {objVideoActive && (
                <div className={styles.controller_video_watch}>
                    <Drawer
                        className={styles.drawer_video}
                        style={{ position: 'absolute' }}
                        width={'60%'}
                        title={objVideoActive.name}
                        placement='right'
                        onClose={handleCloseModalVideoWatch}
                        visible={objVideoActive}
                    >
                        <div className={'flex_col'} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Player
                                ref={refVideo}
                                muted={!objVideoActive}
                                playsInline
                                poster={`${url_base_img}${objVideoActive.img ? objVideoActive.img : 'startVideo.jpg'}`}
                            >
                                {<source src={url_base_img + objVideoActive.link_video} type='video/mp4' />}
                            </Player>
                            <a
                                className={'flex_col'}
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                                href={url_base_img + objVideoActive.file_document}
                                download={objVideoActive.file_document}
                            >
                                <CloudDownloadOutlined style={{ fontSize: 30 }} />
                                <p style={{ marginLeft: 5 }}>Tài liệu học tập</p>
                            </a>
                        </div>
                    </Drawer>
                </div>
            )}
        </React.Fragment>
    );
}

ModalStudyProgram.propTypes = {
    refCallBack: PropTypes.object,
};

ModalStudyProgram.defaultProps = {
    refCallBack: {
        current: null,
    },
};

export default ModalStudyProgram;
