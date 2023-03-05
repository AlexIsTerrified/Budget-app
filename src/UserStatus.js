import {NavLink as Link} from 'react-router-dom'
import {Login,Logout} from '@mui/icons-material';
import {logout} from './Functions/functions'

export default function UserStatus({user}){


    return (
        <div className="user-status">
            {user != null ?
           <>
                <div className="box" onClick={logout} >
                <Logout/>Logout
                </div>
           </>
        :    
            <Link to="/login">
                <div className="box">
                <Login/>Login
                </div>
            </Link>
        }
            
        </div>
    )
}