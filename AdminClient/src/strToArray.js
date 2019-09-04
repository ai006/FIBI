

export const changeToArray= (obj) => {
    const jobTemp = obj.jobs.split(',');;                   //jobTemp is an array string of jobs
    const cityTemp = obj.address.city.split(',');           //cityTemp is an array string of cities
    const countryTemp = obj.address.country.split(',');     //countryTemp is an array string of countries
    for(let i = 0; i < jobTemp.length; i++)
        obj.jobsArr.push(jobTemp[i])                        //push jobTemp to object/property jobsArr
    for(let i = 0; i < cityTemp.length; i++)
        obj.address.cityArr.push(cityTemp[i]);              //push cityTemp to object/property cityArr
    for(let i = 0; i < countryTemp.length; i++)
        obj.address.countryArr.push(countryTemp[i]);        //push countryTemp to object/property countryArr 
    }
