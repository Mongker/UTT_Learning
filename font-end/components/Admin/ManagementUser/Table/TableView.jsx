/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

// hooks
import useColumns from '../../../hooks/useColumns';
import useUserBase from '../../../hooks/LogicData/useUserBase';
import ContextApp from '../../../../util/ContextApp';

const funcDefault = () => {};
function TableView({ handleDidMount, actionDelete, columnsTable, type, handleEdit }) {
    // hooks
    const { users, updateUser } = useUserBase();
    const { textSearch } = React.useContext(ContextApp);

    // handle func
    const handleUpdateUser = (id) => {
        let indexUpdate;
        users.map((item, index) => item.id === id && (indexUpdate = index));
        const status_user = users[indexUpdate].status_user === 0 ? 1 : 0;
        const data = { status_user, id };
        indexUpdate && updateUser(data);
    };

    // hooks
    const { columns, data } = useColumns({
        nameStore: 'users',
        handleDidMount,
        columnsTable,
        actionDelete: handleUpdateUser,
        handleEdit: handleEdit,
    });
    const handleSearch = (arr) => {
        if (textSearch.length > 0)
            return arr.filter(
                (item) =>
                    item.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                    item.phone.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
                    item.email.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1,
            );
        else return arr;
    };

    const dataSource = type !== 'ALL' ? data.filter((item) => item.role === type) : data;
    return (
        <React.Fragment>
            <Table columns={columns} dataSource={handleSearch(dataSource)} />
        </React.Fragment>
    );
}

TableView.propTypes = {
    handleDidMount: PropTypes.func,
    actionDelete: PropTypes.func,
    handleEdit: PropTypes.func,
};

TableView.defaultProps = {
    handleDidMount: funcDefault,
    actionDelete: funcDefault,
    handleEdit: funcDefault,
};

export default React.memo(TableView);
