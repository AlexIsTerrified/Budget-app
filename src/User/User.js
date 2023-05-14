import {FormLabel,RadioGroup,Radio,FormControlLabel} from '@mui/material';
import {setDarkMode,darkMode} from '../Functions/functions'

export default function User(){

	const handleDark = (e) => {
        setDarkMode(e.target.checked)
    }

    return(
        <div className="user-preference">
            <div className="head">
            <h1>Settings</h1>
            </div>
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