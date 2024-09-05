const dayjs = require("dayjs");

function getTime(){
    const day = dayjs().format('MMM/D/YYYY h:ma')
    console.log(day)
}

getTime()