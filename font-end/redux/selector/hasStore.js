/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author monglv@bkav.com on 30/09/2021
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';
import { createSelector } from 'reselect';
const HasStore = (state, key = 'HasUser') => state[key];
const itemIdsSelector = createSelector([HasStore], (counts) => counts.getIn(['root', 'item']));
const meIdSelector = createSelector([HasStore], (counts) => counts.getIn(['root', 'meId']));

const HasStoreSelector = {
    itemIdsSelector,
    meIdSelector,
};
export default HasStoreSelector;
