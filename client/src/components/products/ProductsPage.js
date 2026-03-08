

import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Product from './Product'
import { Box, Grid, Stack, Pagination, FormControl, Select, MenuItem, FormHelperText } from '@mui/material'
import { useSelector } from 'react-redux'
import AddProduct from './AddProduct'

const ProductsPage = () => {
  const role = useSelector((store) => store.user.role)
  const [products, setProducts] = useState([])
  const [position, setPostion] = useState(role)
  const [page, setPage] = useState(1)
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  const catchData = async (page = 1, category = '') => {
    const { data } = await Axios.get(
      `http://localhost:1234/api/prod?page=${page}&limit=6&category=${category}`
    )
    setProducts(data.products)
    setAmount(data.total)
  }

  useEffect(() => {
    catchData(page, category)
  }, [page, category])

  const onRemove = (id) => {
    setProducts(products.filter(p => p._id !== id));
  }

  if (!products || !products.length) return <h1>loading..</h1>

  return (
    <>
      {(position === "Admin") && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: "2vw",
            mb: 2,
            marginTop: "20px"
          }}
        >
          <FormControl sx={{ minWidth: 180 }}>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setPage(1)
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06213f',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06213f',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06213f',
                },
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Gifts">Gifts</MenuItem>
              <MenuItem value="Sport">Sport</MenuItem>
              <MenuItem value="Schomnces">Schomnces</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
            </Select>
            <FormHelperText>Category</FormHelperText>
          </FormControl>

          <Box>
            <AddProduct catchData={catchData} />
          </Box>
        </Box>
      )}

      {(position !== "Admin") && (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", paddingX: "2vw", mb: 2 }}>
          <FormControl sx={{ minWidth: 180 }}>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setPage(1)
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06213f',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06213f',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#06213f',
                },
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Gifts">Gifts</MenuItem>
              <MenuItem value="Sport">Sport</MenuItem>
              <MenuItem value="Schomnces">Schomnces</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
            </Select>
            <FormHelperText>Category</FormHelperText>
          </FormControl>
        </Box>
      )}

      <Box sx={{ width: '100%', px: 2, py: 3 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {products.map((item) => (
            <Grid
              key={item._id}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Product item={item} position={position} onRemove={onRemove} catchData={catchData} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Stack spacing={2} alignItems="center" marginBottom={"20px"} marginTop={"20px"}>
        <Pagination
          onChange={(e, value) => setPage(value)}
          page={page}
          count={Math.ceil(amount / 6)}
          shape="rounded"
          size="large"
          siblingCount={1}
          boundaryCount={1}
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#06213f",
              color: "white",
              "&:hover": {
                backgroundColor: "#06213f",
              }
            },
            "& .MuiPaginationItem-root": {
              color: "#06213f"
            }
          }}
        />

      </Stack>
    </>
  )
}

export default ProductsPage





