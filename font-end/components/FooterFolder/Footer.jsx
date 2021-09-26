/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 25/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import { Col, Layout, Row } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const { Footer } = Layout;

// const style
const FooterCover = styled(Footer)`
    padding: 20px 25px;
    background-color: #7a7a7a;
    color: white;
    font-size: 1.2em;
    width: fit-content;
    box-sizing: border-box;
`;

const TitleIntroduce = styled.p`
    font-size: 2em;
    font-weight: bolder;
`;
const TitleWorkingTime = TitleIntroduce;
const TitleMap = styled(TitleIntroduce)`
    font-size: 1.5em;
`;
const ColSpanWorkingTime = styled(Col)`
    ul {
        li:nth-child(1) {
            padding-top: 0;
        }
        li {
            padding-top: 10px;
        }
    }
`;
FooterApp.propTypes = {};
FooterApp.defaultProps = {};
function FooterApp() {
    return (
        <FooterCover>
            <Row gutter={[24, 8]} align={'top'}>
                <Col span={9} align={'top'}>
                    <Row align={'top'}>
                        <TitleIntroduce>Giới thiệu</TitleIntroduce>
                        <br />
                        <br />
                    </Row>
                    <Row align={'top'}>
                        <p style={{ textAlign: 'justify' }}>
                            <strong>
                                <span style={{ color: '#f7cf31' }}>Tổng Kho Vật Liệu</span>
                            </strong>
                            &nbsp;chuyên phân phối số lượng lớn các sản phẩm gỗ công nghiệp, gỗ nhân tạo, tấm Cemboard,
                            … tại khu vực Thanh Hóa, Nghệ An, Ninh Bình, Huế, Hưng Yên, Hà Nội, Hải Dương và các tỉnh
                            miền bắc - trung - nam với giá bán sỉ đến trực tiếp tay người tiêu dùng, hàng đảm bảo chất
                            lượng, hàng tồn kho luôn đầy đủ cung cấp cho khách hàng.
                        </p>
                    </Row>
                </Col>
                <ColSpanWorkingTime span={6} align={'top'}>
                    <Row align={'top'}>
                        <TitleWorkingTime>Thời gian làm việc</TitleWorkingTime>
                    </Row>
                    <Row>
                        <ul>
                            <li>
                                <span className='day'>Thứ 2: 7h30</span>
                                <span className='time'>:00 AM – 17:00 PM</span>
                            </li>
                            <li>
                                <span className='day'>Thứ 3:&nbsp;</span>
                                <span className='day'>7h30</span>
                                <span className='time'>:00 AM – 17:00 PM</span>
                            </li>
                            <li>
                                <span className='day'>Thứ 4:&nbsp;</span>
                                <span className='day'>7h30</span>
                                <span className='time'>:00 AM – 17:00 PM</span>
                            </li>
                            <li>
                                <span className='day'>Thứ 5:&nbsp;</span>
                                <span className='day'>7h30</span>
                                <span className='time'>:00 AM – 17:00 PM</span>
                            </li>
                            <li>
                                <span className='day'>Thứ 6:&nbsp;</span>
                                <span className='day'>7h30</span>
                                <span className='time'>:00 AM – 17:00 PM</span>
                            </li>
                            <li>
                                <span className='day'>Thứ 7:&nbsp;</span>7h30
                                <span className='time'>:00 AM – 17:00 PM</span>
                            </li>
                            <li>
                                <span className='day'>CN: </span>
                                <span className='time'>OFF</span>
                            </li>
                        </ul>
                    </Row>
                </ColSpanWorkingTime>
                <Col span={9}>
                    <Row align={'top'}>
                        <TitleMap>Thôi 1 - Đường 4A, Xã Quảng Nhân, Huyện Quảng Xương, Tỉnh Thanh Hóa</TitleMap>
                    </Row>
                    <Row>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14418.443637511584!2d105.80262597632392!3d19.70284883920739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313655c34945f5c5%3A0x95c811a8e0204b08!2zUXXhuqNuZyBOaMOibiwgVGhhbmggSMOzYSwgVGhhbmggSG9hLCBWaWV0bmFt!5e1!3m2!1sen!2s!4v1632591783757!5m2!1sen!2s'
                            height={'450'}
                            style={{ border: 0 }}
                            allowFullScreen=''
                            loading='lazy'
                        />
                    </Row>
                </Col>
            </Row>
        </FooterCover>
    );
}

export default FooterApp;
