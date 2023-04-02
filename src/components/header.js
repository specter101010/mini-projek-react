import React from 'react'
import './header.css'

function Header(props){
    return(
        <div>
            <h2>Selamat datang {props.nama} </h2>
        </div>
    );
}

export default Header