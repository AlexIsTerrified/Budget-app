import {useEffect, useState} from 'react'
import {Route,BrowserRouter as Router,Routes,NavLink as Link} from 'react-router-dom'
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav'
import Dashboard from './Dashboard/Dashboard'
import Income from './Income/Income'
import Expenses from './Expenses/Expenses'
import {fetchIncome,fetchExpenses,darkMode} from './Functions/functions'

function App() {
	const [income, setIncome] = useState(fetchIncome);
	const [expenses, setExpenses] = useState(fetchExpenses);
	const [darkmode,setDarkmode] = useState(darkMode)
	
	const darkTheme = createTheme({
		  palette: {
			mode: darkmode ? 'dark' : 'light',
		  },
	});

	
	const updateState = () => {
		setIncome(fetchIncome)
		setExpenses(fetchExpenses)
		setDarkmode(darkMode())
	}
	
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
  <Router>
   <ThemeProvider theme={darkTheme}>
		{income == false || expenses == false || income == null || expenses == null ? "" : <Nav/>}
		<div className="main">
			<Routes>
				<Route path="/" element={<Dashboard income={income} expenses={expenses} theme={darkmode}/>}/>
				<Route path="/income" element={<Income income={income} theme={darkmode} />}/>
				<Route path="/expenses" element={<Expenses/>}/>
			</Routes>
		</div>
		<button id="hidden" onClick={updateState} />
	</ThemeProvider>
  </Router>
  );
}

export default App;
