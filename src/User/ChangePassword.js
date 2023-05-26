import {useState} from 'react'
import {Button,InputAdornment,IconButton,OutlinedInput,InputLabel,FormControl,Box,CircularProgress,Dialog,DialogActions,DialogContent,} from '@mui/material';
import {VisibilityOff,Visibility} from '@mui/icons-material';
import {changePassword} from '../Functions/functions'

export default function ChangePassword({user}){
    const [showPassword,setShowPassword] = useState(false)
    const [comparePass,setComparePass] = useState(false)
    const [loading,setLoading] = useState(false)
    const [changed,setChanged] = useState({set:false,message:""})
    const [open,setOpen] = useState(false)
    const [password,setPassword] = useState("")
    const [newPassword,setNPassword] = useState("")
    const [rePassword,setRePassword] = useState("")

    const onPassChange = (e) => {
        if(e.target.id === "password"){
            setNPassword(e.target.value)
            if(rePassword == "" || rePassword !== e.target.value){
                setComparePass(false)
            }else{
                setComparePass(true)
            }
        }
        if(e.target.id === "repassword"){
            setRePassword(e.target.value)
            if(newPassword == "" || newPassword !== e.target.value){
                setComparePass(false)
            }else{
                setComparePass(true)
            }
        }
    }

    const onSubmit = async() => {
        setLoading(true)
        const change = await changePassword(user,password,newPassword)
        setChanged(change)
        setLoading(false)
        if(change.set)setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="login">
            <h1>Change Password</h1>
            <div className="box">
            <i className="error">{newPassword.length >= 8 ? 
            newPassword != '' && rePassword != '' && !comparePass ? "New passwords do not match." : changed?.set ? "" : changed?.message.code 
            : newPassword.length > 0 ? "New password must be at least 8 characters" : ""}</i>
            <FormControl variant="outlined">
                    <InputLabel size="small" htmlFor="outlined-adornment-password">Old Password</InputLabel>
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
            <FormControl variant="outlined">
                    <InputLabel size="small" htmlFor="outlined-adornment-password">New Password</InputLabel>
                    <OutlinedInput label="Password" id="password" size="small" onChange={onPassChange} type={showPassword ? 'text' : 'password'} 
                    endAdornment={
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
                    <InputLabel size="small" htmlFor="outlined-adornment-password">Re-type New Password</InputLabel>
                    <OutlinedInput label="Password" id="repassword" size="small" onChange={onPassChange} type={showPassword ? 'text' : 'password'} 
                    endAdornment={
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
                    <Button variant="contained" onClick={onSubmit} disabled={!comparePass || password.length < 8 || loading}>Change Password</Button>
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
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                Password Updated!
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Okay</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}