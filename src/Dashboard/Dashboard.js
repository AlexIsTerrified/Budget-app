import { useTheme} from '@mui/material/styles';
import {Error,CheckCircle, CheckCircleSharp} from '@mui/icons-material';
import {NavLink as Link} from 'react-router-dom'
import Chart from 'react-apexcharts'
import NewIncome from './newIncome'
import NewExpenses from './newExpense'
import {getTotal,sortByStatus,sortByAmount,donutInputs,areaInputs, sortByPriority,ifOutdated}from '../Functions/calculations'


export default function Dashboard({income,expenses,theme}){
	
	if(income === false || expenses === false || income === null || expenses === null)return (
		<div className={"start-form "+(income != false ? "next" : "")}>
			<NewIncome income={income}/>
			<NewExpenses/>
		</div>
	)
	
	const incomeTotal = getTotal(income)
	const expensesTotal = getTotal(expenses)

	const Donut = () => {
		const donut = donutInputs(sortByAmount(expenses),incomeTotal)
		const donutOptions = {
			labels:donut.labels,
			chart:{
				foreColor:theme === true ? '#f3f3f3d0' : '#434343d0' ,
			},
			colors: ['#008FFB',	'#00E396',	'#FEB019',	'#FF4560',	'#775DD0', '#2B908F',	'#F9A3A4',	'#90EE7E'	,'#FA4443'	,'#69D2E7'],
			stroke:{
				show:false
			},
			theme:{
				palette:'patelle4'
			},
			dataLabels: {
				enabled: true,
			},
			plotOptions: {
			  pie: {
				  dataLabels: {
					offset: 0,
					minAngleToShowLabel: 10
				}, 
				donut: {
				labels: {
					show: true,
					name: {
					  show:true
					},
					value: {
					  show:true
					}
				  },
				  size: '70%'
				}
			  }
			}
		  }


		return (<Chart options={donutOptions} series={donut.series} type="donut" />)
	}
	
	const Area = () => {
		const area = areaInputs(expensesTotal,incomeTotal,[])
	
		const areaOptions = {
						xaxis: {
						  categories: area.xaxis
						},
						colors:['#008FFB','#FF4560'],
						chart:{
							foreColor: theme === true ? '#f3f3f3d0' : '#434343d0',
							toolbar:{
								tools:{download:true,selection:false,zoom:false,zoomin:false,zoomout:false,pan:false,reset:false}},
								selection:{enabled:false}
								},
						grid:{
							borderColor: "#555",
							clipMarkers: false,
							yaxis: {
							  lines: {
								show: false
							  }
							}
						},
						dataLabels: {
							enabled: false
						  },
						tooltip: {
							theme: "dark"
						  },
						yaxis: {
							min: 0,
							tickAmount: 4
						  }
					  }
					  
		const areaSeries = [{
								name: 'Total Income',
								data: area.income
							  },
							  {
								name: 'Total Expenses',
								data: area.expenses
							  } ]
		return (<Chart options={areaOptions} series={areaSeries} type="area" />)
	}
	const showExpenses= () => {
		const n_income = income
		n_income.sort((a,b)=>b-a)
		
		return (<>
			<div className="">
			</div>
		</>)
	}

//UI begins here

	const IncomeExceed = () => {
		let errors = []
		let suberrors = []

		expenses.forEach((expense)=>{
			if(expense.error){
				if(expense.suberror && typeof expense.amount === 'object'){
					expense.amount.forEach((sub)=>{
						if(sub.error)
						suberrors.push(sub)
					})
				}
				errors.unshift(expense)
			}
		})

		return(
			<div className="exceed">
				<b className="top">We recommend making the following changes to your expenses</b>
				{errors.map((expense)=>{
					return expense.suberror ? 
						<div className="row column">
							<span>Remove the following items from your <b>{expense.name}</b> expense</span>
							<ul>
								{suberrors.map((sub)=>{
									return <li><span>{sub.name}</span><i>${Number(sub.amount).toFixed(2)}</i></li>
								})}
							</ul>
						</div>
						: <div className="row">
							<span>Remove your <b>{expense.name}</b> expense</span>
							<i>${typeof expense.amount !== 'object' ? Number(expense.amount).toFixed(2) : getTotal(expense.amount).toFixed(2)}</i>
							</div>
				})}
				
			</div>
		)
	}

	const expensesItem = (item,i) => {
		const amount = item.amount !== "object" ? getTotal(item.amount).toFixed(2) : item.amount.toFixed(2)
		const percentage = item.amount !== "object" ? ((getTotal(item.amount)/incomeTotal)*100).toFixed(1) : ((item.amount/incomeTotal)*100).toFixed(1)
		const progress = item.amount !== "object" ? ((getTotal(item.amount)/expensesTotal)*100).toFixed(1) : ((item.amount/expensesTotal)*100).toFixed(1)
		
		return (
			<div className={"row "+(i%2===0 ? "":"even ")+(item.error ? "error ":"")+(item.outdated ? "outdated ":"")} key={i+""+item.date}>
				<span className="column">{item.name}</span>
				<span className="column">{item.priority == 0 ? "Low" : item.priority == 1 ? "Medium" : "High"}</span>
				<span className="column">
					<div className="progress" style={{width:progress+"%"}}>
					<span>{percentage}%</span><span>(${amount})</span>
					</div>
				</span>
			</div>
		)
	}
	
	const incomeItem = (item,i) => {
		const amount = item.amount !== "object" ? getTotal(item.amount).toFixed(2) : item.amount.toFixed(2)
		const percentage = item.amount !== "object" ? ((getTotal(item.amount)/incomeTotal)*100).toFixed(1) : ((item.amount/incomeTotal)*100).toFixed(1)
		
		return (
			<div className={"row "+(i%2===0 ? "":"even ")+(item.error ? "error ":"")+(item.outdated ? "outdated ":"")} key={i}>
				<span className="column">{item.name}</span>
				<span className="column">
				<div className="progress" style={{width:percentage+"%"}}>
					<span>{percentage}%</span><span>(${amount})</span>
					</div>
				</span>
			</div>
		)
	}
	
	return (
		<div className="dashboard">
			<div className="head">
				<h1>Dashboard</h1>
				{incomeTotal >= expensesTotal ? 
				<h3 className="success">
					<CheckCircle/>
					You are currently saving <i>${(incomeTotal-expensesTotal).toFixed(2)}</i> or <i>{(((incomeTotal-expensesTotal)/incomeTotal)*100).toFixed(1)}%</i>of your income
				</h3> : 
				<h3 className="error">
					<Error/>
					 Your expenses currently exceed your income by <i>${(expensesTotal-incomeTotal).toFixed(2)} or <i>{(((expensesTotal-incomeTotal)/expensesTotal)*100).toFixed(1)}%</i></i>
				</h3>}
				{ifOutdated(income) ? <h3 className="outdated"><Error/> One or more of your incomes are outdated</h3> : null}
				{ifOutdated(expenses) ? <h3 className="outdated"><Error/> One or more of your expenses are outdated</h3> : null}
			</div>
			<div className="charts">
				<div className="pie-chart">
					
					{incomeTotal >= expensesTotal ? 
					<div className="pie">
						<Donut/> 
					</div>
					: <IncomeExceed/>}
					
				</div>
				<div className="graph">
					<Area/>
				</div>
			</div>
			<div className="lists">
				<Link to="/income" className="income">
					<div className="row even">
						<span className="label">Income</span>
						<span className="label">% of income</span>
					</div>
					{sortByStatus(sortByAmount(income)).map((item,i)=>{
						return (incomeItem(item,i))
					})}
				</Link>
				<Link to="/expenses" className="income expenses">
					<div className="row even">
						<span className="label">Expenses</span>
						<span className="label">Priority</span>
						<span className="label">% of income</span>
					</div>
					{sortByStatus(sortByAmount(expenses)).map((item,i)=>{
						return (expensesItem(item,i))
					})}
				</Link>
			</div>
		</div>
	)
}