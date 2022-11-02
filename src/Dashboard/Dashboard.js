import Chart from 'react-apexcharts'
import NewIncome from './newIncome'
import NewExpenses from './newExpense'
import {getTotal,donutInputs,areaInputs}from '../Functions/calculations'

export default function Dashboard({income,expenses}){

	if(income == false || expenses == false || income == null || expenses == null)return (
		<div className={"start-form "+(income != false ? "next" : "")}>
			<NewIncome/>
			<NewExpenses/>
		</div>
	)
	
	const incomeTotal = getTotal(income)
	const expensesTotal = getTotal(expenses)
	const donut = donutInputs(expenses,incomeTotal)

	const donutOptions = {
        labels:donut.labels,
      }
	  
	const area = areaInputs(expensesTotal,incomeTotal,[])
	
	const areaOptions = {
					xaxis: {
					  categories: area.xaxis
					},
					chart:{toolbar:{tools:{download:true,selection:false,zoom:false,zoomin:false,zoomout:false,pan:false,reset:false}},selection:{enabled:false}}
				  }
				  
	const areaSeries = [{
							name: 'Total Expenses',
							data: area.expenses
						  }, {
							name: 'Total Income',
							data: area.income
						  }]
	
	return (
		<div className="dashboard">
			<div className="head">
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
				<div className="expenses">
				</div>
				<div className="income">
				</div>
				<div className="extra">
				</div>
			</div>
		</div>
	)
}