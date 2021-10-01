/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 23/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @phone: +84373668113
 * @slogan: "Mọi thứ đều bắt đầu từ việc nhỏ, những khát vọng phải lớn"
 */

import React, { useState } from 'react';
import { Button, message, Tree } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

// action
// import * as categoryAction from 'redux/actions/categoryAction';

// component
import ModalUI from './ModalUI';

// styles
import styles from './styles/index.module.scss';
import TitleTreeView from './TitleTree/TitleTreeView';
import ProductView from '../Product/ProductView';
import ContextApp from '../../../util/context/ContextApp';
import CONFIG_STORE from '../../../config/configStore';
import convertUrl from '../../../util/function/convertUrl';

const CategoryView = (props) => {
    // redux
    const { keyTreeActive, setKeyTreeActive } = React.useContext(ContextApp);
    const category = useSelector((status) => status[CONFIG_STORE.Category]);
    const categoryIds = useSelector((status) => status[CONFIG_STORE.HasCategory].getIn(['root', 'itemIds']));
    console.log('categoryIds', categoryIds); // MongLV log fix bug

    // state
    const [treeData, setTreeData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // callback
    const _setIsModalVisible = React.useCallback((isValue = false) => setIsModalVisible(isValue), [isModalVisible]);

    // handle func
    const onSelect = (selectedKeys, info) => {
        setKeyTreeActive(selectedKeys[0]);
    };

    const showModalAdd = (item, event) => {
        event.stopPropagation();
    };

    const showModalEdit = (item, event) => {
        event.stopPropagation();
    };

    const setChildren = (id, key) => {
        const children = [];
        let dem = 0;
        categoryIds.map((_id) => {
            if (`${category.getIn([_id, 'rootId'])}` === `${id}`) {
                const _key = `${key}-${dem}`;
                const img = category.getIn([_id, 'icon'])
                    ? convertUrl(category.getIn([_id, 'icon']))
                    : 'https://icons.iconarchive.com/icons/guillendesign/variations-3/256/Default-Icon-icon.png';
                children.push({
                    title: (
                        <TitleTreeView
                            item={category.get(_id)}
                            showModalAdd={showModalAdd}
                            showModalEdit={showModalEdit}
                        />
                    ),
                    // title: itemChildren.name,
                    key: category.getIn([_id, 'rootId']),
                    icon: <img src={img} alt={'icon'} style={{ width: 20, height: 17, objectFit: 'cover' }} />,
                    children: setChildren(category.getIn([_id, 'id']), _key.toString()),
                });
                dem = dem + 1;
            }
        });
        return children;
    };
    const updateTreeData = () => {
        let newTreeData = [];
        let dem = 0;
        console.log('categoryIds', categoryIds); // MongLV log fix bug
        console.log('category', category); // MongLV log fix bug
        categoryIds &&
            categoryIds.map((id) => {
                const img = category.getIn([id, 'icon'])
                    ? convertUrl(category.getIn([id, 'icon']))
                    : 'https://icons.iconarchive.com/icons/guillendesign/variations-3/256/Default-Icon-icon.png';
                if (`${category.getIn([id, 'rootId'])}` === '0') {
                    const children = setChildren(category.getIn([id, 'id']), `${dem}`);
                    newTreeData.push({
                        title: (
                            <TitleTreeView
                                item={category.get(id)}
                                showModalAdd={showModalAdd}
                                showModalEdit={showModalEdit}
                                isDelete={!children.length > 0}
                            />
                        ),
                        id: category.getIn([id, 'rootId']),
                        key: category.getIn([id, 'rootId']),
                        icon: <img src={img} alt={'icon'} style={{ width: 20, height: 17, objectFit: 'cover' }} />,
                        children: children,
                    });
                    dem = dem + 1;
                }
            });
        console.log('newTreeData', newTreeData); // MongLV log fix bug

        setTreeData(newTreeData);
    };

    React.useEffect(() => {
        updateTreeData();
    }, [categoryIds.size]);

    return (
        <React.Fragment>
            <div
                className={'flex_row'}
                style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}
            >
                <div className={styles.btn_add_category}>
                    <Button type='primary' onClick={() => _setIsModalVisible(true)}>
                        Thêm danh mục
                    </Button>
                </div>
                {/*<h2 style={{ fontWeight: 'bold' }}>*/}
                {/*    Danh sách{' '}*/}
                {/*    {keyTreeActive && categoryObj[keyTreeActive] && categoryObj[keyTreeActive].name*/}
                {/*        ? categoryObj[keyTreeActive].name*/}
                {/*        : 'ALL'}*/}
                {/*</h2>*/}
                {/*{keyTreeActive ? (*/}
                {/*    <div className={styles.btn_add_category}>*/}
                {/*        <Button*/}
                {/*            type='primary'*/}
                {/*            onClick={() => refModalAddProduct.current && refModalAddProduct.current.showDrawer()}*/}
                {/*        >*/}
                {/*            Thêm khóa học*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div />*/}
                {/*)}*/}
            </div>
            <div className={'flex_row'}>
                <ModalUI isModalVisible={isModalVisible} setIsModalVisible={_setIsModalVisible} />
                <div className={styles.custom_tree_antd}>
                    <Tree onSelect={onSelect} treeData={treeData} showIcon draggable />
                </div>
                {/*<ProductView keyTreeActive={keyTreeActive} />*/}
            </div>
            {/*<ModalProductView refFunc={refModalAddProduct} idCategory={keyTreeActive} />*/}
        </React.Fragment>
    );
};

CategoryView.propTypes = {};

CategoryView.defaultProps = {};

export default React.memo(CategoryView);
