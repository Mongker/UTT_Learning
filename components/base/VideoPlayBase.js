/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 11/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import { url_base_img } from '../../util/TypeUI';
import { Player } from 'video-react';
import PropTypes from 'prop-types';

function VideoPlayBase({ image_link, trailer_link }) {
    return (
        <Player
            style={{ width: 750 }}
            playsInline
            poster={`${url_base_img}${image_link ? image_link : 'startVideo.jpg'}`}
            src={url_base_img + trailer_link}
        />
    );
}

VideoPlayBase.propTypes = {
    image_link: PropTypes.string,
    trailer_link: PropTypes.string,
};

VideoPlayBase.defaultProps = {
    image_link: '',
    trailer_link: '',
};

export default React.memo(VideoPlayBase);
