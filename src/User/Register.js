import {useState} from 'react'
import {NavLink as Link,useNavigate} from 'react-router-dom'
import {Button,TextField,InputAdornment,IconButton,OutlinedInput,InputLabel,FormControl,Box,CircularProgress} from '@mui/material';
import {VisibilityOff,Visibility, Compare} from '@mui/icons-material';
import {createUserWithEmail} from '../Functions/functions'

export default function Register(){
    const [showPassword,setShowPassword] = useState(false)
    const [email,setEmail] = useState('')
    const [isEmail,setIsEmail] = useState(false)
    const [password,setPassword] = useState('')
    const [rePassword,setRePassword] = useState('')
    const [comparePass,setComparePass] = useState(false)
    const [prompt,setPrompt] = useState({set:true,message:""})
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

    const onPassChange = (e) => {
        if(e.target.id === "password"){
            setPassword(e.target.value)
            if(rePassword == "" || rePassword !== e.target.value){
                setComparePass(false)
            }else{
                setComparePass(true)
            }
        }
        if(e.target.id === "repassword"){
            setRePassword(e.target.value)
            if(password == "" || password !== e.target.value){
                setComparePass(false)
            }else{
                setComparePass(true)
            }
        }
        console.log(e.target.value.length)
    }

    const checkEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setIsEmail(re.test(email))
        setEmail(email);
        console.log(email,re.test(email))
    }

    const onSubmit = async() => {
        setLoading(true)
        const create = await createUserWithEmail(email,password)
        setPrompt(create)
        console.log(create)
        if(create.set){
            navigate("/")
        }
        setLoading(false)
    } 

    const handlePrompt = (message) => {
        if(message.code === "auth/email-already-in-use") return "Email already in use."
        else return "Something went wrong, please try again."
    }

    return (
        <div className="login">
            <h1>Sign Up</h1>
            <div className="box">
            <i className="error">{isEmail ? password.length >= 8 ? password != '' && rePassword != '' && !comparePass ? "Passwords do not match." 
            : !prompt.set ? handlePrompt(prompt.message) : ""
            : password.length > 0 ? "Password must be atleast 8 characters." : ""
             : email != "" ? "Invalid email." : ""}</i>
                <b>Sign up with Email and Password</b>
                <TextField label="Email" size="small" onChange={(e)=>{checkEmail(e.target.value);}} />
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
                <Box sx={{position: 'relative',display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" onClick={onSubmit} disabled={!comparePass || !isEmail || password.length < 8 || loading}>Sign Up</Button>
                    {loading && <CircularProgress size={24}
                        sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        }}></CircularProgress>}
                </Box>
            </div>
        </div>
    )
}