import React,{useState} from 'react'
import {TextField,InputAdornment,Switch,IconButton,Button} from '@mui/material';
import {AddCircle,RemoveCircle,SwapVert} from '@mui/icons-material';
import {editIncome} from '../Functions/functions'

export default function Income({income,theme}: {income: any,theme: any}){
	const [newIncome, setNewIncome] = useState<any>({})

	const handleIncome: any = () => {}
	const handleAddIncome: any = () => {}
	const handleChange= (e: React.ChangeEvent<HTMLInputElement>,i: number): void => {}
	const handleRemove = (e: React.ChangeEvent<HTMLInputElement>,i: number): void=> {}

	const Item = (item:{
		name: String,
		fixed: boolean,
		amount: String,
		date: number
	},i: number) => {
		return (
		<div className={"row "+(i%2===0 ? "" : "even")} key={i+""+item.date}>
			<div className="column " >
				<TextField id="name" size="small" defaultValue={item.name} variant="standard" required/>
			</div>
			<div className="column " >
				<Switch id="fixed" size="small" color="primary" defaultChecked={item.fixed} required/>
			</div>
			<div className="column " >
				<TextField id="amount" size="small" defaultValue={item.amount} type="number" variant="standard" required
					InputProps={{
					startAdornment: <InputAdornment position="start">$</InputAdornment>,
				}} />
			</div>
			<div className="column ">
				<IconButton ><RemoveCircle/></IconButton>
			</div>
		</div>
		)
	}

	return (
		<div className="income-page">
			<div className="head">
				<h1>Income</h1>
			</div>
			<div className="form">
				<div className="top">
					<div className="row">
						<TextField id="name" onChange={handleIncome} defaultValue="Salary" label="Name" size="small" variant="outlined" required/>
					</div>
					<div className="row center">
					<span className="label">Fixed</span>
						<Switch id="fixed" onChange={handleIncome} color="primary" checked={newIncome.fixed} required/>
					</div>
					<div className="row">
						<TextField id="amount" onChange={handleIncome} defaultValue={1000} label="Amount" type="number" size="small" variant="outlined" required
						 InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						  }} />
					  </div>
					<div className="row expand">
						<IconButton disabled={newIncome.name == '' || newIncome.amount == ''}>
							<AddCircle/>
						</IconButton>
					</div>
				</div>
			</div>
			{income !== false ? <div className="list">
				<div className="row even">
					<span className="label  left"><SwapVert/> Name</span>
					<span className="label"><SwapVert/> Fixed</span>
					<span className="label left"><SwapVert/> Amount</span>
					<span className="label"></span>
				</div>
				{income.map(Item)}
			</div> : ""}
		</div>
	)
}