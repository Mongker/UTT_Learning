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

// component
import HeaderUNICAView from './UNICA/HeaderUNICAView';

// Util
import TypesConfig from 'util/TypesConfig';

function HeaderController(props) {
    const {TypeHeader} = props;
    let HeaderComponent;
    switch (TypeHeader) {
        // Note 1: đang viết tạm để tạo base header
        case TypesConfig.UNICA:
            HeaderComponent = <HeaderUNICAView />;
            break;
        default:
            HeaderComponent = <HeaderUNICAView />;
            break;
    }
    return HeaderComponent;
}

HeaderController.propTypes = {
    TypeHeader: PropTypes.string,
};

HeaderController.defaultProps = {
    TypeHeader: TypesConfig.UNICA,
};

export default HeaderController;
