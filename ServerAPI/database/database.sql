CREATE TABLE `category`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `sort_order` INT NOT NULL COMMENT 'Thứ tự xắp sếp',
    `created` TIMESTAMP NOT NULL
);

CREATE TABLE `product`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `catalog_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `price` DOUBLE(8, 2) NOT NULL,
    `image_link` VARCHAR(255) NOT NULL,
    `trailer_link` VARCHAR(255) NOT NULL,
    `study_program_id` INT NOT NULL COMMENT 'Lộ trình học tập',
    `author_id` INT NOT NULL
);

CREATE TABLE `study_program`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `content` VARCHAR(255) NOT NULL,
    `sort_order` INT NOT NULL COMMENT 'order',
    `random_question` TINYINT(1) NOT NULL,
    `is_time_question` TINYINT(1) NOT NULL,
    `number_minute_check` INT NOT NULL,
    `pass_poin` INT NOT NULL COMMENT 'điểm qua bài kiểm tra'
);

CREATE TABLE `video`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `link_video` INT NOT NULL,
    `list_id_comment` VARCHAR(255) NOT NULL,
    `link_pdf` INT NOT NULL,
    `study_program_id` INT NOT NULL
);

CREATE TABLE `comment`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `user_id` INT NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `vote` INT NOT NULL,
    `video_id` INT NOT NULL,
    `create` TIMESTAMP NOT NULL
);

CREATE TABLE `test_exercises`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `user_id` INT NOT NULL,
    `study_program_id` INT NOT NULL,
    `point` INT NOT NULL COMMENT 'Điểm bài kiểm tra'
);

CREATE TABLE `question`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `title` VARCHAR(255) NOT NULL,
    `right_answer` VARCHAR(255) NOT NULL COMMENT 'câu trả lời đúng',
    `study_program_id` INT NOT NULL
);

CREATE TABLE `student_answers`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `id_question` INT NOT NULL,
    `test_examcises_id` INT NOT NULL,
    `selection` TEXT NOT NULL,
    `result` TINYINT(1) NOT NULL,
    `user_id` INT NOT NULL
);

CREATE TABLE `feedback`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `user_id` INT NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `link_file` VARCHAR(255) NULL,
    `video_id` INT NOT NULL,
    `status_feedback` TINYINT(1) NOT NULL,
    `created` TIMESTAMP NOT NULL
);

CREATE TABLE `product_reviews`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `product_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `sort_order` INT NOT NULL,
    `vote` INT NOT NULL
);

CREATE TABLE `order`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `cart_id` INT NOT NULL,
    `transaction_id` INT NOT NULL,
    `status_order` TINYINT(1) NOT NULL
);

CREATE TABLE `transaction`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `user_id` INT NOT NULL,
    `status_transaction` TINYINT(1) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `amount` DOUBLE(8, 2) NOT NULL COMMENT 'tổng số tiền cần thanh toán',
    `payment` VARCHAR(255) NOT NULL COMMENT 'Hình thức giao dịch',
    `delivery_location` VARCHAR(255) NOT NULL COMMENT 'Địa điểm thanh toán',
    `created` TIMESTAMP NOT NULL
);

CREATE TABLE `cart`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `product_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `status_cart` TINYINT(1) NOT NULL,
    `code` INT NOT NULL,
    `created` TIMESTAMP NOT NULL
);

CREATE TABLE `user`(
    `id` INT AUTO_INCREMENT, primary key (id),
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `info` JSON NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `coin` DOUBLE(8, 2) NOT NULL,
    `status_user` TINYINT(1) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `create` TIMESTAMP NOT NULL
);

ALTER TABLE
    `product` ADD CONSTRAINT `product_catalog_id_foreign` FOREIGN KEY(`catalog_id`) REFERENCES `category`(`id`);
ALTER TABLE
    `product` ADD CONSTRAINT `product_study_program_id_foreign` FOREIGN KEY(`study_program_id`) REFERENCES `study_program`(`id`);
ALTER TABLE
    `order` ADD CONSTRAINT `order_transaction_id_foreign` FOREIGN KEY(`transaction_id`) REFERENCES `transaction`(`id`);
ALTER TABLE
    `transaction` ADD CONSTRAINT `transaction_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `student_answers` ADD CONSTRAINT `student_answers_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `cart` ADD CONSTRAINT `cart_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `cart` ADD CONSTRAINT `cart_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `product`(`id`);
ALTER TABLE
    `feedback` ADD CONSTRAINT `feedback_video_id_foreign` FOREIGN KEY(`video_id`) REFERENCES `video`(`id`);
ALTER TABLE
    `comment` ADD CONSTRAINT `comment_video_id_foreign` FOREIGN KEY(`video_id`) REFERENCES `video`(`id`);
ALTER TABLE
    `test_exercises` ADD CONSTRAINT `test_exercises_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `test_exercises` ADD CONSTRAINT `test_exercises_study_program_id_foreign` FOREIGN KEY(`study_program_id`) REFERENCES `study_program`(`id`);
ALTER TABLE
    `student_answers` ADD CONSTRAINT `student_answers_test_examcises_id_foreign` FOREIGN KEY(`test_examcises_id`) REFERENCES `test_exercises`(`id`);
ALTER TABLE
    `student_answers` ADD CONSTRAINT `student_answers_id_question_foreign` FOREIGN KEY(`id_question`) REFERENCES `question`(`id`);
ALTER TABLE
    `question` ADD CONSTRAINT `question_study_program_id_foreign` FOREIGN KEY(`study_program_id`) REFERENCES `study_program`(`id`);
ALTER TABLE
    `feedback` ADD CONSTRAINT `feedback_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `product_reviews` ADD CONSTRAINT `product_reviews_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `product_reviews` ADD CONSTRAINT `product_reviews_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `product`(`id`);
ALTER TABLE
    `order` ADD CONSTRAINT `order_cart_id_foreign` FOREIGN KEY(`cart_id`) REFERENCES `cart`(`id`);
