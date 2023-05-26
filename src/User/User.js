import {NavLink as Link} from 'react-router-dom'
import {FormLabel,RadioGroup,Radio,FormControlLabel,Button} from '@mui/material';
import {Login} from '@mui/icons-material';
import {setDarkMode,darkMode} from '../Functions/functions'

export default function User({user}){

	const handleDark = (e) => {
        setDarkMode(e.target.checked)
    }

    return(
        <div className="user-preference">
            <div className="head">
            <h1>Settings</h1>
            </div>
            {user ? <div className="box">
                <b>{user.email}</b>
                <Link to="/user/change-password"><Button>Change Password</Button></Link>
            </div> 
            :<div className="box row">
                <Link to="/login"><Button>Login <Login/></Button></Link>
                <span>or</span>
                <Link to="/Register"><Button>Sign Up</Button></Link>
            </div>}
            <div className="box darkmode">
            <FormLabel id="demo-radio-buttons-group-label">Light preference</FormLabel>
                <RadioGroup defaultValue={darkMode().value} onChange={e=>setDarkMode(e.target.value)} >
                    <FormControlLabel value={0} control={<Radio />} label="System Preference" />
                    <FormControlLabel value={1} control={<Radio />} label="Dark Mode" />
                    <FormControlLabel value={2} control={<Radio />} label="Light Mode" />
                </RadioGroup>
			</div>
        </div>
    )
}