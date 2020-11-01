import React, {useState,createContext} from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[]
}
interface IMenuContext {
    index: string;
    mode?: MenuMode;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        defaultOpenSubMenus
    } = props
    const [currentActive, setActive] = useState(defaultIndex || '0')
    const handleClick = (index: string) => {
        setActive(index)
        onSelect && onSelect(index)
    }
    const passedContext: IMenuContext = {
        index: currentActive,
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName} = childElement.type
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}`
                })
            } else {
                console.error('warning: Menu has a child whitch is not MenuItem')
            }
        })
    }
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical'
    })
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    ) 
}
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu