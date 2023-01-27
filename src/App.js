import {useEffect, useState} from 'react'
import {Route,BrowserRouter as Router,Routes,NavLink as Link,useLocation, BrowserRouter} from 'react-router-dom'
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import {fetchTempIncome,fetchTempExpenses,tempIncome,tempExpenses,fetchData,editData,darkMode,auth} from './Functions/functions'
import { getStatus,sortByStatus,checkForChanges} from './Functions/calculations';

function App() {
	const [income, setIncome] = useState([]);
	const [expenses, setExpenses] = useState([]);
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
		if(checkForChanges(fetchTempExpenses(), expenses) || checkForChanges(fetchTempIncome(), income) || income ==[] || expenses == []){
			let update = {income:fetchTempIncome(),expenses:fetchTempExpenses()}
			if(update.income !== false && update.expenses !== false && update.income !== null && update.expenses !== null ){
				update = getStatus(update.income,update.expenses)
				console.log("status gotten")
			}
			editData(update.income,update.expenses)
			setIncome(update.income)
			setExpenses(update.expenses)
			console.log("state updated")
		}
	}

	const updateDarkMode = () => {
		setDarkmode(darkMode().set)
	}

	const loadedReset = () => {
		setInitLoaded(false)
	}

	const initData = async ()=>{
		let updateInfo =await fetchData()
			if(updateInfo.income !== false && updateInfo.expenses !== false && updateInfo.income !== null && updateInfo.expenses !== null ){
				updateInfo = getStatus(updateInfo.income,updateInfo.expenses)	
			}
			tempIncome(updateInfo.income)
			tempExpenses(updateInfo.expenses)
			setIncome(updateInfo.income)
			setExpenses(updateInfo.expenses)
			console.log("initializing data")
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
				<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			</div>
		)
	  }

  return (
			<ThemeProvider theme={darkTheme}>
				{income == false || expenses == false || income == null || expenses == null ? "" : <Nav/>}
				<div className="main">
					<UserStatus user={user}/>
					<Routes>
						<Route path="/" element={<Dashboard incomeList={income} expensesList={expenses} theme={darkmode}/>}/>
						<Route path="/income" element={<Income income={income} theme={darkmode} />}/>
						<Route path="/expenses" element={<Expenses income={income} expenses={expenses}/>}/>
						<Route path="/user" element={<User />}/>
						{user == null ? <>
							<Route path="/login" element={<Login/>}/>
							<Route path="/register" element={<Register/>}/>
						</> : null}
						
					</Routes>
				</div>
				<button id="hidden" className="hidden" onClick={updateState} />
				<button id="loader" className="hidden" onClick={loadedReset} />
				<button id="darkMode" className="hidden" onClick={updateDarkMode} />
			</ThemeProvider>
  );
}

export default App;
