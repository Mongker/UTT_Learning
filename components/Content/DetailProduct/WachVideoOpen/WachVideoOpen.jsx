/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author monglv@bkav.com on 13/05/2021
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import React from 'react';
import NoiDung from '../NoiDungKH/NoiDung';
// import PropTypes from 'prop-types';
import ContentRight from './ContentRight';

// styles
import styles from './styles.module.scss';

function WachVideoOpen({ id_product, headComponent }) {
    // state
    const [itemVideo, setItemVideo] = React.useState(null);
    const [keyActive, setKeyActive] = React.useState(null);

    // func handle
    const onChangeCollapse = (key) => {
        setItemVideo(null);
        setKeyActive(key);
    };
    const onChangeVideo = (item) => {
        setItemVideo(item);
        setKeyActive(null);
    };

    return (
        <div className={'flex_col'}>
            {headComponent}
            <div className={'flex_row'} style={{ height: '100%' }}>
                <div className={styles.content_left}>
                    <div className={styles.title}>Lộ trình khóa học</div>
                    <NoiDung
                        product_id={id_product}
                        onChangeCollapse={onChangeCollapse}
                        isButton={false}
                        onChangeVideo={onChangeVideo}
                        idVideoActive={itemVideo && itemVideo.id}
                    />
                </div>
                <div className={styles.content_right}>
                    <ContentRight itemVideo={itemVideo} id_study_program={keyActive} product_id={id_product} />
                </div>
            </div>
        </div>
    );
}

WachVideoOpen.propTypes = {};

WachVideoOpen.defaultProps = {};

export default WachVideoOpen;
