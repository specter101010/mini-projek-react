import React, { useState } from "react";
import InputText from "./inputTextFeild";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import './login.css'
import Visibility from '@mui/icons-material/Visibility';


const Login =() =>{
    
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit =(event)=>{
        event.preventDefault();

        console.log('hello')
    }

    return(
        <Container maxWidth='xs' className="cn-lg">

            <Box
            sx={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                flexDirection:'column',
            }}


            component="form"
            onSubmit={handleSubmit}
            >
            <Avatar>
                <LockIcon/>
            </Avatar>

            <Typography component={"h1"} variant="h5">
                Sign in
            </Typography>

            < InputText
            id="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            autoFocus
            name="email"
            type="text"
            />
            <br/>

            <div style={{display:"flex", width:"100%",position:"relative"}}>
            < InputText
            id="password"
            label="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            autoFocus
            name="password"
            type={showPassword ? "text":"password"}
            />
           <div style={{ position : "absolute", right: 20, top:33,cursor:"pointer"}}
           onClick={()=>setShowPassword(!showPassword)}
           >
           <Visibility fontSize="small"/>
           </div>

            </div>
            
            <br/>
            <Button
            type="submit"
            variant="contained"
            fullWidth
            >Sign in</Button>
            </Box>

         </Container>
    )
}

export default Login