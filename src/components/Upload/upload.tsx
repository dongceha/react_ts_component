import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

import Button, {ButtonType} from '../Button/button'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {[key: string]: any};
    name?: string;
    data?: {[key: string]: any};
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean
}

export const Upload: React.FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        drag
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const updateFileList = (uploadFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prev => {
            return prev.map(file => {
                if (file.uid === uploadFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const files = e.target.files
       if (!files) return
       uploadFiles(files)
       if (fileInput.current) {
           fileInput.current.value = ''
       }
    }
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList((prevlist) => [_file, ...prevlist])
        const formdata = new FormData()
        formdata.append(name || file.name, file)
        if (data) {
            Object.keys(data).forEach(key => {
                formdata.append(key, data[key])
            })
        }
        axios.post(action, formdata, {
            headers: {
                ...headers,
                'Content-Type': 'mulitipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e: ProgressEvent<EventTarget>) => {
                const per = Math.round(e.loaded * 100 / e.total) || 0
                if (per < 100) {
                    updateFileList(_file, {percent: per, status: 'uploading'})
                    if (onProgress) onProgress(per, file)
                }
            }
        }).then(res => {
            updateFileList(_file, {percent: 100, status: 'success', response: res.data})
            if (onSuccess) onSuccess(res.data, file)
            if (onChange) onChange(file)
        }).catch(err => {
            updateFileList(_file, {percent: 100, status: 'error', error: err})
            if (onError) onError(err, file)
            if (onChange) onChange(file)
        })
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result) {
                    post(file)
                }
            }
        })
    }
    const handleRemove = (file: UploadFile) => {
        setFileList(prev => {
            return prev.filter(p => p.uid !== file.uid)
        })
        if (onRemove) onRemove(file)
    }
    return (
        <div className="viking-upload-component">
            <Button
              btnType={ButtonType.Primary}
              onClick={handleClick}>
            </Button>
            {
                drag ? <Dragger onFile={(files) => {uploadFiles(files)}}></Dragger> :
                <input
                onChange={handleFileChange}
                ref={fileInput}
                type="file"
                accept={accept}
                multiple={multiple}
                className="viking-file-input"
                style={{display: 'none'}}/>
            }
            <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}

export default Upload