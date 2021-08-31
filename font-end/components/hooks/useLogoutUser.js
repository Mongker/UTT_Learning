import { arrTypeUser } from '../../util/TypeUI';

/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import { useRouter } from 'next/router';

// Context
import ContextApp from 'util/ContextApp';

function UseLogoutUser() {
    const router = useRouter();
    const { setUser } = React.useContext(ContextApp);
    const handleClear = () => {
        router.push('/login');
        setUser(null);
        localStorage.clear();
    };

    return handleClear;
}
export default UseLogoutUser;
