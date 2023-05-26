import {useState} from 'react'
import {Button,TextField,Box,CircularProgress,Dialog,DialogActions,DialogContent} from '@mui/material';
import {resetPassword} from '../Functions/functions';

export default function ResetPassword(){
    const [email,setEmail] = useState('')
    const [isEmail,setIsEmail] = useState(false)
    const [prompt,setPrompt] = useState({set:true,message:""})
    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)

    const checkEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setIsEmail(re.test(email))
        setEmail(email);
        console.log(email,re.test(email))
    }

    const onSubmit = async() => {
        setLoading(true)
        const reset = await resetPassword(email)
        if(reset.set)setOpen(true)
        setPrompt(reset)
        setLoading(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="login">
            <h1>Reset Password</h1>
            <div className="box">
                <i className="error">{!prompt.set ? prompt.message.code : ""}</i>
                <b>Enter the email address for your account</b>
                <TextField label="Email" size="small" onChange={(e)=>{checkEmail(e.target.value);}} />
                <Box sx={{position: 'relative',display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" onClick={onSubmit} disabled={!isEmail || loading}>Reset Password</Button>
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
                A password reset email was sent. Please check your inbox.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Okay</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}