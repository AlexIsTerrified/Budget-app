import {useState,useEffect} from 'react'
import {NavLink as Link,useLocation} from 'react-router-dom'
import {Switch,FormControl, Tooltip,Zoom} from '@mui/material';
import { styled } from '@mui/material/styles';
import {AccountBalanceWallet,Receipt,Dashboard,ManageAccounts,Badge} from '@mui/icons-material';
import {setDarkMode,darkMode} from './Functions/functions'

export default function App({warningNum}){
	const [width,setWidth] = useState(window.innerWidth)
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
						{warningNum.income.errors > 0 || warningNum.income.warnings > 0 ? 
						<span className={"badge "+(warningNum.income.errors > 0 ? "error" : "warning")}>
						{warningNum.income.errors > 0 ? warningNum.income.errors : warningNum.income.warnings}</span> : ""}
						
						<Tooltip title="Income" TransitionComponent={Zoom} placement={width <= 640 ? "top" : "right-start"} arrow>
								<AccountBalanceWallet color="action"/>  
						</Tooltip>
						<b>Income</b>
					</div>
				</Link>
				<Link to="/expenses">
					<div className="item">
						{warningNum.expenses.errors > 0 || warningNum.expenses.warnings > 0 ? 
						<span className={"badge "+(warningNum.expenses.errors > 0 ? "error" : "warning")}>
						{warningNum.expenses.errors > 0 ? warningNum.expenses.errors : warningNum.expenses.warnings}</span> : ""}
						
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

