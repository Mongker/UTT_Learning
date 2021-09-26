/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 25/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Col, Row } from 'antd';

import PropTypes from 'prop-types';

const Phone = styled.div`
    color: #f00;
    line-height: 40px;
    font-weight: bold;
    padding-left: 0.5em;
    margin: 0 0;
    font-size: 1.5em;
    background-color: #e5e5e5;
    position: relative;
    z-index: 98;
    text-align: center;
    width: 10em;
    border-radius: 5em;
`;
const RingPhoneController = styled.a`
    top: 85%;
    visibility: visible;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    transition: visibility 0.5s ease 0s;
    z-index: 200000 !important;
`;

// style
import styles from './styles/index.module.scss';

RingPhone.propTypes = {
    phone: PropTypes.string,
};
RingPhone.defaultProps = {
    phone: '0904195777',
};

function RingPhone({ phone }) {
    return (
        <RingPhoneController href={`tel:${phone}`} className={styles['is-animating']}>
            <Row align={'middle '}>
                <Col>
                    <i className={classNames(styles['Phone'], styles['is-animating'])} />
                </Col>
                <Col>
                    <Phone>{phone}</Phone>
                </Col>
            </Row>
        </RingPhoneController>
    );
}

export default RingPhone;
