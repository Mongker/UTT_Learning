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
import PropTypes from 'prop-types';
import VideoPlayBase from '../../../base/VideoPlayBase';
import useStudyProgramBase from '../../../hooks/LogicData/useStudyProgramBase';
import useProductBase from '../../../hooks/LogicData/useProductBase';

function ContentRight({ itemVideo, id_study_program, product_id }) {
    const { studyProgramObj } = useStudyProgramBase();
    const { productObj } = useProductBase();
    if (itemVideo)
        return (
            <div>
                <VideoPlayBase image_link={itemVideo.img} trailer_link={itemVideo.link_video} />
            </div>
        );
    if (id_study_program)
        return (
            <div className={'flex_col'} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        margin: 10,
                    }}
                >
                    {studyProgramObj[id_study_program].name}
                </div>
                <div dangerouslySetInnerHTML={{ __html: studyProgramObj[id_study_program].content }} />
            </div>
        );
    return (
        <div className={'flex_col'} style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
            <div dangerouslySetInnerHTML={{ __html: productObj[product_id].content_full }} />
        </div>
    );
}

ContentRight.propTypes = {
    itemVideo: PropTypes.object,
    id_study_program: PropTypes.number,
};

ContentRight.defaultProps = {
    itemVideo: null,
};

export default ContentRight;
