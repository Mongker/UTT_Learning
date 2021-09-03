const express = require('express');
const app = express();
const methodOverride = require('method-override');
// const path = require('path');
const con = require('./config/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');

// include router version 1
const uploadRouter = require('./routes/uploadRouter');
const UserRouter = require('./routes/userRouter');
const CategoryRouter = require('./routes/categoryRouter');
const ProductRouter = require('./routes/productRouter');
const StudyProgramRouter = require('./routes/studyProgramRouter');
const VideoRouter = require('./routes/videoRouter');
const CartRouter = require('./routes/cartRouter');
const TransactionRouter = require('./routes/transactionRouter');
const OpenProductRouter = require('./routes/opentProductRouter');

// include router version 2
const CategoryRouterVersion2 = require('./routes/version2/categoryRouter');
const authorRoutes = require('./routes/auth.route');

// Using pug template engine
// Bỏ đi không dùng nữa vì chỉ thuần viết API
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// connecting route to database
app.use(function (req, res, next) {
    req.con = con;
    next();
});

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(methodOverride('_method'));

// Khởi tạo các routes cho ứng dụng
// routing - version 1
app.use('/api/file', uploadRouter); // Thao tác với dữ liệu người dùng
app.use(UserRouter);
app.use(CategoryRouter);
app.use(ProductRouter);
app.use(StudyProgramRouter);
app.use(VideoRouter);
app.use(CartRouter);
app.use(TransactionRouter);
app.use(OpenProductRouter);

// routing - version 2
app.use(authorRoutes);
app.use(CategoryRouterVersion2);

const PORT = process.env.PORT_START || 2020;

// starting server
app.listen(PORT, function () {
    console.log(`server listening on port ${2020}`);
});
