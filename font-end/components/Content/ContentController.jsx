/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 16/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @phone: +84373668113
 * @slogan: "Mọi thứ đều bắt đầu từ việc nhỏ, những khát vọng phải lớn"
 */

import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

// Component
const ContentUNICAView = dynamic(() => import('./UNICA/ContentUNICAView'))

// Util
import TypesConfig from 'util/TypesConfig';

function ContentController({ ContentType }) {
    let ContentComponent;
    switch (ContentType) {
        default:
            ContentComponent = <ContentUNICAView />;
            break;
    }
    return ContentComponent;
}

ContentController.propTypes = {
    ContentType: PropTypes.string,
};

ContentController.defaultProps = {
    ContentType: TypesConfig.UNICA,
};

export default ContentController;
