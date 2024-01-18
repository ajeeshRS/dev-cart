import React, { useState } from 'react'
import {AppBar, Box, Grid, IconButton, Toolbar, Typography} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearchContext } from '../../context/SearchContext';
import { getHeaders } from '../../utils/auth';
function SearchNavBar() {

  const navigate = useNavigate()
  const [searchTerm,setSearchTerm] = useState('')
  const {updateSearchResults} = useSearchContext()
  
  const handleOnChange =(e)=>{
    e.preventDefault()
    setSearchTerm(e.target.value);
}

  // to perform search query
  const searchButton = async()=>{

    try {
      
      const res = await axios.get(`http://localhost:3001/user/search/${searchTerm}`,{
        headers:getHeaders()
      })
      if(res.status===200){
        updateSearchResults(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyPress=(e)=>{
  if(e.key==="Enter"){
    searchButton()
  }
  }
  return (
   
    
    <Grid md={12}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={1}
        position="static"
        sx={{
          position: "fixed",
          top: "0px",
          zIndex: "1",
          bgcolor: "#7E30E1",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
          onClick={()=>navigate(-1)}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Grid pl={10}>

          <input className='search-input' onKeyDown={handleKeyPress} value={searchTerm} onChange={handleOnChange} type='text' placeholder='search products'/>
          <IconButton onClick={searchButton}>
            <Search sx={{color:"#fff"}}/>
          </IconButton>
          </Grid>
          <Grid position={"absolute"} right={30}>
            <IconButton
              sx={{ color: "white" }}
              
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton sx={{ color: "white" }} onClick={()=>navigate("/user/cart")}>
              <ShoppingCartOutlined />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  </Grid>

   
   
  )
}

export default SearchNavBar