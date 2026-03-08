import React, { useEffect, useState } from 'react'
import Counter from '../buttons/Counter'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import Button from '@mui/material/Button';

const SingleProduct = (props) => {
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const [data, setData] = useState([])

  const catchData = async () => {
    console.log("id", id)
    const { data } = await Axios.get(`http://localhost:1234/api/prod/${id}`)
    setData(data)
  }

  useEffect(() => {
    catchData()
  }, [])

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token")
      const { data } = await Axios.post("http://localhost:1234/api/cart/", { id, qty: qty },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(qty);
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div style={{ marginTop: "60px",marginBottom: "60px", display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>

        <div style={{  display: "flex", flexWrap: "wrap", flexDirection: "row", alignItems: "center", width: "30vw", justifyContent: "space-between", height: "500px" }}>
          <div style={{display: "flex", flexWrap: "wrap",  alignItems: "center", width: "100%", justifyContent: "space-between",}}>
            <h1 style={{color:'rgba(6, 33, 63)'}}>{data.name}</h1>
            <p style={{color:'rgba(6, 33, 63)'}}>{data.price}$</p>
            <div style={{display:"block", width:"100%"}}><p style={{marginTop: 0 }}>{data.description}</p></div>
          </div>
          
          <div style={{ marginTop: "200px", display: "flex", flexWrap: "wrap", flexDirection: "column", justifyContent: "space-evenly", width: "100%" , gap:"20px", alignItems:"center"}}>
            <Counter qty={qty} setQty={setQty} />
            <Button sx={{ width:"100%",
                    color: 'rgba(6, 33, 63)', backgroundColor: '#ece82d', '&:hover': {
                        backgroundColor: 'rgba(6, 33, 63)',
                        color: "white"
                    }}} onClick={addToCart} variant="contained">Add to Cart</Button>
          </div>
        </div>

        <div
          style={{
            width: "35vw",
            height: "500px",
            overflow: "hidden",
            border: "0.1vw solid #06213f",
            marginBottom: "20px"
          }}
        >
          <img
            src={`../pics/${data.category}/${data.name}.jpg`}
            alt={data.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      </div>
    </>
  )
}

export default SingleProduct