/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 01/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

/* eslint-disable */
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
    lessVarsFilePath: './styles/antd-custom.less',
    cssLoaderOptions: {
        //   https://github.com/webpack-contrib/css-loader#object
        //
        //   sourceMap: true, // default false
        //   esModule: false, // default false
        //   modules: {
        //     exportLocalsConvention: 'asIs',
        //     exportOnlyLocals: true,
        //     mode: 'pure',
        //     getLocalIdent: [Function: getCssModuleLocalIdent]
        //   }
    },
    // Other Config Here...

    webpack(config) {
        return config;
    }
});
