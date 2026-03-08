import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import UpdateProduct from './UpdateProduct'
export default function Product(props) {
  const { _id, name, price, description, category } = props.item;

  const deleteProduct = async () => {
    try {
      console.log(_id, "prodid");

      const { data } = await Axios.delete("http://localhost:1234/api/prod/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          data: { id: _id }
        })
      props.onRemove(_id)
    }
    catch (error) {
      console.error(error);
    }
  }
  console.log(category);

  return (

    <Card sx={{ width: 350, maxWidth: 800 }}>
      <Link to={`/Products/${_id}`}>
        <CardMedia
          component="img"
          height="194"
          image={`../pics/${category}/${name}.jpg`}
        />
      </Link>
      <CardHeader
        title={name}
        subheader={`${price}$`}
        action={
          props.position === "Admin" && <div>
            <IconButton onClick={deleteProduct} aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <UpdateProduct item={props.item} catchData={props.catchData} /></div>
        }
      />

    </Card>
  );
}
