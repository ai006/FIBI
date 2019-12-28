
//this routine is used to update data from the old 
//JSON with new data that was entered by the user 
export const updateValue= (oldData,update) => {
 if(Object.keys(oldData).length > 0){
    //check if oldData is found
   for(let key in update){
     if(key === "address" ){
       for(let addr in update[key]){
         if(addr === "city" && update[key][addr] ===""){
           update[key]['cityArr'] = oldData[key]['cityArr'];
           update[key][addr] = oldData[key][addr];
         }
         else if(addr === "country" && update[key][addr] ===""){
           update[key]['country'] = oldData[key]['country'];
           update[key][addr] = oldData[key][addr];
         }
         else if(addr === "city" && update[key][addr] !== "" ){
           update[key][addr] = oldData[key][addr] + "," + update[key][addr];
           const temp = update[key][addr].split(',');
           update[key]['cityArr'] = temp; 
         }
         else if(addr === "country" && update[key][addr] !== "" ){
           update[key][addr] = oldData[key][addr] + "," + update[key][addr];
           const temp = update[key][addr].split(',');
           update[key]['countryArr'] = temp; 
         }
       }
     }
     else if(key === "jobs"){                          //for jobs            
       if(update[key] === ""){                         //if update is empty add the old data
         update[key] = oldData[key];
         const temp = oldData[key].split(',');
         update['jobsArr'] = temp; 
       }
       else{                                           //if update is not empty join old and new string
         update[key] = oldData[key] +","+update[key];  //split it with ',' and update the jobs array
         const temp = update[key].split(',');
         update['jobsArr'] = temp;
       }
     }
     else if(update[key] === ""){
       update[key] = oldData[key];
     }
   }
 }
 return update;
}