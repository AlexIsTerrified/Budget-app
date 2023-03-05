import {useState} from 'react'
import {NavLink as Link,useNavigate} from 'react-router-dom'
import {Button,TextField,InputAdornment,IconButton,OutlinedInput,InputLabel,FormControl} from '@mui/material';
import {VisibilityOff,Visibility} from '@mui/icons-material';
import {createUserWithEmail} from '../Functions/functions'

export default function Register(){
    const [showPassword,setShowPassword] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [rePassword,setRePassword] = useState('')
    const [comparePass,setComparePass] = useState(false)
    const navigate = useNavigate();

    const onPassChange = (e) => {
        if(e.target.id === "password")setPassword(e.target.value)
        if(e.target.id === "repassword")setRePassword(e.target.value)

        if(rePassword != "" && password !== rePassword){
            setComparePass(false)
        }else{
            setComparePass(true)
        }
        console.log(password !== rePassword, comparePass)
    }

    const onSubmit = () => {
        console.log(createUserWithEmail(email,password))
        navigate("/")
    } 

    return (
        <div className="login">
            <div className="box">
                <b>Sign up with Email and Password</b>
                <TextField label="Email" size="small" onChange={(e)=>setEmail(e.target.value)} />
                <FormControl variant="outlined">
                    <InputLabel size="small" htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput id="password" label="Password" size="small"  
                    onChange={onPassChange} type={showPassword ? 'text' : 'password'}  endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setShowPassword(!showPassword)}
                            onMouseDown={e=>e.preventDefault()}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    } />
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel size="small" htmlFor="outlined-adornment-password">Re-type Password</InputLabel>
                    <OutlinedInput id="repassword" label="Re-type Password" size="small" onChange={onPassChange} 
                        type={showPassword ? 'text' : 'password'} endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setShowPassword(!showPassword)}
                            onMouseDown={e=>e.preventDefault()}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    } />
                </FormControl>
                {password != '' && rePassword != '' && comparePass ? <i>Passwords are not the same</i> : ''}
                <Button variant="contained" onClick={onSubmit}>Sign Up</Button>
            </div>
            <h4>or</h4>
        </div>
    )
}