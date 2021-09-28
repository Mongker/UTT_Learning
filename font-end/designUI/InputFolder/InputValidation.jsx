/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author monglv@bkav.com on 28/09/2021
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';
/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author monglv@bkav.com on 18/08/2021
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Input, Tooltip} from 'antd';

import styles from './styles/index.module.scss';

InputValidation.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.string,
	placement: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	visible: PropTypes.bool,
};

InputValidation.defaultProps = {
	onChange: () => null,
	value: '',
	placement: 'right',
	disabled: false,
	visible: false,
	classNameTooltip: styles.customTooltip,
	className: '',
	placeholder: '',
	type: '',
};

function InputValidation({onChange, value, disabled, title, placement, visible, className, placeholder, classNameTooltip, type}) {
	const [isShow, setIsShow] = React.useState(false);

	const handleShowTooltip = React.useCallback(() => setIsShow(true), []);
	const handleHideTooltip = React.useCallback(() => setIsShow(false), []);
	
	React.useLayoutEffect(() => {
		handleHideTooltip()
	}, [])
	return(
		<Tooltip
			placement={placement}
			title={title}
			visible={isShow && visible}
			overlayClassName={classNameTooltip}
		>
			{
				type === 'password' ? (
					<Input.Password 
						onChange={onChange} 
						value={value} 
						disabled={disabled} 
						onFocus={handleHideTooltip} 
						onBlur={handleShowTooltip} 
						placeholder={placeholder} 
						className={className}
						type={type}
					/>) : (
					<Input
						onChange={onChange}
						value={value}
						disabled={disabled}
						onFocus={handleHideTooltip}
						onBlur={handleShowTooltip}
						placeholder={placeholder}
						className={className} 
					/>)
			}
			
		</Tooltip>
	);
}

export default React.memo(InputValidation);
