import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './MenuItem'

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}
const testVerticalProps: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
}
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index={1}>menu 1</MenuItem>
            <MenuItem index={2}>menu 2</MenuItem>
            <MenuItem index={3} disabled>menu 2</MenuItem>
        </Menu>
    )
}
let wrapper: RenderResult,
menuElement: HTMLElement,
activeElement: HTMLElement,
disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render current Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', () => {

    })
    it('should render vertiacal mode when mode is set to vertical', () => {

    })
})
