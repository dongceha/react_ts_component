import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'promary' | 'secondary' | 'success' | 'info' | 'warming'

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}
const Icon: React.FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props
    const classess = classNames('viking-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classess} {...restProps}></FontAwesomeIcon>
    )
}

export default Icon
