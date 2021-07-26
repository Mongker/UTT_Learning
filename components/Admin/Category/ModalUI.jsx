/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: levanmong.dola.99@gmail.com
 * @phone: +84373668113
 * @slogan: "Mọi thứ đều bắt đầu từ việc nhỏ, những khát vọng phải lớn"
 */

import React, { useState } from 'react';
import classNames from 'classnames';
import { Input, message, Modal } from 'antd';
import { useDispatch } from 'react-redux';

// action
import { post, put } from 'redux/actions/categoryAction';

// component
import UploadFileView from './UploadFileView';

// styles
import styles from './styles/index.module.scss';
import { url_base_img } from '../../../util/TypeUI';

function ModalUI(props) {
    const { refFunc } = props;
    const dispatch = useDispatch();

    // state
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [itemEdit, setItemEdit] = useState(null);
    const [rootId, setRootId] = useState('1');

    // ref
    const refUpdateFile = React.useRef(null);

    // const
    const data = {
        rootId: itemEdit ? itemEdit.rootId : rootId,
        status: '1',
        name,
        description,
        sort_order: '1',
    };
    const title = itemEdit ? 'Chỉnh sửa danh mục' : 'Thêm danh mục';

    // handle func
    const handleResetState = () => {
        setDescription('');
        setName('');
        setRootId('1');
        refUpdateFile.current && refUpdateFile.current.setFileList([]);
        refUpdateFile.current && refUpdateFile.current.setLinkFile('');
        itemEdit && setItemEdit(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        handleResetState();
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleChangeInputName = (e) => {
        setName(e.target.value);
    };

    const handleChangeInputDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleOk = () => {
        data.icon = refUpdateFile.current ? refUpdateFile.current['linkFile'] : `${url_base_img}operation.png`;
        itemEdit ? dispatch(put({ ...itemEdit, ...data })) : dispatch(post(data));
        handleResetState();
        setIsModalVisible(false);
    };

    // Vòng đời
    React.useEffect(() => {
        // Gán ref cho phần tử cha sử dụng lại
        refFunc.current = {
            showModal,
            setItemEdit,
            setRootId,
        };
    });
    React.useEffect(() => {
        !isModalVisible && (refUpdateFile.current = null);
    }, [isModalVisible]);

    React.useEffect(() => {
        if (itemEdit) {
            setRootId(itemEdit.id);
            setName(itemEdit.name);
            setDescription(itemEdit.description);
            refUpdateFile.current.setLinkFile(itemEdit.icon);
            refUpdateFile.current.setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: `${url_base_img}${itemEdit.icon}`,
                },
            ]);
        }
    }, [itemEdit]);

    return (
        <React.Fragment>
            <Modal
                title={title}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                className={styles.modal_add}
            >
                <div className={classNames('flex_col', styles.category_add)}>
                    {/* name */}
                    <div className={classNames('flex_row', styles.item_category)}>
                        <div className={styles.item_name_category}>Tên:</div>
                        <Input value={name} onChange={handleChangeInputName} className={styles.item_input_category} />
                    </div>

                    {/* description */}
                    <div className={classNames('flex_row', styles.item_category)}>
                        <div className={styles.item_name_category}>Nội dung:</div>
                        <Input.TextArea
                            onChange={handleChangeInputDescription}
                            value={description}
                            className={styles.item_input_category}
                        />
                    </div>

                    {/* icon */}
                    <div className={classNames('flex_row', styles.item_category)}>
                        <div className={styles.item_name_category}>Icon:</div>
                        <div className={styles.item_input_category}>
                            <UploadFileView
                                refFunc={refUpdateFile}
                                styles={styles}
                                Img={{ width: '20px', height: '20px' }}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
}

ModalUI.propTypes = {};

ModalUI.defaultProps = {};

export default React.memo(ModalUI);
