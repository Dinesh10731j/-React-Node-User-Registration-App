import React, { useState } from "react";
import "./App.css"


const App = ()=>{

  const [form,setForm] = useState({});
  const [alexist,setAlexist] = useState('');

const handleSubmit = async (e)=>{

  e.preventDefault();

  const additionalInfo = {
    method:"POST",
    headers:{
      'Content-Type':"application/json",
    },

    body:JSON.stringify(form)
  }
  try{

const Url =`http://localhost:8080/`;
const res = await fetch(Url,additionalInfo);
const data = await res.json();
if(res.ok){
  console.log(data);
  setAlexist(data.message);
}else{
  console.log(res.status);
}



  }catch(err){
    console.log('Error while fetching data',err);
    
  }

};

const handleForm = (e)=>{
  const name = e.target.name;
  const value = e.target.value;
  setForm({...form,[name]:value});
}


  return (<>
    <main>
      <form onSubmit={handleSubmit}>
      <p>{JSON.stringify(form)}</p>
        <label>Enter username</label>
        <input type="text" name="username" placeholder="Enter username" onChange={handleForm} autoComplete="off"/>
        <label>Enter Password</label>
        <input type="text" name="password" placeholder="Enter password" onChange={handleForm} autoComplete="off"/>
        <input type="submit"/>
        <p className="exists">{alexist}</p>
      </form>
    </main>
  </>);
}


export default App;