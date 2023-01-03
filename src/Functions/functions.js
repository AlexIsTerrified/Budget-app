import {updateDate} from './calculations'
import { initializeApp } from "firebase/app";
/*import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_SkBpUiKHmWx4fJYipQ_VD1lo72BE9Sk",
  authDomain: "budgeting-app-eabe7.firebaseapp.com",
  projectId: "budgeting-app-eabe7",
  storageBucket: "budgeting-app-eabe7.appspot.com",
  messagingSenderId: "692610747876",
  appId: "1:692610747876:web:0177519cd43da5b6f64bf1",
  measurementId: "G-1V78DKJYFQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

function createUser(email,password){

}
*/

export function darkMode(){
	const dark = localStorage.getItem("darkMode")
	if(JSON.parse(dark)){
		return true
	}else{
		return false
	}
}

export function setDarkMode(d){
	localStorage.setItem("darkMode",JSON.stringify(d))
	document.getElementById("hidden").click()
}


export function fetchTempIncome(){
	const data = localStorage.getItem("temp_income");
	
	if(data == null)return false
	
	
	return JSON.parse(data);
}

export function fetchTempExpenses(){
	const data = localStorage.getItem("temp_expenses");
	
	if(data == null)return false
	
	return JSON.parse(data)
}

export function tempIncome(data){
	const newData = JSON.stringify(data)
		localStorage.setItem("temp_income",newData);
}
export function tempExpenses(data){
		const newData = JSON.stringify(data)
		localStorage.setItem("temp_expenses",newData);
}

// takes in edited income data as a javascript object and updates it in local storage
export function editIncome(data){
	let newData = data
	const dataString = JSON.stringify(data)
	const oldData = JSON.stringify(fetchIncome())
	if(fetchIncome() && dataString.normalize() !== oldData.normalize){
		newData = updateDate(data,fetchIncome())
	}
	const income = JSON.stringify(newData)
	localStorage.setItem("local_income",income);
}

// fetches income data as javascript object from local storage
export function fetchIncome(){
	const data = localStorage.getItem("local_income");
	
	if(data == null)return false
	
	
	return JSON.parse(data);
}

// takes in edited expenses data as a javascript object and updates it in local storage
export function editExpenses(data){
	let newData = data
	const dataString = JSON.stringify(data)
	const oldData = JSON.stringify(fetchExpenses())
	if(fetchExpenses() && dataString.normalize() !== oldData.normalize){
		newData = updateDate(data,fetchExpenses())
	}
	const income = JSON.stringify(newData)
	localStorage.setItem("local_expenses",income);
}
// fetches expenses data as javascript object from local storage
export function fetchExpenses(){
	const data = localStorage.getItem("local_expenses");
	
	if(data == null)return false
	
	return JSON.parse(data)
}

export function syncInfo(){

}

