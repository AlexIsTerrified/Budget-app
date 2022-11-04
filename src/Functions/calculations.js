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

export function areaInputs(expensesTotal,incomeTotal,history){
	const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
	const xaxis = []
	const income = []
	const expenses = []
	
	let today = new Date()
	today = today.getMonth()
	for(var i=0; i<6; i++){
		let t = today - i
		if(t<0){
			xaxis[5-i] = months[12+t]
		}else{
			xaxis[5-i] = months[t]
		}
		
		
		if(i==0){
			income[5] = incomeTotal
			expenses[5] = expensesTotal
		}else if(history.length != 0){
			income[5-i] = history.pop().income
			expenses[5-i] = history.pop().expenses
		}else{
			income[5-i] = 0
			expenses[5-i] = 0
		}
	}

	return {xaxis:xaxis,income:income,expenses:expenses}
}