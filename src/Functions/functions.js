import {updateDate,correctStringErrors,historyUpdate,getTotal} from './calculations'
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth";
import { getDoc,doc, setDoc,getFirestore,enableIndexedDbPersistence } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyD_SkBpUiKHmWx4fJYipQ_VD1lo72BE9Sk",
  authDomain: "budgeting-app-eabe7.firebaseapp.com",
  projectId: "budgeting-app-eabe7",
  storageBucket: "budgeting-app-eabe7.appspot.com",
  messagingSenderId: "692610747876",
  appId: "1:692610747876:web:0177519cd43da5b6f64bf1",
  measurementId: "G-1V78DKJYFQ"
};

let app = initializeApp(firebaseConfig);
export let auth = getAuth(app);
let db = getFirestore(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

export async function createUserWithEmail(email,password){
	await createUserWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			document.getElementById("loader").click()
			const user = await userCredential.user;
			await console.log(user)
			console.log({set:true,message:user})
			let date = new Date()
			date = date.valueOf()
			await setDoc(doc(db,'users',user.uid),{
				email:user.email,
				income: fetchTempData().income || [],
				expenses: fetchTempData().expenses || [],
				date:date
			})
		})
		.catch((error) => {
			console.log({set:false,message:error})
		});
}

export function loginUserWithEmail(email,password){
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			document.getElementById("loader").click()
			return {set:true,message:""}
		})
		.catch((error) => {
			return {set:false,message:error}
		});
}

function createUserWithGoogle(){

}

export function logout(){
	document.getElementById("loader").click()
	signOut(auth).then(() => {
		return {set:true,message:""}
	  }).catch((error) => {
		return {set:false,message:error}
	  });
}

export function darkMode(){
	let dark = localStorage.getItem("darkMode")
	dark = JSON.parse(dark)
	let returnValue = {value:dark || 0,set:false}
	if(dark == 2){
		returnValue.set = false
	}else if(dark == 1){
		returnValue.set = true
	}else{
		if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
			returnValue.set = true
		}
	}
	return returnValue
}

export function setDarkMode(d){
	localStorage.setItem("darkMode",JSON.stringify(d))
	document.getElementById("darkMode").click()
}


function fetchOldData(){
	const data = JSON.parse(localStorage.getItem("temp_oldData"))
	return data
}

function setOldData(income,expenses){
	const data = JSON.stringify({income:income,expenses:expenses})
	localStorage.setItem("temp_oldData",data);
}

export function fetchTempData(){
	const data = {income: JSON.parse(localStorage.getItem("temp_income")),
	expenses: JSON.parse(localStorage.getItem("temp_expenses")),
	history:JSON.parse(localStorage.getItem("temp_history"))}
	return data
}

export function setTempData(income,expenses){
	const incomeData = JSON.stringify(income)
	const expensesData = JSON.stringify(expenses)
	
	localStorage.setItem("temp_income",incomeData);
	localStorage.setItem("temp_expenses",expensesData);
}

export function setTempHistory(history){
	const historyData = JSON.stringify(history)
	localStorage.setItem("temp_history",historyData);
}

// fetches data as javascript object from local storage or cloud storage
export function fetchData(){
	if(auth.currentUser){
		return getDoc(doc(db, "users", auth.currentUser.uid)).then((snap)=>{
			if(snap.exists()){
				const data = snap.data()
				setOldData(data.income,data.expenses)
				return data
			}
		}).catch((err)=>{
			console.log(err)
		})
	}else{
		let income = localStorage.getItem("local_income");
		let expenses = localStorage.getItem("local_expenses");
		let date_modified = localStorage.getItem("local_date");
		let history = localStorage.getItem("local_history");
		
		if(income)income = correctStringErrors(income)
		else income = []
		if(expenses)expenses = correctStringErrors(expenses)
		else expenses = []
		if(date_modified){
			date_modified = JSON.parse(date_modified)
		}else{
			let date = new Date()
			date_modified = date.valueOf()
		}
		if(history){
			history = JSON.parse(history)			
		}else{
			history = []
		}
		//userData = {income:[...income],expenses:[...expenses],date_modified:date_modified}
		setOldData(income,expenses)
		return {income:income,expenses:expenses,date_modified:date_modified,history:history}
	}
}

// takes in edited data as a javascript object and updates it in local storage an cloud storage
export function editData(income,expenses,history){
	if(auth.currentUser){
		let newExpenses = expenses ? [...expenses] : []
		let newIncome = income ? [...income] : []
		let newHistory = history ? [...history] : []
		const oldData = fetchOldData()

		if(oldData.expenses != [])newExpenses = updateDate(newExpenses,oldData.expenses)
		if(oldData.income != [])newIncome = updateDate(newIncome,oldData.income)

		setOldData(newIncome,newExpenses)

		let date = new Date()
		date = date.valueOf()

		setDoc(doc(db,'users',auth.currentUser.uid),{
			income: newIncome,
			expenses: newExpenses,
			date:date,
			history:newHistory
		},{merge:true})
	}else{
		let newExpenses = expenses ? [...expenses] : []
		let newIncome = income ? [...income] : []
		let newHistory = history ? [...history] : []
		const oldData = fetchOldData()

		if(oldData.expenses != [])newExpenses = updateDate(newExpenses,oldData.expenses)
		if(oldData.income != [])newIncome = updateDate(newIncome,oldData.income)

		setOldData(newIncome,newExpenses)

		let date = new Date()
		date = date.valueOf()

		newExpenses = JSON.stringify(newExpenses)
		newIncome = JSON.stringify(newIncome)
		newHistory = JSON.stringify(newHistory)
		localStorage.setItem("local_expenses",newExpenses);
		localStorage.setItem("local_income",newIncome);
		localStorage.setItem("local_date",date);
		localStorage.setItem("local_history",newHistory);
	}
}

export function checkForChanges(income,expenses){
	try{
		const n_income = typeof income === 'object' ? [...income] : false
		const n_expenses = typeof expenses === 'object' ? [...expenses] : false
		const n_userData = fetchOldData()
		let returnValue = false
		n_income.forEach((newItem)=>{
			let isDifferent = true
			try{
				n_userData.income.forEach((oldItem)=>{
					if(newItem.name === oldItem.name && 
						JSON.stringify(newItem.amount) === JSON.stringify(oldItem.amount) && 
						newItem.fixed === oldItem.fixed && 
						newItem.priority === oldItem.priority){
							isDifferent = false
					}
				})
			}catch(e){
				console.log(e)
			}
			if(isDifferent){
				returnValue = true
			}
		})

		n_expenses.forEach((newItem)=>{
			let isDifferent = true
			try{
				n_userData.expenses.forEach((oldItem)=>{
					if(newItem.name === oldItem.name && 
						JSON.stringify(newItem.amount) === JSON.stringify(oldItem.amount) && 
						newItem.fixed === oldItem.fixed && 
						newItem.priority === oldItem.priority){
							isDifferent = false
					}
				})
			}catch(e){
				console.log(e)
			}
			if(isDifferent){
				returnValue = true
			}
		})

		return returnValue
		}catch(e){
			console.log(e)
			return true
		}
}

export function updateForMonth(data){
	let currDate = new Date()
	currDate = currDate.getMonth()
	let oldDate = new Date(data.date)
	oldDate = oldDate.getMonth()

	let n_data = data || []

	if(currDate !== oldDate){
		console.log("history update",currDate,oldDate)
		let n = currDate > oldDate ? (currDate-oldDate)-1 : (currDate-oldDate)+11
		while(n>0){
			n_data.history = historyUpdate(n_data.history,{income:0,expenses:0})
			n = n - 1
		}
		n_data.history = historyUpdate(n_data.history,{income:getTotal(n_data.income),expenses:getTotal(n_data.expenses)}) 
		return n_data
	}else{
		return n_data
	}
}