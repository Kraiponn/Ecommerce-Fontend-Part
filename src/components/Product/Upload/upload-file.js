import React from 'react'

import './upload-file.scss'

const UploadFile = props => {
  // console.log('Upload file: ' + props.fileName)

  return (
    <div className="UploadFile">
      <div className="custom-file my-3">
        <input
          className="custom-file-input"
          type="file"
          name="image_path"
          onChange={props.fileUploadChange}
        />
        <label 
          className="custom-file-label"
        >
          {props.fileName ? props.fileName : 'Choose file...'}
        </label>
      </div>

      <div className="img-container">
        <img
          src={props.fileObject ? 
            props.fileObject
            : '/assets/images/img_profile.png'} 
          alt="" 
        />
      </div>
    </div>
  )
}

export default UploadFile
