

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Alert } from '@mui/material';
import { useState } from 'react';

export default function FormDialog({ item, catchData }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [category, setCategory] = useState(item.category);
  const [alert, setAlert] = useState("");
  const [jump, setJump] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  const updateProduct = async () => {
    if (name === "" || description === "" || price === 0) {
      setAlert("All fields are required");
      setJump(true);
      setTimeout(() => {
        setJump(false);
      }, 1500);
      return;
    }
    try {
      await axios.put(
        "http://localhost:1234/api/prod",
        { id: item._id, name, description, price, category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      catchData();
      handleClose();
    } catch (error) {
      setAlert(error.response?.data?.message || "Error updating product");
      setJump(true);
      setTimeout(() => {
        setJump(false);
      }, 1500);
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: '#06213f', textAlign: 'center' }}>Edit Product</DialogTitle>
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
              value={name}
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
              id="description"
              label="description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
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
              id="price"
              label="price"
              type="number"
              fullWidth
              variant="standard"
              value={price}
              sx={{
                '& label': { color: '#06213f' },
                '& label.Mui-focused': { color: '#06213f' },
                '& .MuiInput-underline:before': { borderBottomColor: '#ece82d' },
                '& .MuiInput-underline:hover:before': { borderBottomColor: '#06213f' },
                '& .MuiInput-underline:after': { borderBottomColor: '#06213f' }
              }}
            />
            <FormControl>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{
                  color: '#06213f',
                  '&.Mui-focused': { color: '#06213f' },
                  marginTop: 2,
                }}
              >
                Choose category
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <FormControlLabel
                  value="Gifts"
                  control={<Radio sx={{ color: '#06213f', '&.Mui-checked': { color: '#ece82d' } }} />}
                  label="Gifts"
                />
                <FormControlLabel
                  value="Sport"
                  control={<Radio sx={{ color: '#06213f', '&.Mui-checked': { color: '#ece82d' } }} />}
                  label="Sport"
                />
                <FormControlLabel
                  value="Clothing"
                  control={<Radio sx={{ color: '#06213f', '&.Mui-checked': { color: '#ece82d' } }} />}
                  label="Clothing"
                />
                <FormControlLabel
                  value="Schomnces"
                  control={<Radio sx={{ color: '#06213f', '&.Mui-checked': { color: '#ece82d' } }} />}
                  label="Schomnces"
                />
              </RadioGroup>
            </FormControl>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button onClick={handleClose} sx={{ color: "#06213f" }}>
                Cancel
              </Button>
              <Button onClick={updateProduct} type="submit" sx={{ color: "#06213f" }}>
                Update
              </Button>
            </DialogActions>
            {jump && <Alert severity="error">{alert}</Alert>}
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

