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

// takes in edited income data as a javascript object and updates it in local storage
export function editIncome(data){
	const income = JSON.stringify(data)
	const old_income = localStorage.getItem("local_income") || ""
	
	if(income.normalize() !==  old_income.normalize()){
		const income = JSON.stringify(data)
		localStorage.setItem("local_income",income);
		document.getElementById("hidden").click()
		
		return true
	}else{
		return false
	}
}

// fetches income data as javascript object from local storage
export function fetchIncome(){
	const data = localStorage.getItem("local_income");
	
	if(data == null)return false
	
	
	return JSON.parse(data);
}

// takes in edited expenses data as a javascript object and updates it in local storage
export function editExpenses(data){
	const income = JSON.stringify(data)
	const old_expenses = localStorage.getItem("local_expenses") || ""
	
	if(income.normalize() !==  old_expenses.normalize()){
		
		localStorage.setItem("local_expenses",income);
		document.getElementById("hidden").click()
		
		return true
	}else{
		return false
	}
}
// fetches expenses data as javascript object from local storage
export function fetchExpenses(){
	const data = localStorage.getItem("local_expenses");
	
	if(data == null)return false
	
	return JSON.parse(data)
}

