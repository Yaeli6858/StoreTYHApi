import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import  Axios  from 'axios';
import { useEffect } from 'react';
import { Alert } from '@mui/material';

const Counter = ({qty, setQty, prodId}) => {
  const [jump, setJump] = useState(false)
  const [alert, setAlert] = useState("")
  
  const addSum =()=>{
    if(qty !== 50){
      setQty(qty+1)
      setJump(false)
    }
    else{
      setAlert("For orders over 50 products, please contact us.")
      setJump(true)
    } 
  }

  const minusSum =()=>{
    if( qty!== 0)
      setQty(qty-1)
    setJump(false)
  }

    const addToCart = async () => {
    try {
      const token = localStorage.getItem("token")
      console.log(prodId,"prodid");

      const { data } = await Axios.put("http://localhost:1234/api/cart/", { id:prodId, count:qty },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(qty, "qty");

    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
  addToCart();
}, [qty]);

  return ( 
    <div>
    <IconButton onClick={minusSum}><RemoveIcon/></IconButton>
    <TextField variant="outlined" InputProps={{sx:{borderRadius:'50px',width:"45px", height:"45px", textAlign:"center"}}} inputProps={{ style: { textAlign: "center" }}} value={qty}/>
    <IconButton onClick={addSum}><AddIcon/></IconButton>
    {/* {jump && <Alert severity='info'> {alert} </Alert>} */}
    </div> 
  )
}

export default Counter