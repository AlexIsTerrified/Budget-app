import {useState,useEffect} from 'react'
import {NavLink as Link} from 'react-router-dom'
import {Switch,FormControl, Tooltip,Zoom} from '@mui/material';
import { styled } from '@mui/material/styles';
import {AccountBalanceWallet,Receipt,Dashboard,ManageAccounts} from '@mui/icons-material';
import {setDarkMode,darkMode} from './Functions/functions'

export default function App(){
	const [width,setWidth] = useState(window.innerWidth)

  useEffect(()=>{
    window.addEventListener("resize",()=>{
      setWidth(window.innerWidth)
    })
  })

	
	return (
		<div className="nav">
			<div className="start">
				<Link to="">
					<div className="item">
            <Tooltip title="Dashboard" TransitionComponent={Zoom} placement={width <= 640 ? "top" : "right-start"} arrow>
              <Dashboard/>
            </Tooltip>
						<b>Dashboard</b>
					</div>
				</Link>
				<Link to="/income">
					<div className="item">
            <Tooltip title="Income" TransitionComponent={Zoom} placement={width <= 640 ? "top" : "right-start"} arrow>
						  <AccountBalanceWallet/>
            </Tooltip>
						<b>Income</b>
					</div>
				</Link>
				<Link to="/expenses">
					<div className="item">
            <Tooltip title="Expenses" TransitionComponent={Zoom} placement={width <= 640 ? "top" : "right-start"} arrow>
						  <Receipt/>
            </Tooltip>
						<b>Expenses</b>
					</div>
				</Link>
				<Link to="user">
					<div className="item">
            <Tooltip title="User Preference" TransitionComponent={Zoom} placement={width <= 640 ? "top" : "right-start"} arrow>
						  <ManageAccounts/>
            </Tooltip>
						<b>User Preference</b>
					</div>
				</Link>
			</div>
		</div>
	)
}

