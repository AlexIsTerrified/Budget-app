import React,{useState,useEffect} from 'react'
import {TextField,InputAdornment,Switch,IconButton,Button,MenuItem,Menu,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,} from '@mui/material';
import {AddCircle,RemoveCircle,ExpandMore,ExpandLess,MoreVert,ArrowDropDown,ArrowDropUp} from '@mui/icons-material';
import {useLocation} from 'react-router-dom'
import {setTempData} from '../Functions/functions'
import {getTotal,sortByName,sortByAmount,sortByFixed,sortByPriority,sortByStatus}from '../Functions/calculations'

export default function Income({income,expenses,theme}){
	const [incomeList,setIncomeList] = useState(income || [])
	const [sort,setSort] = useState({type:"amount",d:false})
	const [length,setLength] = useState(incomeList.length || 0)
	const [newIncome, setNewIncome] = useState({name:'',fixed:false,amount:0})
	const [menuIncome,setMenuIncome] = useState({});
	const [menu,setMenu] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [openForm, setForm] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openChange, setOpenChange] = useState(false);

	const location = useLocation();
	
	useEffect(()=>{
		setIncomeList(income)
	},[income])

	const handleSort = (type,d) =>{
		let newD = d
		if(type === sort.type){
			newD = !sort.d
		}
		setSort({type:type,d:newD})
		if(type === "amount"){
			setIncomeList(sortByStatus(sortByAmount(incomeList,newD)))
		}
		else if(type === "priority"){
			setIncomeList(sortByStatus(sortByPriority(incomeList,newD)))
		}else if(type === "name"){
			setIncomeList(sortByStatus(sortByName(incomeList,newD)))
		}else if(type === "fixed"){
			setIncomeList(sortByStatus(sortByFixed(incomeList,newD)))
		}
		
	}

	const handleIncome = (e,id) => {
		if(id === "name")setNewIncome({...newIncome,name:e.target.value})
		if(id === "fixed")setNewIncome({...newIncome,fixed:e.target.checked})
		if(id === "amount")setNewIncome({...newIncome,amount:e.target.value})
	}

	const handleAddIncome = (e) => {
		const n_income = incomeList;
		let date = new Date()
		date  = date.valueOf()
		n_income.unshift({...newIncome,date:date})
		setIncomeList(n_income);
		setNewIncome({name:"",fixed:false,amount:0})
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

	const handleClick = (event,income,i) => {
		setMenuIncome(income)
		setMenu(i)
	  	setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};


	const handleClickDelete = (income,i) => {
		setMenuIncome(income)
		setMenu(i)
		setOpenDelete(true);
	  };
	
	  const handleCloseDelete = () => {
		setOpenDelete(false);
	  };

	const handleClickChange = (income,i) => {
		setMenuIncome(income)
		setMenu(i)
		setOpenChange(true);
	  };
	
	  const handleCloseChange = () => {
		setOpenChange(false);
	  };
	
	const handleExpand = () => {
		const n_income = newIncome
		if(typeof n_income.amount !== "object"){
			const date = new Date()
			n_income.amount = [{name:"item",amount:n_income.amount,date:date.valueOf()}]
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
		setTempData(incomeList,expenses);
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
			
			n_income[i].amount = getTotal(n_income[i].amount)
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
	const handleUpdate= () => {
		document.getElementById("hidden").click()
	}

//UI code starts from here
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

	const ItemMenu = () => {
		return <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'left',}}
					transformOrigin={{vertical: 'top',horizontal: 'left',}}>
					<MenuItem onClick={()=>{handleClickChange(menuIncome,menu);handleClose();}}>Change Amount type</MenuItem>
					<MenuItem onClick={()=>{handleClickDelete(menuIncome,menu);handleClose();}} color="secondary">Delete</MenuItem>
				</Menu>
	}

	const Changedialog = () => {
		return  <Dialog open={openChange} onClose={handleCloseChange}>
        <DialogTitle>
         Change Amount type of {menuIncome.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you would like to change the amount type from {typeof menuIncome.amount !== 'object' ? "a single amount to a collection of sub items?"
			: "a collection of sub items to a single amount?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseChange}>
            Cancel
          </Button>
          <Button color="primary" onClick={()=>{editExpand(menu);handleCloseChange()}}>Change</Button>
        </DialogActions>
      </Dialog>
	}
	
	const Deletedialog = () => {
		return  <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          Delete {menuIncome.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you would like to delete your {menuIncome.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button color="error" onClick={()=>{handleRemove(menu);handleCloseDelete()}}>Delete</Button>
        </DialogActions>
      </Dialog>
	}
	
	return (
	<div className="income-page">
		<div className="page">
			<h1>Income <i>${getTotal(incomeList).toLocaleString("en-US")}</i></h1>
			<div className="head">
			<Button variant="contained" color="primary" onClick={()=>{setForm(true)}}>ADD INCOME</Button>
			</div>
			<Dialog open={openForm} onClose={()=>{setForm(false)}} maxWidth="md" fullWidth>
			<DialogTitle>Add An Income</DialogTitle>
			<DialogContent>
			<div className="income-form">
				<div className="top">
					<div className="row">
						<TextField onChange={(e)=>handleIncome(e,"name")} label="Name" size="small" variant="outlined" required/>
					</div>
					<div className="row center">
					<span className="label">Fixed</span>
						<Switch onChange={(e)=>handleIncome(e,"fixed")} color="primary" required/>
					</div>
					<div className="row">
					{typeof newIncome.amount !== "object" ? 
						<TextField onChange={(e)=>handleIncome(e,"amount")} defaultValue="0" label="Amount" type="number" size="small" variant="outlined"
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
						<IconButton size="small" color="primary" onClick={handleExpand}>
							{ typeof newIncome.amount !== "object" ? <ExpandMore/> : <ExpandLess/>}
						</IconButton>
					</div>
				</div>
				{typeof newIncome.amount !== "object" ? "" : 
					<div className="bottom">
					{newIncome.amount.map((amount,i)=>Expanded(amount,i))}
					</div>}
			</div>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={()=>{setForm(false)}}>
					Cancel
				</Button>
				<Button disabled={newIncome.name == '' || newIncome.amount == ''} onClick={()=>{handleAddIncome();setForm(false)}}>Add</Button>
			</DialogActions>
			</Dialog>
			{incomeList.length >0 ? 
			<div className="list">
				<div className="row even">
				<span className={"label left "+(sort.type === "name" ? "selected" : "")} onClick={()=>handleSort("name",false)}>
						{sort.type === "name" && !sort.d ? <ArrowDropUp/> : <ArrowDropDown/>}Name
					</span>
					<span className={"label "+(sort.type === "fixed" ? "selected" : "")} onClick={()=>handleSort("fixed",false)}>
						{sort.type === "fixed" && !sort.d ? <ArrowDropUp/> : <ArrowDropDown/>}Fixed
					</span>
					<span className={"label left "+(sort.type === "amount" ? "selected" : "")} onClick={()=>handleSort("amount",false)}>
						{sort.type === "amount" && !sort.d ? <ArrowDropUp/> : <ArrowDropDown/>}Amount
					</span>
					<span className="label"></span>
				</div>
				{sortByStatus(incomeList).map((income,i)=>{
					return (
						<Item income={income} i={i} key={i+""+income.date+""+income.name}
						handleChange={handleChange} editExpChange={editExpChange} editExpAdd={editExpAdd} handleClick={handleClick}/>
					)
				})}
			</div>
			: ""}
			<div className="end">
				<Button size="medium" variant="contained" onClick={handleUpdate} disabled={incomeList.length === 0}>Done</Button>
			</div>
		</div>
		<ItemMenu/>
		<Deletedialog/>
		<Changedialog/>
	</div>
	)
}

function Item({income,i,handleChange,editExpChange,editExpAdd,handleClick}){
	const [expand,setExpand] = useState(false)

	return (<div className={"row "+(i%2===0 ? "" : "even ")+(income.error ? "error ":"")+(income.outdated ? "outdated ":"")} >
			<div className="column " >
				<TextField size="small" onChange={(e)=>handleChange(e,"name",i)} error={income.error} defaultValue={income.name} 
				 required/>
			</div>
			<div className="column center" >
				<Switch size="small" onChange={(e)=>handleChange(e,"fixed",i)} color="primary" defaultChecked={income.fixed} required/>
			</div>
			<div className="column">
			{typeof income.amount !== "object" ?
			<>
				<TextField size="small" onChange={(e)=>handleChange(e,"amount",i)} error={income.error} defaultValue={income.amount} 
				type="number" required
					 InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
				}} />
			</>
			: <>
				<IconButton size="small" color="primary" onClick={()=>setExpand(!expand)}>
					{ !expand ? <ExpandMore/> : <ExpandLess/>}
				</IconButton>
				<span>{getTotal(income.amount)}</span>
			</>}
		</div>
		<div className="column end">
			<IconButton size="small" aria-label="more" onClick={(e)=>handleClick(e,income,i)}>
				<MoreVert/>
			</IconButton>
		</div>
			{(typeof income.amount === 'object') && expand ?
		<div className="expanded">
		{income.amount.map((amount,a)=>{
			return (
				<div className="item" key={i+""+amount.date}>
					<div className="row">
						<span className="label">Name</span>
						<TextField id="name" size="small" onChange={(e)=>{editExpChange(e,i,a)}} defaultValue={amount.name} required/>
					</div>
					<div className="row">
						<span className="label">Amount</span>
						<TextField id="amount" size="small" onChange={(e)=>{editExpChange(e,i,a)}} defaultValue={amount.amount} type="number" required
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
