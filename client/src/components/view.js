import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   contactname: "",
   number: "",
   contactaddress: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);

 return (
   <div>
     <h3>View Record</h3>
       <div className="form-group">
         <label htmlFor="contactname">Contact Name: {form.contactname}</label>
       </div>

       <div className="form-group">
         <label htmlFor="number">Contact Number: {form.number}</label>
       </div>

       <div className="form-group">
         <label htmlFor="contactaddress">Contact Address: {form.contactaddress}</label>
       </div>
   </div>
 );
}