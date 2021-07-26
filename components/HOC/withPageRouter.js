/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 12/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import queryString from 'query-string';
import { withRouter } from 'next/router';

const withPageRouter = (Component) => {
    return withRouter(({ router, ...props }) => {
        router.query = queryString.parse(router.asPath.split(/\?/)[1]);

        return <Component {...props} router={router} />;
    });
};
export default withPageRouter;
