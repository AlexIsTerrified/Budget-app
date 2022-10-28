import {useEffect, useState} from 'react'
import {Route,BrowserRouter as Router,Routes,NavLink as Link} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard/Dashboard'
import Income from './Income/Income'
import Expenses from './Expenses/Expenses'
import {fetchIncome,fetchExpenses} from './Functions/functions'

function App() {
	const [income, setIncome] = useState(fetchIncome);
	const [expenses, setExpenses] = useState(fetchExpenses);
	
	const updateState = () => {
		setIncome(fetchIncome)
		setExpenses(fetchExpenses)
	}
	
  return (
  <Router>
	<div className="nav">
	</div>
    <div className="main">
		<Routes>
			<Route path="/" element={<Dashboard income={income} expenses={expenses}/>}/>
			<Route path="/income" element={<Income/>}/>
			<Route path="/expenses" element={<Expenses/>}/>
		</Routes>
    </div>
	<button id="hidden" onClick={updateState} />
  </Router>
  );
}

export default App;
