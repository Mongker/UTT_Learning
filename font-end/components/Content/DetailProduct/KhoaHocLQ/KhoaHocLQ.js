import React from 'react';
import { List, Rate } from 'antd';
import style from '../style.module.scss';
import { GiftOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types';
const dataLienQuan = [
    {
        title: <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Tiếng Anh giao tiếp cho người mới bắt đầu</div>,
    },
    {
        title: <div style={{ fontWeight: 'bold', fontSize: '16px' }}>12 chủ đề giao tiếp Tiếng Anh quan trọng (1b)</div>,
    },
    {
        title: <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Luna A: Chinh phục 9 điểm thi đại học môn tiếng Anh I</div>,
    },
];
function KhoaHoc() {
    return (
        <div>
            <List
                itemLayout='horizontal'
                dataSource={dataLienQuan}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <div>
                                <p style={{ fontWeight: 'bold', fontSize: 20 }}>599.000 Đ</p>
                                <p style={{ textDecorationLine: 'line-through' }}>800.000 Đ</p>
                            </div>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<img style={{ width: 200, height: 130 }} src='https://static.unica.vn/upload/images/2019/04/tieng-anh-giao-tiep-cho-nguoi-bat-dau-_m_1555572976.jpg' />}
                            title={<a href='https://ant.design'>{item.title}</a>}
                            description={
                                <div style={{ paddingTop: 10 }}>
                                    <div>Linh Vũ</div>
                                    <div style={{ display: 'flex' }}>
                                        <div className={style.u_detail_rate}>
                                            <Rate allowHalf defaultValue={2.5} className={style.icon} />
                                            <span>263 đánh giá</span>
                                        </div>
                                        <div className={style.u_detail_students}>
                                            <GiftOutlined className={style.icon} />
                                            <span>7021 học viên</span>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

KhoaHoc.propTypes = {};

KhoaHoc.defaultProps = {};

export default KhoaHoc;
