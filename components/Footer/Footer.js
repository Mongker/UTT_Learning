import React from 'react';
import style from './style.module.scss';
import { url_base_img } from '../../util/TypeUI';
// import PropTypes from 'prop-types';

function Footer() {
    return (
        <div style={{ marginTop: 65 }}>
            <div className={style.footer1}>
                <div className={style.container}>
                    <div className={style.row}>
                        <div className={style.cot_1}>
                            <span>
                                <a>
                                    <img
                                        src={`${url_base_img}123.jpeg`}
                                        style={{
                                            width: 150,
                                            height: 50,
                                        }}
                                    />
                                </a>
                            </span>
                            <ul>
                                <li>
                                    <div>{/*<span style={{ color: 'white' }}> 247 Cầu Giấy, Hà Nội</span>*/}</div>
                                </li>
                                <li>
                                    <div>
                                        {/*<span style={{ color: 'white' }}>*/}
                                        {/*    {' '}*/}
                                        {/*    P503, 20 Phan Đình Giót, P.2, Q. Tân Bình*/}
                                        {/*</span>*/}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span style={{ fontSize: '20px', color: 'white' }}> 19001568</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span style={{ color: 'white' }}> 090 488 6095</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span style={{ color: 'white' }}> cskh@utt_learning.vn </span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span style={{ color: 'white' }}> 8:00 - 22:00 </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={style.cot_2}>
                            <h4 className={style.title_footer}>UTT Learning</h4>
                            <ul>
                                <li>
                                    <a>Giới thiệu về Utt Learning</a>
                                </li>
                                <li>
                                    <a>Câu hỏi thường gặp</a>
                                </li>
                                <li>
                                    <a>Điều khoản dịch vụ</a>
                                </li>
                                <li>
                                    <a>Hướng dẫn thanh toán</a>
                                </li>
                                <li>
                                    <a>Kích hoạt khóa học</a>
                                </li>
                                <li>
                                    <a>Góc chia sẻ</a>
                                </li>
                                <li>
                                    <a>Chính sách bảo mật</a>
                                </li>
                                <li>
                                    <a>Chính sách thẻ học</a>
                                </li>
                            </ul>
                        </div>
                        <div className={style.cot_2}>
                            <h4 className={style.title_footer}>Hợp tác liên kết</h4>
                            <ul>
                                <li>
                                    <a>Đăng ký giảng viên</a>
                                </li>
                                <li>
                                    <a>Giải pháp e-learning</a>
                                </li>
                                <li>
                                    <a>Đào tạo doanh nghiệp</a>
                                </li>
                                <li>
                                    <a>Thẻ học online</a>
                                </li>
                                <li>
                                    <a>Affiliate</a>
                                </li>
                                <li>
                                    <a>Agency</a>
                                </li>
                                <li>
                                    <a>Chúng tôi đang tuyển dụng</a>
                                </li>
                            </ul>
                        </div>
                        <div className={style.cot_2}>
                            <h4 className={style.title_footer}>Địa chỉ Đại học Công Nghệ Giao Thông Vận Tải</h4>
                            <ul>
                                <iframe
                                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1956757379703!2d105.79664331494561!3d20.98479198602226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acc6bdc7f95f%3A0x58ffc66343a45247!2sUniversity%20of%20Transport%20Technology!5e0!3m2!1sen!2s!4v1620999771572!5m2!1sen!2s'
                                    width={400}
                                    height={225}
                                    // style={border:0;}
                                    allowFullScreen=''
                                    loading='lazy'
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.footer2}>
                <div className={style.container}>
                    <div className={style.row}>
                        <div style={{ width: 800, color: 'white', marginLeft: 100 }}>
                            © Công ty cổ phần đào tạo trực tuyến Unica - ĐKKD: 0107695756 - Khóa học trực tuyến dành cho
                            người đi làm
                        </div>
                        <div>
                            <img src={'https://unica.vn/media/images_v2017/bct.png'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
