import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import firebase from 'firebase'
import './post.scss'
import FlipMove from 'react-flip-move';

import Avatar from '@material-ui/core/Avatar'
import DeleteIcon from '@material-ui/icons/Delete';

const Post = ({ username, imgUrl, caption, email, id, user }) => {
  const [comments, setComments] = useState([])
  const [commentInput, setCommetInput] = useState('')

  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db.collection('posts').doc(id).collection('comments')
      .orderBy('timestamp', 'asc').onSnapshot(snapshot => {
        setComments(snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }))
      })
    }

    return () => {
      unsubscribe()
    }
  }, [id])

  const postComment = e => {
    e.preventDefault()
    if (commentInput.trim() !== '') {
      db.collection('posts').doc(id).collection('comments').add({
        text: commentInput,
        username: user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  
      setCommetInput('')
    }
  }


  let trash =  email === user?.email ? true : false;

  const deletePost = () => {
    db.collection('posts').doc(id).delete();
  }
  
  return (
    <div className='post'>

      <div className='post__header'>
        <div style={{alignItems: 'center', display: 'flex'}}>
          <Avatar alt={username} src='/static/images/avatar/1.jpg' className='post__avatar' />
          <h3 className='post__userName'>{username}</h3>
        </div>
        { trash ? <DeleteIcon className='post__delete' onClick={deletePost} /> : '' }
      </div>

      <img src={imgUrl} alt="PostImage" className='post__image'/>

      <h4 className='post__caption'><strong>{username}: </strong>{caption}</h4>
      { comments.length === 0 ? false : true &&
        <div className="post__comments">
          <FlipMove>
            {comments.map(({username, text, id}) => <p key={id}><strong>{username}: </strong>{text}</p>)}
          </FlipMove>
        </div>
      }
      { user &&
        <form className='post__form' onSubmit={postComment}>
          <input 
            type="text"
            className="post__commentInput"
            value={commentInput}
            onChange={e => setCommetInput(e.target.value)}
            placeholder='Add a comment...'
          />
          <button 
            className='post__commentButton'
            disabled={!commentInput}
            type='submit'
          >
            Post
          </button>
        </form>
      }
    </div>
  )
} 

export default Post
