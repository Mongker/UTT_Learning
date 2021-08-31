/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 05/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import { createContext } from 'react';

const ContextAdmin = createContext({
    refModalProduct: { current: null },
    keyTreeActive: null,
    setKeyTreeActive: () => {},
});
export default ContextAdmin;
