import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import Counter from '../buttons/Counter';
import Axios from 'axios';

const OneProductInCart = ({ item, onRemove }) => {
  const { prodId, name, price, description, count, category } = item;
  const [qty, setQty] = useState(count);

  const deleteFromCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await Axios.delete('http://localhost:1234/api/cart/', {
        headers: { Authorization: `Bearer ${token}` },
        data: { id: prodId }
      });
      onRemove(prodId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: { xs: '95vw', sm: '90vw', md: '45vw' },
        height: 100,
        p: 1,
        mb: 2,
        boxShadow: 2,
        borderRadius: 2,
        flexDirection: 'row-reverse', 
      }}
    >
      <Link to={`/Products/${prodId}`}>
        <CardMedia
          component="img"
          image={`../pics/${category}/${name}.jpg`}
          alt={name}
          sx={{
            width: 90,
            height: '100%',
            borderRadius: 1,
            objectFit: 'cover',
          }}
        />
      </Link>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          px: 2,
          gap: 0.5,
          minWidth: 0,
          flex: 1,
          textAlign: 'right',
        }}
      >
        <Typography variant="h5" fontWeight="bold" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          Price: {price}$
        </Typography>
        <Typography variant="body2" noWrap>
          Total price: {price * qty}$
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pl: 2,
        }}
      >
    
        <IconButton
          onClick={deleteFromCart}
          sx={{
            color: 'black',
            p: 0.5,
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
            <Counter
          qty={qty}
          setQty={setQty}
          prodId={prodId}
          size="small"
        />
      </Box>
    </Card>
  );
};

export default OneProductInCart;
