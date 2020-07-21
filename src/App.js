import React, { useState } from 'react';
import './App.scss';

import Header from './components/header/Header'
import Posts from './components/posts/Posts'
import SingUpModal from './components/signUpModal/SignUpModal'
import ImageUpload from './components/imageUpload/ImageUpload'

import { Button, Avatar } from '@material-ui/core';

import { auth } from './firebase'

const App = () => {
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSingIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleOpen = () => setOpen(false);
  const handleOpenSignIn = () => setOpenSingIn(false);
  const handleUser = value => setUser(value);

  return (
    <div className="App">
      <SingUpModal
        open={open}
        handleOpen={handleOpen}
        setUser={handleUser}
        openSingIn={openSignIn}
        handleOpenSignIn={handleOpenSignIn}
      />
      <Header>
        <div className='buttons__container'>
          {user ? (
            <React.Fragment>
              <Avatar alt={user?.displayName} className='buttons__avatar' src="/static/images/avatar/1.jpg" />
              <Button onClick={() => auth.signOut()}>Log Out</Button>
            </React.Fragment>
            ): (
            <div>
              <Button onClick={() => setOpen(true)}>Sing Up</Button>
              <Button onClick={() => setOpenSingIn(true)}>Sing In</Button>
            </div>
          ) }
        </div>
      </Header>
      <ImageUpload username={user?.displayName} email={user?.email} />
      <Posts user={user} />
    </div>
  );
}

export default App;
