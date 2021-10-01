/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import { fromJS } from 'immutable';
import CONFIG_STORE from 'config/configStore';
import CONFIG_TYPE_ACTION from 'config/configTypeAction';

const hasCategoryReducer = {};
function unique(arr) {
    let newArr = [];
    newArr = arr.filter(function (item) {
        return newArr.includes(item) ? '' : newArr.push(item);
    });
    return newArr;
}
hasCategoryReducer.path = CONFIG_STORE.HasCategory;
hasCategoryReducer.value = (HasCategory = fromJS({}), action) => {
    const { id = '', groupId = 'root' } = (action && action.payload && action.payload) || {};

    switch (action.type) {
        case `${hasCategoryReducer.path}_${CONFIG_TYPE_ACTION.STORE.MERGE}`:
            const DataMerge = { ...action.merge };
            console.log('DataMerge', DataMerge); // MongLV log fix bug
            let ItemIds = [];
            if (HasCategory.size > 0 && HasCategory.getIn(['root', 'itemIds'])) {
                ItemIds = HasCategory.getIn(['root', 'itemIds']).concat(...action.merge.root.itemIds);
                DataMerge && DataMerge.root && (DataMerge.root.itemIds = unique(ItemIds));
            }

            return fromJS(JSON.parse(JSON.stringify(HasCategory.merge(fromJS(DataMerge)))));
        case CONFIG_TYPE_ACTION.STORE.CATEGORY.DELETE:
            return HasCategory.updateIn([groupId, 'itemIds'], (ids) => ids && ids.filter((_id) => _id !== id));
        default:
            return HasCategory;
    }
};

export default hasCategoryReducer;
