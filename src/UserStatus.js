import {NavLink as Link} from 'react-router-dom'
import {Button} from '@mui/material';
import {Login} from '@mui/icons-material';
import {logout} from './Functions/functions'
import logo from './logo.svg';

export default function UserStatus({user}){


    return (
        <>
            <div className="user-status">
                <div className="top-logo">
                    <img src={logo}/>
                    <b>Bugeting App</b>
                </div>
                {user != null ?
                <Button onClick={logout}>Logout</Button>
                :    
                <Link to="/login">
                    <Button>Login <Login/></Button>
                </Link>
                }
            </div>
        </>
    )
}