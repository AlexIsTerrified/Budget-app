import {useState,useEffect} from 'react'
import {NavLink as Link,useLocation} from 'react-router-dom'
import {Switch,FormControl, Tooltip,Zoom} from '@mui/material';
import { styled } from '@mui/material/styles';
import {AccountBalanceWallet,Receipt,Dashboard,ManageAccounts} from '@mui/icons-material';
import {setDarkMode,darkMode} from './Functions/functions'
export default function App({income,expenses}){
	const [width,setWidth] = useState(window.innerWidth)
	const [loc,setLoc] = useState("")
	const location = useLocation()

  useEffect(()=>{
    window.addEventListener("resize",()=>{
      setWidth(window.innerWidth)
    })
  })

	
	return (
		<div className="nav">
			<div className={"start "+(location.pathname.substring(1) || 'home')}>
				<div className="lighted"></div>
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
						{income.errors > 0 || income.outdated > 0 ?
						<span className={"badge "+(income.errors > 0 ? "error" : "")}>{income.errors > 0 ? income.errors : income.outdated}</span>
						: ""}
						
            <Tooltip title="Income" TransitionComponent={Zoom} placement={width <= 640 ? "top" : "right-start"} arrow>
						  <AccountBalanceWallet/>
            </Tooltip>
						<b>Income</b>
					</div>
				</Link>
				<Link to="/expenses">
					<div className="item">
					{expenses.errors > 0 || expenses.outdated > 0 ? 
					<span className={"badge "+(expenses.errors > 0 ? "error" : "")}>{expenses.errors > 0 ? expenses.errors : expenses.outdated}</span>
					: ""}
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
						<b>Settings</b>
					</div>
				</Link>
			</div>
		</div>
	)
}

