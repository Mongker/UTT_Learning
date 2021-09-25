/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 24/11/2020
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function MetaView({ title, description, url, image, name }) {
    return (
        <Head>
            <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='robots' content='index, follow' />
            {/*<link rel='icon' href={icon} />*/}
            <meta name='author' content={name} />
            <meta name='keywords' content={description} />

            {/* ROBOTS */}
            <meta name='googlebot' content={'noarchive'} />
            <meta name='robots' content={'noarchive'} />

            {/* SEO google, facebook */}
            <meta property='og:description' content={description} />
            <meta property='og:url' content={url} />
            <meta property='og:title' content={title} />
            <meta property='og:type' content='article' />
            <meta property='og:image' content={image} />
            <meta property='og:image:width' content='720' />
            <meta property='og:image:height' content='480' />
        </Head>
    );
}

MetaView.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
};

MetaView.defaultProps = {
    image: 'https://photos.app.goo.gl/LrXPXRAgF1CpcpiUA',
    title: 'Tổng kho gỗ Hoàng Gia Start',
    name: 'Hoàng Gia Start',
    description:
        'Tổng kho gỗ Hoàng Gia Start chuyên phân phối số lượng lớn các sản phẩm gỗ công nghiệp, gỗ nhân tạo, tấm Cemboard, … tại Thanh Hóa, Nghệ An, Ninh Bình, Hà Nội và các tỉnh miền bắc với giá bán sỉ đến trực tiếp tay người tiêu dùng, hàng đảm bảo chất lượng, hàng tồn kho luôn đầy đủ cung cấp cho khách hàng.',
    url: 'https://hoanggiastart.com',
};

export default MetaView;
