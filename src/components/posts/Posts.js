import React, { useState, useEffect } from 'react'
import Post from '../post/Post'
import { db } from '../../firebase'

// import InstagramEmbed from 'react-instagram-embed'

import './posts.scss'

function Posts({ user }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }))
    })
  }, [])
  
  return (
    <div className='posts'>
      {
        posts.map(({ imgUrl, caption, id, username, email }) => <Post 
          key={id} 
          imgUrl={imgUrl} 
          username={username} 
          caption={caption}
          email={email}
          id={id}
          user={user}
          myEmail={user?.email}
          commenterName={user?.displayName}
        />)
      }       
    </div>
  )
}

export default Posts
