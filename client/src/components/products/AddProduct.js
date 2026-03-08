import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Alert } from '@mui/material';
import { useState } from 'react';

export default function FormDialog({ catchData, setAmount, amount }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [price, setPrice] = React.useState(0)
  const [category, setCategory] = React.useState("")
  const [alert, setAlert] = useState("")
  const [jump, setJump] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };


  const addProduct = async () => {
    if (name === "" || description === "" || price === 0) {
      setAlert("All fields are required")
      setJump(true)
      setTimeout(() => {
        setJump(false)
      }, 1500)
    }
    try {
      console.log(name, price, description, category);
      
      const { data } = await axios.post("http://localhost:1234/api/prod", { name, description, price, category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      catchData()
      setAmount(amount + 1)
      console.log("amount in addproduct", amount);

    }
    catch (error) {
      const message = error?.response?.data?.message || "אירעה שגיאה";
      setAlert(message)
      setJump(true)
      setTimeout(() => {
        setJump(false)
      }, 1500)
    }

  }
  return (
    <React.Fragment>
      <Button sx={{ color: "#06213f", borderColor: "#06213f" }} variant="outlined" onClick={handleClickOpen}>
        add product
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10px" }}><DialogTitle> Add Product</DialogTitle></div>

        <DialogContent sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={e => setName(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="name"
              label="name"
              type="text"
              fullWidth
              variant="standard"
              sx={{
                '& label': { color: '#06213f' },
                '& label.Mui-focused': { color: '#06213f' },
                '& .MuiInput-underline:before': { borderBottomColor: '#ece82d' }, 
                '& .MuiInput-underline:hover:before': { borderBottomColor: '#06213f' },
                '& .MuiInput-underline:after': { borderBottomColor: '#06213f' } 
              }}
            />
            <TextField
              onChange={e => setDescription(e.target.value)}
              required
              margin="dense"
              id="name"
              label="description"
              type="text"
              fullWidth
              variant="standard"
              sx={{
                '& label': { color: '#06213f' },
                '& label.Mui-focused': { color: '#06213f' },
                '& .MuiInput-underline:before': { borderBottomColor: '#ece82d' }, 
                '& .MuiInput-underline:hover:before': { borderBottomColor: '#06213f' }, 
                '& .MuiInput-underline:after': { borderBottomColor: '#06213f' } 
              }}
            />
            <TextField
              onChange={e => setPrice(Number(e.target.value))}
              required
              margin="dense"
              id="name"
              label="price"
              type="number"
              fullWidth
              variant="standard"
              sx={{
                '& label': { color: '#06213f' },
                '& label.Mui-focused': { color: '#06213f' },
                '& .MuiInput-underline:before': { borderBottomColor: '#ece82d' }, 
                '& .MuiInput-underline:hover:before': { borderBottomColor: '#06213f' }, 
                '& .MuiInput-underline:after': { borderBottomColor: '#06213f' } 
              }}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label"
                sx={{
                  color: '#06213f',            
                  '&.Mui-focused': { color: '#06213f' } 
                }}>Choose category</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="Gifts" onChange={p => setCategory(p.target.value)} control={<Radio sx={{ color: '#06213f', '&.Mui-checked': { color: '#ece82d' } }} />} label="Gifts" />
                <FormControlLabel value="Sport" onChange={p => setCategory(p.target.value)} control={<Radio sx={{ color: '#06213f', '&.Mui-checked': { color: '#ece82d' } }} />} label="Sport" />
                <FormControlLabel value="Clothing" onChange={p => setCategory(p.target.value)} control={<Radio sx={{ color: '#06213f', '&.Mui-checked': { color: '#ece82d' } }} />} label="Clothing" />
                <FormControlLabel value="Schomnces" onChange={p => setCategory(p.target.value)} control={<Radio sx={{ color: '#06213f', '&.Mui-checked': { color: '#ece82d' } }} />} label="Schomnces" />
              </RadioGroup>
              <DialogActions sx={{ justifyContent: "center" }}>
                <Button onClick={handleClose} sx={{ color: "#06213f" }}>Cancel</Button>
                <Button onClick={addProduct} sx={{ color: "#06213f" }} type="submit">Add</Button>
              </DialogActions>
              {jump && <Alert severity="error">{alert}</Alert>}
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
