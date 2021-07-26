-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 14, 2021 lúc 12:58 PM
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
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 là đang trong rõ hàng, 1 là đã trong lịch sử giao dịch',
  `code` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `sale` int(10) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`id`, `product_id`, `user_id`, `status`, `code`, `sale`, `created`) VALUES
(35, 33, 26, 1, '52d83fd7-c', 0, '2021-05-13 15:28:35'),
(37, 34, 26, 2, 'ca2acf46-1', 0, '2021-05-13 15:12:28'),
(38, 35, 26, 1, '9f97147f-9', 0, '2021-05-13 16:18:44'),
(39, 36, 26, 2, 'bf2f19af-8', 0, '2021-05-14 14:58:47'),
(40, 34, 27, 1, 'cdd908c4-9', 0, '2021-05-13 15:28:35'),
(41, 33, 27, 1, '56c26881-2', 0, '2021-05-13 15:28:35'),
(42, 36, 27, 1, '0a97120b-2', 0, '2021-05-13 16:02:22'),
(47, 34, 19, 1, '69e34268-d', 0, '2021-05-13 16:14:37'),
(48, 35, 19, 1, '32dd25ad-0', 0, '2021-05-13 16:18:44'),
(49, 35, 29, 2, 'ddea6d3b-2', 0, '2021-06-06 11:54:39'),
(50, 35, 29, 1, '858848fe-f', 0, '2021-05-13 16:26:18'),
(51, 35, 29, 1, '326ce0ea-8', 0, '2021-05-13 16:27:53'),
(53, 33, 30, 1, 'ef3ad3e9-0', 0, '2021-05-13 16:41:01'),
(54, 38, 30, 2, 'c80479e6-9', 0, '2021-05-13 16:53:03'),
(55, 38, 31, 1, '3e58b740-3', 0, '2021-05-14 13:49:36'),
(56, 33, 31, 1, '0d0b9d96-1', 0, '2021-05-14 13:50:46'),
(62, 36, 31, 1, 'aa3f97b7-6', 0, '2021-05-14 14:02:52'),
(63, 33, 31, 1, '3ee820df-f', 0, '2021-05-14 14:03:35'),
(64, 36, 31, 1, '7ba4a27f-6', 0, '2021-05-14 14:08:22'),
(65, 36, 31, 2, '8eb0126f-1', 0, '2021-05-14 14:23:39'),
(66, 35, 31, 1, '0956c838-3', 0, '2021-05-14 14:11:32'),
(67, 36, 31, 1, 'f69d234c-1', 0, '2021-05-14 14:11:32'),
(68, 38, 32, 1, 'df068dea-b', 0, '2021-05-14 14:56:25'),
(69, 35, 32, 1, '8bf42adc-f', 0, '2021-05-14 14:57:20'),
(70, 35, 33, 1, '38e5e718-0', 0, '2021-05-14 15:02:35'),
(71, 34, 34, 2, '6c984003-7', 0, '2021-05-14 15:07:17'),
(73, 35, 35, 2, '321ada8c-8', 0, '2021-05-14 15:19:21'),
(74, 38, 35, 2, '0eb09d8e-a', 0, '2021-05-14 15:21:22'),
(75, 33, 35, 0, '5f0cd635-3', 10, '2021-05-14 15:26:45'),
(76, 33, 19, 1, '72c5da4e-4', 10, '2021-06-06 11:51:04');

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
(79, 63, '', 1, 'Tiếng Nhật', '', 1, '2021-05-01 12:38:57'),
(93, 1, '[St0]-[0AJ]-favicon.icon.ico', 1, 'Viet', '112344', 1, '2021-05-13 23:44:46');

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
  `number_user` int(100) DEFAULT 0,
  `list_number` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`list_number`)),
  `content_full` longtext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `catalog_id`, `name`, `content`, `price`, `image_link`, `trailer_link`, `author_id`, `sale`, `status`, `number_user`, `list_number`, `content_full`) VALUES
(33, 63, 'Anh văn giao tiếp cho người hoàn toàn mất gốc', 'Khóa học tiếng Anh giao tiếp cho người mất gốc khơi dậy niềm đam mê tiếng Anh, tự tin giao tiếp tiếng Anh như người bản xứ, mở ra cơ hội học tập, làm việc tại các công ty đa quốc gia và tự tin hơn trong giao tiếp với người bản địa dù ở bất kỳ hoàn cảnh nà', 19.00, '[Nxv]-anh-van-giao-tiep-cho-nguoi-hoan-toan-mat-goc_m_1555555777.jpg', '[AJJ]-[p3q]-videoplayback.mp4', 19, 10, 1, 1, '[26]', '<h2><strong style=\"font-size: 14px;\">Tầm quan trọng của tiếng Anh</strong></h2>\n<div>\n<p>Học một ng&ocirc;n ngữ đồng nghĩa với việc bạn sẽ học th&ecirc;m một ng&ocirc;n ngữ của một nền văn h&oacute;a. Hiện nay, Tiếng Anh được xem l&agrave; ng&ocirc;n ngữ chung của thế giới, v&igrave; vậy ng&agrave;y c&agrave;ng nhiều người Việt đầu tư học tiếng Anh.</p>\n<p>Bạn c&oacute; thể nhận thấy, rất nhiều t&agrave;i liệu học tập ng&agrave;y nay của c&aacute;c tổ chức, c&aacute;c trường đại học lớn đều đươc viết bằng tiếng Anh. &frac12; t&agrave;i liệu tr&ecirc;n c&aacute;c website lớn đều được viết bằng tiếng Anh.</p>\n<p>Kh&ocirc;ng những thế, sự hội nhập của thế giới v&agrave;o thị trường Việt Nam của c&aacute;c c&ocirc;ng ty nước ngo&agrave;i khiến cho tiếng Anh c&agrave;ng trở n&ecirc;n quan trọng. Nếu bạn biết tiếng Anh th&igrave; sẽ rất dễ d&agrave;ng xin được c&ocirc;ng việc tốt, nhanh ch&oacute;ng thăng tiến.</p>\n<h3><strong>Học tiếng Anh bắt đầu từ đ&acirc;u?</strong></h3>\n<p>Tuy nhi&ecirc;n, bạn l&agrave; những đối tượng mất căn bản tiếng Anh, mất gốc tiếng Anh? Bạn đ&atilde; qu&aacute; ch&aacute;n nản với việc học tiếng Anh nhiều năm chưa tiến bộ? Bạn đang t&igrave;m kiếm kho&aacute; học ngoại ngữ online cho người mất gốc nhưng chưa biết t&igrave;m ở đ&acirc;u. Bạn đang muốn t&igrave;m kiếm một giải ph&aacute;p hiệu quả để học được tiếng Anh nhưng bạn lại qu&aacute; &ldquo;lười&rdquo; để t&igrave;m kiếm c&aacute;c trung t&acirc;m học.<br /><br />Những điều bạn băn khoăn sẽ được xua tan ngay khi bạn đăng k&yacute; kh&oacute;a học của Unica, kh&oacute;a học tiếng anh mất gốc sẽ gi&uacute;p bạn khắc phục tất cả kh&oacute; khăn để vực dậy, khơi nguồn niềm đam m&ecirc; với TIẾNG ANH. Kh&oacute;a học tiếng anh giao tiếp cho người mất gốc gi&uacute;p bạn biết được c&aacute;ch học tiếng Anh đ&uacute;ng c&aacute;ch. C&aacute;c bạn sẽ được nhập vai v&agrave;o c&aacute;c t&igrave;nh huống tiếng Anh giao tiếp hết sức th&uacute; vị thực tế h&agrave;ng ng&agrave;y.</p>\n<p>\"Lộ tr&igrave;nh học\"\"<strong>Anh văn giao tiếp cho người ho&agrave;n to&agrave;n mất gốc</strong>&rdquo; của Giảng vi&ecirc;n Ruby Thảo Trần giao tiếp c&ugrave;ng phương ph&aacute;p phản xạ truyền cảm hứng sẽ gi&uacute;p bạn n&acirc;ng cao tr&igrave;nh độ một c&aacute;ch nhanh ch&oacute;ng v&agrave; hiệu quả, bạn sẽ ho&agrave;n to&agrave;n tự tin với tr&igrave;nh độ tiếng Anh giao tiếp mới của bản th&acirc;n đấy!</p>\n<p>Với tầm quan trọng của tiếng Anh, đ&oacute; ch&iacute;nh l&agrave; l&yacute; do m&agrave; bạn kh&ocirc;ng n&ecirc;n chậm trễ để trở th&agrave;nh học vi&ecirc;n của kh&oacute;a học &ldquo;<strong>Tiếng Anh cho người ho&agrave;n to&agrave;n mất gốc</strong>&rdquo; tr&ecirc;n UNICA.</p>\n<p>&gt;&gt;&gt; Đăng k&yacute; ngay kh&oacute;a học tiếng anh cho người mất gốc ngay h&ocirc;m nay để nhận những ưu đ&atilde;i hấp dẫn đến từ Unica!</p>\n</div>'),
(34, 64, 'Facebook Marketing từ A - Z', 'Học Facebook Marketing Online từ A-Z từ giảng viên Hồ Ngọc Cương sẽ hướng dẫn chuyên sâu bạn về các thủ thuật liên quan đến quảng cáo Facebook Ads, giúp bạn tự lên các chiến lược về Facebook Marketing hoàn hảo cũng như tự chạy quảng cáo Facebook Ads chuyê', 16.00, '[QO4]-facebook-marketing-a-z_m_1555557477.jpg', '[rKd]-[p3q]-videoplayback.mp4', 19, 0, 1, 3, '[26,27,34]', '<p>mong yeu mai</p>'),
(35, 75, 'Làm phim hoạt hình 2D với MAYA', 'Hướng dẫn làm phim hoạt hình 2D tạo nên 1 tác phẩm tuyệt vời một cách chuyên nghiệp với Maya', 15.00, '[bd7]-tao-hoat-hinh-2d-voi-maya_m_1556178292.jpg', '[dtC]-[p3q]-videoplayback.mp4', 19, 0, 1, 3, '[26,35,29]', ''),
(36, 73, '19 Tuyệt chiêu nuôi dạy con thành tài', 'Lắng nghe con, phát huy điểm mạnh của con, gần gũi với con cái, thấu hiểu con cái để nuôi dạy con tốt nhất', 17.00, '[dPf]-19tuyet-chieu-day-con-thanh-tai_m_1555577063.jpg', '[66z]-Islands---2119.mp4', 19, 0, 1, 4, '[26,27,31,26]', '<p>Sinh con v&agrave; nu&ocirc;i dạy con l&agrave; cả m&ocirc;̣t qu&aacute; tr&igrave;nh gian nan m&agrave; b&acirc;́t kỳ b&acirc;̣c cha mẹ n&agrave;o cũng trải qua. Trẻ con giống như một trang giấy trắng, được t&ocirc; đen, bồi hồng v&agrave; ph&aacute;t triển theo đ&uacute;ng những g&igrave; ch&uacute;ng tr&ocirc;ng thấy v&agrave; trải qua. V&igrave; vậy, vi&ecirc;̣c gi&aacute;o dục v&agrave; nu&ocirc;i dạy con c&aacute;i từ khi c&ograve;n nhỏ l&agrave; rất quan trọng.</p>\n<p>C&oacute; rất nhiều phụ huynh ph&agrave;n n&agrave;n về việc kh&ocirc;ng thể n&oacute;i chuyện được với con khi con lớn. Trước hết, h&atilde;y l&agrave;m bạn với con, lắng nghe con, từ đ&oacute; con sẽ lắng nghe m&igrave;nh.</p>\n<p>Kh&oacute;a học&nbsp;<strong>&ldquo;19 Tuyệt chi&ecirc;u nu&ocirc;i dạy con th&agrave;nh t&agrave;i&rdquo;</strong>&nbsp;của&nbsp;<strong>Diễn giả Đ&agrave;o Ngọc Cường</strong>&nbsp;sẽ tiết lộ cho Bạn &ndash; c&aacute;c bậc&nbsp;cha mẹ, thầy c&ocirc; những b&iacute; quyết để trở th&agrave;nh những người bạn, người đồng h&agrave;nh để tư vấn, hướng dẫn, hỗ trợ cho con sống c&oacute; mục ti&ecirc;u, quan t&acirc;m y&ecirc;u thương gia đ&igrave;nh hơn.</p>\n<p><strong>Bạn sẽ biết c&aacute;ch:</strong></p>\n<ul>\n<li>Th&ocirc;ng qua những quan s&aacute;t, gi&uacute;p ph&aacute;t hiện ra những điểm mạnh, sở trường của con để gi&uacute;p con ph&aacute;t huy, thấu hiểu con</li>\n<li>L&yacute; giải những h&agrave;nh động của trẻ m&agrave; bạn kh&ocirc;ng thể hiểu nổi.</li>\n<li>Gi&uacute;p cha mẹ t&igrave;m ra tiếng n&oacute;i chung với con c&aacute;i trong độ tuổi ph&aacute;t triển thay đổi về t&acirc;m sinh l&yacute;.</li>\n<li>Tr&aacute;nh được những sai lầm của cha mẹ trong qu&aacute; tr&igrave;nh nu&ocirc;i dạy con</li>\n<li>Hiểu được đam m&ecirc;, sở trường, sở th&iacute;ch, năng khiếu của con để c&oacute; phương ph&aacute;p gi&aacute;o dục ph&ugrave; hợp, định hướng tương lai nghề nghiệp cho con sau n&agrave;y.</li>\n<li>Giải quyết t&igrave;nh trạng biếng ăn của trẻ. &nbsp;</li>\n</ul>\n<p>Đối với cha mẹ, việc học nu&ocirc;i dạy con ph&aacute;t triển to&agrave;n diện cả về thể chất v&agrave; tinh thần đ&ograve;i hỏi qu&aacute; tr&igrave;nh l&acirc;u d&agrave;i v&agrave; thật sự ki&ecirc;n tr&igrave;. Bởi từ khi sinh ra, c&aacute;c bậc l&agrave;m cha, l&agrave;m mẹ đều phải &yacute; thức được vai tr&ograve; v&agrave; nghĩa vụ của m&igrave;nh trong việc nu&ocirc;i dạy v&agrave; định hướng cho con. Vậy n&ecirc;n, nếu thật sai lầm khi bố mẹ bỏ qua kh&oacute;a học&nbsp;<strong>&ldquo;19 Tuyệt chi&ecirc;u nu&ocirc;i dạy con th&agrave;nh t&agrave;i&rdquo;</strong>&nbsp;của<strong>&nbsp;Diễn giả Đ&agrave;o Ngọc Cường</strong>&nbsp;c&oacute; tr&ecirc;n Unica.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>'),
(37, 71, 'Tâp YOGA khỏe mạnh 356 ngày', '11111', 11.00, '[Uea]-Nghệ-thuật-chinh-phục-khách-hàng_m_1611133822.jpg', '[SQ0]-[AJJ]-[p3q]-videoplayback.mp4', 29, 0, 1, 0, '[]', '<p>1111</p>'),
(38, 93, 'lap trinh 1', 'ddddd', 16.00, '[fup]-[bd7]-tao-hoat-hinh-2d-voi-maya_m_1556178292.jpg', '[9ab]-[1UZ]-[FJX]-Islands---2119.mp4', 19, 0, 1, 2, '[30,35]', 'null');

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
-- Cấu trúc bảng cho bảng `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `destination` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `inedex` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `slider`
--

INSERT INTO `slider` (`id`, `name`, `image`, `destination`, `inedex`) VALUES
(26, 'Slider 2', '[szR]-[1PE]-[eM6]-[Jz8]-baby-boy.png', 'Hiển thị vị trí thứ 2', 2),
(27, 'Slider 2', '[asY]-sale-lon-do-choi-go-tai-funnyland.png', 'Slider hiển thị vị trí đầu tiên trên trang chủ mục Slider', 1),
(28, 'Slider 3', '[2CJ]-465561d5361aa1f90837c8f90aac45f3.jpg', 'Hiển thị vị trí thứ 3', 3);

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
(22, '<p>Mongggccsacsa</p>', 1, 0, 0, 0, 0, 33, 'Phát âm tiếng Anh giọng Mỹ'),
(23, '<p>ssscsac</p>', 1, 0, 0, 0, 0, 33, 'Từ vựng theo chủ đề nói kết hợp cách đặt câu hỏi'),
(25, '<p>Sinh con v&agrave; nu&ocirc;i dạy con l&agrave; cả m&ocirc;̣t qu&aacute; tr&igrave;nh gian nan m&agrave; b&acirc;́t kỳ b&acirc;̣c cha mẹ n&agrave;o cũng trải qua. Trẻ con giống như một trang giấy trắng, được t&ocirc; đen, bồi hồng v&agrave; ph&aacute;t triển theo đ&uacute;ng những g&igrave; ch&uacute;ng tr&ocirc;ng thấy v&agrave; trải qua. V&igrave; vậy, vi&ecirc;̣c gi&aacute;o dục v&agrave; nu&ocirc;i dạy con c&aacute;i từ khi c&ograve;n nhỏ l&agrave; rất quan trọng.</p>\n<p>C&oacute; rất nhiều phụ huynh ph&agrave;n n&agrave;n về việc kh&ocirc;ng thể n&oacute;i chuyện được với con khi con lớn. Trước hết, h&atilde;y l&agrave;m bạn với con, lắng nghe con, từ đ&oacute; con sẽ lắng nghe m&igrave;nh.</p>\n<p>Kh&oacute;a học&nbsp;<strong>&ldquo;19 Tuyệt chi&ecirc;u nu&ocirc;i dạy con th&agrave;nh t&agrave;i&rdquo;</strong>&nbsp;của&nbsp;<strong>Diễn giả Đ&agrave;o Ngọc Cường</strong>&nbsp;sẽ tiết lộ cho Bạn &ndash; c&aacute;c bậc&nbsp;cha mẹ, thầy c&ocirc; những b&iacute; quyết để trở th&agrave;nh những người bạn, người đồng h&agrave;nh để tư vấn, hướng dẫn, hỗ trợ cho con sống c&oacute; mục ti&ecirc;u, quan t&acirc;m y&ecirc;u thương gia đ&igrave;nh hơn.</p>\n<p><strong>Bạn sẽ biết c&aacute;ch:</strong></p>\n<ul>\n<li>Th&ocirc;ng qua những quan s&aacute;t, gi&uacute;p ph&aacute;t hiện ra những điểm mạnh, sở trường của con để gi&uacute;p con ph&aacute;t huy, thấu hiểu con</li>\n<li>L&yacute; giải những h&agrave;nh động của trẻ m&agrave; bạn kh&ocirc;ng thể hiểu nổi.</li>\n<li>Gi&uacute;p cha mẹ t&igrave;m ra tiếng n&oacute;i chung với con c&aacute;i trong độ tuổi ph&aacute;t triển thay đổi về t&acirc;m sinh l&yacute;.</li>\n<li>Tr&aacute;nh được những sai lầm của cha mẹ trong qu&aacute; tr&igrave;nh nu&ocirc;i dạy con</li>\n<li>Hiểu được đam m&ecirc;, sở trường, sở th&iacute;ch, năng khiếu của con để c&oacute; phương ph&aacute;p gi&aacute;o dục ph&ugrave; hợp, định hướng tương lai nghề nghiệp cho con sau n&agrave;y.</li>\n<li>Giải quyết t&igrave;nh trạng biếng ăn của trẻ. &nbsp;</li>\n</ul>\n<p>Đối với cha mẹ, việc học nu&ocirc;i dạy con ph&aacute;t triển to&agrave;n diện cả về thể chất v&agrave; tinh thần đ&ograve;i hỏi qu&aacute; tr&igrave;nh l&acirc;u d&agrave;i v&agrave; thật sự ki&ecirc;n tr&igrave;. Bởi từ khi sinh ra, c&aacute;c bậc l&agrave;m cha, l&agrave;m mẹ đều phải &yacute; thức được vai tr&ograve; v&agrave; nghĩa vụ của m&igrave;nh trong việc nu&ocirc;i dạy v&agrave; định hướng cho con. Vậy n&ecirc;n, nếu thật sai lầm khi bố mẹ bỏ qua kh&oacute;a học&nbsp;<strong>&ldquo;19 Tuyệt chi&ecirc;u nu&ocirc;i dạy con th&agrave;nh t&agrave;i&rdquo;</strong>&nbsp;của<strong>&nbsp;Diễn giả Đ&agrave;o Ngọc Cường</strong>&nbsp;c&oacute; tr&ecirc;n Unica.&nbsp; &nbsp;</p>', 1, 0, 0, 0, 0, 36, 'Giới thiệu chung'),
(26, '<p>12345</p>', 1, 0, 0, 0, 0, 37, 'Giới thiệu'),
(27, '<p>đasadsdssadasdsa</p>', 1, 0, 0, 0, 0, 38, '11111');

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
  `phone` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `status_transaction` tinyint(1) NOT NULL,
  `list_cart` longtext COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `amount` double(8,2) NOT NULL COMMENT 'tổng số tiền cần thanh toán',
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Địa điểm thanh toán',
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `transaction`
--

INSERT INTO `transaction` (`id`, `user_id`, `phone`, `status_transaction`, `list_cart`, `message`, `amount`, `address`, `created`) VALUES
(27, 26, '04444444444', 1, '[35]', 'cccccccc', 19.00, 'Linh đàn hà nội', '2021-05-13 15:09:37'),
(28, 26, '04444444444', 1, '[37]', 'zzzz', 16.00, 'Linh đàn hà nội', '2021-05-13 15:11:51'),
(29, 26, '04444444444', 3, '[38]', 'cccscscs', 15.00, 'Linh đàn hà nội', '2021-05-13 15:25:45'),
(30, 26, '04444444444', 1, '[39]', 'VVV', 17.00, 'Linh đàn hà nội', '2021-05-13 15:20:18'),
(31, 27, '0374668113', 2, '[40]', 'Aba', 16.00, 'ssss', '2021-05-13 15:25:32'),
(40, 29, '04444444444', 2, '[49]', 'cccc', 15.00, 'Hưng yene', '2021-06-06 11:54:25'),
(41, 29, '04444444444', 4, '50', 'ddd', 15.00, 'Hưng yene', '2021-06-06 11:52:23'),
(42, 29, '04444444444', 0, '[51]', 'cccc', 15.00, 'Hưng yene', '2021-05-13 16:27:53'),
(43, 30, '04444444444', 0, '[53]', 'cccc', 19.00, 'Ha Noi', '2021-05-13 16:41:01'),
(44, 30, '04444444444', 3, '[54]', 'xxx', 16.00, 'Ha Noi', '2021-05-13 16:55:13'),
(45, 31, '123456', 0, '[55]', '123456', 16.00, '123456', '2021-05-14 13:49:36'),
(46, 31, '0374668113', 0, '[56]', '123445', 19.00, '123456', '2021-05-14 13:50:46'),
(47, 31, '123467', 0, '[62]', '123213123', 17.00, '12312321', '2021-05-14 14:02:52'),
(48, 31, '12345', 0, '[63]', '123456', 19.00, '123456', '2021-05-14 14:14:28'),
(49, 31, 'cccc', 0, '[64]', 'ccccc', 17.00, 'cccc', '2021-05-14 14:08:22'),
(50, 31, 'xxx', 2, '[65]', 'xxxx', 17.00, 'xxx', '2021-05-14 14:21:33'),
(51, 31, 'cccc', 4, '[66,67]', 'ccc', 32.00, 'ccc', '2021-05-14 14:14:34'),
(52, 32, 'mmmmm', 1, '[68]', 'mmmmmm', 16.00, 'mmmmm', '2021-06-06 11:49:22'),
(53, 32, '02333333', 2, '[69]', '33333', 15.00, 'cc', '2021-05-14 14:58:36'),
(54, 33, '123', 2, '[70]', '123', 15.00, '123', '2021-05-14 15:03:37'),
(55, 34, '11111', 1, '[71]', '111', 16.00, '1111', '2021-05-14 15:06:56'),
(56, 35, '1111111', 1, '[73]', '11111', 15.00, '111111', '2021-05-14 15:19:03'),
(57, 35, 'vvvv', 1, '[74]', 'vvv', 16.00, 'vvvv', '2021-05-14 15:20:39'),
(58, 19, '0374668113', 0, '[76]', 'ddsa', 19.00, 'Thanh Hóa ', '2021-06-06 11:51:04'),
(59, 19, '0374668113', 0, '[76]', 'ddsa', 19.00, 'Thanh Hóa ', '2021-06-06 11:51:26'),
(60, 19, '0374668113', 0, '[76]', 'ddsa', 19.00, 'Thanh Hóa ', '2021-06-06 11:51:34'),
(61, 19, '0374668113', 0, '[76]', 'ddsa', 19.00, 'Thanh Hóa ', '2021-06-06 11:51:34'),
(62, 19, '0374668113', 0, '[76]', 'ddsa', 19.00, 'Thanh Hóa ', '2021-06-06 11:51:34'),
(63, 19, '0374668113', 0, '[76]', 'ddsa', 19.00, 'Thanh Hóa ', '2021-06-06 11:51:35'),
(64, 19, '0374668113', 0, '[76]', 'ddsa', 19.00, 'Thanh Hóa ', '2021-06-06 11:51:48'),
(65, 19, '0374668113', 0, '[76]', 'ddsa', 19.00, 'Thanh Hóa ', '2021-06-06 11:51:51');

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
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`info`)),
  `list_product_open` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[]' CHECK (json_valid(`list_product_open`)),
  `rank` int(10) NOT NULL,
  `role` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `coin` int(10) NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `status_user` tinyint(1) NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `gender` tinyint(1) DEFAULT 0 COMMENT '0:là chưa chọn,\r\n1: là nam,\r\n2: là nữ\r\n3: giới tính khác',
  `create` varchar(100) COLLATE utf8_unicode_ci DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `phone`, `email`, `address`, `info`, `list_product_open`, `rank`, `role`, `coin`, `password`, `status_user`, `avatar`, `gender`, `create`) VALUES
(19, 'Lê Văn Mong ', '0374668113', 'admin@utt.com', 'Thanh Hóa ', '{}', '[]', 0, 'admin', 0, '1234567', 1, '[wBY]-[IC5]-hinh-anh-doraenom-300x300.jpg', 3, '2021-04-22 19:50:32'),
(22, 'Sao Bay Ta', '0374668113', 'ss@ss.com', 'Thanh Hoa', '{\"introduce\":\"<p>dsadasd</p>\",\"categoryFollow\":63}', '[]', 0, 'teacher', 0, '123456', 1, '', 1, '2021-05-05 22:29:27'),
(23, 'Okiboy', '037466811', 'mong@gmail.com', '', '{}', '[]', 0, 'user', 0, '123456', 1, '', 1, '2021-05-05 22:30:03'),
(24, 'Đào Thị Thanh Mai', '0374668113', 'scs@ss.com', 'Thanh Hoa', '{}', '[]', 0, 'user', 0, '123456', 1, '', 1, '2021-05-11 10:22:23'),
(25, 'Doremon', '0374668113', 'test@gmail.com', 'Ha noi', '{}', '[]', 0, 'user', 0, '123456', 1, '[DPi]-hinh-anh-doraenom-300x300.jpg', 1, '2021-05-13 20:50:39'),
(26, 'Trần Văn Cường', '04444444444', 'test@utt.com', 'Linh đàn hà nội', '{}', '[33,34,35,36,36]', 0, 'user', 0, '123456', 1, '[iTM]-1ae8eba774712b4350f5f61beb3a4119.jpg', 1, '2021-05-13 21:55:13'),
(27, '', '', 'mong@utt.com', '', '{}', '[34,36]', 0, 'user', 0, '123456', 1, '', 0, '2021-05-13 22:24:07'),
(29, 'Đào Thị Thanh Mai', '044444444444', 'mai@utt.com', 'Hưng yene', '{\"introduce\":\"<p>ssadasdasdasd</p>\",\"categoryFollow\":71}', '[35]', 0, 'teacher', 0, '123456', 1, '[IC5]-hinh-anh-doraenom-300x300.jpg', 1, '2021-05-13 22:53:07'),
(30, 'Thay viet', '0444444444444', 'viet@utt.com', 'Ha Noi', '{}', '[38]', 0, 'user', 0, '123456', 1, '[w6U]-[DPi]-hinh-anh-doraenom-300x300.jpg', 1, '2021-05-13 23:34:40'),
(31, '', '', 'colenmong@utt.com', '', '{}', '[36]', 0, 'user', 0, '123456', 1, '', 0, '2021-05-14 20:48:20'),
(32, '', '', 'thu7@gmail.com', '', '{}', '[]', 0, 'user', 0, '123456', 1, '', 0, '2021-05-14 21:55:53'),
(33, '', '', 'test1@utt.com', '', '{}', '[]', 0, 'user', 0, '123456', 1, '', 0, '2021-05-14 22:02:04'),
(34, '', '', 'vvv@utt.com', '', '{}', '[34]', 0, 'user', 0, '123456', 1, '', 0, '2021-05-14 22:05:17'),
(35, '', '', 'test16@utt.com', '', '{\"introduce\":null,\"categoryFollow\":67}', '[35,38]', 0, 'teacher', 0, '123456', 1, '', 0, '2021-05-14 22:17:47');

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
  `product_id` int(11) NOT NULL,
  `isPreview` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `video`
--

INSERT INTO `video` (`id`, `name`, `img`, `link_video`, `file_document`, `study_program_id`, `product_id`, `isPreview`) VALUES
(18, ' Bài 1: Bảng chữ cái+ nguyên âm đơn+ bài mẫu', '[Sq1]-[aAS]-favicon.icon.ico', '[yYU]-[p3q]-videoplayback.mp4', '', 22, 33, 1),
(19, ' Bài 2: Nguyên âm đôi + bài mẫu', '[Sq1]-[aAS]-favicon.icon.ico', '[ReI]-[dtC]-[p3q]-videoplayback.mp4', '', 22, 33, 1),
(20, 'Mong', '[G4g]-ảnh-nền.jpg', '[ScK]-[1rl]-Cat---66004.mp4', '', 23, 33, 0),
(21, ' Dạy con từ thuở còn thơ', '[GM1]-download.jpg', '[FJX]-Islands---2119.mp4', '', 25, 36, 1),
(22, 'Cách thực khởi động', '[W6k]-[QO4]-facebook-marketing-a-z_m_1555557477.jpg', '[Xvx]-[66z]-Islands---2119.mp4', '', 26, 37, 1),
(23, 'vvv', '[1eo]-[bBI]-[C36]-Untitled.jpg', '[GCv]-[1UZ]-[FJX]-Islands---2119.mp4', '', 27, 38, 1),
(24, 'csacas', '[Y7B]-[bd7]-tao-hoat-hinh-2d-voi-maya_m_1556178292.jpg', '[to1]-[49P]-[5n1]-cat1.mp4', '', 27, 38, 1);

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
-- Chỉ mục cho bảng `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

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
-- AUTO_INCREMENT cho bảng `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `student_answers`
--
ALTER TABLE `student_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `study_program`
--
ALTER TABLE `study_program`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `test_exercises`
--
ALTER TABLE `test_exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
