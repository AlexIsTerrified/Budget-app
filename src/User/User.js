import {NavLink as Link} from 'react-router-dom'
import {FormLabel,RadioGroup,Radio,FormControlLabel} from '@mui/material';
import {Login,Logout,HowToReg} from '@mui/icons-material';
import {setDarkMode,darkMode,logout} from '../Functions/functions'

export default function User({user}){

	const handleDark = (e) => {
        setDarkMode(e.target.checked)
    }

    return(
        <div className="user-preference">
            {user ?
                <div className="login">
                    <div className="button" onClick={logout} >
                        <Logout/>Logout
                    </div>
                </div> 
            :
                <div className="no-user">
                    <p>Your data is currently only stored on your device. If you would like to save your data to the cloud and access it anywhere you should login or sign up.</p>
                    <div className="row">
                        <Link to="/login">
                            <div className="button"> <Login/>Login </div>
                        </Link>
                        or
                        <Link to="/register">
                        <div className="button"><HowToReg/> Sign up</div></Link>
                    </div>
                </div> 
            }
            <div className="box darkmode">
            <h4>Light preference</h4>
                <RadioGroup defaultValue={darkMode().value} onChange={e=>setDarkMode(e.target.value)} >
                    <FormControlLabel value={0} control={<Radio />} label="System Preference" />
                    <FormControlLabel value={1} control={<Radio />} label="Dark Mode" />
                    <FormControlLabel value={2} control={<Radio />} label="Light Mode" />
                </RadioGroup>
			</div>
        </div>
    )
}