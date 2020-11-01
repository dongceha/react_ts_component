import React, { ChangeEvent, useState } from 'react'
import classNames from 'classnames'

import {Input, InputProps} from './input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetSuggestions?: (str: string) => string[];
    onSelect?: (item: string) => void
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        fetSuggestions,
        onSelect,
        value,
        ...restProps
    } = props
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        if (value && fetSuggestions) {
            const result = fetSuggestions(value)
            setSuggests(result)
        } else {
            setSuggests([])
        }
    }
    const [inputValue, setInputValue] = useState(value)
    const [suggests, setSuggests] = useState<string[]>([]);
    return (
        <div className="viking-auto-complete">
            <Input 
              value={inputValue}
              onChange={handleChange}
            />
        </div>
    )
}
