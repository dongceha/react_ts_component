import React, {useContext, FunctionComponentElement, useState} from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './MenuItem'
import { CSSTransition } from 'react-transition-group'

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {index, title, className, children} = props
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [ menuOpen, setOpen ] = useState(isOpend)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    const clickEvent = context.mode === 'vertical' ? {
        onClick: handleClick
    }: {}
    const hoverEvent = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
    } : {}
    const renderChildren = () => {
        const subMenuClassnames = classNames('viking-submenu', {
            'menu-open': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childelemeny = child as FunctionComponentElement<MenuItemProps>
            if (childelemeny.type.displayName === 'MenuItem') {
                return React.cloneElement(childelemeny, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('')
            }
        })
        return (
            <CSSTransition 
                in={menuOpen} 
                timeout={300} 
                classNames="zoom-in-top"
                appear
                unmountOnExit
            >
                <ul className={subMenuClassnames}>
                    {childrenComponent}
                </ul>
            </CSSTransition>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvent}>
            <div className="submenu-title" {...clickEvent}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
