import React, { useState, useEffect } from 'react'
import './signUpModal.scss'

import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core';

import { auth } from '../../firebase'

const getModalStyle = () => {
  const top = 45;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-50%, -50%)`,
    textAlign: 'center',
    border: 'none',
    outline: 'none'
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 3),
  }
}));


const SignUpModal = ({ open, handleOpen, setUser, openSingIn, handleOpenSignIn }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user has logged in...
        setUser(authUser)
      } else {
        // user has logged out...
        setUser(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [setUser])

  const signUp = e => {
    e.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      handleOpen();
      return authUser.user.updateProfile({
        displayName: username.trim()
      })
    })
    .catch(error => alert(error.message))

    setUsername('')
    setPassword('')
    setEmail('')
  }

  const signIn = e => {
    e.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
    .catch(error => alert(error.message));
    handleOpenSignIn();

    setPassword('')
    setEmail('')
  }

  return (
    <Modal
    open={open ? open : openSingIn}
    onClose={open ? handleOpen : handleOpenSignIn }
    >
      <div style={modalStyle} className={classes.paper}>
        <form className='modal--signUp' onSubmit={open ? signUp : signIn}>
          <img
              className="header__logo"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Instgram Logo" 
          />
          { open &&
            <Input
              required
              type='text'
              color='secondary'
              placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          }
          <Input 
            required
            type='email'
            color='secondary'
            placeholder='E-mail'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input 
            required
            type='password'
            color='secondary'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='input'
          />
          {open ? <Button type='submit'>Sign Up</Button> : <Button type='submit'>Sing In</Button> }
        </form>
      </div>
    </Modal>
  )
}

export default SignUpModal
