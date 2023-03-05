import {useState} from 'react'
import {NavLink as Link,useNavigate} from 'react-router-dom'
import {Button,TextField,InputAdornment,IconButton,OutlinedInput,InputLabel,FormControl} from '@mui/material';
import {VisibilityOff,Visibility} from '@mui/icons-material';
import {loginUserWithEmail} from '../Functions/functions'

export default function Login(){
    const [showPassword,setShowPassword] = useState(false)
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [prompt,setPrompt] = useState(true)
    const navigate = useNavigate();


    const handleSubmit = async () => {
        const newP =await loginUserWithEmail(email,password)
        console.log(newP)
        setPrompt(newP.set)
        if(newP.set)
            navigate("/")
       // {prompt != "" ? <i>{prompt.code}</i> : ""}
    }

    return (
        <div className="login">
            <div className="box">
                <b>Login with Email and Password</b>
                <TextField label="Email" size="small"  onChange={(e)=>setEmail(e.target.value)} />
                <FormControl variant="outlined">
                    <InputLabel size="small" htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput label="Password" size="small" onChange={(e)=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} endAdornment={
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
                <Link to="/">Forget password</Link>
                <Button variant="contained" onClick={handleSubmit}>Login</Button>
                {prompt === false ? <i>User couldn't be logged in</i> : ""}
                <i>Don't have an account?<Link to="/register"> Sign up</Link></i> 
            </div>
            <h4>or</h4>
        </div>
    )
}