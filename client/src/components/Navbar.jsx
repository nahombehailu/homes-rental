import { Button, IconButton, Typography } from '@mui/material'
import {Search,Person,Menu}  from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const {user}=useSelector((state)=>state.user)
 console.log(user)
 console.log(user.profileImagePath) 

  return (
    <div>
<div>
    <a href="/">
    <img src="../assets/upload.png" alt="logo" /></a>
    <Typography variant="h1" color="initial">NAH HOME RENTALS</Typography>
</div>

<div>
    <input type="text" name="search" id="search" placeholder='search here...' />
    <IconButton>
       <Search />
    </IconButton>
</div>

{user ? (<Person /> )
    :(
        <img src={`${user.profileImagePath}`} alt="logo" /> 
       
    )}
<div>
<Button>
    <Menu />
    {user ? (<Person />)
    :(
        <img src={user.profileImagePath} alt="logo" />  
    )}
    
</Button>
</div>


    </div>
  )
}
