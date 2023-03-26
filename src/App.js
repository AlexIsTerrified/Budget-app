import {useEffect, useState} from 'react'
import {Route,Routes,useLocation} from 'react-router-dom'
import { ThemeProvider, createTheme} from '@mui/material/styles';
import {onAuthStateChanged} from 'firebase/auth'
import logo from './logo.svg';
import './App.css';
import Nav from './Nav'
import Dashboard from './Dashboard/Dashboard'
import Income from './Income/Income'
import Expenses from './Expenses/Expenses'
import User from './User/User'
import Login from './User/Login'
import Register from './User/Register'
import UserStatus from './UserStatus'
import {fetchTempData,setTempData,setTempHistory,fetchData,editData,darkMode,auth,checkForChanges,updateForMonth} from './Functions/functions'
import { getStatus,getWarningNum} from './Functions/calculations';

function App() {
	const [income, setIncome] = useState([]);
	const [expenses, setExpenses] = useState([]);
	const [warningNum, setWarningNum] = useState({income:{errors:0,warnings:0},expenses:{errors:0,warnings:0}});
	const [history, setHistory] = useState([]);
	const [darkmode,setDarkmode] = useState(darkMode().set)
	const [user,setUser] = useState(false)
	const location = useLocation();
	const [loc,setLoc] = useState(location.pathname)
	const [loaded,setLoaded] = useState(false)
	const [initLoaded,setInitLoaded] = useState(false)


	const darkTheme = createTheme({
		  palette: {
			mode: darkmode ? 'dark' : 'light',
		  },
	});
	
	const updateState = () => {
		let data = {...fetchTempData()}
		const change =  checkForChanges(data.income,data.expenses)
		if(change){
			editData(data.income,data.expenses,data.history)
			if(data.income && data.expenses){
				data = {...data,...getStatus(data.income,data.expenses)}
			}
			console.log("data updated",data)
			setWarningNum(getWarningNum(data.income,data.expenses))
			 setIncome(data.income)
			 setExpenses(data.expenses)
			 //setHistory(data.history)
		}
	}

	const syncRoutes = async () => {

		
	
	}

	const updateDarkMode = () => {
		setDarkmode(darkMode().set)
	}

	const loadedReset = () => {
		setInitLoaded(false)
	}

	const initData =async ()=>{
		let updateInfo ={...await fetchData()}
			if(updateInfo.income && updateInfo.expenses ){
				updateInfo = {...updateInfo,...await updateForMonth(updateInfo)	}
				updateInfo = {...updateInfo,...getStatus(updateInfo.income,updateInfo.expenses)	}
			}
			setWarningNum(getWarningNum(updateInfo.income,updateInfo.expenses))
			setIncome(updateInfo.income)
			setExpenses(updateInfo.expenses)
			setHistory(updateInfo.history)
			setTempData(updateInfo.income,updateInfo.expenses)
			setTempHistory(updateInfo.history)
			console.log("initializing data",updateInfo)
			setInitLoaded(true)
			
	}

	useEffect(()=>{
		onAuthStateChanged(auth,newUser => {
			if(newUser){
				setUser(newUser)
				setLoaded(true)
			}else{
				setUser(null)
				setLoaded(true)
			}
		})
		if(darkmode){
			const body = document.body
			body.classList.add("dark")
		}else{
			const body = document.body
			body.classList.remove("dark")
		}
	})

	useEffect(()=>{
		if(user !== false){
			initData()
		}
	},[user])
	
	useEffect(() => {
		if(loc !== location.pathname){
			setLoc(location.pathname)
			updateState()
		}
	  }, [location]);

	  if(!loaded || !initLoaded){
		return (
			<div className="loader">
				<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>
		)
	  }

  return (
			<ThemeProvider theme={darkTheme}>
				<Nav warningNum={warningNum}/>
				<div className="main">
					<UserStatus user={user}/>
					<Routes>
						<Route path="/" element={<Dashboard income={income} expenses={expenses} theme={darkmode} history={history}/>}/>
						<Route path="/income" element={<Income income={income} expenses={expenses} theme={darkmode} />}/>
						<Route path="/expenses" element={<Expenses income={income} expenses={expenses}/>}/>
						<Route path="/user" element={<User user={user} />}/>
						{user == null ? <>
							<Route path="/login" element={<Login/>}/>
							<Route path="/register" element={<Register/>}/>
						</> : null}
						
					</Routes>
				</div>
				<button id="hidden" className="hidden" onClick={updateState} />
				<button id="sync" className="hidden" onClick={syncRoutes} />
				<button id="loader" className="hidden" onClick={loadedReset} />
				<button id="darkMode" className="hidden" onClick={updateDarkMode} />
			</ThemeProvider>
  );
}

export default App;
