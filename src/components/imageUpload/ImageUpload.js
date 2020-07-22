import React, { useState } from 'react'
import { db, storage } from '../../firebase'
import { Button, Input } from '@material-ui/core'
import firebase from 'firebase'

import './imageUpload.scss'

const ImageUpload = ({ username, email }) => {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleImage = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      console.log(e.target.files[0].type)
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

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
        .ref('images')
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          db.collection('posts').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption.trim(),
            imgUrl: url,
            username: username,
            email: email
          })
        })
      }
    )

    setCaption('')
    setImage(null)
    setProgress(0)
  }

  const handleCaption = e => setCaption(e.target.value)

  return (
    <div className='imageupload'>
      <progress value={progress} max='100' className='imageupload__progress' />
      <div className="imageupload__input">
        <Input type='text' onChange={handleCaption} value={caption} placeholder='Caption' />
        <input type='file' onChange={handleImage} accept="image/*" />
      </div>
      <Button onClick={handleUpload} disabled={!image ? true : false}>
        Upload
      </Button>
    </div>
  )
}

export default ImageUpload
