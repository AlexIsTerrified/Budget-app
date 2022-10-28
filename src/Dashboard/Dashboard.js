
import {NewIncome, NewExpenses} from './newUser'

export default function Dashboard({income,expenses}){

	
	if(income == false || expenses == false || income == null || expenses == null)return (
		<div className={"start-form "+(income != false ? "next" : "")}>
			<NewIncome/>
			<NewExpenses/>
		</div>
	)
	
	
	return (
		<div className="dashboard">
			<div className="head">
			</div>
			<div className="charts">
				<div className="pie-chart">
				</div>
				<div className="graph">
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