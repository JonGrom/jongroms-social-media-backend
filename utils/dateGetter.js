const date = '2024-09-01T17:46:21.176Z'
function dateFormatter(date){
    // 2024-09-01T17:46:21.176Z
    const splitArr = date.split("-")
    const day = splitArr[2].slice(0,2)
    const hour = splitArr[2].slice(3,8)
    console.log(day)
    

    console.log(splitArr)
    const formattedDate = `Created on ${splitArr[1]}-${day}-${splitArr[0]} at `
}

dateFormatter(date)