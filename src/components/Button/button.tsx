import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Dangeer = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className ?: string;
    disabled ?: boolean;
    size ?: ButtonSize;
    btnType ?: ButtonType;
    children: React.ReactNode;
    href?: string
}
// 把原生的 Button、a 属性 和 BaseButtonProps 结合起来
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
           //              把所有属性都设置为可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> 

const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled,
        size,
        href,
        children,
        ...restProps
    } = props
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })
    if (btnType === ButtonType.Link && href) {
        return (
        <a
          {...restProps}
          className={classes}
          href={href}>
          {children}
        </a>
        )
    } else {
        return (
            <button
              {...restProps}
              disabled={disabled}
              className={classes}>
                {children}
            </button>
        ) 
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button
