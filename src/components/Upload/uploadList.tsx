import React from 'react'
import { UploadFile } from './upload'

interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}

export const UploadList: React.FC<UploadListProps> = (props) => {
    const {
        fileList,
        onRemove
    } = props
    return (
        <ul className="viking-upload-list">
            {
                fileList.map(file => {
                    return (
                        <li
                          className="viking-upload-list-item"
                          key={file.uid}>
                              <span className={`file-name filename-${file.status}`}>
                                  {file.name}
                              </span>
                              <span onClick={() => onRemove(file)}></span>
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default UploadList