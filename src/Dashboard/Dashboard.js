import { useTheme} from '@mui/material/styles';
import Chart from 'react-apexcharts'
import NewIncome from './newIncome'
import NewExpenses from './newExpense'
import {getTotal,sortByAmount,donutInputs,areaInputs}from '../Functions/calculations'

export default function Dashboard({income,expenses}){
	const theme = useTheme();
	
	if(income == false || expenses == false || income == null || expenses == null)return (
		<div className={"start-form "+(income != false ? "next" : "")}>
			<NewIncome income={income}/>
			<NewExpenses/>
		</div>
	)
	
	const incomeTotal = getTotal(income)
	const expensesTotal = getTotal(expenses)
	const donut = donutInputs(expenses,incomeTotal)

	const donutOptions = {
        labels:donut.labels,
		chart:{
			foreColor:theme.palette.mode === "dark" ? '#f3f3f3d0' : '#434343d0' ,
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
	  
	const area = areaInputs(expensesTotal,incomeTotal,[])
	
	const areaOptions = {
					xaxis: {
					  categories: area.xaxis
					},
					colors:['#008FFB','#FF4560'],
					chart:{
						foreColor: theme.palette.mode === "dark" ? '#f3f3f3d0' : '#434343d0',
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
	
	const showExpenses= () => {
		const n_income = income
		n_income.sort((a,b)=>b-a)
		
		return (<>
			<div className="">
			</div>
		</>)
	}
	
	const expensesItem = (item,i) => {
		const amount = item.amount !== "object" ? getTotal(item.amount).toFixed(2) : item.amount.toFixed(2)
		const percentage = item.amount !== "object" ? ((getTotal(item.amount)/incomeTotal)*100).toFixed(1) : ((item.amount/incomeTotal)*100).toFixed(1)
		const progress = item.amount !== "object" ? ((getTotal(item.amount)/expensesTotal)*100).toFixed(1) : ((item.amount/expensesTotal)*100).toFixed(1)
		
		return (
			<div className={"row "+(i%2===0 ? "":"even")} key={i+""+item.date}>
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
			<div className={"row "+(i%2===0 ? "":"even")} key={i}>
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
				<h2>Right now you are saving ${incomeTotal-expensesTotal}</h2>
			</div>
			<div className="charts">
				<div className="pie-chart">
					<div className="pie">
						<Chart options={donutOptions} series={donut.series} type="donut" />
					</div>
				</div>
				<div className="graph">
				<Chart options={areaOptions} series={areaSeries} type="area" />
				</div>
			</div>
			<div className="lists">
				<div className="income">
					<div className="row even">
						<span className="label">Income</span>
						<span className="label">% of income</span>
					</div>
					{sortByAmount(income).map((item,i)=>{
						return (incomeItem(item,i))
					})}
				</div>
				<div className="income expenses">
					<div className="row even">
						<span className="label">Expenses</span>
						<span className="label">Priority</span>
						<span className="label">% of income</span>
					</div>
					{sortByAmount(expenses).map((item,i)=>{
						return (expensesItem(item,i))
					})}
				</div>
				<div className="extra">
				</div>
			</div>
		</div>
	)
}