
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import PasswordField from '../buttons/PasswordField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setToAdmin, setToUser } from '../../redux/slices/userSlice';
import {jwtDecode} from 'jwt-decode'; // תיקון - jwtDecode מיובא כברירת מחדל
import { Alert } from '@mui/material';

const Login = () => {
  const [alert, setAlert] = useState("")
  const [jump, setJump] = useState(false)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const connectUser = async (e) => {
    e.preventDefault()
    if (userName === "" || password === "") {
      setAlert("All fields are required");
      setJump(true)
      setTimeout(() => {
        setJump(false)
      }, 1500)
      return
    }
    try {
      const { data } = await Axios.post('http://localhost:1234/api/auth/login', { userName, password });
      localStorage.setItem("token", data.accessToken)
      const decode = jwtDecode(data.accessToken)
      if (decode.role === "Admin") {
        dispatch(setToAdmin())
      }
      if (decode.role === "User") {
        dispatch(setToUser())
      }
      navigate('/');

    } catch (error) {
      if (error.response) {
        setAlert(error.response.data.message)
      } else {
        setAlert("Network error or no response");
      }
      setJump(true)
      setTimeout(() => {
        setJump(false)
      }, 1500)

      setUserName("")
      setPassword("")
    }
  }

  return (
    <Box
      component="form"
      onSubmit={connectUser}
      noValidate
      sx={{
        maxWidth: 360,  // 80% מהרוחב שהיה ב Register (450 -> 360)
        mx: "auto",
        mt: 6,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        color: "#06213f",
        alignItems: "center"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 16, color: "#06213f" }}>Login</h1>

      <TextField
        size='small'
        value={userName}
        onChange={e => setUserName(e.target.value)}
        id="userName"
        label="Enter userName"
        type='text'
        variant="outlined"
        required
        fullWidth
        sx={{
          width:'80%',
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
          width: "80%",
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
        to="/Register"
        style={{
          textDecoration: 'none',
          color: "#06213f",
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: 12,
          alignSelf: "center"
        }}
      >
        Haven't registered yet?
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
          width: "0%",
          height:"40px",
          display: "block",
          mx: "auto"
        }}
      >
        Login
      </Button>

      {jump && <Alert severity="error" sx={{ mt: 2 }}>{alert}</Alert>}
    </Box>
  )
}

export default Login
