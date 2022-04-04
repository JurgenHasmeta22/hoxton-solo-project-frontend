import React, { Fragment, useEffect, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import "./FileUpload.css"
import { useStore } from '../../Zustand/store';

export default function FileUpload({validateUser, typeOfUpload}:any) {

  useEffect(() => {
    validateUser();
  }, []);

  const { setVideos, user } = useStore()

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile]:any = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  function onChange(e:any) {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const filenameRemoved = filename.substr(0, filename.length - 4);

  async function addVideo() {

    const videoData = {
      title: filenameRemoved,
      categoryId: 1,
      userId: user?.id,
      thumbnail: `/public/uploads/thumbnails/${filenameRemoved}.jpg`,
      src: `/public/uploads/videos/${filenameRemoved}.mp4`,
    }

    try {

      await fetch('http://localhost:4000/videos', {
    
            method: "POST",
    
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.token
            },
    
            body: JSON.stringify(videoData),
      })
        .then((resp) => resp.json())
        .then((data) => {

        if (data.error) {
            alert(data.error);
        } 
        
        else {
            setVideos(data);
        }

      });

    }

    catch (err:any) {
      console.log({"its error": err})
    }
    
  }

  async function onSubmit(e:any) {

    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);

    if (typeOfUpload === "video") {

      try {

        const res = await axios.post('http://localhost:4000/uploadVideo', formData, {

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

        addVideo()

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

    }

    else {

      try {

        const res = await axios.post('http://localhost:4000/uploadThumbnail', formData, {

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

    }

  };

  return (

    <Fragment>

      {/* @ts-ignore */}
      {message ? <Message msg={message} setMessage = {setMessage} /> : null}

      <form 
        className="file-upload-form" 
        onSubmit={function (e) {
          onSubmit(e)
          // addVideo()
        }} 
      >

        <div className='custom-file mb-4'>

          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />

        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value={typeOfUpload === "video" ? 'Upload Video': 'Upload Thumbnail'}
          className='upload-button'
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