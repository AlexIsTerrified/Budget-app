import {useState,useEffect} from 'react'
import {NavLink as Link} from 'react-router-dom'
import {Button} from '@mui/material';
import {Login} from '@mui/icons-material';
import {logout} from './Functions/functions'

export default function UserStatus({user}){


    return (
        <div className="user-status">
            {user != null ?
           <Button onClick={logout}>Logout</Button>
        :    
                <Link to="/login">
                <Button>Login <Login/></Button>
            </Link>
        }
            
        </div>
    )
}