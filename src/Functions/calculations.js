export function getTotal(data){
	let total = '';
	if(typeof data === 'object'){
	data.forEach((item)=>{
		if(item.amount === "object"){
			total = getTotal(item.amount)
		}else{
			total = Number(total) + Number(item.amount)
		}
	})
	}else{
		total = data
	}
	return Number(total)
}

export function donutInputs(expenses,incomeTotal){
	const labels = []
	const series = []
	
	expenses.forEach((item)=>{
		labels.unshift(item.name)
		if(item.amount === "object"){
			series.unshift(getTotal(item.amount))
		}else{
			series.unshift(item.amount)
		}	
	})
	
	return {labels:labels,series:series}
}