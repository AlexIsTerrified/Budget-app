import Chart from 'react-apexcharts'
import {NewIncome, NewExpenses} from './newUser'

export default function Dashboard({income,expenses}){

	
	if(income == false || expenses == false || income == null || expenses == null)return (
		<div className={"start-form "+(income != false ? "next" : "")}>
			<NewIncome/>
			<NewExpenses/>
		</div>
	)

	const donutOptions = {
        labels: ['A', 'B', 'C', 'D', 'E'],
      }
	const donutSeries = [44, 55, 41, 17, 15]
	
	const areaOptions = {
					xaxis: {
					  categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					chart:{toolbar:{tools:{download:true,selection:false,zoom:false,zoomin:false,zoomout:false,pan:false,reset:false}},selection:{enabled:false}}
				  }
				  
	const areaSeries = [{
							name: 'series-1',
							data: [30, 40, 25, 50, 49, 21, 70, 51]
						  }, {
							name: 'series-2',
							data: [23, 12, 54, 61, 32, 56, 81, 19]
						  }]
	
	return (
		<div className="dashboard">
			<div className="head">
			</div>
			<div className="charts">
				<div className="pie-chart">
					<div className="pie">
						<Chart options={donutOptions} series={donutSeries} type="donut" />
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