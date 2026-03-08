

import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import PasswordField from '../buttons/PasswordField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { Link } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [alert, setAlert] = useState("")
  const [jump, setJump] = useState(false)
  const navigate = useNavigate();

  const addUser = async (e) => {
    if (!email.endsWith("@gmail.com")) {
      setAlert("your Email address is not validate")
      setJump(true)
      setTimeout(() => setJump(false), 1500)
      return
    }

    e.preventDefault()
    if (userName === "" || password === "" || name === "" || email === "") {
      setAlert("All fields are required")
      setJump(true)
      setTimeout(() => setJump(false), 1500)
      return
    }
    try {
      const { data } = await Axios.post('http://localhost:1234/api/auth/register', { userName, password, name, email, phoneNumber });
      console.log(data)
      navigate('/Login');
    } catch (error) {
      setEmail("")
      if (error.response) {
        setAlert(error.response.data.message);
      } else {
        setAlert("Network error or no response");
      }
      setJump(true)
      setTimeout(() => setJump(false), 1500)

      setUserName("")
      setName("")
      setPassword("")
      setPhoneNumber("")
    }
  }

  const validateNumber = (value) => {
    const arr = value.split("")
    if (arr.length > 10) return
    const inValidChar = arr.find((l) =>
      l < '0' || l > '9'
    )
    if (inValidChar) return
    setPhoneNumber(value)
  }

  return (
    <Box
      sx={{
        maxWidth: 360,        // 450 * 0.8 = 360 (קטן ב-20%)
        mx: "auto",
        mt: 6,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        color: "#06213f"
      }}
      component="form"
      onSubmit={addUser}
      noValidate
    >
      <h1 style={{ textAlign: "center", marginBottom: 16, color: "#06213f" }}>Register</h1>

      <TextField
        size='small'
        value={userName}
        onChange={e => setUserName(e.target.value)}
        id="userName"
        label="UserName"
        type='text'
        variant="outlined"
        required
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#06213f',
            },
            '&:hover fieldset': {
              borderColor: '#06213f',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#06213f',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#06213f',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#06213f',
          },
        }}
      />

      <PasswordField
        value={password}
        onChange={e => setPassword(e.target.value)}
        size="small"
        sx={{
          width: "100%",
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#06213f',
            },
            '&:hover fieldset': {
              borderColor: '#06213f',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#06213f',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#06213f',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#06213f',
          },
        }}
      />

      <TextField
        size='small'
        value={name}
        onChange={e => setName(e.target.value)}
        id="name"
        label="Name"
        type='text'
        variant="outlined"
        required
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#06213f',
            },
            '&:hover fieldset': {
              borderColor: '#06213f',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#06213f',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#06213f',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#06213f',
          },
        }}
      />

      <TextField
        size='small'
        value={email}
        onChange={e => setEmail(e.target.value)}
        id="email"
        label="Email address"
        type='email'
        variant="outlined"
        required
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#06213f',
            },
            '&:hover fieldset': {
              borderColor: '#06213f',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#06213f',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#06213f',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#06213f',
          },
        }}
      />

      <Link
        to="/Login"
        style={{
          textDecoration: 'none',
          color: "#06213f",
          textAlign: 'center',
          marginBottom: 12,
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        Do you have an account?
      </Link>

      <Button
        type="submit"
        variant="contained"
        size="small"
        sx={{
          backgroundColor: "#ece82d",
          color: "#06213f",
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#d6d600' },
          py: 1.3,
          width: "50%",   // חצי רוחב כפתור
          mx: "auto",     // למרכז אותו
          display: "block",
        }}
      >
        Register
      </Button>

      {jump && <Alert severity="error">{alert}</Alert>}
    </Box>
  )
}

export default Register
