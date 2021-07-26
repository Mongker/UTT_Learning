/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 29/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @phone: +84373668113
 * @slogan: "Mọi thứ đều bắt đầu từ việc nhỏ, những khát vọng phải lớn"
 */

import React from 'react';
import { Upload, message } from 'antd';
import PropTypes from 'prop-types';

// styles
import _styles from './styles/index.module.scss';
import { url_base, url_base_img } from '../../../util/TypeUI';

// const
const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

function UploadFileView(props) {
    const {
        refFunc,
        Img,
        styles,
        imgDefault,
        callback = () => {},
        fileListUtil,
        linkFileUtil,
        setLinkFileUtil,
        setFileListUtil,
    } = props;
    const [linkFile, setLinkFile] = React.useState('');
    const [fileList, setFileList] = React.useState([]);

    const linkFileView = linkFile ? url_base_img + 'file/' + linkFile : imgDefault;

    // handle func
    const onChange = (info) => {
        setFileList(info.fileList);
        setFileListUtil(info.fileList);
        switch (info.file.status) {
            case 'uploading':
                break;
            case 'done':
                // message.success('Thêm thành công');
                setLinkFile(info.file.response.fileNameInServer);
                setLinkFileUtil(info.file.response.fileNameInServer);
                break;
            default:
                // message.error(`${info.file.name}`);
                setLinkFile('');
                setLinkFileUtil('');
                break;
        }
    };

    // Props
    const UpFile = {
        name: 'file',
        action: `${url_base}/file/upload`,
        multiple: true,
        onChange: (info) => onChange(info),
    };

    // Vòng đời
    React.useEffect(() => {
        // Gán ref cho phần tử cha sử dụng lại
        refFunc.current = {
            linkFile,
            setLinkFile,
            setFileList,
        };
    });
    React.useEffect(() => {
        linkFile && callback(linkFile);
    }, [linkFile, fileList]);

    React.useEffect(() => {
        setFileList(fileListUtil);
        setLinkFile(linkFileUtil);
    }, [fileListUtil, linkFileUtil]);

    return (
        <div className={styles.upload_file}>
            <Upload {...UpFile} fileList={fileList} listType='picture-card'>
                {linkFile.length <= 0 ? (
                    <img alt='example' src={linkFileView} style={{ width: Img.width, height: Img.height }} />
                ) : null}
            </Upload>
        </div>
    );
}
UploadFileView.propTypes = {
    refFunc: PropTypes.object,
    styles: PropTypes.object,
    Img: PropTypes.string,
    imgDefault: PropTypes.string,
    callback: PropTypes.func,
    setLinkFileUtil: PropTypes.func,
    setFileListUtil: PropTypes.func,
    linkFileUtil: PropTypes.string,
    fileListUtil: PropTypes.array,
    // refFunc, Img, styles, imgDefault, callback = () => {}
};

UploadFileView.defaultProps = {
    Img: { width: 50, height: 50 },
    refFunc: { current: null },
    styles: _styles,
    imgDefault: 'https://img.icons8.com/cotton/344/image--v1.png',
    setLinkFileUtil: () => {},
    setFileListUtil: () => {},
    linkFileUtil: '',
    fileListUtil: [],
};
export default React.memo(UploadFileView);
