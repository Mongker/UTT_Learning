/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 02/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// styles
import style from './styles/index.module.scss';

// import PropTypes from 'prop-types';
function useColumns(props) {
    const {
        nameStore,
        handleDidMount,
        columnsTable,
        actionDelete,
        handleActionTable,
        handleEdit: handleEditTable,
    } = props;
    const dispatch = useDispatch();

    // state
    const [visibleEdit, setVisibleEdit] = React.useState(false);
    const [item, setItem] = React.useState(null);

    // selector
    const data = useSelector((state) => state[nameStore]);

    // handle
    const handleDelete = (id) => {
        actionDelete && actionDelete(id);
    };

    const handleEdit = (item) => {
        if(handleEditTable) {
            handleEditTable(item)
        } else {
            setVisibleEdit(!visibleEdit);
            setItem(item);
        }
    };

    // vòng đời
    React.useEffect(() => {
        handleDidMount && handleDidMount();
    }, []);
    const handleAction = (_, record) => {
        const textType = record.status_user ? 'khóa' : 'mở';
        const text = `Bạn có chắc chắn muốn ${textType} ?`;
        return (
            <div className={style.action}>
                <EditOutlined
                    onClick={() => handleEdit(record)}
                    className={style.item_action}
                />
                {record.status_user ? (
                    <Popconfirm
                        placement='top'
                        title={text}
                        onConfirm={() => {
                            handleDelete(record.id);
                        }}
                        okText='Phải'
                        cancelText='Không'
                    >
                        <UnlockOutlined style={{ color: '#00f814' }} />
                    </Popconfirm>
                ) : (
                    <Popconfirm
                        placement='top'
                        title={text}
                        onConfirm={() => {
                            handleDelete(record.id);
                        }}
                        okText='Phải'
                        cancelText='Không'
                    >
                        <LockOutlined style={{ color: 'red' }} />
                    </Popconfirm>
                )}
            </div>
        );
    };

    return {
        data,
        visibleEdit,
        setVisibleEdit,
        item,
        columns: [
            ...columnsTable,
            {
                title: 'Action',
                dataIndex: 'action',
                render: handleActionTable ? handleActionTable : handleAction,
            },
        ],
    };
}

useColumns.propTypes = {};

useColumns.defaultProps = {};

export default useColumns;
