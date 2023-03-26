import React,{useState,useEffect} from 'react'
import {Select,TextField,InputAdornment,Switch,IconButton,Button,MenuItem,Menu,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,
	FormControl,InputLabel,ListItemIcon,ListItemText} from '@mui/material';
import {AddCircle,RemoveCircle,ExpandMore,ExpandLess,MoreVert,ArrowDropDown,ArrowDropUp,FilterCenterFocus,CameraAlt,Attachment} from '@mui/icons-material';
import {useLocation} from 'react-router-dom'
import {setTempData} from '../Functions/functions'
import {getTotal,getStatus,sortByStatus,sortByName,sortByAmount,sortByFixed,sortByPriority}from '../Functions/calculations'
import {turnOnCamera,renderExpense} from '../Functions/InfoExtractor'

export default function Expenses({income,expenses,theme}){
	const [expensesList,setExpensesList] = useState(expenses || [])
	const [sort,setSort] = useState({type:"amount",d:false})
	const [length,setLength] = useState(expensesList.length || 0)
	const [newExpenses, setNewExpenses] = useState({name:"",fixed:false,priority:2,amount:0})
	const [menuExpenses,setMenuExpenses] = useState({});
	const [menu,setMenu] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [openForm, setForm] = useState(false);
	const [openQRForm, setQRForm] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openChange, setOpenChange] = useState(false);
	const [qrExpense,setQRExpense] = useState({})
	const [QRwarning, setQRwarning] = useState(false);


	useEffect(()=>{
		setExpensesList(expenses)
	},[expenses])
	
	const handleSort = (type,d) =>{
		let newD = d
		if(type === sort.type){
			newD = !sort.d
		}
		setSort({type:type,d:newD})
		if(type === "amount"){
			setExpensesList(sortByStatus(sortByAmount(expensesList,newD)))
		}
		else if(type === "priority"){
			setExpensesList(sortByStatus(sortByPriority(expensesList,newD)))
		}else if(type === "name"){
			setExpensesList(sortByStatus(sortByName(expensesList,newD)))
		}else if(type === "fixed"){
			setExpensesList(sortByStatus(sortByFixed(expensesList,newD)))
		}
		setLength(type+""+d)
		
	}

	const handleExpenses = (e,id) => {
		if(id === "name")setNewExpenses({...newExpenses,name:e.target.value})
		if(id === "fixed")setNewExpenses({...newExpenses,fixed:e.target.checked})
		if(id === "priority")setNewExpenses({...newExpenses,priority:e.target.value})
		if(id === "amount")setNewExpenses({...newExpenses,amount:e.target.value})
	}

	const handleAddExpenses = (e) => {
		const n_expenses = expensesList;
		let date = new Date()
		date  = date.valueOf()
		n_expenses.unshift({...newExpenses,date:date})
		setExpensesList(n_expenses);
		setNewExpenses({name:"",fixed:false,priority:2,amount:0})
		setLength(n_expenses.length)
		handleSubmit()
	}
	
	const handleChange = (e,id,i) => {
		const expenses = expensesList
		
		if(id === "name")expenses[i].name = e.target.value
		if(id === "fixed")expenses[i].fixed = e.target.checked
		if(id === "priority")expenses[i].priority = e.target.value
		if(id === "amount")expenses[i].amount = e.target.value


		setExpensesList(expenses);
		setLength(expenses.length)
		handleSubmit()
	}
	
	const handleRemove = (i) => {
		const expenses = expensesList
		
		expenses.splice(i,1)
		
		setExpensesList(expenses);
		setLength(expenses.length)
		handleSubmit()
	}


	const handleClick = (event,expenses,i) => {
		setMenuExpenses(expenses)
		setMenu(i)
	  	setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};


	const handleClickDelete = (expenses,i) => {
		setMenuExpenses(expenses)
		setMenu(i)
		setOpenDelete(true);
	  };
	
	  const handleCloseDelete = () => {
		setOpenDelete(false);
	  };

	const handleClickChange = (expenses,i) => {
		setMenuExpenses(expenses)
		setMenu(i)
		setOpenChange(true);
	  };
	
	  const handleCloseChange = () => {
		setOpenChange(false);
	  };
	
	const handleExpand = () => {
		const n_expenses = newExpenses
		if(typeof n_expenses.amount !== "object"){
			const date = new Date()
			n_expenses.amount = [{name:"item",amount:n_expenses.amount,date:date.valueOf()}]
		}else{
			
			n_expenses.amount = getTotal(n_expenses.amount)
		}
		setNewExpenses(n_expenses)
		setLength(typeof n_expenses.amount.length)
	}

	const handleExpChange = (e,i) => {
		const expenses = newExpenses
		if(e.target.id === "name")expenses.amount[i].name = e.target.value
		if(e.target.id === "amount")expenses.amount[i].amount = e.target.value
		
		setNewExpenses(expenses)
		setLength(e.target.value)
	}

	const handleExpAdd = (i, add) => {
		const expenses = newExpenses
			if(add){
				const date = new Date()
				expenses.amount.splice(i+1,0,{name:"item",amount:0,date:date.valueOf()})
			}else{
				expenses.amount.splice(i,1)
			}
		if(expenses.amount.length === 0){
			handleExpand()
		}else{
			setNewExpenses(expenses)
			setLength(expenses.amount.length)
		}
	}

	const handleSubmit = () => {
		setTempData(income,expensesList);
	}



	const editExpChange = (e,i,a) => {
		const expenses = expensesList
		if(e.target.id === "name")expenses[i].amount[a].name = e.target.value
		if(e.target.id === "amount")expenses[i].amount[a].amount = e.target.value
		
		setExpensesList(expenses);
		setLength(e.target.value)
		handleSubmit()
	}
	
	const editExpand = (i) => {
		const n_expenses = expensesList
		if(typeof n_expenses[i].amount !== "object"){
			const date = new Date()
			n_expenses[i].amount = [{name:"item",amount:n_expenses[i].amount,date:date.valueOf()}]
		}else{
			
			n_expenses[i].amount = getTotal(n_expenses[i].amount)
		}
		
		setExpensesList(n_expenses);
		setLength(typeof n_expenses[i].amount.length || 0)
		handleSubmit()
	}
	
	const editExpAdd = (i,a, add) => {
		const expenses = expensesList
		let total = getTotal(expenses[i].amount);
			if(add){
				const date = new Date()
				expenses[i].amount.splice(a+1,0,{name:"item",amount:0,date:date.valueOf()})
			}else{
				expenses[i].amount.splice(a,1)
			}
		if(expenses[i].amount.length === 0){
			expenses[i].amount = total;
		}
		setExpensesList(expenses);
		setLength(expenses[i].amount.length || 0)
		handleSubmit()
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
					<MenuItem onClick={()=>{handleClickChange(menuExpenses,menu);handleClose();}}>Change Amount type</MenuItem>
					<MenuItem onClick={handleClose}>Details</MenuItem>
					<MenuItem onClick={()=>{handleClickDelete(menuExpenses,menu);handleClose();}} color="secondary">Delete</MenuItem>
				</Menu>
	}

	const Changedialog = () => {
		return  <Dialog open={openChange} onClose={handleCloseChange}>
        <DialogTitle>
         Change Amount type of {menuExpenses.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you would like to change the amount type from {typeof menuExpenses.amount !== 'object' ? "a single amount to a collection of sub items?"
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
          Delete {menuExpenses.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you would like to delete your {menuExpenses.name}?
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

	const OpenQRwarning = () => {
		return <Dialog open={QRwarning} onClose={()=>setQRwarning(false)}>
        <DialogContent>
          <DialogContentText>
            Click scan to take a photo or upload a photo of your QR receipts
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" autoFocus onClick={()=>setQRwarning(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={()=>{turnOnCamera();setQRwarning(false)}}>Scan</Button>
        </DialogActions>
      </Dialog>
	}

	const QRRender = (data) => {
		const n_data = data
		const date = [n_data.date.slice(0,2),n_data.date.slice(2,4),n_data.date.slice(4,8),n_data.date.slice(8,10),n_data.date.slice(10,12)]
		let dateObj = new Date(date[0],Number(date[1])-1,date[2],date[3],date[4])
		dateObj = dateObj.valueOf()
		const n_expense = {name:n_data.company+" "+date[0]+"-"+date[1]+"-"+date[2],
					fixed:false,priority:0,date:dateObj,amount:[]}
		if(n_data.items.length > 1){
			n_data.items.forEach((item,k)=>{
				n_expense.amount.push({name:item.name,amount:(Number(item.vat)+Number(item.price))*Number(item.quantity),date:dateObj+k})
			})
		}else{
			n_expense.amount = Number(n_data.total)
		}
		
		setQRExpense(n_expense)
		setNewExpenses(n_expense)
		setQRForm(true)
	}


	return (
	<div className="income-page expense-page">
		<div className="page">
			<h1>Expenses <span>(${Number(getTotal(expensesList)).toFixed(2) || 0.00})</span></h1>
			<p></p>
			<div className="head">
				<Button variant="contained" color="primary" onClick={()=>{setForm(true)}}>Add Expense</Button>
				<Button  startIcon={<FilterCenterFocus />} onClick={()=>setQRwarning(true)} variant="text" color="primary">Scan QR Receipt</Button>
			</div>
			<OpenQRwarning/>
			<Dialog open={openQRForm} onClose={()=>{setQRForm(false)}} maxWidth="md" fullWidth>
				<DialogTitle>Add An Expense</DialogTitle>
				<DialogContent>
				<div className="income-form">
					<div className="top">
						<div className="row">
							<TextField defaultValue={qrExpense.name} onChange={(e)=>handleExpenses(e,"name")} label="Name" size="small" variant="outlined" required/>
						</div>
						<div className="row center">
						<span className="label">Fixed</span>
							<Switch onChange={(e)=>handleExpenses(e,"fixed")} color="primary" required/>
						</div>
						<div className="row">
								<FormControl>
									<InputLabel shrink htmlFor="select-multiple-native">
									  Priority
									</InputLabel>
								  <Select defaultValue={0} onChange={(e)=>handleExpenses(e,"priority")} label="Priority" size="small" required>
									<MenuItem value={2}>High</MenuItem>
									<MenuItem value={1}>Medium</MenuItem>
									<MenuItem value={0}>Low</MenuItem>
								  </Select>
							  </FormControl>
						</div>
						<div className="row">
						{typeof newExpenses.amount !== "object" ? 
							<TextField defaultValue={qrExpense.amount} onChange={(e)=>handleExpenses(e,"amount")} label="Amount" type="number" size="small" variant="outlined"
							required
							 InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>,
							}} /> 
							: <TextField id="amount" value={getTotal(newExpenses.amount)} type="number" label="Amount" size="small" variant="outlined" disabled
								required
							 InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>,
							}} /> 
							}
						  </div>
						  <div className="row expand">
							<IconButton size="small" color="primary" onClick={handleExpand}>
								{ typeof newExpenses.amount !== "object" ? <ExpandMore/> : <ExpandLess/>}
							</IconButton>
						</div>
					</div>
					{typeof newExpenses.amount !== "object" ? "" : 
						<div className="bottom">
						{newExpenses.amount.map((amount,i)=>Expanded(amount,i))}
						</div>}
				</div>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={()=>{setQRForm(false)}}>
						Cancel
					</Button>
					<Button disabled={newExpenses.name == '' || newExpenses.amount == ''} onClick={()=>{handleAddExpenses();setQRForm(false)}}>Add</Button>
				</DialogActions>
				</Dialog>
			<Dialog open={openForm} onClose={()=>{setForm(false)}} maxWidth="md" fullWidth>
			<DialogTitle>Add An Expense</DialogTitle>
			<DialogContent>
			<div className="income-form">
				<div className="top">
					<div className="row">
						<TextField onChange={(e)=>handleExpenses(e,"name")} label="Name" size="small" variant="outlined" required/>
					</div>
					<div className="row center">
					<span className="label">Fixed</span>
						<Switch onChange={(e)=>handleExpenses(e,"fixed")} color="primary" required/>
					</div>
					<div className="row">
							<FormControl>
								<InputLabel shrink htmlFor="select-multiple-native">
								  Priority
								</InputLabel>
							  <Select defaultValue={2} onChange={(e)=>handleExpenses(e,"priority")} label="Priority" size="small" required>
								<MenuItem value={2}>High</MenuItem>
								<MenuItem value={1}>Medium</MenuItem>
								<MenuItem value={0}>Low</MenuItem>
							  </Select>
						  </FormControl>
					</div>
					<div className="row">
					{typeof newExpenses.amount !== "object" ? 
						<TextField onChange={(e)=>handleExpenses(e,"amount")} defaultValue="0" label="Amount" type="number" size="small" variant="outlined"
						required
						 InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}} /> 
						: <TextField id="amount" value={getTotal(newExpenses.amount)} type="number" label="Amount" size="small" variant="outlined" disabled
							required
						 InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}} /> 
						}
					  </div>
					  <div className="row expand">
						<IconButton size="small" color="primary" onClick={handleExpand}>
							{ typeof newExpenses.amount !== "object" ? <ExpandMore/> : <ExpandLess/>}
						</IconButton>
					</div>
				</div>
				{typeof newExpenses.amount !== "object" ? "" : 
					<div className="bottom">
					{newExpenses.amount.map((amount,i)=>Expanded(amount,i))}
					</div>}
			</div>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={()=>{setForm(false)}}>
					Cancel
				</Button>
				<Button disabled={newExpenses.name == '' || newExpenses.amount == ''} onClick={()=>{handleAddExpenses();setForm(false)}}>Add</Button>
			</DialogActions>
			</Dialog>
			{expensesList.length >0 ? 
			<div className="list">
				<div className="row even">
					<span className={"label left "+(sort.type === "name" ? "selected" : "")} onClick={()=>handleSort("name",false)}>
						{sort.type === "name" && !sort.d ? <ArrowDropUp/> : <ArrowDropDown/>}Name
					</span>
					<span className={"label "+(sort.type === "fixed" ? "selected" : "")} onClick={()=>handleSort("fixed",false)}>
						{sort.type === "fixed" && !sort.d ? <ArrowDropUp/> : <ArrowDropDown/>}Fixed
					</span>
					<span className={"label "+(sort.type === "priority" ? "selected" : "")} onClick={()=>handleSort("priority",false)}>
						{sort.type === "priority" && !sort.d ? <ArrowDropUp/> : <ArrowDropDown/>}Priority
					</span>
					<span className={"label left "+(sort.type === "amount" ? "selected" : "")} onClick={()=>handleSort("amount",false)}>
						{sort.type === "amount" && !sort.d ? <ArrowDropUp/> : <ArrowDropDown/>}Amount
					</span>
					<span className="label"></span>
				</div>
				{sortByStatus(expensesList).map((expenses,i)=>{
					return (
							<Item expenses={expenses} i={i} key={i+""+expenses.date+""+expenses.name}
							handleChange={handleChange} editExpChange={editExpChange} editExpAdd={editExpAdd} handleClick={handleClick}/>
						)
				})}
			</div>
			: ""}
			<div className="end">
				<Button size="medium" variant="contained" onClick={handleSubmit} disabled={expensesList.length === 0}>Done</Button>
			</div>
		</div>
		<input accept="image/*" className="hidden" id="cameraButton" type="file" capture="environment" onChange={async(e)=>{await renderExpense(e,(data)=>{console.log(data);QRRender(data)})}}/>
		<div id="reader"></div>
		<ItemMenu/>
		<Deletedialog/>
		<Changedialog/>
	</div>
	)
}

function Item({expenses,i,handleChange,editExpChange,editExpAdd,handleClick}){
	const [expand,setExpand] = useState(false)

	return (
	<div className={"row "+(i%2===0 ? "" : "even ")+(expenses.error ? "error ":"")+(expenses.outdated ? "outdated ":"")}>
			<div className="column " >
				<TextField size="small" onChange={(e)=>handleChange(e,"name",i)} error={expenses.error} defaultValue={expenses.name}  required/>
			</div>
			<div className="column center " >
				<Switch size="small" onChange={(e)=>handleChange(e,"fixed",i)} color="primary" defaultChecked={expenses.fixed} 
				required/>
			</div>
			<div className="column">
			  <Select size="small" defaultValue={expenses.priority} error={expenses.error} onChange={(e)=>handleChange(e,"priority",i)}>
				<MenuItem value={2}>High</MenuItem>
				<MenuItem value={1}>Medium</MenuItem>
				<MenuItem value={0}>Low</MenuItem>
			  </Select>
			</div>
			<div className={"column "+(expenses.suberror ? 'switch' :'')}>
			{typeof expenses.amount !== "object" ?
			<>
				<TextField size="small" onChange={(e)=>handleChange(e,"amount",i)} error={expenses.error} defaultValue={expenses.amount} 
				type="number" required
					 InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
				}} />
			</>
			: <>
				<IconButton size="small" color="primary" onClick={()=>setExpand(!expand)} >
					{ !expand ? <ExpandMore/> : <ExpandLess/>}
				</IconButton>
				<span>${Number(getTotal(expenses.amount)).toFixed(2)}</span>
			</>}
		</div>
		<div className="column end">
			<IconButton size="small" aria-label="more" onClick={(e)=>handleClick(e,expenses,i)}>
				<MoreVert/>
			</IconButton>
		</div>
		{(typeof expenses.amount === 'object') && expand ?
		<div className="expanded">
		{expenses.amount.map((amount,a)=>{
			return (
				<div className={"item "+(amount.error && expenses.error ? 'error' : '')} key={i+""+amount.date}>
					<div className="row">
						<span className="label">Name</span>
						<TextField id="name" onChange={(e)=>{editExpChange(e,i,a)}} error={amount.error && expenses.error} 
						defaultValue={amount.name} size="small" required/>
					</div>
					<div className="row">
						<span className="label">Amount</span>
						<TextField id="amount" onChange={(e)=>{editExpChange(e,i,a)}} error={amount.error && expenses.error} 
						defaultValue={amount.amount} type="number" size="small" required
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
			)})}
		</div>
		: ""}
		</div>
	)
}