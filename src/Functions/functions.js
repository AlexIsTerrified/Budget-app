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
// takes in edited income data as a javascript object and updates it in local storage
export function editIncome(data){
	var type = false
	if(typeof data !== "object")return type;
	
	data.forEach((item)=>{
		if(typeof item !== "object")type=false;
		if(typeof item.name !== "string")type="name";
		if(typeof item.amount !== "number" && data.amount >= 0)type="amount";
		if(typeof item.fixed !== "boolean"){
			type="fixed";
		}else if(typeof item.date !== "number")type="date";
	})
	
	const income = JSON.stringify(data)
	localStorage.setItem("local_income",income);
	
	return true
}

// fetches income data as javascript object from local storage
export function fetchIncome(){
	const data = localStorage.getItem("local_income");
	
	if(data == null)return false
	
	
	return JSON.parse(data);
}

// takes in edited expenses data as a javascript object and updates it in local storage
export function editExpenses(data){
	var type = false
	if(typeof data !== "object")return type;
	
	data.forEach((item)=>{
		if(typeof item !== "object")type = false;
		if(typeof item.name !== "string")type = "name";
		if(typeof item.amount !== "number" && data.amount >= 0)type = "amount";
		if(typeof item.priority !== "number")type = "priority";
		if(typeof item.fixed !== "boolean"){
			type = "fixed";
		}else if(typeof item.date !== "number")type = "date";
	})
	
	
	const income = JSON.stringify(data)
	localStorage.setItem("local_expenses",income);
	
	return true
}
// fetches expenses data as javascript object from local storage
export function fetchExpenses(){
	const data = localStorage.getItem("local_income");
	
	if(data == null)return false
	
	return JSON.parse(localStorage.getItem("local_expenses"))
}

