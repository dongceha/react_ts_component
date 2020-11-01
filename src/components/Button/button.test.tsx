import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType} from './button'
const defaultProps = {
    onClick: jest.fn()
}
const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}
const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

// 分类
describe('test Button component', () => {
    it('should render the corrent default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument() // 判断组件是否在文档中
        expect(element?.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)   // 调用方法
        // 对应的方法有被调用到
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('should render the corrent based on different props button', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument() // 判断组件是否在文档中
        expect(element).toHaveClass('btn-primary btn-lg klass') // 判断组件是否在文档中
    })
    it('should render the  a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="https://www.baidu.com">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument() // 判断组件是否在文档中
        expect(element?.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument() // 判断组件是否在文档中
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})

