import React from 'react';
import dynamic from 'next/dynamic';
import { Affix, Avatar, Button, Rate } from 'antd';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Player } from 'video-react';
import {
    DoubleRightOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    TeamOutlined,
    CheckCircleTwoTone,
} from '@ant-design/icons';

// hooks
import useUserBase from '../../hooks/LogicData/useUserBase';
import useCartBase from '../../hooks/LogicData/useCartBase';

// util
import { url_base_img } from '../../../util/TypeUI';

// style
import style from './style.module.scss';

// component lazy
const CommentDetail = dynamic(() => import('./Comment/CommentDetail'));
const WachVideoOpen = dynamic(() => import('./WachVideoOpen/WachVideoOpen'));
const NoiDung = dynamic(() => import('./NoiDungKH/NoiDung'));

function ContentDetail(props) {
    let videoRef = null;
    const {
        name,
        content,
        number_user,
        trailer_link,
        image_link,
        author_id,
        content_full,
        id,
        sale,
        price,
        list_number,
    } = props;

    // hooks
    const { usersObj, myUser } = useUserBase();
    const { cart, postCart, getListCart } = useCartBase();
    const router = useRouter();

    // const
    const cartFilter = cart.filter((item) => item.product_id === id && item.status === 0);
    let arrListNumber = [];
    let isShowVideo = false;
    try {
        arrListNumber = JSON.parse(list_number);
        isShowVideo = arrListNumber.includes(Number(myUser.id));
    } catch (e) {}

    // handle func
    const addCart = () => {
        if (myUser && myUser.id) {
            const data = {
                product_id: id,
                user_id: Number(myUser.id),
                sale: sale,
            };
            postCart(data);
        } else {
            router.push('/login');
        }
    };

    const handleOk = (data) => {
        router.push(`/thanhtoan?id=${data.id}`);
    };
    const handleDangKyHoc = () => {
        if (myUser && myUser.id) {
            const data = {
                product_id: id,
                user_id: Number(myUser.id),
                sale: sale,
            };
            postCart(data, handleOk);
        } else {
            router.push('/login');
        }
    };

    React.useEffect(() => {
        getListCart({
            product_id: id,
        });
    }, []);

    const getVideoRef = (e) => {
        if (e) {
            videoRef = e.video.video;
        }
    };
    // JSX
    const headComponent = (
        <div className={style.u_course_highlight}>
            <div className={style.container}>
                <div className={style.breadcumb_detail_course}>
                    <a href={'/'} className={style.a}>
                        UTT Learning
                    </a>
                    <DoubleRightOutlined className={style.icon} />
                    <a href={'#'} className={style.a}>
                        {name}
                    </a>
                </div>
                <div className={style.u_detail_block_title}>
                    <h1 className={style.itemReviewed}>
                        <span>{name}</span>
                    </h1>
                    <div className={style.u_detail_desc}>{content}</div>
                    <div className={'flex_row'} style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <div className={style.u_detail_tea}>
                            <Avatar
                                icon={<UserOutlined />}
                                src={`${url_base_img}${
                                    author_id &&
                                    usersObj[author_id.toString()] &&
                                    usersObj[author_id.toString()].avatar &&
                                    usersObj[author_id.toString()].avatar
                                }`}
                            />
                            <p style={{ marginLeft: 5 }}>
                                {usersObj[`${author_id}`] && usersObj[`${author_id}`].name
                                    ? usersObj[`${author_id}`].name
                                    : '[Loading]'}
                            </p>
                        </div>
                        <div className={style.u_detail_tea}>
                            <Rate allowHalf defaultValue={2.5} className={style.icon} />
                            <span style={{ marginLeft: 5 }}>0 đánh giá</span>
                        </div>
                        <div className={style.u_detail_tea}>
                            <TeamOutlined />
                            <span style={{ marginLeft: 5 }}>{number_user} học viên</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isShowVideo) return <WachVideoOpen id_product={id} headComponent={headComponent} />;
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {headComponent}
            <div className={style.u_detail_course}>
                <div className={style.container_video}>
                    <div className={style.row}>
                        <div className={style.video}>
                            <Player
                                ref={getVideoRef}
                                style={{ width: 750 }}
                                playsInline
                                poster={`${url_base_img}${image_link ? image_link : 'startVideo.jpg'}`}
                                src={url_base_img + trailer_link}
                            />
                        </div>
                    </div>
                    <div className={style.form_menu_noi}>
                        {/*menu*/}
                        <Affix offsetTop={300} onChange={(affixed) => console.log(affixed)} style={{ zIndex: 1 }}>
                            <div className={style.block_buy}>
                                <div className={style.u_sm_left}>
                                    <div className={style.block_price} price>
                                        <span className={style.big_price}>
                                            {/*479,000 <sup>đ</sup>*/}
                                            {`${sale ? price - price * (sale / 100) : price}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ',',
                                            ) + '$'}
                                        </span>
                                        {sale !== 0 && (
                                            <span className={style.small_price}>
                                                {`${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '$'}
                                            </span>
                                        )}
                                        <span className={style.discount_price}>-{sale}%</span>
                                    </div>
                                    <div className={style.time_uudai}>
                                        {/*<FieldTimeOutlined style={{ color: 'red' }} /> Thời gian ưu đãi còn 1 ngày*/}
                                    </div>
                                    <div className={style.block_btn}>
                                        <Button className={style.btn_dang_ky} onClick={handleDangKyHoc}>
                                            ĐĂNG KÝ HỌC
                                        </Button>

                                        {cartFilter.length > 0 ? (
                                            <Button
                                                className={style.btn_them_gio_hang}
                                                icon={<CheckCircleTwoTone twoToneColor='#52c41a' />}
                                                onClick={() => router.push('/cart')}
                                            >
                                                ĐÃ CÓ TRONG GIỎ HÀNG
                                            </Button>
                                        ) : (
                                            <Button
                                                className={style.btn_them_gio_hang}
                                                icon={<ShoppingCartOutlined />}
                                                onClick={addCart}
                                            >
                                                THÊM VÀO GIỎ HÀNG
                                            </Button>
                                        )}

                                        <p>Hoàn tiền trong 7 ngày nếu không hài lòng</p>
                                    </div>
                                </div>
                                {/*<div className={style.u_sm_right}>*/}
                                {/*    <div className={style.block_ulti}>*/}
                                {/*        <ul style={{ marginLeft: 0 }}>*/}
                                {/*            <li>*/}
                                {/*                <div style={{ display: 'flex' }}>*/}
                                {/*                    <FieldTimeOutlined />*/}
                                {/*                    <p style={{ marginLeft: 10 }}>Thời lượng : 04 giờ 43 phút</p>*/}
                                {/*                </div>*/}
                                {/*            </li>*/}
                                {/*            <li>*/}
                                {/*                <div style={{ display: 'flex' }}>*/}
                                {/*                    <FieldTimeOutlined />*/}
                                {/*                    <p style={{ marginLeft: 10 }}>Giáo trình : 30 bài giảng</p>*/}
                                {/*                </div>*/}
                                {/*            </li>*/}
                                {/*            <li>*/}
                                {/*                <div style={{ display: 'flex' }}>*/}
                                {/*                    <FieldTimeOutlined />*/}
                                {/*                    <p style={{ marginLeft: 10 }}> Sở hữu khóa học trọn đời</p>*/}
                                {/*                </div>*/}
                                {/*            </li>*/}
                                {/*            <li>*/}
                                {/*                <div style={{ display: 'flex' }}>*/}
                                {/*                    <FieldTimeOutlined />*/}
                                {/*                    <p style={{ marginLeft: 10 }}>Cấp chứng nhận hoàn thành</p>*/}
                                {/*                </div>*/}
                                {/*            </li>*/}
                                {/*            <li>*/}
                                {/*                <div style={{ display: 'flex' }}>*/}
                                {/*                    <FieldTimeOutlined />*/}
                                {/*                    <p style={{ marginLeft: 10 }}>*/}
                                {/*                        Giảm thêm 10% khi thanh toán online*/}
                                {/*                    </p>*/}
                                {/*                </div>*/}
                                {/*            </li>*/}
                                {/*        </ul>*/}
                                {/*        <div*/}
                                {/*            style={{*/}
                                {/*                display: 'flex',*/}
                                {/*                justifyContent: 'center',*/}
                                {/*            }}*/}
                                {/*        >*/}
                                {/*            <a>Bạn có mã giảm giá?</a>*/}
                                {/*        </div>*/}
                                {/*        <div style={{ display: 'flex' }}>*/}
                                {/*            <Input*/}
                                {/*                placeholder='Nhập mã giảm giá ...'*/}
                                {/*                style={{*/}
                                {/*                    width: 200,*/}
                                {/*                    margin: ' 10px 20px',*/}
                                {/*                }}*/}
                                {/*            />*/}
                                {/*            <Button type='primary' style={{ margin: '10px 0px' }}>*/}
                                {/*                Áp dụng*/}
                                {/*            </Button>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </Affix>
                    </div>
                </div>
            </div>
            <div className={style.u_des_course} style={{ marginTop: '-70px' }}>
                <div className={style.container_destination}>
                    <h2>Giới thiệu khóa học</h2>
                    <hr style={{ height: 0.5, backgroundColor: '#99eae1' }} />
                    <div dangerouslySetInnerHTML={{ __html: content_full }} />
                </div>
            </div>
            <div className={style.u_des_course}>
                <div className={style.container_destination}>
                    <h2>Nội dung khóa học</h2>
                    <hr style={{ height: 0.5, backgroundColor: '#99eae1' }} />
                    <NoiDung product_id={id} />
                </div>
            </div>
            {/*<div className={style.u_des_course}>*/}
            {/*    <div className={style.container_destination}>*/}
            {/*        <h2>Khóa học liên quan</h2>*/}
            {/*        <hr style={{ height: 0.5, backgroundColor: '#99eae1' }} />*/}
            {/*        <KhoaHoc />*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={style.u_des_course}>
                <div className={style.container_destination}>
                    <h2>Thông tin giảng viên</h2>
                    <hr style={{ height: 0.5, backgroundColor: '#99eae1' }} />
                    <div style={{ display: 'flex' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: 200,
                            }}
                        >
                            <Avatar
                                size={180}
                                icon={<UserOutlined />}
                                src={`${url_base_img}${
                                    author_id &&
                                    usersObj[author_id.toString()] &&
                                    usersObj[author_id.toString()].avatar &&
                                    usersObj[author_id.toString()].avatar
                                }`}
                            />

                            {/*<div className={style.u_detail_students}>*/}
                            {/*    <GiftOutlined className={style.icon} />*/}
                            {/*    <span>*/}
                            {/*        <b>7021</b> học viên*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                            {/*<div className={style.u_detail_students}>*/}
                            {/*    <VideoCameraAddOutlined className={style.icon} />*/}
                            {/*    <span>*/}
                            {/*        <b>2</b> khóa học*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                }}
                            >
                                {author_id &&
                                    usersObj[author_id.toString()] &&
                                    usersObj[author_id.toString()].name &&
                                    usersObj[author_id.toString()].name}
                            </div>
                            {myUser && myUser.introduce ? (
                                <div dangerouslySetInnerHTML={{ __html: myUser.introduce ? myUser.introduce : ' ' }} />
                            ) : (
                                '[Hãy cập nhật]'
                            )}
                            <br></br>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        author_id &&
                                        usersObj[author_id.toString()] &&
                                        usersObj[author_id.toString()].info_teacher &&
                                        usersObj[author_id.toString()].info_teacher,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.u_des_course}>
                <div className={style.container_destination}>
                    <h2>Nhận xét của học viên</h2>
                    <hr style={{ height: 0.5, backgroundColor: '#99eae1' }} />
                    <CommentDetail />
                </div>
            </div>
        </div>
    );
}

ContentDetail.propTypes = {};

ContentDetail.defaultProps = {};

export default ContentDetail;
