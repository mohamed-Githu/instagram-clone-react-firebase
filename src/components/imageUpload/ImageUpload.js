import React, { useState } from 'react'
import { db, storage } from '../../firebase'
import { Button, Input } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import firebase from 'firebase'

import './imageUpload.scss'

const ImageUpload = ({ username, email }) => {
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  let fileName = 'No file chosen';

  if (file) {
    fileName = file.name
  }

  const handleFile = e => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
      console.log(e.target.files)
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`files/${file.name}`).put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress fuction
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      (error) => {
        // error function
        console.log(error)
        alert(error.message);
      },
      () => {
        // complete function
        storage
        .ref('files')
        .child(file.name)
        .getDownloadURL()
        .then(url => {
          db.collection('posts').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption.trim(),
            imgUrl: url,
            username: username,
            email: email,
            imgName: file.name,
            type: file.type
          })
        })
      }
    )

    setCaption('')
    setFile(null)
    setProgress(0)
  }

  const handleCaption = e => setCaption(e.target.value)

  return (
    <div className='imageupload'>
      <progress value={progress} max='100' className='imageupload__progress' />
      <div className="imageupload__input">
        <Input
          type='email'
          color='primary'
          onChange={handleCaption}
          value={caption}
          placeholder='Caption'
        />
        <div className="imageupload__buttonsContainer">
          <input type='file' 
            id='img'
            onChange={handleFile}
            accept="image/*"
            className="inputfile"
          />
          <label htmlFor="img"><ImageIcon style={{marginRight: 5}} /> Image</label>
          <p>{fileName}</p>
          <input type='file'
            id='video'
            onChange={handleFile}
            accept="video/*"
            className="inputfile"
          />
          <label htmlFor="video"><VideoLibraryIcon style={{marginRight: 5}} /> Video</label>
        </div>
      </div>
      <Button onClick={handleUpload} disabled={!file && !caption ? true : false}>
        Upload
      </Button>
    </div>
  )
}

export default ImageUpload
