/*
export const searchRedux =  (reduxData,query) => {
    
    let arr = [];
    //console.log(reduxData[0])
    let queryArr = query.split(' ');
    
    for(const i in reduxData)
    {
        for(const obj in reduxData[i])
        {
            if(Array.isArray(reduxData[i][obj]))
            {
                for(let j = 0; j < reduxData[i][obj].length; j++)
                {
                    let found = false;
                    let tempKey = reduxData[i][obj][j].split(' ');
                    for(let x = 0; x < tempKey.length; x++)
                    {
                        for(let y = 0; y < queryArr.length; y++)
                        {
                            if(tempKey[x].toLowerCase() === queryArr[y].toLowerCase())
                            {
                                arr.push(reduxData[i]);
                                found = true;
                                break;
                            }
                        }
                        if(found)
                        {
                            break;
                        }
                    }
                }
            }
            else if(typeof reduxData[i][obj] === 'object')
            {
                for(const key in reduxData[i][obj])
                {
                    if(Array.isArray(reduxData[i][obj][key]))
                    {
                        for(let j = 0; j < reduxData[i][obj][key].length; j++)
                        {
                            let found = false;
                            let tempKey = reduxData[i][obj][key][j].split(' ');
                            for(let x = 0; x < tempKey.length; x++)
                            {
                                for(let y = 0; y < queryArr.length; y++)
                                {
                                    if(tempKey[x].toLowerCase() === queryArr[y].toLowerCase())
                                    {
                                        arr.push(reduxData[i]);
                                        found = true;
                                        break;
                                    }
                                }
                                if(found)
                                {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return arr;
}
*/