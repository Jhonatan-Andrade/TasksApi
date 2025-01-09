
interface formatDateType {day:number; month:number; year:number;}
function formatDateError() {throw new Error("Formato de data inválido  ( day / month / year ) ")}

const verifyDateError = {
    year : ()=>{throw new Error("O ano da tarefa não pode ser menor que o ano atual e ter mais de 2 anos no futuro")},
    month : ()=>{throw new Error("O mes não e valido ")},
    day : ()=>{throw new Error("O dia não é valido ")}
 
}

function formatDate(date:string):formatDateType {

    //Removendo espaços e separando dia mes e ano
    const dateArray = date.replace(/\s/g, "").split("/")
    if(dateArray.length !== 3) formatDateError()

    //verificando se a quantidade de caracteres é valida
    if(dateArray[2].length !== 4 || dateArray[1].length !== 2 || dateArray[0].length !== 2) formatDateError()

    const year = parseInt(dateArray[2])
    const month = parseInt(dateArray[1])
    const day = parseInt(dateArray[0])

    const dateTimeString = {day,month,year}
   
    return dateTimeString
}

export function verifyDate(dateTime:string) {

    const currentDate  = new Date().toLocaleDateString()

    const dateLimit = formatDate(dateTime)
    const dateCurrent = formatDate(currentDate)

    switch (true) {
        // verificar se dados são validos   ano < 2  mes < 12 
        case dateCurrent.year+2 < dateLimit.year: verifyDateError.year()
        case dateLimit.month > 12: verifyDateError.month()

        // verificar se a data de agendameto e maior que a data atual
        case dateCurrent.year > dateLimit.year: verifyDateError.year()
        case dateCurrent.month > dateLimit.month && dateCurrent.year == dateLimit.year : verifyDateError.month()
        case dateCurrent.day > dateLimit.day && dateCurrent.month == dateLimit.month : verifyDateError.day()
      
        // verificando se o dia é valido dependendo do mes
        case dateLimit.month ==  1 && dateLimit.day > 31: verifyDateError.day()
        case dateLimit.month ==  2 && dateLimit.day > 28: verifyDateError.day()
        case dateLimit.month ==  3 && dateLimit.day > 31: verifyDateError.day()
        case dateLimit.month ==  4 && dateLimit.day > 30: verifyDateError.day()
        case dateLimit.month ==  5 && dateLimit.day > 31: verifyDateError.day()
        case dateLimit.month ==  6 && dateLimit.day > 30: verifyDateError.day()
        case dateLimit.month ==  7 && dateLimit.day > 31: verifyDateError.day()
        case dateLimit.month ==  8 && dateLimit.day > 31: verifyDateError.day()
        case dateLimit.month ==  9 && dateLimit.day > 30: verifyDateError.day()
        case dateLimit.month == 10 && dateLimit.day > 31: verifyDateError.day()
        case dateLimit.month == 11 && dateLimit.day > 30: verifyDateError.day()
        case dateLimit.month == 12 && dateLimit.day > 31: verifyDateError.day()
    }
}
export function compareDate(dateLimit:string):boolean {
    
    const currentDate  = new Date().toLocaleDateString()
    
    const objDate = formatDate(dateLimit)
    const objDateLimit = formatDate(currentDate)
 
    switch (true) {
        case objDate.year > objDateLimit.year: return false
        case objDate.month > objDateLimit.month: return false
        case objDate.day > objDateLimit.day: return false
        default: return true
    }
}

    