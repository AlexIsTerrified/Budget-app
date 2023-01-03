import {useEffect, useState} from 'react'
import {Route,BrowserRouter as Router,Routes,NavLink as Link,useLocation, BrowserRouter} from 'react-router-dom'
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav'
import Dashboard from './Dashboard/Dashboard'
import Income from './Income/Income'
import Expenses from './Expenses/Expenses'
import {fetchTempIncome,fetchTempExpenses,tempIncome,tempExpenses,fetchIncome,fetchExpenses,editIncome,editExpenses,darkMode} from './Functions/functions'
import { getStatus,sortByStatus } from './Functions/calculations';

let updateInfo = {income:fetchIncome(),expenses:fetchExpenses()}
if(updateInfo.income !== false && updateInfo.expenses !== false && updateInfo.income !== null && updateInfo.expenses !== null ){
	tempIncome(updateInfo.income)
	tempExpenses(updateInfo.expenses)
	updateInfo = getStatus(updateInfo.income,updateInfo.expenses)	
}
function App() {
	const [income, setIncome] = useState(updateInfo.income);
	const [expenses, setExpenses] = useState(updateInfo.expenses);
	const [darkmode,setDarkmode] = useState(darkMode)
	const [loc,setLoc] = useState('/')
	const location = useLocation();

	const darkTheme = createTheme({
		  palette: {
			mode: darkmode ? 'dark' : 'light',
		  },
	});

	
	const updateState = () => {
		let update = {income:fetchTempIncome(),expenses:fetchTempExpenses()}
		if(updateInfo.income !== false && updateInfo.expenses !== false && updateInfo.income !== null && updateInfo.expenses !== null )
			update = getStatus(update.income,update.expenses)

		editIncome(update.income)
		editExpenses(update.expenses)
		setIncome(update.income)
		setExpenses(update.expenses)
		setDarkmode(darkMode())
	}
	
	useEffect(() => {
		if(loc !== location.pathname)
			setLoc(location.pathname)
	  }, [location]);
	
	  useEffect(()=>{
		if(income !== false && expenses !== false && income !== null && expenses !== null && income !== [] && expenses !== [] ){
			updateState()
		}
	  },[loc])
	
	
	useEffect(()=>{
		if(darkmode){
			const body = document.body
			body.classList.add("dark")
		}else{
			const body = document.body
			body.classList.remove("dark")
		}
	})
	


  return (
			<ThemeProvider theme={darkTheme}>
				{income == false || expenses == false || income == null || expenses == null ? "" : <Nav/>}
				<div className="main">
					<Routes>
						<Route path="/" element={<Dashboard income={income} expenses={expenses} theme={darkmode}/>}/>
						<Route path="/income" element={<Income income={income} theme={darkmode} />}/>
						<Route path="/expenses" element={<Expenses expenses={expenses} theme={darkmode} />}/>
					</Routes>
				</div>
				<button id="hidden" onClick={updateState} />
			</ThemeProvider>
  );
}

export default App;
