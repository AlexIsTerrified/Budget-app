import {useEffect, useState} from 'react'
import {TextField,InputAdornment,FormControlLabel,Switch,Button,Select,MenuItem} from '@mui/material';
import {editIncome,editExpenses} from '../Functions/functions'

export default function NewIncome(){
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
				<div className="top">
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