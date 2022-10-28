import {useEffect, useState} from 'react'
import {TextField,InputAdornment,FormControlLabel,Switch,Button,Select,MenuItem} from '@mui/material';
import {editIncome,editExpenses} from '../Functions/functions'

export function NewIncome(){
	const [incomeList,setIncomeList] = useState([])
	const [length,setLength] = useState(incomeList.length)
	const [newIncome, setNewIncome] = useState({name:'Salary',fixed:true,amount:1000});
	
	const handleIncome = (e) => {
		if(e.target.id === "name")setNewIncome({...newIncome,name:e.target.value})
		if(e.target.id === "fixed")setNewIncome({...newIncome,fixed:e.target.checked})
		if(e.target.id === "amount")setNewIncome({...newIncome,amount:e.target.value})
	}

	const handleAddIncome = (e) => {
		if(newIncome.name != '' && newIncome.amount != '' && newIncome.fixed != null){
			const n_income = incomeList;
			n_income.push(newIncome)
			setIncomeList(n_income);
			setNewIncome({...newIncome,fixed:true})
			setLength(n_income.length)
		}else{
			console.log("missing values")
		}
	}
	
	const handleChange = (e,i) => {
		const income = incomeList
		
		if(e.target.id === "name")income[i].name = e.target.value
		if(e.target.id === "fixed")income[i].fixed = e.target.checked
		if(e.target.id === "amount")income[i].amount = e.target.value
		
		setIncomeList(income)
		console.log(income)
		setLength(income.length)
	}
	
	const handleRemove = (i) => {
		const income = incomeList
		
		income.splice(i,1)
		
		setIncomeList(income)
		setLength(income.length)
	}
	
	const handleSubmit = () => {
		editIncome(incomeList);
		
		document.getElementById("hidden").click()
	}
	
	useEffect(()=>{
		console.log(newIncome)
		console.log(incomeList)
	})
	
	const item = (income,i) => {
		return (<>
				<div className="column">
					<TextField id="name" size="small" onChange={(e)=>handleChange(e,i)} defaultValue={income.name} size="large" variant="standard" required/>
				</div>
				<div className="column">
					<Switch id="fixed" size="small" onChange={(e)=>handleChange(e,i)} color="primary" defaultChecked={income.fixed} required/>
				</div>
				<div className="column">
					<TextField id="amount" size="small" onChange={(e)=>handleChange(e,i)} defaultValue={income.amount} type="number" variant="standard" required
					 InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
					}} />
				</div>
				<div className="column">
					<Button size="small" variant="contained" color="error" onClick={()=>handleRemove(i)}>Remove</Button>
				</div>
				</>
		)
	}
	
	return (
	<div className="income">
		<div className="page">
			<h2>Add an icome</h2>
			<div className="form">
				<div className="row">
					<span className="label">Name</span>
					<TextField id="name" onChange={handleIncome} defaultValue="Salary" size="large" variant="standard" required/>
				</div>
				<div className="row">
				<span className="label center">Fixed</span>
					<Switch id="fixed" onChange={handleIncome} color="primary" checked={newIncome.fixed} required/>
				</div>
				<div className="row">
				<span className="label">Amount</span>
					<TextField id="amount" onChange={handleIncome} defaultValue={1000} type="number" variant="standard" required
					 InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
					  }} />
				  </div>
				<div className="row">
					<Button size="small" variant="contained" onClick={handleAddIncome} >Add</Button>
				</div>
			</div>
			<div className="list">
					<span className="label">Name</span>
					<span className="label">Fixed</span>
					<span className="label">Amount</span>
					<span className="label"></span>
				{incomeList.map((income,i)=>{
					return (
							item(income,i)
						)
				})}
			</div>
			<div className="end">
				<Button size="medium" variant="contained" onClick={handleSubmit} disabled={incomeList.length === 0}>Done</Button>
			</div>
		</div>
	</div>
	)
}

export function NewExpenses(){
	const [expensesList,setexpensesList] = useState([])
	const [length,setLength] = useState(expensesList.length)
	const [newExpense, setNewExpenses] = useState({name:'Rent',fixed:true,proirity:2,amount:1000});
	
	const handleExpenses = (e) => {
		if(e.target.id === "name")setNewExpenses({...newExpense,name:e.target.value})
		if(e.target.id === "fixed")setNewExpenses({...newExpense,fixed:e.target.checked})
		if(e.target.id === "priority")setNewExpenses({...newExpense,priority:e.target.value})
		if(e.target.id === "amount")setNewExpenses({...newExpense,amount:e.target.value})
	}

	const handleAddExpenses = (e) => {
		if(newExpense.name !== null && newExpense.amount !== null && newExpense.fixed !== null){
			const n_expenses = expensesList;
			n_expenses.push(newExpense)
			setexpensesList(n_expenses)
			setNewExpenses({...newExpense,fixed:true})
			setLength(n_expenses.length)
		}else{
			console.log("missing values")
		}
	}
	
	const handleChange = (e,i) => {
		const expenses = expensesList
		
		if(e.target.id === "name")expenses[i].name = e.target.value
		if(e.target.id === "fixed")expenses[i].fixed = e.target.checked
		if(e.target.id === "amount")expenses[i].amount = e.target.value
		
		setexpensesList(expenses)
		console.log(expenses)
		setLength(expenses)
	}
	
	const handleRemove = (i) => {
		const expenses = expensesList
		
		expenses.splice(i,1)
		
		setexpensesList(expenses)
		setLength(expenses.length)
	}
	
	const handleSubmit = () => {
		editExpenses(expensesList);
		
		document.getElementById("hidden").click()
	}
	
	useEffect(()=>{
		console.log(newExpense)
		console.log(expensesList)
	})
	
		const item = (expense,i) => {
		return (<>
			<div className="column">
				<TextField id="name" size="small" onChange={(e)=>handleChange(e,i)} defaultValue={expense.name} size="large" variant="standard" required/>
			</div>
			<div className="column">
				<Switch id="fixed" size="small" onChange={(e)=>handleChange(e,i)} color="primary" defaultChecked={expense.fixed} required/>
			</div>
			<div className="column">
				<TextField id="amount" size="small" onChange={(e)=>handleChange(e,i)} defaultValue={expense.amount} type="number" variant="standard" required
				 InputProps={{
					startAdornment: <InputAdornment position="start">$</InputAdornment>,
				}} />
			</div>
			<div className="column">
				<Button size="small" variant="contained" color="error" onClick={()=>handleRemove(i)}>Remove</Button>
			</div>
			</>
		)
	}
	
	
	
	return (
	<div className="income">
		<div className="page">
			<h2>Add at least one Expense</h2>
			<div className="form">
				<div className="row">
					<span className="label">Name</span>
					<TextField id="name" onChange={handleExpenses} defaultValue="Rent" size="large" variant="standard" required/>
				</div>
				<div className="row">
					<span className="label center">Fixed</span>
					<Switch id="fixed" onChange={handleExpenses} color="primary" checked={newExpense.fixed} required/>
				</div>
				<div className="row">
					<span className="label">Priority</span>
					  <Select defaultValue={2} id="priority" variant="standard" onChange={handleExpenses}>
						<MenuItem value={2}>High</MenuItem>
						<MenuItem value={1}>Medium</MenuItem>
						<MenuItem value={0}>Low</MenuItem>
					  </Select>
				</div>
				<div className="row">
					<span className="label">Amount</span>
					<TextField id="amount" onChange={handleExpenses} defaultValue={1000} type="number" variant="standard" required
					 InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
					  }} />
				</div>
				<div className="row">
					<Button size="small" variant="contained" onClick={handleAddExpenses}>Add</Button>
				</div>
			</div>
			<div className="list">
			{expensesList.map((income,i)=>{
					return (
							item(income,i)
						)
				})}
			</div>
			<div className="end">
				<Button size="medium" variant="contained" onClick={handleSubmit} disabled={expensesList.length === 0}>Done</Button>
			</div>
		</div>
	</div>
	)
}