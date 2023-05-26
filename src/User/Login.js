import {useState} from 'react'
import {NavLink as Link,useNavigate} from 'react-router-dom'
import {Button,TextField,InputAdornment,IconButton,OutlinedInput,InputLabel,FormControl,Box,CircularProgress} from '@mui/material';
import {VisibilityOff,Visibility} from '@mui/icons-material';
import {loginUserWithEmail} from '../Functions/functions'

export default function Login(){
    const [showPassword,setShowPassword] = useState(false)
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [prompt,setPrompt] = useState(true)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async () => {
        setLoading(true)
        const newP =await loginUserWithEmail(email,password)
        console.log(newP)
        setPrompt(newP)
        if(newP.set)
            navigate("/")
        setLoading(false)
       // {prompt != "" ? <i>{prompt.code}</i> : ""}
    }

    const handlePrompt = (message) => {
        if(message.code === "auth/user-not-found") return "User couldn't be found."
        else if(message.code === "auth/wrong-password") return "Password incorrect."
        else return "Something went wrong, please try again."
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <div className="box">
            <i className="error">{prompt.set === false ? handlePrompt(prompt.message) : ""}</i>
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
                <Link to="/user/reset-password">Forget password</Link>
                <Box sx={{position: 'relative',display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" onClick={handleSubmit} disabled={loading}>Login</Button>
                    {loading && <CircularProgress size={24}
                        sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        }}></CircularProgress>}
                </Box>
                
                <i>Don't have an account?<Link to="/register"> Sign up</Link></i> 
            </div>
        </div>
    )
}