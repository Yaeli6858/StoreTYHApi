import React, { useEffect, useState } from 'react'
import Axios from "axios"
import { useNavigate } from 'react-router-dom'
import OneProductInCart from './OneProductInCart'
import { Alert, Box, Typography } from '@mui/material'

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([])
  const [alert, setAlert] = useState("")
  const [jump, setJump] = useState(false)

  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const onRemove = (id) => {
    setCartProducts(cartProducts.filter(p => p.prodId !== id));
  }

  useEffect(() => {
    const findUserCart = async () => {
      try {
        const { data } = await Axios.get('http://localhost:1234/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setCartProducts(data)
      } catch (error) {
        setAlert(error.response?.status === 401 ? "You need to login first" : "An unexpected error occurred")
        setJump(true)
        setTimeout(() => {
          navigate("/Login")
        }, 1500)
      }
    }
    findUserCart()
  }, [token])

  return (
    <>
      {jump && <Alert severity='info'> {alert} </Alert>}

      {/* כותרת */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginTop: 4,
          marginBottom: 4,
          color: "#06213f",
          fontWeight: 600
        }}
      >
        My Cart
      </Typography>
      {cartProducts.length === 0 && <Typography
        variant="h6"
        align="center"
        sx={{
          marginTop: 4,
          marginBottom: 4,
          color: "#06213f",
          fontWeight: 600
        }}
      >
        Oops, you haven't added any<br /> products to your cart yet.
      </Typography>}

      {/* קופסת מוצרים */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          px: 2,
          mb: 6
        }}
      >
        {cartProducts.map((item) => (
          <OneProductInCart key={item.prodId} item={item} onRemove={onRemove} />
        ))}
      </Box>
    </>
  )
}

export default Cart
