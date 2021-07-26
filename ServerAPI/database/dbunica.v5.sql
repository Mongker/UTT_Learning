-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 10, 2021 lúc 03:17 AM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dbunica`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `biodata`
--

CREATE TABLE `biodata` (
  `id_biodata` int(11) NOT NULL,
  `nama` varchar(40) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `biodata`
--

INSERT INTO `biodata` (`id_biodata`, `nama`, `alamat`) VALUES
(2, 'Muh Berlian Nusantara', 'Banyuwangi'),
(3, 'Ivan Fadila', 'Lumajang'),
(4, 'Dinar pratnyaningrum', 'Malang'),
(5, 'raka ardianata', 'condong');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status_cart` tinyint(1) NOT NULL,
  `code` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(10) NOT NULL,
  `rootId` int(10) NOT NULL,
  `icon` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sort_order` int(11) NOT NULL COMMENT 'Thứ tự xắp sếp',
  `create` varchar(100) COLLATE utf8_unicode_ci DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `rootId`, `icon`, `status`, `name`, `description`, `sort_order`, `create`) VALUES
(63, 1, '[jwI]-language.png', 1, 'Ngoại ngữ', 'Nơi đăng tải các khóa học giảng dạy ngoại ngữ', 1, '2021-05-01 07:04:51'),
(64, 1, '[EGi]-line-chart.png', 1, 'Marketing', '', 1, '2021-05-01 07:07:03'),
(65, 1, '[yfo]-desktop-monitor.png', 1, 'Tin học văn phòng', '', 1, '2021-05-01 07:07:31'),
(66, 1, '[rGF]-paintbrush.png', 1, 'Thiết kế', '', 1, '2021-05-01 07:07:49'),
(67, 1, '[8XV]-rocket.svg', 1, 'Kinh doanh', '', 1, '2021-05-01 07:10:17'),
(68, 1, '[WTN]-big-light.png', 1, 'Phát triển cá nhân', '', 1, '2021-05-01 07:11:10'),
(69, 1, '[aUc]-shopping-cart.png', 1, 'Sales, bán hàng', '', 1, '2021-05-01 07:11:36'),
(70, 1, '[nlT]-coding.png', 1, 'Công nghệ thông tin', '', 1, '2021-05-01 07:12:01'),
(71, 1, '[F7g]-heartbeat.png', 1, 'Sức khỏe - giới tính', '', 1, '2021-05-01 07:12:30'),
(72, 1, '[Nk5]-restaurant.png', 1, 'Phong cách sống', '', 1, '2021-05-01 07:12:53'),
(73, 1, '[Jz8]-baby-boy.png', 1, 'Nuôi dạy con', '', 1, '2021-05-01 07:13:16'),
(74, 1, '[CRY]-group.png', 1, 'Hôn nhân & Gia đình', '', 1, '2021-05-01 07:13:50'),
(75, 1, '[XLJ]-camera.png', 1, 'Nhiếp ảnh, làm phim', '', 1, '2021-05-01 07:14:10'),
(76, 63, '', 1, 'Tiếng Anh', '', 1, '2021-05-01 07:22:10'),
(77, 63, '', 1, 'Tiếng Hàn', '', 1, '2021-05-01 07:22:26'),
(78, 63, '', 1, 'Tiếng Trung', '', 1, '2021-05-01 12:38:43'),
(79, 63, '', 1, 'Tiếng Nhật', '', 1, '2021-05-01 12:38:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `vote` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `create` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `link_file` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `video_id` int(11) NOT NULL,
  `status_feedback` tinyint(1) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `status_order` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(10) NOT NULL,
  `catalog_id` int(10) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` double(8,2) NOT NULL,
  `image_link` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `trailer_link` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `author_id` int(10) NOT NULL,
  `sale` int(10) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `number_user` int(100) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `catalog_id`, `name`, `content`, `price`, `image_link`, `trailer_link`, `author_id`, `sale`, `status`, `number_user`) VALUES
(33, 63, 'Anh văn giao tiếp cho người hoàn toàn mất gốc', 'Khóa học tiếng Anh giao tiếp cho người mất gốc khơi dậy niềm đam mê tiếng Anh, tự tin giao tiếp tiếng Anh như người bản xứ, mở ra cơ hội học tập, làm việc tại các công ty đa quốc gia và tự tin hơn trong giao tiếp với người bản địa dù ở bất kỳ hoàn cảnh nà', 10.00, '[Nxv]-anh-van-giao-tiep-cho-nguoi-hoan-toan-mat-goc_m_1555555777.jpg', '[AJJ]-[p3q]-videoplayback.mp4', 19, 0, 1, 0),
(34, 64, 'Facebook Marketing từ A - Z', 'Học Facebook Marketing Online từ A-Z từ giảng viên Hồ Ngọc Cương sẽ hướng dẫn chuyên sâu bạn về các thủ thuật liên quan đến quảng cáo Facebook Ads, giúp bạn tự lên các chiến lược về Facebook Marketing hoàn hảo cũng như tự chạy quảng cáo Facebook Ads chuyê', 10.00, '[QO4]-facebook-marketing-a-z_m_1555557477.jpg', '[rKd]-[p3q]-videoplayback.mp4', 19, 0, 1, 0),
(35, 75, 'Làm phim hoạt hình 2D với MAYA', 'Hướng dẫn làm phim hoạt hình 2D tạo nên 1 tác phẩm tuyệt vời một cách chuyên nghiệp với Maya', 10.00, '[bd7]-tao-hoat-hinh-2d-voi-maya_m_1556178292.jpg', '[dtC]-[p3q]-videoplayback.mp4', 19, 0, 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sort_order` int(11) NOT NULL,
  `vote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `right_answer` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'câu trả lời đúng',
  `study_program_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `student_answers`
--

CREATE TABLE `student_answers` (
  `id` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  `test_examcises_id` int(11) NOT NULL,
  `selection` text COLLATE utf8_unicode_ci NOT NULL,
  `result` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `study_program`
--

CREATE TABLE `study_program` (
  `id` int(11) NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'trang thái',
  `random_question` tinyint(1) NOT NULL,
  `is_time_question` tinyint(1) NOT NULL,
  `number_minute_check` int(11) NOT NULL,
  `pass_poin` int(11) NOT NULL COMMENT 'điểm qua bài kiểm tra',
  `product_id` int(10) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `study_program`
--

INSERT INTO `study_program` (`id`, `content`, `status`, `random_question`, `is_time_question`, `number_minute_check`, `pass_poin`, `product_id`, `name`) VALUES
(22, '<div class=\"u-learn-what\">\n<h3>Bạn sẽ học được g&igrave;</h3>\n<div class=\"content\">\n<div class=\"row\">\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Lấy lại nền tảng tiếng Anh bị mất gốc, tập trung v&agrave;o phần n&oacute;i v&agrave; nghe</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Tự tin trong cuộc sống v&agrave; giao tiếp với người nước ngo&agrave;i</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Bổ trợ cho c&ocirc;ng việc cũng như học tập một c&aacute;ch tốt nhất v&agrave; hiệu quả nhất.</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">C&oacute; thể giao tiếp v&agrave; trả lời phỏng vấn bằng tiếng anh lưu lo&aacute;t.&nbsp;</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Nắm bắt được yếu tố cần thiết khi giao tiếp v&agrave; l&agrave;m việc với người nước ngo&agrave;i</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Cơ hội l&agrave;m việc trong m&ocirc;i trường nước ngo&agrave;i với chế độ đ&atilde;i ngộ cao</div>\n</div>\n</div>\n</div>\n</div>\n<p>&nbsp;</p>\n<div id=\"u-des-course\" class=\"u-des-course\">\n<h2>Giới thiệu kh&oacute;a học</h2>\n<h3><strong>Tầm quan trọng của tiếng Anh</strong></h3>\n<p>Học một ng&ocirc;n ngữ đồng nghĩa với việc bạn sẽ học th&ecirc;m một ng&ocirc;n ngữ của một nền văn h&oacute;a. Hiện nay, Tiếng Anh được xem l&agrave; ng&ocirc;n ngữ chung của thế giới, v&igrave; vậy ng&agrave;y c&agrave;ng nhiều người Việt đầu tư học tiếng Anh.&nbsp;</p>\n<p>Bạn c&oacute; thể nhận thấy, rất nhiều t&agrave;i liệu học tập ng&agrave;y nay của c&aacute;c tổ chức, c&aacute;c trường đại học lớn đều đươc viết bằng tiếng Anh. &frac12; t&agrave;i liệu tr&ecirc;n c&aacute;c website lớn đều được viết bằng tiếng Anh.</p>\n<p>Kh&ocirc;ng những thế, sự hội nhập của thế giới v&agrave;o thị trường Việt Nam của c&aacute;c c&ocirc;ng ty nước ngo&agrave;i khiến cho tiếng Anh c&agrave;ng trở n&ecirc;n quan trọng. Nếu bạn biết tiếng Anh th&igrave; sẽ rất dễ d&agrave;ng xin được c&ocirc;ng việc tốt, nhanh ch&oacute;ng thăng tiến.</p>\n<h3><strong>Học tiếng Anh bắt đầu từ đ&acirc;u?</strong></h3>\n<p>Tuy nhi&ecirc;n, bạn l&agrave; những đối tượng mất căn bản tiếng Anh, mất gốc tiếng Anh? Bạn đ&atilde; qu&aacute; ch&aacute;n nản với việc học tiếng Anh nhiều năm chưa tiến bộ? Bạn đang t&igrave;m kiếm kho&aacute; học ngoại ngữ online cho người mất gốc nhưng chưa biết t&igrave;m ở đ&acirc;u.&nbsp;Bạn đang muốn t&igrave;m kiếm một giải ph&aacute;p hiệu quả để học được tiếng Anh nhưng bạn lại qu&aacute; &ldquo;lười&rdquo; để t&igrave;m kiếm c&aacute;c trung t&acirc;m học.<br />&nbsp;<br />Những điều bạn băn khoăn sẽ được xua tan ngay khi bạn đăng k&yacute; kh&oacute;a học của Unica, kh&oacute;a học tiếng anh mất gốc&nbsp;sẽ gi&uacute;p bạn khắc phục tất cả kh&oacute; khăn để vực dậy, khơi nguồn niềm đam m&ecirc; với TIẾNG ANH. Kh&oacute;a học tiếng anh giao tiếp cho người mất gốc gi&uacute;p&nbsp;bạn biết được c&aacute;ch học tiếng Anh đ&uacute;ng c&aacute;ch. C&aacute;c bạn sẽ được nhập vai v&agrave;o c&aacute;c t&igrave;nh huống tiếng Anh giao tiếp hết sức th&uacute; vị thực tế h&agrave;ng ng&agrave;y.</p>\n<p>Lộ tr&igrave;nh học &ldquo;<strong>Anh văn giao tiếp cho người ho&agrave;n to&agrave;n mất gốc</strong>&rdquo; của Giảng vi&ecirc;n Ruby Thảo Trần giao tiếp c&ugrave;ng phương ph&aacute;p phản xạ truyền cảm hứng sẽ gi&uacute;p bạn n&acirc;ng cao tr&igrave;nh độ một c&aacute;ch nhanh ch&oacute;ng v&agrave; hiệu quả, bạn sẽ ho&agrave;n to&agrave;n tự tin với tr&igrave;nh độ tiếng Anh giao tiếp mới của bản th&acirc;n đấy! &nbsp;</p>\n<p>Với tầm quan trọng của tiếng Anh, đ&oacute; ch&iacute;nh l&agrave; l&yacute; do m&agrave; bạn kh&ocirc;ng n&ecirc;n chậm trễ để trở th&agrave;nh học vi&ecirc;n của kh&oacute;a học &ldquo;<strong>Tiếng Anh cho người ho&agrave;n to&agrave;n mất gốc</strong>&rdquo; tr&ecirc;n UNICA.</p>\n<p>&gt;&gt;&gt; Đăng k&yacute; ngay&nbsp;kh&oacute;a học tiếng anh cho người mất gốc ngay h&ocirc;m nay để nhận những ưu đ&atilde;i hấp dẫn đến từ Unica!</p>\n</div>', 1, 0, 0, 0, 0, 33, 'Phát âm tiếng Anh giọng Mỹ'),
(23, '<p id=\"breadcrumbs\"><a href=\"https://vn.elsaspeak.com/\">ELSA</a>&nbsp;&raquo;&nbsp;<a href=\"https://vn.elsaspeak.com/hoc-tieng-anh/\">Học tiếng Anh</a>&nbsp;&raquo;&nbsp;<span class=\"breadcrumb_last\" aria-current=\"page\">Học tiếng Anh theo chủ đề cực kỳ đơn giản v&agrave; hiệu quả</span></p>\n<div class=\"blog-page-content-body\">\n<div class=\"page-content-wrapper\">\n<article class=\"blog-post-content\">\n<div class=\"header-post-image\"><img class=\"attachment-full size-full wp-post-image\" src=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/11/chu-de-truong-lop.png.webp\" sizes=\"(max-width: 1000px) 100vw, 1000px\" srcset=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/11/chu-de-truong-lop.png.webp 1000w,  https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/11/chu-de-truong-lop-300x215.png.webp 300w,  https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/11/chu-de-truong-lop-768x549.png.webp 768w,  https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/11/chu-de-truong-lop-350x250.png.webp 350w\" alt=\"Học tiếng Anh theo chủ đề cực kỳ đơn giản v&agrave; hiệu quả\" width=\"1000\" height=\"715\" loading=\"lazy\" /></div>\n<h1 class=\"post-title\">Học tiếng Anh theo chủ đề cực kỳ đơn giản v&agrave; hiệu quả</h1>\n<div class=\"meta-info-social-contain\">\n<ul class=\"meta-info\">\n<li class=\"meta-time\"><span id=\"post-time\" class=\"time\">Th&aacute;ng Mười Một 13, 2020</span></li>\n&nbsp;\n<li class=\"meta-category\">&nbsp;<a id=\"meta-category-post\" href=\"https://vn.elsaspeak.com/hoc-tieng-anh/\">Học tiếng Anh</a></li>\n</ul>\n<div class=\"blog-social-share\">\n<ul class=\"blog-social-share-list\">\n<li class=\"blog-social-share-item\">&nbsp;</li>\n&nbsp;\n<li class=\"blog-social-share-item\">&nbsp;</li>\n&nbsp;\n<li class=\"blog-social-share-item\">&nbsp;</li>\n&nbsp;\n<li class=\"blog-social-share-item\">&nbsp;</li>\n</ul>\n</div>\n</div>\n<div class=\"blog-post-content\">\n<div class=\"content-text\">\n<p><em>Tiếng Anh ng&agrave;y c&agrave;ng đ&oacute;ng vai tr&ograve; thiết yếu trong cuộc sống của thế hệ trẻ bởi sự hội nhập quốc tế như hiện nay. C&oacute; rất nhiều&nbsp;</em><a href=\"https://vn.elsaspeak.com/cach-hoc-tieng-anh-cung-elsa-speak/\" target=\"_blank\" rel=\"noreferrer noopener\"><strong><em>c&aacute;ch học tiếng Anh</em></strong></a><em>&nbsp;được lan truyền rộng r&atilde;i tr&ecirc;n Internet, tuy nhi&ecirc;n phương ph&aacute;p phổ biến, được ứng dụng nhiều nhất l&agrave;&nbsp;</em><strong><em>học tiếng Anh theo chủ đề</em></strong><em>. C&ugrave;ng ELSA Speak t&igrave;m hiểu về học v&agrave; luyện n&oacute;i tiếng Anh theo chủ đề với kho từ vựng phong ph&uacute;</em>.</p>\n<div class=\"lwptoc lwptoc-autoWidth lwptoc-baseItems lwptoc-light lwptoc-notInherit\" data-smooth-scroll=\"1\" data-smooth-scroll-offset=\"24\" data-lwptoc-initialized=\"1\">\n<div class=\"lwptoc_i\">\n<div class=\"lwptoc_header\"><strong class=\"lwptoc_title\">Contents</strong>&nbsp;<span class=\"lwptoc_toggle\">&nbsp;<a class=\"lwptoc_toggle_label\" href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/\" data-label=\"show\">hide</a>&nbsp;</span></div>\n<div class=\"lwptoc_items lwptoc_items-visible\">\n<div class=\"lwptoc_itemWrap\">\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Loi_ich_khi_hoc_tieng_Anh_theo_chu_de\"><span class=\"lwptoc_item_label\">Lợi &iacute;ch khi học tiếng Anh theo chủ đề</span></a>\n<div class=\"lwptoc_itemWrap\">\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Phan_xa_tieng_Anh_tang_len_ro_ret\"><span class=\"lwptoc_item_label\">Phản xạ tiếng Anh tăng l&ecirc;n r&otilde; rệt</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Trai_Nghiem_Thu_ELSA\"><span class=\"lwptoc_item_label\">Trải Nghiệm Thử ELSA</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#De_dang_lien_tuong_noi_dung\"><span class=\"lwptoc_item_label\">Dễ d&agrave;ng li&ecirc;n tưởng nội dung</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Nho_tu_vungmau_cau_nhanh_va_lau_hon\"><span class=\"lwptoc_item_label\">Nhớ từ vựng/mẫu c&acirc;u nhanh v&agrave; l&acirc;u hơn</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Hoc_tieng_Anh_theo_chu_de_giao_tiep_tao_cam_hung_cho_nguoi_hoc\"><span class=\"lwptoc_item_label\">Học tiếng Anh theo chủ đề giao tiếp tạo cảm hứng cho người học</span></a></div>\n</div>\n</div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#5_cach_hoc_tu_vung_tieng_Anh_theo_chu_de_hieu_qua\"><span class=\"lwptoc_item_label\">5 c&aacute;ch học từ vựng tiếng Anh theo chủ đề hiệu quả</span></a>\n<div class=\"lwptoc_itemWrap\">\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Hieu_ro_co_che_hoat_dong_cua_nao_bo\"><span class=\"lwptoc_item_label\">Hiểu r&otilde; cơ chế hoạt động của n&atilde;o bộ</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Tao_ky_luat_cho_ban_than\"><span class=\"lwptoc_item_label\">Tạo kỷ luật cho bản th&acirc;n</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Hoc_chat_luong_khong_hoc_so_luong\"><span class=\"lwptoc_item_label\">Học chất lượng, kh&ocirc;ng học số lượng</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Ket_hop_am_thanh_hinh_anh_khi_hoc_tieng_Anh_theo_chu_de\"><span class=\"lwptoc_item_label\">Kết hợp &acirc;m thanh, h&igrave;nh ảnh khi học tiếng Anh theo chủ đề</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Hoc_tu_vung_theo_tieng_Anh_chu_de_phai_phu_hop_voi_cap_do\"><span class=\"lwptoc_item_label\">Học từ vựng theo tiếng Anh chủ đề phải ph&ugrave; hợp với cấp độ</span></a></div>\n</div>\n</div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Tu_vung_tieng_Anh_thong_dung_theo_3_chu_de_giao_tiep_co_ban_trong_cuoc_song\"><span class=\"lwptoc_item_label\">Từ vựng tiếng Anh th&ocirc;ng dụng theo 3 chủ đề giao tiếp cơ bản trong cuộc sống</span></a>\n<div class=\"lwptoc_itemWrap\">\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Hoc_tieng_Anh_theo_Chu_de_Dong_Vat_Thuc_vat\"><span class=\"lwptoc_item_label\">Học tiếng Anh theo Chủ đề Động Vật &ndash; Thực vật</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Hoc_tieng_Anh_theo_Chu_de_Con_nguoi\"><span class=\"lwptoc_item_label\">Học tiếng Anh theo Chủ đề Con người</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Hoc_tieng_Anh_theo_Chu_de_Gia_dinh_va_moi_quan_he\"><span class=\"lwptoc_item_label\">Học tiếng Anh theo Chủ đề Gia đ&igrave;nh v&agrave; mối quan hệ</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Hoc_tu_vung_tieng_anh_theo_chu_de_ve_thoi_tiet\"><span class=\"lwptoc_item_label\">Học từ vựng tiếng anh theo chủ đề về thời tiết</span></a></div>\n</div>\n</div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Cac_chuong_trinh_truyen_hinh_giup_ban_hoc_tieng_Anh_theo_chu_de_de_dang_hon\"><span class=\"lwptoc_item_label\">C&aacute;c chương tr&igrave;nh truyền h&igrave;nh gi&uacute;p bạn học tiếng Anh theo chủ đề dễ d&agrave;ng hơn</span></a>\n<div class=\"lwptoc_itemWrap\">\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#The_Apprentice_Nguoi_tap_su\"><span class=\"lwptoc_item_label\">The Apprentice (Người tập sự)</span></a></div>\n<div class=\"lwptoc_item\"><a href=\"https://vn.elsaspeak.com/hoc-tieng-anh-theo-chu-de-cung-elsa-speak/#Masterchef_Vua_Dau_Bep\"><span class=\"lwptoc_item_label\">Masterchef (Vua Đầu Bếp)</span></a></div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<h2><span id=\"Loi_ich_khi_hoc_tieng_Anh_theo_chu_de\">Lợi &iacute;ch khi học tiếng Anh theo chủ đề&nbsp;</span></h2>\n<p>Mỗi người sẽ c&oacute; một c&aacute;ch học ri&ecirc;ng cho bản th&acirc;n, tuy nhi&ecirc;n,&nbsp;<strong>học tiếng Anh theo chủ đề</strong>&nbsp;l&agrave; một trong những c&aacute;ch được c&aacute;c chuy&ecirc;n gia đ&aacute;nh gi&aacute; cao. Vậy th&igrave; h&atilde;y c&ugrave;ng t&igrave;m hiểu tại sao đa số mọi người học tiếng Anh đều đi theo phương ph&aacute;p n&agrave;y.</p>\n<h3><span id=\"Phan_xa_tieng_Anh_tang_len_ro_ret\"><strong>Phản xạ tiếng Anh tăng l&ecirc;n r&otilde; rệt</strong></span></h3>\n<div class=\"wp-block-image\">\n<figure class=\"aligncenter size-large\"><img class=\"wp-image-3188\" src=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/phan-xa-giao-tiep-trong-tieng-anh.jpg.webp\" sizes=\"(max-width: 700px) 100vw, 700px\" srcset=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/phan-xa-giao-tiep-trong-tieng-anh.jpg.webp 700w,  https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/phan-xa-giao-tiep-trong-tieng-anh-300x171.jpg.webp 300w\" alt=\"Phản xạ tiếng Anh của bạn tăng r&otilde; rệt khi học từ vựng theo chủ đề | ELSA Speak\" width=\"700\" height=\"399\" loading=\"lazy\" /></figure>\n</div>\n<p>Nếu muốn&nbsp;<strong><a href=\"https://vn.elsaspeak.com/luyen-noi-tieng-anh-nhu-nguoi-ban-xu/\">n&oacute;i tiếng Anh</a></strong>&nbsp;lưu lo&aacute;t, tập luyện phản xạ l&agrave; v&ocirc; c&ugrave;ng cần thiết. Bạn cũng cần phải biết rằng, c&oacute; vốn từ vựng tốt l&agrave; một yếu tố l&agrave;m n&ecirc;n điều n&agrave;y. Tại sao học từ vựng lại hỗ trợ phản xạ tốt hơn?</p>\n<p>Đơn giản th&ocirc;i, khi t&iacute;ch lũy c&aacute;c trường từ vựng li&ecirc;n quan đến nhau, bộ n&atilde;o sẽ k&iacute;ch hoạt tra từ v&agrave; dự đo&aacute;n những từ li&ecirc;n quan gi&uacute;p bạn nghe hiểu v&agrave; phản xạ nhanh khi&nbsp;<strong><a href=\"https://vn.elsaspeak.com/3-cach-giao-tiep-tieng-anh-don-gian-nhanh-chong/\">giao tiếp tiếng Anh</a></strong>&nbsp;với người kh&aacute;c.</p>\n<div class=\"tIwZVpnu\">\n<div class=\"test_random\">\n<h3><span id=\"Trai_Nghiem_Thu_ELSA\">Trải Nghiệm Thử ELSA</span></h3>\n<div role=\"main\">\n<div id=\"app\" class=\"\">\n<div class=\"questionContainer\">\n<div class=\"row destop_question\">\n<div class=\"col\">\n<div class=\"titleContainer\">We will go sightseeing and stay at a resort by the ocean.</div>\n</div>\n<div class=\"col col-lg-3\">\n<div class=\"viewContainer\">\n<div class=\"playback\">&nbsp;</div>\n<span class=\"tooltiptext\">Click to start recording!</span>\n<div class=\"recorder css-tooltip\" title=\"Click to start recording!\">\n<div>&nbsp;</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n<p>Bạn sẽ tiết kiệm được thời gian t&igrave;m kiếm nghĩa v&agrave; c&aacute;ch d&ugrave;ng của một từ vựng n&agrave;o đ&oacute;, những g&igrave; l&agrave; vốn liếng từ vựng trước đ&acirc;y cứ thế tự động tu&ocirc;n tr&agrave;o.</p>\n<h3><span id=\"De_dang_lien_tuong_noi_dung\"><strong>Dễ d&agrave;ng li&ecirc;n tưởng nội dung</strong></span></h3>\n<p>Nếu viết tất cả từ vựng ra giấy như l&agrave; mớ từ vựng hỗn độn th&igrave; rất kh&oacute; nhớ, song kh&ocirc;ng biết ở đ&acirc;u, chỗ n&agrave;o m&agrave; t&igrave;m. Bạn sẽ mất rất nhiều thời gian t&igrave;m kiếm, g&acirc;y ch&aacute;n nản.&nbsp;</p>\n<div class=\"wp-block-image\">\n<figure class=\"aligncenter size-large\"><img class=\"wp-image-3193\" src=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/hoc-tieng-anh-theo-chu-de-giup-tang-phan-xa-giao-tiep.jpg.webp\" sizes=\"(max-width: 700px) 100vw, 700px\" srcset=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/hoc-tieng-anh-theo-chu-de-giup-tang-phan-xa-giao-tiep.jpg.webp 700w,  https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/hoc-tieng-anh-theo-chu-de-giup-tang-phan-xa-giao-tiep-300x197.jpg.webp 300w\" alt=\"học tiếng Anh theo chủ đề gi&uacute;p bạn học hiệu quả hơn | ELSA Speak\" width=\"700\" height=\"459\" loading=\"lazy\" /></figure>\n</div>\n<p>V&iacute; dụ, học từ vựng về c&aacute;c loại nh&agrave; ở v&agrave; nội thất bếp. Bạn c&oacute; thể học v&agrave; t&igrave;m từ vựng, cụm từ li&ecirc;n quan m&agrave; c&oacute; li&ecirc;n quan đến chủ đề đ&oacute;. Hơn nữa, t&igrave;m những h&igrave;nh ảnh của ch&iacute;nh đồ vật đ&oacute; cũng gi&uacute;p bạn nhớ l&acirc;u hơn.</p>\n<h3><span id=\"Nho_tu_vungmau_cau_nhanh_va_lau_hon\"><strong>Nhớ từ vựng/mẫu c&acirc;u nhanh v&agrave; l&acirc;u hơn</strong></span></h3>\n<p>C&oacute; lẽ kh&ocirc;ng &iacute;t người học tiếng Anh suốt nhiều năm ở trường nhưng học trước qu&ecirc;n sau. Sau khi trải qua c&aacute;c kỳ thi th&igrave; qu&ecirc;n hết những g&igrave; đ&atilde; học. Bởi, đa số c&aacute;ch học hiện nay theo kiểu ghi ra giấy từng từ, ch&eacute;p đi ch&eacute;p lại học rập khu&ocirc;n, m&aacute;y m&oacute;c. V&agrave; c&aacute;c từ n&agrave;y th&igrave; chẳng li&ecirc;n quan g&igrave; tới nhau. Đ&oacute; cũng l&agrave; l&yacute; do v&igrave; sao học xong được v&agrave;i bữa lại qu&ecirc;n hẳn lu&ocirc;n.</p>\n<p>Thế nhưng nếu&nbsp;<strong>học tiếng Anh theo chủ đề</strong>&nbsp;th&igrave; bạn sẽ thấy những từ vựng ở lại rất l&acirc;u trong bộ nhớ của m&igrave;nh. Tại sao lại thế?</p>\n<p>V&igrave; học theo chủ đề ch&uacute;ng ta sẽ học từng từ, cụm từ c&oacute; li&ecirc;n quan. V&agrave; khi n&atilde;o bộ t&igrave;m lại th&ocirc;ng tin dễ hơn, &iacute;t tốn thời gian hơn, chỉ cần nhớ một v&agrave;i từ quan trọng c&oacute; thể nhớ được cả trường từ vựng.</p>\n<p>Sau khi học từ vựng, c&aacute;c bạn n&ecirc;n viết th&agrave;nh đoạn văn hoặc tự tạo t&igrave;nh huống thực tế để đồng thời phản xạ tiếng Anh được cải thiện hơn nh&eacute;!</p>\n<h3><span id=\"Hoc_tieng_Anh_theo_chu_de_giao_tiep_tao_cam_hung_cho_nguoi_hoc\"><strong>Học tiếng Anh theo chủ đề giao tiếp tạo cảm hứng cho người học</strong></span></h3>\n<p>Nếu t&igrave;m kiếm v&agrave; học tiếng Anh theo từng từ rời rạc đem đến sự nh&agrave;m ch&aacute;n,&nbsp;<strong>học từ vựng tiếng Anh theo chủ đề</strong>&nbsp;lại kh&aacute;c ho&agrave;n to&agrave;n. Bạn c&oacute; thể tự chọn cho m&igrave;nh chủ đề m&agrave; bản th&acirc;n đam m&ecirc; để học trước. V&iacute; dụ, bạn y&ecirc;u th&iacute;ch đồ nội thất hay ẩm thực, h&atilde;y t&igrave;m những đoạn phim ngắn hoặc c&aacute;c b&agrave;i b&aacute;o n&oacute;i về chủ đề đ&oacute; để chinh phục to&agrave;n bộ từ vựng li&ecirc;n quan đến lĩnh vực đ&oacute;. Từ đ&oacute;, tiếng Anh của bạn sẽ tốt v&agrave; ho&agrave;n thiện hơn mỗi ng&agrave;y.</p>\n<p>Nghi&ecirc;n cứu cho thấy chỉ cần bạn nắm được khoảng 3000 từ vựng tiếng Anh trong c&aacute;c chủ đề th&ocirc;ng dụng l&agrave; đ&atilde; c&oacute; thể&nbsp;<strong><a href=\"https://vn.elsaspeak.com/3-cach-giao-tiep-tieng-anh-don-gian-nhanh-chong/\">giao tiếp tiếng Anh</a></strong>&nbsp;th&agrave;nh thạo. Một điều th&uacute; vị l&agrave; khi&nbsp;<strong>học tiếng Anh theo chủ đề</strong>&nbsp;th&igrave; mỗi chủ đề đều c&oacute; v&iacute; dụ minh họa r&otilde; r&agrave;ng k&egrave;m theo h&igrave;nh ảnh sinh động. V&igrave; vậy, phương ph&aacute;p n&agrave;y tạo hứng th&uacute; học hơn cũng như tạo động lực cho bạn để&nbsp;<strong><a href=\"https://vn.elsaspeak.com/luyen-noi-tieng-anh-nhu-nguoi-ban-xu/\">n&oacute;i tiếng Anh</a></strong>&nbsp;tốt hơn.</p>\n<h2><span id=\"5_cach_hoc_tu_vung_tieng_Anh_theo_chu_de_hieu_qua\">5 c&aacute;ch học từ vựng tiếng Anh theo chủ đề hiệu quả</span></h2>\n<h3><span id=\"Hieu_ro_co_che_hoat_dong_cua_nao_bo\">Hiểu r&otilde; cơ chế hoạt động của n&atilde;o bộ</span></h3>\n<p>N&atilde;o bộ con người c&oacute; thể ghi nhớ th&ocirc;ng tin chỉ trong 1 &ndash; 2 lần tiếp x&uacute;c, nếu đ&oacute; l&agrave; th&ocirc;ng tin g&acirc;y hứng th&uacute; v&agrave; ấn tượng. Đối với những th&ocirc;ng tin kh&ocirc;ng hứng th&uacute; sẽ được ghi nhớ nếu lặp lại khoảng 7 lần t&aacute;ch biệt.</p>\n<p>Do vậy, việc cố nhồi nh&eacute;t kiến thức trong một khoảng thời gian ngắn sẽ chỉ gi&uacute;p bạn nhớ được v&agrave;i ng&agrave;y đến v&agrave;i tuần. Nếu muốn nhớ từ vựng l&acirc;u hơn, bạn cần chia nhỏ c&aacute;c lần học ra v&agrave; c&oacute; sự &ocirc;n luyện, tiếp x&uacute;c, sử dụng thường xuy&ecirc;n.</p>\n<h3><span id=\"Tao_ky_luat_cho_ban_than\">Tạo kỷ luật cho bản th&acirc;n</span></h3>\n<div class=\"wp-block-image\">\n<figure class=\"aligncenter size-large\"><img class=\"wp-image-3195\" src=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/tao-ky-luat-cho-ban-than-khi-hoc-tieng-anh-giao-tiep-theo-chu-de.jpg.webp\" sizes=\"(max-width: 700px) 100vw, 700px\" srcset=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/tao-ky-luat-cho-ban-than-khi-hoc-tieng-anh-giao-tiep-theo-chu-de.jpg.webp 700w,  https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/tao-ky-luat-cho-ban-than-khi-hoc-tieng-anh-giao-tiep-theo-chu-de-300x200.jpg.webp 300w\" alt=\"Tạo kỷ luật cho bản th&acirc;n khi học tiếng Anh giao tiếp | ELSA Speak\" width=\"700\" height=\"467\" loading=\"lazy\" /></figure>\n</div>\n<p>Động lực l&agrave; điều c&oacute; thể thay đổi theo thời gian, chỉ c&oacute; kỷ luật mới gi&uacute;p bạn ki&ecirc;n tr&igrave; học từ vựng v&agrave; đạt mục ti&ecirc;u của m&igrave;nh. Để việc học n&agrave;y kh&ocirc;ng chỉ diễn ra trong v&agrave;i ng&agrave;y đầu đầy hứng khởi, bạn cần siết chặt kỷ luật của bản th&acirc;n bằng c&aacute;ch đặt ra những mục ti&ecirc;u bắt buộc phải ho&agrave;n th&agrave;nh mỗi ng&agrave;y.</p>\n<p>V&iacute; dụ như mỗi ng&agrave;y phải đọc &iacute;t nhất một đoạn văn hay một b&agrave;i b&aacute;o tiếng Anh, nghe một đoạn hội thoại tiếng Anh để thu thập th&ecirc;m từ v&agrave; xem c&aacute;ch từ vựng được sử dụng như thế n&agrave;o trong thực tế. Để đảm bảo kỷ luật, h&atilde;y tự lập thời gian biểu cho từng tuần, từng th&aacute;ng.</p>\n<h3><span id=\"Hoc_chat_luong_khong_hoc_so_luong\">Học chất lượng, kh&ocirc;ng học số lượng</span></h3>\n<p>Nhiều người đặt mục ti&ecirc;u học 50 từ&nbsp;<a href=\"https://vn.elsaspeak.com/cam-nang-luyen-tieng-anh-giao-tiep-theo-chu-de/\"><strong>tiếng Anh giao tiếp theo chủ đề</strong></a>&nbsp;một ng&agrave;y, nhưng việc n&agrave;y l&agrave; qu&aacute; sức đối với n&atilde;o bộ. Phương ph&aacute;p học n&agrave;y khiến bạn qu&ecirc;n rất nhiều từ trong số 50 từ đ&oacute; sau một v&agrave;i ng&agrave;y, thậm ch&iacute; v&agrave;i giờ đồng hồ.&nbsp;</p>\n<p>Lời khuy&ecirc;n d&agrave;nh cho người mới bắt đầu chỉ n&ecirc;n học tối đa 5 từ mới một ng&agrave;y, tr&igrave;nh độ trung cấp th&igrave; học tăng gấp đ&ocirc;i, đến tr&igrave;nh độ n&acirc;ng cao mới học khoảng 15 từ một ng&agrave;y. V&agrave; nhớ l&agrave; &ocirc;n luyện v&agrave; tập sử dụng những từ đ&atilde; học mỗi ng&agrave;y đấy!</p>\n<h3><span id=\"Ket_hop_am_thanh_hinh_anh_khi_hoc_tieng_Anh_theo_chu_de\">Kết hợp &acirc;m thanh, h&igrave;nh ảnh khi học tiếng Anh theo chủ đề</span></h3>\n<p>Bộ n&atilde;o con người c&oacute; khả năng ghi nhớ &acirc;m thanh, h&igrave;nh ảnh tốt v&agrave; l&acirc;u hơn so hơn c&aacute;c con chữ. Việc kết hợp từ vựng với &acirc;m thanh v&agrave; h&igrave;nh ảnh sẽ gi&uacute;p cho việc học trở n&ecirc;n dễ d&agrave;ng, bớt kh&ocirc; khan v&agrave; hấp dẫn hơn rất nhiều.</p>\n<p>Bạn c&oacute; thể gắn từ vựng theo chủ đề v&agrave;o một c&acirc;u chuyện, phim ảnh hay &acirc;m nhạc để ghi nhớ v&agrave; sử dụng ch&uacute;ng hợp l&yacute; v&agrave; đ&uacute;ng ngữ cảnh trong giao tiếp.</p>\n<h3><span id=\"Hoc_tu_vung_theo_tieng_Anh_chu_de_phai_phu_hop_voi_cap_do\">Học từ vựng theo tiếng Anh chủ đề phải ph&ugrave; hợp với cấp độ</span></h3>\n<p>Quan điểm nhồi nh&eacute;t, học c&agrave;ng nhiều c&agrave;ng tốt, gặp từ n&agrave;o l&agrave; học từ đ&oacute; l&agrave; sai lầm. Bạn n&ecirc;n học những từ m&igrave;nh cần v&agrave; phải đ&uacute;ng với tr&igrave;nh độ của bản th&acirc;n tại thời điểm đ&oacute;.&nbsp;<strong><a href=\"https://vn.elsaspeak.com/cac-bai-luyen-noi-tieng-anh-theo-chu-de/\">C&aacute;c b&agrave;i luyện n&oacute;i tiếng Anh theo chủ đề</a>&nbsp;</strong>sẽ thăng cấp dần từ vựng th&ocirc;ng qua năng lực c&aacute; nh&acirc;n.</p>\n<p>Ở tr&igrave;nh độ cơ bản, bạn chỉ n&ecirc;n học c&aacute;c học từ vựng ở cấp độ A1, A2 (A1, A2 l&agrave; cấp cơ bản theo khung tham chiếu ch&acirc;u &Acirc;u; B1, B2 l&agrave; tr&igrave;nh độ trung cấp v&agrave; C1, C2 l&agrave; tr&igrave;nh độ n&acirc;ng cao). Khi đ&atilde; &ldquo;sắm&rdquo; đủ vốn từ cơ bản, bạn mới n&ecirc;n học l&ecirc;n c&aacute;c nh&oacute;m từ vựng ở cấp độ kh&oacute; hơn.</p>\n<p>Nếu bạn chưa biết từ vựng m&igrave;nh đang học thuộc nh&oacute;m cơ bản hay n&acirc;ng cao, bạn c&oacute; thể tra c&aacute;c từ điển như&nbsp;<a href=\"https://dictionary.cambridge.org/vi/\">Cambridge</a>,&nbsp;<a href=\"https://www.oxfordlearnersdictionaries.com/\">Oxford</a>&nbsp;hoặc&nbsp;<strong><a href=\"https://vn.elsaspeak.com/tu-dien-anh-viet-co-phat-am-tieng-anh/\">từ điển Anh Việt c&oacute; ph&aacute;t &acirc;m</a></strong>&nbsp;online như ELSA Speak.</p>\n<div class=\"wp-block-image\">\n<figure class=\"aligncenter size-large\"><img class=\"wp-image-3200\" src=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/tu-dien-co-phat-anh-anh-viet.jpg.webp\" sizes=\"(max-width: 700px) 100vw, 700px\" srcset=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/tu-dien-co-phat-anh-anh-viet.jpg.webp 700w,  https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/12/tu-dien-co-phat-anh-anh-viet-300x179.jpg.webp 300w\" alt=\"Học tiếng Anh theo chủ đề giao tiếp c&ugrave;ng ELSA Speak\" width=\"700\" height=\"418\" loading=\"lazy\" /></figure>\n</div>\n<h2><span id=\"Tu_vung_tieng_Anh_thong_dung_theo_3_chu_de_giao_tiep_co_ban_trong_cuoc_song\">Từ vựng tiếng Anh th&ocirc;ng dụng theo 3 chủ đề giao tiếp cơ bản trong cuộc sống</span></h2>\n<h3><span id=\"Hoc_tieng_Anh_theo_Chu_de_Dong_Vat_Thuc_vat\">Học tiếng Anh theo Chủ đề Động Vật &ndash; Thực vật</span></h3>\n<figure class=\"wp-block-table\">\n<table>\n<tbody>\n<tr>\n<td>1. Bear (n) &ndash; Con gấu</td>\n<td>11. Monkey (n) &ndash; Con khỉ</td>\n<td>21. Bloom (v) &ndash; Nở hoa</td>\n<td>31. Branch (n) &ndash; Nh&agrave;nh c&acirc;y</td>\n</tr>\n<tr>\n<td>2. Bird (n) &ndash; Con chim</td>\n<td>12. Mouse (n) &ndash; Con chuột</td>\n<td>22. Bud (n) &ndash; B&uacute;p c&acirc;y</td>\n<td>32. Bush (n) &ndash; Bụi c&acirc;y</td>\n</tr>\n<tr>\n<td>3. Cat (n) &ndash; Con m&egrave;o</td>\n<td>13. Pig (n) &ndash; Con heo</td>\n<td>23. Flower (n) &ndash; Hoa</td>\n<td>33. Grass (n) &ndash; Cỏ</td>\n</tr>\n<tr>\n<td>4. Dog (n) &ndash; Con ch&oacute;</td>\n<td>14. Rabbit (n) &ndash; Con thỏ</td>\n<td>24. Grow (v) &ndash; Lớn l&ecirc;n</td>\n<td>34. Leaf (n) &ndash; L&aacute;</td>\n</tr>\n<tr>\n<td>5. Chicken (n) &ndash; Con g&agrave;</td>\n<td>15. Tiger (n) &ndash; Con hổ</td>\n<td>25. Root (n) &ndash; Rễ c&acirc;y</td>\n<td>35. Seed (n) &ndash; Hạt giống</td>\n</tr>\n<tr>\n<td>6. Cow (n) Con b&ograve;</td>\n<td>16. Goat (n) &ndash; Con d&ecirc;</td>\n<td>26. Thorn (n) &ndash; Gai</td>\n<td>36. Tree (n) &ndash; C&acirc;y</td>\n</tr>\n<tr>\n<td>7. Elephant (n) &ndash; Con voi</td>\n<td>17. Donkey (n) &ndash; Con lừa</td>\n<td>27. Trunk (n) &ndash; Th&acirc;n c&acirc;y</td>\n<td>37. Wood (n) &ndash; Gỗ</td>\n</tr>\n<tr>\n<td>8. Fish (n) &ndash; Con c&aacute;</td>\n<td>18. Insect (n) &ndash;&nbsp; C&ocirc;n tr&ugrave;ng</td>\n<td>28. Apple (n) &ndash; T&aacute;o</td>\n<td>38. Coconut (n) &ndash; Dừa</td>\n</tr>\n<tr>\n<td>9. Horse (n) &ndash; Con ngựa</td>\n<td>19. Ox (n) &ndash;&nbsp; Bồ đực</td>\n<td>29. Banana (n)- Chuối</td>\n<td>39. Lemon (n) &ndash; Chanh</td>\n</tr>\n<tr>\n<td>10. Lion (n) &ndash; Con Sư tử</td>\n<td>20. Sheep (n) &ndash; Con cừu</td>\n<td>30. Cherry (n) &ndash; Anh đ&agrave;o</td>\n<td>40. Mango (n) -Xo&agrave;i</td>\n</tr>\n</tbody>\n</table>\n</figure>\n<figure class=\"wp-block-table\">\n<table>\n<tbody>\n<tr>\n<td>41. Ripe (adj) &ndash; Ch&iacute;n</td>\n<td>51. Logan (n) &ndash; Nh&atilde;n</td>\n<td>61. Bell pepper (n) &ndash; Ớt chu&ocirc;ng</td>\n<td>71. Bean (n) &ndash; Đậu</td>\n</tr>\n<tr>\n<td>42. Orange (n) &ndash; Cam</td>\n<td>52. Watermelon (n) &ndash; Dưa hấu</td>\n<td>62. Lettuce (n) &ndash; X&agrave; l&aacute;ch</td>\n<td>72. Ginger (n) &ndash; Gừng</td>\n</tr>\n<tr>\n<td>43. Papaya (n) &ndash; Đu đủ</td>\n<td>53. Avocado (n) &ndash; Bơ</td>\n<td>63. Onion (n) &ndash; H&agrave;nh t&acirc;y</td>\n<td>73. Broccoli (n) &ndash; S&uacute;p lơ xanh</td>\n</tr>\n<tr>\n<td>44. Peach (n) &ndash;&nbsp; Quả đ&agrave;o</td>\n<td>54. Lychee (n) &ndash; Vải thiều</td>\n<td>64. Pea (n) &ndash; Hạt đậu</td>\n<td>74. Cabbage (n) &ndash; Bắp cải</td>\n</tr>\n<tr>\n<td>45. Pear (n) &ndash; Quả l&ecirc;</td>\n<td>55. Juicy (Adj) &ndash; Mọng nước</td>\n<td>65. Potato (n) Khoai t&acirc;y</td>\n<td>75. Sweet potato (n) &ndash; Khoai lang</td>\n</tr>\n<tr>\n<td>46. Pineapple (n) &ndash; Quả dứa</td>\n<td>56. Grapefruit (n) &ndash; Bưởi</td>\n<td>66. Pumpkin (n) &ndash; B&iacute; ng&ocirc;</td>\n<td>76. Taro (n) &ndash; Khoai m&ocirc;n</td>\n</tr>\n<tr>\n<td>47. Plum (n) &ndash; Quả mận</td>\n<td>57.&nbsp; Grapes (n) &ndash; Quả nho</td>\n<td>67. Eggplant (n) &ndash; C&agrave; t&iacute;m</td>\n<td>77. Celery (n) &ndash; Cần t&acirc;y</td>\n</tr>\n<tr>\n<td>48. Guava (n) &ndash; Ổi</td>\n<td>58. Plum (n) &ndash; Mận</td>\n<td>68. Spinach (n) &ndash; Rau bina</td>\n<td>78. Chili (n) &ndash; Ớt</td>\n</tr>\n<tr>\n<td>49. Strawberry (n) &ndash; D&acirc;u t&acirc;y</td>\n<td>59. Areca nut (n) &ndash; Quả cau</td>\n<td>69. Tomato (n) &ndash; C&agrave; chua</td>\n<td>79. Corn (n) &ndash; Ng&ocirc; (bắp)</td>\n</tr>\n<tr>\n<td>50. Star fruit (n) &ndash; Khế</td>\n<td>60. Garlic (n) &ndash; Tỏi</td>\n<td>70. Carrot (n) &ndash; C&agrave; rốt</td>\n<td>80. Cucumber (n) &ndash; Dưa chuột</td>\n</tr>\n</tbody>\n</table>\n</figure>\n<h3><span id=\"Hoc_tieng_Anh_theo_Chu_de_Con_nguoi\">Học tiếng Anh theo Chủ đề Con người</span></h3>\n<figure class=\"wp-block-table\">\n<table>\n<tbody>\n<tr>\n<td>1. Attractive (adj) &ndash; Quyến rũ, thu h&uacute;t</td>\n<td>11. Height (n) &ndash; Chiều cao</td>\n<td>21. Arm (n) &ndash; C&aacute;nh tay</td>\n<td>31. Ear (n) &ndash; Tai</td>\n</tr>\n<tr>\n<td>2. Beautiful (adj) &ndash; Xinh đẹp</td>\n<td>12. Look (n) &ndash; Vẻ bề ngo&agrave;i</td>\n<td>22. Back (n) &ndash; Lưng</td>\n<td>32. Face (n) &ndash; Mặt</td>\n</tr>\n<tr>\n<td>3. Body shape (n) &ndash; Th&acirc;n h&igrave;nh</td>\n<td>13. Lovely (adj) &ndash; Đ&aacute;ng y&ecirc;u</td>\n<td>23. Belly (n) &ndash; Bụng</td>\n<td>33. Eye (n) &ndash; Mắt</td>\n</tr>\n<tr>\n<td>4. Charming (adj) &ndash; Thu h&uacute;t</td>\n<td>14. Muscular (adj) &ndash; Lực lưỡng</td>\n<td>24. Blood (n) &ndash; M&aacute;u</td>\n<td>34. Finger (n) &ndash; Ng&oacute;n tay</td>\n</tr>\n<tr>\n<td>5. Cute (adj) &ndash; Dễ thương, đ&aacute;ng y&ecirc;u</td>\n<td>15. Pretty (adj) &ndash; Xinh xắn</td>\n<td>25. Body (n) &ndash; Cơ thể</td>\n<td>35. Foot (n) &ndash; B&agrave;n ch&acirc;n</td>\n</tr>\n<tr>\n<td>6. Fat (adj) &ndash; B&eacute;o, thừa c&acirc;n</td>\n<td>16. Short (adj) &ndash; Thấp</td>\n<td>26. Body part (n) &ndash; Bộ phận cơ thể</td>\n<td>36. Hair (n) &ndash; T&oacute;c</td>\n</tr>\n<tr>\n<td>7. Feature (n) &ndash; Đặc điểm</td>\n<td>17. Tall (adj) &ndash; Cao</td>\n<td>27. Bone (n) &ndash; Xương</td>\n<td>37. Hand (n) &ndash; B&agrave;n tay</td>\n</tr>\n<tr>\n<td>8. Fit (adj) &ndash; C&acirc;n đối, gọn g&agrave;ng</td>\n<td>18. Thin (adj) &ndash; Gầy</td>\n<td>28. Bottom (n) &ndash; M&ocirc;ng</td>\n<td>38. Head (n) &ndash; Đầu</td>\n</tr>\n<tr>\n<td>9. Good-looking (adj) &ndash; Ưa nh&igrave;n</td>\n<td>19. Ugly (adj) &ndash; Xấu x&iacute;</td>\n<td>29. Brain (n) &ndash; N&atilde;o</td>\n<td>39. Heart (n) &ndash; Tr&aacute;i tim</td>\n</tr>\n<tr>\n<td>10. Handsome (adj) &ndash; Đẹp trai</td>\n<td>20. Weight (n) &ndash; C&acirc;n nặng</td>\n<td>30. Chest (n) &ndash; lồng ngực</td>\n<td>40. Leg (n) &ndash; Ch&acirc;n</td>\n</tr>\n</tbody>\n</table>\n</figure>\n<h3><span id=\"Hoc_tieng_Anh_theo_Chu_de_Gia_dinh_va_moi_quan_he\">Học tiếng Anh theo Chủ đề Gia đ&igrave;nh v&agrave; mối quan hệ</span></h3>\n<figure class=\"wp-block-table\">\n<table>\n<tbody>\n<tr>\n<td>1. Aunt (n) &ndash; C&ocirc;, d&igrave;</td>\n<td>11. Mother (n) &ndash; Mẹ</td>\n<td>21. Wife (n) &ndash; Vợ</td>\n<td>31. Customer (n) &ndash; Kh&aacute;ch h&agrave;ng</td>\n</tr>\n<tr>\n<td>2. Birth (n) &ndash; Sự sinh ra</td>\n<td>12. Mother-in-law (n) &ndash; Mẹ chồng</td>\n<td>22. Ex (n) &ndash; Người y&ecirc;u cũ</td>\n<td>32. Date (n/v) &ndash; Hẹn h&ograve;</td>\n</tr>\n<tr>\n<td>3. Brother (n) &ndash; Anh/em trai</td>\n<td>13. Niece/Nephew (n) &ndash; Ch&aacute;u</td>\n<td>23. Father-in-law (n) &ndash; Bố chồng</td>\n<td>33. Enemy (n) &ndash; Kẻ th&ugrave;</td>\n</tr>\n<tr>\n<td>4. Cousin (n) &ndash; Anh/chị em họ</td>\n<td>14. Parents (n) &ndash; Phụ huynh</td>\n<td>24. Argue (n) &ndash; Tranh c&atilde;i</td>\n<td>34. Friend (n) &ndash; Bạn b&egrave;</td>\n</tr>\n<tr>\n<td>5. Daughter (n) &ndash; Con g&aacute;i</td>\n<td>15. Relative (n) &ndash; Họ h&agrave;ng</td>\n<td>25. Boss (n) &ndash; Sếp</td>\n<td>35. Friendship (n) &ndash; T&igrave;nh bạn</td>\n</tr>\n<tr>\n<td>6. Ex-wife (n) &ndash; Vỡ cũ</td>\n<td>16. Sibling&nbsp; (n) &ndash; Anh chị em ruột</td>\n<td>26. Boyfriend/Girlfriend (n) &ndash; Bạn trai/g&aacute;i</td>\n<td>36. Hate (v) &ndash; Gh&eacute;t</td>\n</tr>\n<tr>\n<td>7. Father (n) &ndash; Bố</td>\n<td>17. Sister (n) &ndash; Chị/em g&aacute;i</td>\n<td>27. Break up (v) &ndash; Chia tay</td>\n<td>37. Introduce (n) &ndash; Giới thiệu</td>\n</tr>\n<tr>\n<td>8. Grandparents (n) &ndash; &Ocirc;ng b&agrave;</td>\n<td>18. Son (n) &ndash; Con trai</td>\n<td>28. Colleague/Coworker (n) &ndash; Đồng nghiệp</td>\n<td>38. Love (n/v) &ndash; T&igrave;nh y&ecirc;u/y&ecirc;u</td>\n</tr>\n<tr>\n<td>9. Husband (n) &ndash; Chồng</td>\n<td>19. Step-mom (n) &ndash; Mẹ kế</td>\n<td>29. Conflict (v) &ndash; Bất đồng, xung đột</td>\n<td>39. Meet (n) &ndash; Gặp gỡ</td>\n</tr>\n<tr>\n<td>10. Kid/Child (n) &ndash; Trẻ em</td>\n<td>20. Uncle (n) &ndash; Ch&uacute;/dượng/cậu</td>\n<td>30. Couple (n) &ndash; Cặp đ&ocirc;i</td>\n<td>40. Acquaintance (n) &ndash; Người quen</td>\n</tr>\n</tbody>\n</table>\n</figure>\n<h3><span id=\"Hoc_tu_vung_tieng_anh_theo_chu_de_ve_thoi_tiet\">Học từ vựng tiếng anh theo chủ đề về thời tiết</span></h3>\n<figure class=\"wp-block-table\">\n<table>\n<tbody>\n<tr>\n<td>1.Hot (adj): n&oacute;ng</td>\n<td>10.Winter(n): m&ugrave;a đ&ocirc;ng</td>\n<td>19. Tornado (n): lốc xo&aacute;y</td>\n</tr>\n<tr>\n<td>2.Sunny (adj): trời nắng</td>\n<td>11.Fall(n): m&ugrave;a thu</td>\n<td>20. Cold (adj): lạnh</td>\n</tr>\n<tr>\n<td>3.Raining (adj): trời mưa</td>\n<td>12. Spring (n): m&ugrave;a xu&acirc;n</td>\n<td>21. Earthquake(n): động đất</td>\n</tr>\n<tr>\n<td>4.Windy (adj): trời gi&oacute;</td>\n<td>13. Flood(adj): lụt</td>\n<td>22. Hurricane (n) b&atilde;o</td>\n</tr>\n<tr>\n<td>5.Snowing (adj): trời đầy tuyết</td>\n<td>14. Tsunami (n): s&oacute;ng thần</td>\n<td>23. Lightning (n): chớp</td>\n</tr>\n<tr>\n<td>6.Stormy (adj): trời b&atilde;o</td>\n<td>15. Thunder (n): sấm</td>\n<td>24. Volcano (n): n&uacute;i lửa</td>\n</tr>\n<tr>\n<td>7.Cloudy (adj): trời m&acirc;y</td>\n<td>16. Sleet (n): mưa tuyết</td>\n<td>25. Drought (n): hạn h&aacute;n</td>\n</tr>\n<tr>\n<td>8.Rainbow (n): cầu vồng</td>\n<td>17. Foggy (n): sương m&ugrave;</td>\n<td>26. Ice melt (n): băng tan</td>\n</tr>\n<tr>\n<td>9.Summer (n) m&ugrave;a h&egrave;</td>\n<td>18. clear (n): trời xanh trong</td>\n<td>27. Part cloudy (adj):&nbsp; c&oacute; m&acirc;y</td>\n</tr>\n</tbody>\n</table>\n</figure>\n<h2><span id=\"Cac_chuong_trinh_truyen_hinh_giup_ban_hoc_tieng_Anh_theo_chu_de_de_dang_hon\">C&aacute;c chương tr&igrave;nh truyền h&igrave;nh gi&uacute;p bạn học tiếng Anh theo chủ đề dễ d&agrave;ng hơn</span></h2>\n<p>Theo d&otilde;i c&aacute;c chương tr&igrave;nh truyền h&igrave;nh thực tế l&agrave; phương ph&aacute;p hữu &iacute;ch cho mọi người học tiếng Anh theo chủ đề. ELSA Speak sẽ gợi &yacute; cho bạn một số chương tr&igrave;nh th&uacute; vị dưới đ&acirc;y.&nbsp;</p>\n<h3><span id=\"The_Apprentice_Nguoi_tap_su\">The Apprentice (Người tập sự)</span></h3>\n<div class=\"wp-block-image\">\n<figure class=\"aligncenter size-large is-resized\"><img class=\"wp-image-1182\" src=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/11/The_Apprentice_Logo.png.webp\" alt=\"Học tiếng Anh theo chủ đề Kinh doanh | ELSA Speak\" width=\"650\" height=\"371\" loading=\"lazy\" /></figure>\n</div>\n<p>L&agrave; chương tr&igrave;nh truyền h&igrave;nh thực tế d&agrave;nh cho những người y&ecirc;u th&iacute;ch c&aacute;c lĩnh vực kinh doanh, marketing, kinh tế v&agrave; quản trị. Chương tr&igrave;nh n&agrave;y được đầu tư sản xuất bởi Tổng thống Mỹ Donald Trump. &Ocirc;ng l&agrave; một nh&agrave; đầu tư bất động sản, một diễn giả, một nh&agrave; kinh doanh, l&agrave; chủ tịch của tập đo&agrave;n The Trump Organization, người s&aacute;ng lập Trump Entertainment Resorts.&nbsp;</p>\n<p>Chương tr&igrave;nh thực tế The Apprentice sẽ cung cấp một lượng lớn từ vựng th&ocirc;ng d&ugrave;ng v&agrave; chuy&ecirc;n ng&agrave;nh về kinh tế. Theo d&otilde;i chương tr&igrave;nh n&agrave;y gi&uacute;p c&aacute;c bạn học tiếng Anh dễ d&agrave;ng hơn đồng thời c&oacute; th&ecirc;m kiến thức chuy&ecirc;n ng&agrave;nh.</p>\n<h3><span id=\"Masterchef_Vua_Dau_Bep\">Masterchef (Vua Đầu Bếp)</span></h3>\n<div class=\"wp-block-image\">\n<figure class=\"aligncenter size-large is-resized\"><img class=\"wp-image-1184\" src=\"https://vn.elsaspeak.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/11/masterchef-season-8-photo-u2-1024x1024.jpg.webp\" alt=\"Học từ vựng tiếng Anh theo chủ đề nấu ăn Masterchef (Vua Đầu Bếp) | ELSA Speak\" width=\"650\" height=\"600\" loading=\"lazy\" /></figure>\n</div>\n<p>L&agrave; một chương tr&igrave;nh truyền h&igrave;nh cực kỳ nổi tiếng về lĩnh vực ẩm thực tr&ecirc;n to&agrave;n thế giới. Người chơi l&agrave; những đầu bếp nghiệp dư, nhiệm vụ ch&iacute;nh của những người chơi l&agrave; trổ t&agrave;i năng nấu nướng c&aacute;c m&oacute;n ăn ngon v&agrave; đặc sắc nhất. Gordon Ramsay l&agrave; vua đầu bếp nổi tiếng của Mỹ ki&ecirc;m người dẫn chương tr&igrave;nh ch&iacute;nh.</p>\n<p>Masterchef gi&uacute;p bạn học tiếng Anh theo chủ đề ẩm thực một c&aacute;ch dễ d&agrave;ng v&agrave; tự nhi&ecirc;n hơn. Kh&ocirc;ng chỉ vậy, theo d&otilde;i chương tr&igrave;nh c&ograve;n gi&uacute;p bạn học th&ecirc;m được nhiều từ l&oacute;ng, c&aacute;ch ph&aacute;t &acirc;m v&agrave; c&aacute;ch đối đ&aacute;p tự nhi&ecirc;n trong những t&igrave;nh huống giao tiếp h&agrave;ng ng&agrave;y của người bản xứ.</p>\n<p>So với c&aacute;ch học truyền thống,&nbsp;<strong>học tiếng Anh theo chủ đề</strong>&nbsp;mang lại rất nhiều lợi &iacute;ch cho người học. Một từ tiếng Anh c&oacute; rất nhiều nghĩa phụ thuộc v&agrave;o từng ngữ cảnh. V&igrave; vậy, h&atilde;y nhớ luyện tập c&ugrave;ng&nbsp;<strong><a href=\"https://vn.elsaspeak.com/tai-phan-mem-elsa-luyen-phat-am-tieng-anh/\">phần mềm ELSA</a></strong>&nbsp;Speak mỗi ng&agrave;y để bỏ t&uacute;i kho từ vựng khổng lồ cho bản th&acirc;n.</p>\n</div>\n</div>\n</div>\n</article>\n</div>\n</div>', 1, 0, 0, 0, 0, 33, 'Từ vựng theo chủ đề nói kết hợp cách đặt câu hỏi'),
(24, '<div class=\"u-learn-what\">\n<h3>Bạn sẽ học được g&igrave;</h3>\n<div class=\"content\">\n<div class=\"row\">\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Tự l&agrave;m phim hoạt h&igrave;nh 2D chuy&ecirc;n nghiệp với MAYA</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Thao t&aacute;c với camera v&agrave; quản l&yacute; vật thể trong m&ocirc;i trường 3D</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Thiết kế nh&acirc;n vật hoạt h&igrave;nh với Paint v&agrave; Photoshop&nbsp;</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Gắn xương v&agrave; phụ kiện cho nh&acirc;n vật tạo hoạt động linh hoạt tự nhi&ecirc;n</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Tạo bộ điều khiển, kết nối biểu cảm cho nh&acirc;n vật</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Điều chỉnh phối hợp &aacute;nh s&aacute;ng, diễn hoạt nh&acirc;n vật theo bối cảnh</div>\n</div>\n<div class=\"col-sm-6 form-group\">\n<div class=\"title\">Cắt gh&eacute;p v&agrave; chỉnh sửa video ho&agrave;n thiện với Adobe Premiere</div>\n</div>\n</div>\n</div>\n</div>\n<p>&nbsp;</p>\n<div id=\"u-des-course\" class=\"u-des-course\">\n<h2>Giới thiệu kh&oacute;a học</h2>\n<p><strong>C&oacute; phải bạn:&nbsp;&nbsp;</strong></p>\n<ul>\n<li>Đang l&agrave;m trong bộ phận dựng phim của doanh nghiệp, muốn tạo ra những bộ phim hay quảng c&aacute;o dưới định dạng 2D?</li>\n<li>Hay bạn rất th&iacute;ch những nh&acirc;n vật đ&aacute;ng y&ecirc;u trong c&aacute;c bộ phim hoạt h&igrave;nh nước ngo&agrave;i?&nbsp;</li>\n<li>Bạn c&oacute; &yacute; tưởng về 1 bộ phim của ri&ecirc;ng bạn nhưng chưa biết bắt đầu từ đ&acirc;u, những bước cơ bản n&agrave;o để bắt tay thực hiện 1 bộ phim hoạt h&igrave;nh 2D?</li>\n<li>Bạn đ&atilde; c&oacute; những c&aacute;i nh&igrave;n tổng quan nhất về lĩnh vực l&agrave;m phim hoạt h&igrave;nh 2D v&agrave; bạn muốn nghi&ecirc;m t&uacute;c&nbsp;theo đuổi học dựng phim?</li>\n</ul>\n<p>Bạn c&oacute; thể th&agrave;nh thạo c&aacute;c c&ocirc;ng cụ Paint, Photoshop, nhưng để c&oacute; đủ kỹ năng nền tảng cho việc x&acirc;y dựng h&igrave;nh ảnh 2D th&igrave; chưa đủ. Kh&ocirc;ng chỉ l&agrave; c&aacute;c bản vẽ đơn giản, bạn phải học về c&aacute;c thao t&aacute;c với camera, c&aacute;ch tạo bộ điều khiển, gắn xương v&agrave; h&agrave;ng loạt thao t&aacute;c cần thiết kh&aacute;c &nbsp;gi&uacute;p nh&acirc;n vật của m&igrave;nh trở n&ecirc;n ho&agrave;n thiện v&agrave; sinh động hơn.</p>\n<p>Đừng để mơ ước của bạn về 1 t&aacute;c phẩm tuyệt vời định dạng 2D bị bỏ lỡ! H&atilde;y để Chuy&ecirc;n gia Kh&ocirc;ng Minh Phương hướng dẫn bạn phương ph&aacute;p tạo ra một bộ phim như thế với một phần mềm phổ biến tr&ecirc;n thế giới l&agrave; MAYA.</p>\n<p>Tham gia kh&oacute;a học&nbsp;<strong>\"L&agrave;m phim hoạt h&igrave;nh 2D với MAYA\"</strong>&nbsp;ngay h&ocirc;m nay để trở th&agrave;nh t&aacute;c giả ch&iacute;nh cho c&acirc;u chuyện hoạt h&igrave;nh 2D của bạn!</p>\n<p><strong>Kh&oacute;a học c&oacute; g&igrave; d&agrave;nh cho bạn?</strong></p>\n<p>&nbsp; &nbsp; &nbsp;✔️ Hướng dẫn chi tiết nhất về MAYA - c&ocirc;ng cụ để hoạt họa v&agrave; x&acirc;y dựng n&ecirc;n phim hoạt h&igrave;nh 2D của bạn</p>\n<p>&nbsp; &nbsp; &nbsp;✔️ Chi tiết c&aacute;c c&aacute;ch sử dụng, c&aacute;c thao t&aacute;c l&agrave;m việc với to&agrave;n bộ t&iacute;nh năng trong MAYA</p>\n<p>&nbsp; &nbsp; &nbsp;✔️ Hướng dẫn tạo h&igrave;nh nh&acirc;n vật hoạt h&igrave;nh từ Photoshop, c&aacute;ch vẽ nh&acirc;n vật trong Photoshop chi tiết v&agrave; đổ file từ Photoshop sang MAYA.</p>\n<p>&nbsp; &nbsp; &nbsp;✔️ C&aacute;ch gắn xương - một trong những bước quan trọng để gi&uacute;p nh&acirc;n vật 2D của bạn chuyển động</p>\n<p>&nbsp; &nbsp; &nbsp;✔️ Chi tiết c&aacute;c bước diễn họa - hoạt họa trong MAYA</p>\n<p>&nbsp; &nbsp; &nbsp;✔️ Kiến thức về &aacute;nh s&aacute;ng trong phim hoạt h&igrave;nh 2D</p>\n<p>&nbsp; &nbsp; &nbsp;✔️ C&aacute;ch chỉnh sửa v&agrave; xuất bản phim hoạt h&igrave;nh 2D của bạn bằng Adobe Premiere</p>\n<p>&nbsp; &nbsp; &nbsp;✔️ ...</p>\n<p>C&oacute; qu&aacute; nhiều kiến thức hay chỉ trong một kh&oacute;a học<strong>&nbsp;\"L&agrave;m phim hoạt h&igrave;nh 2D với MAYA\"!</strong>&nbsp;C&ograve;n chờ đợi g&igrave; nữa, tham gia kh&oacute;a học ngay h&ocirc;m nay n&agrave;o!</p>\n</div>', 1, 0, 0, 0, 0, 35, 'Giới thiệu khóa học');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `test_exercises`
--

CREATE TABLE `test_exercises` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `study_program_id` int(11) NOT NULL,
  `point` int(11) NOT NULL COMMENT 'Điểm bài kiểm tra'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status_transaction` tinyint(1) NOT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `amount` double(8,2) NOT NULL COMMENT 'tổng số tiền cần thanh toán',
  `payment` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Hình thức giao dịch',
  `delivery_location` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Địa điểm thanh toán',
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `info` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}',
  `rank` int(10) NOT NULL,
  `role` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `coin` int(10) NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `status_user` tinyint(1) NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `create` varchar(100) COLLATE utf8_unicode_ci DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `phone`, `email`, `address`, `info`, `rank`, `role`, `coin`, `password`, `status_user`, `avatar`, `create`) VALUES
(19, 'Lê Văn Mong ', '', 'admin@utt.com', '', '{}', 1, 'admin', 0, '123456', 1, '', '2021-04-22 19:50:32'),
(22, 'x', '0374668113', 'ss@ss.com', 'Thanh Hoa', '{}', 0, 'user', 0, '123456', 1, '', '2021-05-05 22:29:27'),
(23, '', '', 'mong@gmail.com', '', '{}', 0, 'user', 0, '123456', 1, '', '2021-05-05 22:30:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `video`
--

CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Video chưc được đặt tên',
  `img` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `link_video` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `file_document` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `study_program_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `video`
--

INSERT INTO `video` (`id`, `name`, `img`, `link_video`, `file_document`, `study_program_id`, `product_id`) VALUES
(18, ' Bài 1: Bảng chữ cái+ nguyên âm đơn+ bài mẫu', '', '[yYU]-[p3q]-videoplayback.mp4', '', 22, 33),
(19, ' Bài 2: Nguyên âm đôi + bài mẫu', '', '[ZfW]-[p3q]-videoplayback.mp4', '', 22, 33);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `biodata`
--
ALTER TABLE `biodata`
  ADD PRIMARY KEY (`id_biodata`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_user_id_foreign` (`user_id`),
  ADD KEY `cart_product_id_foreign` (`product_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_video_id_foreign` (`video_id`);

--
-- Chỉ mục cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feedback_video_id_foreign` (`video_id`),
  ADD KEY `feedback_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_transaction_id_foreign` (`transaction_id`),
  ADD KEY `order_cart_id_foreign` (`cart_id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_catalog_id_foreign` (`catalog_id`);

--
-- Chỉ mục cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_reviews_user_id_foreign` (`user_id`),
  ADD KEY `product_reviews_product_id_foreign` (`product_id`);

--
-- Chỉ mục cho bảng `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_study_program_id_foreign` (`study_program_id`);

--
-- Chỉ mục cho bảng `student_answers`
--
ALTER TABLE `student_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_answers_user_id_foreign` (`user_id`),
  ADD KEY `student_answers_test_examcises_id_foreign` (`test_examcises_id`),
  ADD KEY `student_answers_id_question_foreign` (`id_question`);

--
-- Chỉ mục cho bảng `study_program`
--
ALTER TABLE `study_program`
  ADD PRIMARY KEY (`id`),
  ADD KEY `study_program_product_id_foreign` (`product_id`);

--
-- Chỉ mục cho bảng `test_exercises`
--
ALTER TABLE `test_exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test_exercises_user_id_foreign` (`user_id`),
  ADD KEY `test_exercises_study_program_id_foreign` (`study_program_id`);

--
-- Chỉ mục cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `biodata`
--
ALTER TABLE `biodata`
  MODIFY `id_biodata` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `student_answers`
--
ALTER TABLE `student_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `study_program`
--
ALTER TABLE `study_program`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `test_exercises`
--
ALTER TABLE `test_exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `cart_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`);

--
-- Các ràng buộc cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `feedback_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`);

--
-- Các ràng buộc cho bảng `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `order_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_catalog_id_foreign` FOREIGN KEY (`catalog_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `product_reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_study_program_id_foreign` FOREIGN KEY (`study_program_id`) REFERENCES `study_program` (`id`);

--
-- Các ràng buộc cho bảng `student_answers`
--
ALTER TABLE `student_answers`
  ADD CONSTRAINT `student_answers_id_question_foreign` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`),
  ADD CONSTRAINT `student_answers_test_examcises_id_foreign` FOREIGN KEY (`test_examcises_id`) REFERENCES `test_exercises` (`id`),
  ADD CONSTRAINT `student_answers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `study_program`
--
ALTER TABLE `study_program`
  ADD CONSTRAINT `study_program_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `test_exercises`
--
ALTER TABLE `test_exercises`
  ADD CONSTRAINT `test_exercises_study_program_id_foreign` FOREIGN KEY (`study_program_id`) REFERENCES `study_program` (`id`),
  ADD CONSTRAINT `test_exercises_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
