import {useEffect, useState} from 'react'
import {TextField,InputAdornment,FormControlLabel,Switch,Button,IconButton,Select,MenuItem} from '@mui/material';
import {Add,AddCircle,RemoveCircle,ExpandMore,ExpandLess} from '@mui/icons-material';
import {editIncome,editExpenses} from '../Functions/functions'
import {getTotal}from '../Functions/calculations'

export default function NewExpenses(){
	const [expensesList,setexpensesList] = useState([])
	const [length,setLength] = useState(expensesList.length)
	const [newExpense, setNewExpenses] = useState({name:'Rent',fixed:true,priority:2,amount:500});
	const [expanded,setExpanded] = useState({})
	
	const handleExpenses = (e,id) => {
		if(id === "name")setNewExpenses({...newExpense,name:e.target.value})
		if(id === "fixed")setNewExpenses({...newExpense,fixed:e.target.checked})
		if(id === "priority")setNewExpenses({...newExpense,priority:e.target.value})
		if(id === "amount")setNewExpenses({...newExpense,amount:e.target.value})
	}

	const handleAddExpenses = (e) => {
		if(newExpense.name !== null && newExpense.amount !== null && newExpense.fixed !== null){
			const n_expenses = expensesList;
			let date = new Date()
			date  = date.valueOf()
			if(typeof newExpense.amount === 'object'){
				const n_expanded = expanded
				n_expanded[date] = false
				setExpanded(n_expanded)
			}
			
			n_expenses.push({...newExpense,date:date})
			setexpensesList(n_expenses)
			setNewExpenses({...newExpense,fixed:true})
			setLength(n_expenses.length)
		}else{
			
		}
	}
	
	const handleChange = (e,id,i) => {
		const expenses = expensesList
		
		if(id === "name")expenses[i].name = e.target.value
		if(id === "fixed")expenses[i].fixed = e.target.checked
		if(id === "priority")expenses[i].priority = e.target.value
		if(id === "amount")expenses[i].amount = e.target.value
		
		setexpensesList(expenses)
		setLength(expenses)
	}
	
	const handleRemove = (i) => {
		const expenses = expensesList
		
		expenses.splice(i,1)
		
		setexpensesList(expenses)
		setLength(expenses.length)
	}
	
	const handleExpand = () => {
		const n_expense = newExpense
		if(typeof n_expense.amount !== "object"){
			const date = new Date()
			n_expense.amount = [{name:"item",amount:100,date:date.valueOf()}]
		}else{
			
			n_expense.amount = getTotal(n_expense.amount)
		}
		
		setNewExpenses(n_expense)
		setLength(typeof n_expense.amount.length)
	}
	
	const handleExpChange = (e,i) => {
		const expense = newExpense
		console.log(i)
		if(e.target.id === "name")expense.amount[i].name = e.target.value
		if(e.target.id === "amount")expense.amount[i].amount = e.target.value
		
		setNewExpenses(expense)
		setLength(e.target.value)
	}
	
	const handleExpAdd = (i, add) => {
		const expense = newExpense
			if(add){
				const date = new Date()
				expense.amount.splice(i+1,0,{name:"item",amount:100,date:date.valueOf()})
			}else{
				expense.amount.splice(i,1)
			}
		if(expense.amount.length === 0){
			handleExpand()
		}else{
			setNewExpenses(expense)
			setLength(expense.amount.length)
		}
	}
	
	const handleSubmit = () => {
		editExpenses(expensesList);
		document.getElementById("hidden").click()
	}
	
	const Expanded = (amount,i) => {
		return (
			<div className="item" key={i+""+amount.date}>
				<div className="row">
					<span className="label">Name</span>
					<TextField id="name" onChange={(e)=>{handleExpChange(e,i)}} defaultValue={amount.name} size="large" variant="standard" required/>
				</div>
				<div className="row">
					<span className="label">Amount</span>
					<TextField id="amount" onChange={(e)=>{handleExpChange(e,i)}} defaultValue={amount.amount} type="number" variant="standard" required
					 InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
					  }} />
				</div>
				<div className="row expand">
					<IconButton size="small" variant="contained" color="primary" onClick={()=>handleExpAdd(i,true)}><AddCircle/></IconButton>
				</div>
				<div className="row expand">
					<IconButton size="small" variant="contained" color="error" onClick={()=>handleExpAdd(i,false)}>
						<RemoveCircle/>
					</IconButton>
				</div>
			</div>
		)
	}
	
	const expand = (date) => {
		const n_expanded = expanded
		if(n_expanded[date]){
			n_expanded[date] = false
			setExpanded(n_expanded)
		}else{
			n_expanded[date] = true
			setExpanded(n_expanded)
		}
		setLength(date+n_expanded[date])
	}
	
	const editExpChange = (e,i,a) => {
		const expense = expensesList
		if(e.target.id === "name")expense[i].amount[a].name = e.target.value
		if(e.target.id === "amount")expense[i].amount[a].amount = e.target.value
		
		setexpensesList(expense)
		setLength(e.target.value)
	}
	
	const editExpand = (i) => {
		const n_expense = expensesList
		if(typeof n_expense[i].amount !== "object"){
			const date = new Date()
			n_expense[i].amount = [{name:"item",amount:n_expense[i].amount,date:date.valueOf()}]
		}else{
			
			n_expense[i].amount = getTotal(n_expense.amount)
		}
		
		setexpensesList(n_expense)
		setLength(typeof n_expense[i].amount.length || 0)
	}
	
	const editExpAdd = (i,a, add) => {
		const expense = expensesList
		let total = getTotal(expense[i].amount);
			if(add){
				const date = new Date()
				expense[i].amount.splice(a+1,0,{name:"item",amount:100,date:date.valueOf()})
			}else{
				expense[i].amount.splice(a,1)
			}
		if(expense[i].amount.length === 0){
			expense[i].amount = total;
		}
		setexpensesList(expense)
		setLength(expense[i].amount.length || 0)
	}
	
	const item = (expense,i) => {
		
		return (<>
			<div className="column" key={i+"name"+expense.date}>
				<TextField size="small" onChange={(e)=>handleChange(e,"name",i)} defaultValue={expense.name} size="large" variant="standard" required/>
			</div>
			<div className="column" key={i+"fixed"+expense.date}>
				<Switch size="small" onChange={(e)=>handleChange(e,"fixed",i)} color="primary" defaultChecked={expense.fixed} required/>
			</div>
			<div className="column" key={i+"priority"+expense.date}>
				  <Select defaultValue={expense.priority} variant="standard" onChange={(e)=>handleChange(e,"priority",i)}>
					<MenuItem value="2">High</MenuItem>
					<MenuItem value="1">Medium</MenuItem>
					<MenuItem value="0">Low</MenuItem>
				  </Select>
			</div>
			<div className="column" key={i+"amount"+expense.date}>
				{typeof expense.amount !== "object" ?
				<>
					<IconButton size="small" color="primary" onClick={()=>editExpand(i)}>
						<ExpandMore/>
					</IconButton>
					<TextField size="small" onChange={(e)=>handleChange(e,"amount",i)} defaultValue={expense.amount} type="number" variant="standard" required
						 InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
					}} />
				</>
				: <>
					<IconButton size="small" color="primary" onClick={()=>expand(expense.date)}>
						{ !expanded[expense.date] ? <ExpandMore/> : <ExpandLess/>}
					</IconButton>
					<span>{getTotal(expense.amount)}</span>
				</>}
			</div>
			<div className="column" key={i+"remove"+expense.date}>
				<IconButton size="small" variant="contained" color="error" onClick={()=>handleRemove(i)}><RemoveCircle/></IconButton>
			</div>
			{(typeof expense.amount === 'object') && expanded[expense.date] ?
			<div className="expanded">
			{expense.amount.map((amount,a)=>{
				return (
					<div className="item" key={i+""+amount.date}>
						<div className="row">
							<span className="label">Name</span>
							<TextField id="name" onChange={(e)=>{editExpChange(e,i,a)}} defaultValue={amount.name} size="large" variant="standard" required/>
						</div>
						<div className="row">
							<span className="label">Amount</span>
							<TextField id="amount" onChange={(e)=>{editExpChange(e,i,a)}} defaultValue={amount.amount} type="number" variant="standard" required
							 InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>,
							  }} />
						</div>
						<div className="row expand">
							<IconButton size="small" variant="contained" color="primary" onClick={()=>{editExpAdd(i,a,true)}}><AddCircle/></IconButton>
						</div>
						<div className="row expand">
							<IconButton size="small" variant="contained" color="error" onClick={()=>{editExpAdd(i,a,false)}}>
								<RemoveCircle/>
							</IconButton>
						</div>
					</div>
				)
			})}
			</div> 
			: ""}
			</>
		)
	}
	
	return (
	<div className="income expense">
		<div className="page">
			<h2>Add at least one Expense</h2>
			<div className="form">
				<div className="top">
					<div className="row">
						<span className="label">Name</span>
						<TextField onChange={(e)=>handleExpenses(e,"name")} defaultValue="Rent" size="large" variant="standard" required/>
					</div>
					<div className="row center">
						<span className="label center">Fixed</span>
						<Switch onChange={(e)=>handleExpenses(e,"fixed")} color="primary" checked={newExpense.fixed} required/>
					</div>
					<div className="row">
						<span className="label">Priority</span>
						  <Select defaultValue="2" variant="standard" onChange={(e)=>handleExpenses(e,"priority")}>
							<MenuItem value="2">High</MenuItem>
							<MenuItem value="1">Medium</MenuItem>
							<MenuItem value="0">Low</MenuItem>
						  </Select>
					</div>
					<div className="row expand">
						<IconButton size="small" color="primary" onClick={handleExpand}>
							{ typeof newExpense.amount !== "object" ? <ExpandMore/> : <ExpandLess/>}
						</IconButton>
					</div>
					<div className="row">
						<span className="label">Amount</span>
						{typeof newExpense.amount !== "object" ? 
						<TextField onChange={(e)=>handleExpenses(e,"amount")} defaultValue={500} type="number" variant="standard" required
						 InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}} /> 
						: <TextField id="amount" value={getTotal(newExpense.amount)} type="number" variant="standard" disabled required
						 InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}} /> 
						}
					</div>
					<div className="row expand">
						<IconButton variant="contained" color="primary" onClick={handleAddExpenses}><AddCircle/></IconButton>
					</div>
				</div>
				<div className="bottom">
					{typeof newExpense.amount !== "object" ? "" : 
					newExpense.amount.map((amount,i)=>{
						return (
							Expanded(amount,i)
						)
					})}
				</div>
			</div>
			<div className="list">
					<span className="label">Name</span>
					<span className="label">Fixed</span>
					<span className="label">Priority</span>
					<span className="label">Amount</span>
					<span className="label"></span>
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