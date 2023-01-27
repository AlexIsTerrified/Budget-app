import {useEffect, useState} from 'react'
import {TextField,InputAdornment,Switch,IconButton,Button} from '@mui/material';
import {AddCircle,RemoveCircle,ExpandMore,ExpandLess} from '@mui/icons-material';
import {tempIncome} from '../Functions/functions'
import {getTotal}from '../Functions/calculations'

export default function NewIncome({income}){
	const [incomeList,setIncomeList] = useState(income || [])
	const [length,setLength] = useState(incomeList.length)
	const [newIncome, setNewIncome] = useState({name:'Salary',fixed:true,amount:1000})
	const [expanded,setExpanded] = useState({})
	
	const handleIncome = (e) => {
		if(e.target.id === "name")setNewIncome({...newIncome,name:e.target.value})
		if(e.target.id === "fixed")setNewIncome({...newIncome,fixed:e.target.checked})
		if(e.target.id === "amount")setNewIncome({...newIncome,amount:e.target.value})
	}

	const handleAddIncome = (e) => {
		const n_income = incomeList;
		let date = new Date()
		date  = date.valueOf()
		if(typeof newIncome.amount === 'object'){
			const n_expanded = expanded
			n_expanded[date] = false
			setExpanded(n_expanded)
		}
		n_income.unshift({...newIncome,date:date})
		setIncomeList(n_income);
		setNewIncome({...newIncome,fixed:true})
		setLength(n_income.length)
		handleSubmit()
	}
	
	const handleChange = (e,id,i) => {
		const income = incomeList
		
		if(id === "name")income[i].name = e.target.value
		if(id === "fixed")income[i].fixed = e.target.checked
		if(id === "amount")income[i].amount = e.target.value
		
		setIncomeList(income)
		setLength(income.length)
		handleSubmit()
	}
	
	const handleRemove = (i) => {
		const income = incomeList
		
		income.splice(i,1)
		
		setIncomeList(income)
		setLength(income.length)
		handleSubmit()
	}
	
	const handleExpand = () => {
		const n_income = newIncome
		if(typeof n_income.amount !== "object"){
			const date = new Date()
			n_income.amount = [{name:"item",amount: n_income.amount,date:date.valueOf()}]
		}else{
			
			n_income.amount = getTotal(n_income.amount)
		}
		setNewIncome(n_income)
		setLength(typeof n_income.amount.length)
	}

	const handleExpChange = (e,i) => {
		const income = newIncome
		if(e.target.id === "name")income.amount[i].name = e.target.value
		if(e.target.id === "amount")income.amount[i].amount = e.target.value
		
		setNewIncome(income)
		setLength(e.target.value)
	}

	const handleExpAdd = (i, add) => {
		const income = newIncome
			if(add){
				const date = new Date()
				income.amount.splice(i+1,0,{name:"item",amount:0,date:date.valueOf()})
			}else{
				income.amount.splice(i,1)
			}
		if(income.amount.length === 0){
			handleExpand()
		}else{
			setNewIncome(income)
			setLength(income.amount.length)
		}
	}

	const handleSubmit = () => {
		tempIncome(incomeList);
	}

	const handleSync = () => {
		document.getElementById("hidden").click()
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
		const income = incomeList
		if(e.target.id === "name")income[i].amount[a].name = e.target.value
		if(e.target.id === "amount")income[i].amount[a].amount = e.target.value
		
		setIncomeList(income)
		setLength(e.target.value)
		handleSubmit()
	}
	
	const editExpand = (i) => {
		const n_income = incomeList
		if(typeof n_income[i].amount !== "object"){
			const date = new Date()
			n_income[i].amount = [{name:"item",amount:n_income[i].amount,date:date.valueOf()}]
		}else{
			
			n_income[i].amount = getTotal(n_income.amount)
		}
		
		setIncomeList(n_income)
		setLength(typeof n_income[i].amount.length || 0)
		handleSubmit()
	}
	
	const editExpAdd = (i,a, add) => {
		const income = incomeList
		let total = getTotal(income[i].amount);
			if(add){
				const date = new Date()
				income[i].amount.splice(a+1,0,{name:"item",amount:0,date:date.valueOf()})
			}else{
				income[i].amount.splice(a,1)
			}
		if(income[i].amount.length === 0){
			income[i].amount = total;
		}
		setIncomeList(income)
		setLength(income[i].amount.length || 0)
		handleSubmit()
	}


//UI begins here
	const item = (income,i) => {
		return (<div className={"row "+(i%2===0 ? "" : "even")} key={i+""+income.date+""+income.name}>
				<div className="column " >
					<TextField size="small" onChange={(e)=>handleChange(e,"name",i)} defaultValue={income.name} required/>
				</div>
				<div className="column " >
					<Switch size="small" onChange={(e)=>handleChange(e,"fixed",i)} color="primary" defaultChecked={income.fixed} required/>
				</div>
				<div className="column">
				{typeof income.amount !== "object" ?
				<>
					<IconButton size="small" onClick={()=>editExpand(i)}>
						<ExpandMore/>
					</IconButton>
					<TextField size="small" onChange={(e)=>handleChange(e,"amount",i)} defaultValue={income.amount} type="number" required
						 InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
					}} />
				</>
				: <>
					<IconButton size="small" color="primary" onClick={()=>expand(income.date)}>
						{ !expanded[income.date] ? <ExpandMore/> : <ExpandLess/>}
					</IconButton>
					<span>{getTotal(income.amount)}</span>
				</>}
			</div>
				<div className="column ">
					<IconButton size="small" variant="contained" color="error" onClick={()=>handleRemove(i)}><RemoveCircle/></IconButton>
				</div>
				{(typeof income.amount === 'object') && expanded[income.date] ?
			<div className="expanded">
			{income.amount.map((amount,a)=>{
				return (
					<div className="item" key={i+""+amount.date}>
						<div className="row">
							<span className="label">Name</span>
							<TextField id="name" onChange={(e)=>{editExpChange(e,i,a)}} defaultValue={amount.name} size="small" required/>
						</div>
						<div className="row">
							<span className="label">Amount</span>
							<TextField id="amount" onChange={(e)=>{editExpChange(e,i,a)}} defaultValue={amount.amount} type="number" size="small" required
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
			</div>
		)
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

	return (
	<div className="income">
		<div className="page">
			<h2>Add an income</h2>
			<div className="form">
				<div className="top">
					<div className="row">
						<TextField id="name" onChange={handleIncome} defaultValue="Salary" label="Name" size="small" variant="outlined" required/>
					</div>
					<div className="row center">
					<span className="label">Fixed</span>
						<Switch id="fixed" onChange={handleIncome} color="primary" checked={newIncome.fixed} required/>
					</div>
					<div className="row expand">
						<IconButton size="small" color="primary" onClick={handleExpand}>
							{ typeof newIncome.amount !== "object" ? <ExpandMore/> : <ExpandLess/>}
						</IconButton>
					</div>
					<div className="row">
					{typeof newIncome.amount !== "object" ? 
						<TextField onChange={(e)=>handleIncome(e,"amount")} defaultValue={1000} label="Amount" type="number" size="small" variant="outlined"
						required
						 InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}} /> 
						: <TextField id="amount" value={getTotal(newIncome.amount)} type="number" label="Amount" size="small" variant="outlined" disabled
							required
						 InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}} /> 
						}
					  </div>
					<div className="row expand">
						<IconButton size="small" variant="contained" color="primary"  onClick={handleAddIncome} disabled={newIncome.name == '' || newIncome.amount == ''}>
							<AddCircle/>
						</IconButton>
					</div>
				</div>
				{typeof newIncome.amount !== "object" ? "" : 
					<div className="bottom">
					{newIncome.amount.map((amount,i)=>Expanded(amount,i))}
					</div>}
			</div>
			{incomeList.length >0 ? 
			<div className="list">
				<div className="row even">
					<span className="label  left">Name</span>
					<span className="label">Fixed</span>
					<span className="label left">Amount</span>
					<span className="label"></span>
				</div>
				{incomeList.map((income,i)=>{
					return (
							item(income,i)
						)
				})}
			</div>
			: ""}
			<div className="end">
				<Button size="medium" variant="contained" onClick={handleSync} disabled={incomeList.length === 0}>Done</Button>
			</div>
		</div>
	</div>
	)
}