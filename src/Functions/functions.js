import {updateDate,correctStringErrors} from './calculations'
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
let userData = {};

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
	document.getElementById("loader").click()
	await createUserWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			const user = await userCredential.user;
			await console.log(user)
			console.log({set:true,message:user})
			await setDoc(doc(db,'users',user.uid),{
				email:user.email,
				income: fetchTempIncome() || [],
				expenses: fetchTempExpenses() || []
			})
		})
		.catch((error) => {
			console.log({set:false,message:error})
		});
}

export function loginUserWithEmail(email,password){
	document.getElementById("loader").click()
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
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


export function fetchTempIncome(){
	const data = localStorage.getItem("temp_income");
	
	if(data == null)return false
	
	
	return correctStringErrors(data)
}

export function fetchTempExpenses(){
	const data = localStorage.getItem("temp_expenses");
	
	if(data == null)return false
	
	return correctStringErrors(data)
}

export function tempIncome(data){
	const newData = JSON.stringify(data)
		localStorage.setItem("temp_income",newData);
}
export function tempExpenses(data){
		const newData = JSON.stringify(data)
		localStorage.setItem("temp_expenses",newData);
}

// fetches data as javascript object from local storage or cloud storage
export function fetchData(){
	if(auth.currentUser != null){
		let data = {income:[],expenses:[]}
		return getDoc(doc(db, "users", auth.currentUser.uid)).then((snap)=>{
			if(snap.exists()){
				userData = snap.data()
				console.log(snap.data())
				return snap.data()
			}
		}).catch((err)=>{
			console.log(err)
		})
	}else{
		let income = localStorage.getItem("local_income");
		let expenses = localStorage.getItem("local_expenses");
		let date_modified = localStorage.getItem("local_date");
		if(income == null)income = false
		if(expenses == null)expenses = false
		if(date_modified == null)date_modified = false

		userData = {income:correctStringErrors(income),expenses:correctStringErrors(expenses),date_modified:date_modified}
		return {income:correctStringErrors(income),expenses:correctStringErrors(expenses),date_modified:date_modified}
	}
}

// takes in edited data as a javascript object and updates it in local storage an cloud storage
export function editData(income,expenses){
	if(auth.currentUser != null){
		let newExpenses = expenses
		let newIncome = income

		newExpenses = updateDate(expenses,userData.expenses)
		newIncome = updateDate(income,userData.income)	

		userData.expenses = newExpenses
		userData.income = newIncome

		setDoc(doc(db,'users',auth.currentUser.uid),{
			income: newIncome,
			expenses: newExpenses
		},{merge:true})
	}else{
		let newExpenses = expenses
		let newIncome = income

		newExpenses = updateDate(expenses,userData.expenses)
		userData.expenses = newExpenses
		newExpenses = JSON.stringify(newExpenses)
		localStorage.setItem("local_expenses",newExpenses);
	
		newIncome = updateDate(income,userData.income)	
		userData.income = newIncome
		newIncome = JSON.stringify(newIncome)
		localStorage.setItem("local_income",newIncome);
	}
}

export function syncInfo(){

}

