import React, { ChangeEvent } from 'react'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'

type InputSize = 'large' | 'small'
// 忽略掉 InputHTML  中的 size 属性，防止重复
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'>{
// export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'>{
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | React.ReactElement;
    append?: string | React.ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = (props) => {
    // 去除各种属性
    // 更具属性计算不同的 className
    const {
        disabled,
        size,
        style,
        className,
        icon,
        prepend,
        append,
        ...restProps
    } = props
    const cnames = classNames('viking-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    if ('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    return (
        <div className={cnames} style={style}>
            {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
            {icon && <div className="icon-wrapper"></div>}
            <input className="viking-input-inner" disabled={disabled} {...restProps}/>
            {append && <div className="viking-input-group-prepend">{append}</div>}
        </div>
    )
}
