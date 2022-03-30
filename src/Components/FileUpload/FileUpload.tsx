import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

export default function FileUpload() {

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile]:any = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  function onChange(e:any) {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  async function onSubmit(e:any) {

    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);

    try {

      const res = await axios.post('/upload', formData, {

        headers: {
          'Content-Type': 'multipart/form-data'
        },

        onUploadProgress: progressEvent => {

          setUploadPercentage(
            parseInt(
              //@ts-ignore
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )

          );

        }

      });
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } 
    
    catch (err:any) {

      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } 
      
      else {
        setMessage(err.response.data.msg);
      }

      setUploadPercentage(0)

    }

  };

  return (

    <Fragment>

      {message ? <Message msg={message} /> : null}

      <form onSubmit={onSubmit}>

        <div className='custom-file mb-4'>

          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />

          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>

        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />

      </form>

      {uploadedFile ? (

        <div className='row mt-5'>

          <div className='col-md-6 m-auto'>

            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          
          </div>

        </div>

      ) : null}

    </Fragment>

  );

};