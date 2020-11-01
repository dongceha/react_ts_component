import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import axios from 'axios'
import classNames from 'classnames'

interface DraggerProps {
    onFile: (file: FileList) => void
}

export const Dragger: React.FC<DraggerProps> = (props) => {
    const {
        onFile,
        children
    } = props
    const [dragOver, setDragOver] = useState(false)
    const kclass = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    })
    const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }
    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }
    return (
        <div
          className={kclass}
          onDragOver={e => handleDrag(e, true)}
          onDragLeave={e => handleDrag(e, false)}
        >
            {children}
        </div>
    )
}

export default Dragger