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

function MetaView({ title, description, url, image, icon, name }) {
    return (
        <Head>
            <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='robots' content='index, follow' />
            <link rel='icon' href={icon} />
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
    image: 'https://static.unica.vn/media/images/unica-hoctuchuyengia.jpg',
    title: 'UTT Learning - Học online cùng chuyên gia',
    name: 'Mongker',
    description:
        'UTT Learning - Hệ thống khóa học trực tuyến dành cho người đi làm với hơn 500.000 học viên đang theo học và 2.000 khóa học từ chuyên gia hàng đầu mọi lĩnh vực',
    icon: 'https://static.unica.vn/icon/favicon.ico',
    url: 'https://unica.vercel.app/',
};

export default MetaView;
