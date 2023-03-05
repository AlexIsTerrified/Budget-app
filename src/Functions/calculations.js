import { ConstructionOutlined } from "@mui/icons-material";

export function getTotal(data){
	let total = 0;
	if(typeof data === 'object'){
		if(data.length != null){
			data.forEach((item)=>{
				if(typeof item.amount === "object"){
					total = total + getTotal(item.amount)
				}else{
					total = total + Number(item.amount)
				}
			})
		}else {
			total = total + Number(data.amount)
		}
	}else{
		total = Number(data)
	}
	
	return total
}

export function getStatus(income,expenses){
	let newIncome = [...income]
	let newExpenses = [...expenses]
	const currDate = new Date()
	newIncome = income.map((item)=>{
		const newItem = item
		const date = new Date(item.date)
		if(!item.fixed){
			if(date.getMonth() !== currDate.getMonth()){
				newItem.outdated = true
			}else{
				newItem.outdated = false
			}
		}else{
			newItem.outdated = false
		}
		return newItem
	})
	newExpenses = expenses.map((item)=>{
		const newItem = item
		const date = new Date(item.date)
		if(!item.fixed){
			if(date.getMonth() !== currDate.getMonth()){
				newItem.outdated = true
			}else{
				newItem.outdated = false
			}
		}else{
			newItem.outdated = false
		}
		return newItem
	})


	const incomeTotal = getTotal(newIncome)
	const expensesTotal = getTotal(newExpenses)
	let total = expensesTotal
	newExpenses = sortByAmount(newExpenses,true)
	newExpenses =  sortByPriority(newExpenses,true)
	newExpenses = newExpenses.map((item)=>{
		const newItem =  item
		if(incomeTotal < total){
			newItem.error = true
			if(typeof item.amount === 'object' && incomeTotal > total - (typeof item.amount !== 'object' ? Number(item.amount) : getTotal(item.amount))){
				newItem.suberror = true
				newItem.amount = newItem.amount.map((subItem,i)=>{
					if(incomeTotal <= total){
						subItem.error = true
						if(i===newItem.amount.length-1){
							newItem.suberror = false
						}
					}else{
						subItem.error = false
					}
					total = total - Number(subItem.amount)
					
					return subItem
				})
			}else{
				newItem.suberror = false
				total = total - (typeof item.amount !== 'object' ? Number(item.amount) : getTotal(item.amount))
			}
		}else{
			newItem.suberror = false
			newItem.error = false
		}
		return newItem
	})
	//console.log({income:sortByAmount(newIncome), expenses:sortByAmount(newExpenses)})
	return {income:sortByAmount(newIncome), expenses:sortByAmount(newExpenses)}
}

export function ifOutdated(data){
	let outdated = false
	data.forEach((item)=>{
		if(item.outdated){
			outdated = true
		}
	})

	return outdated
}

export function updateDate(newData,data=["0"]){
	try{
		let returnData = newData
		let date = new Date()
		date = date.valueOf()
		returnData = returnData.map((item)=>{
			let newItem = item
			let isDifferent = true
			delete newItem.outdated
			delete newItem.error
			delete newItem.suberror
			if(typeof newItem.amount === 'object'){
				newItem.amount = newItem.amount.map((am,i)=>{
					delete am.error
					return am
				})
			}
			data.forEach((oldItem)=>{
				if(newItem.name === oldItem.name && 
					JSON.stringify(newItem.amount) === JSON.stringify(oldItem.amount) && 
					newItem.fixed === oldItem.fixed && 
					newItem.priority === oldItem.priority){
						isDifferent = false
				}
			})
			if(isDifferent){
				newItem.date = date
			}
			return newItem 
		})
		return returnData
	}catch(e){
		return newData
	}
}

export function sortByStatus(data,d=false){
	let newData = data.sort((a,b)=>{
		if(d){
			return a.outdated-b.outdated
		}else{
			return b.outdated-a.outdated
		}
	})
	newData = newData.sort((a,b)=>{
		if(d){
			return a.error-b.error
		}else{
			return b.error-a.error
		}
	})

	return newData

}

export function sortByName(data, d=false){
	return data.sort((a,b)=>{
		if(d){
			return b.name.localeCompare(a.name)
		}else{
			return a.name.localeCompare(b.name)
		}
	})
}

export function sortByFixed(data,d=false){
	let newData = data.sort((a,b)=>b.outdated-a.outdated)

	return data.sort((a,b)=>{
		if(d){
			return a.fixed-b.fixed
		}else{
			return b.fixed-a.fixed
		}
	})

}

export function sortByPriority(data, d=false){
	return data.sort((a,b)=>{
		if(d){
			return a.priority-b.priority
		}else{
			return b.priority-a.priority
		}
	})
}

export function sortByAmount(data,d=false){
	return data.sort((a,b)=>{
		const aN = typeof a.amount === "object" ? getTotal(a.amount) : a.amount
		const bN = typeof b.amount === "object" ? getTotal(b.amount) : b.amount
		if(d){
			return aN-bN
		}else{
			return bN-aN
		}
	})
}

export function donutInputs(expenses,incomeTotal){
	let total = 0;
	const labels = []
	const series = []

	expenses.forEach((item)=>{
		labels.push(item.name)
		series.push(Number(getTotal(item.amount)))
		total = total + Number(getTotal(item.amount))
	})
	total = incomeTotal - total
	
	series.unshift(total)
	labels.unshift("Savings")
	return {labels:labels,series:series}
}

export function areaInputs(expensesTotal,incomeTotal,history=[]){
	const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
	const xaxis = []
	const income = []
	const expenses = []
	const n_history = [...history] || []
	
	let today = new Date()
	today = today.getMonth()
	for(var i=0; i<12; i++){
		let t = today - i
		if(t<0){
			xaxis[11-i] = months[12+t]
		}else{
			xaxis[11-i] = months[t]
		}
		
		
		if(i==0){
			income[11] = incomeTotal
			expenses[11] = expensesTotal
		}else if(n_history.length > 0){
			const n = n_history.pop()
			income[11-i] = n.income
			expenses[11-i] = n.expenses
		}else{
			income[11-i] = 0
			expenses[11-i] = 0
		}
	}

	return {xaxis:xaxis,income:income,expenses:expenses}
}

export function correctStringErrors(data){
	try{
		if(data.charAt(0) == "[" && data.charAt(data.length-1) == "]"){
			const newData = JSON.parse(data)
			let returnData = JSON.parse(data).map((item,i)=>{
				let newItem = item
				if(typeof item.name !== 'string'){
					newItem.name = ""
				}else if(typeof item.fixed !== 'boolean'){
					newItem.fixed = false
				}else if(typeof item.priority !== 'number' || (item.priority < 0 || item.priority > 2) ){
					newItem.priority = 0
				}else if(typeof item.amount !== 'object' && typeof item.amount !== 'string' && typeof item.amount !== 'number'){
					newItem.amount = 0
				}
				return newItem
			})
			return returnData
		}else{
			return null
		}
	}catch(e){
		return null
	}
}

export function historyUpdate(history,data){
	const n_history = history
	const n_data = data
	if(n_history.length>=11){
		n_history.shift()
		n_history.push(n_data)
	}else{
		n_history.push(n_data)
	}
	return n_history
}