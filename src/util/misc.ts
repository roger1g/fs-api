import { lastDayOfWeek,startOfWeek } from "date-fns";
export function getOneMonthRange(numMonths:number=1):string[]{
    const dateFrom :Date = new Date(new Date().setHours(0,0,0,0));
    dateFrom.setDate(1);
    dateFrom.setMonth(dateFrom.getMonth()-numMonths);
    const dateFromString = dateFrom.toISOString();
    const dateUntil = new Date(new Date().setHours(0,0,0,0));
    dateUntil.setDate(1);
    const dataUntilString = dateUntil.toISOString();
    return [dateFromString,dataUntilString];
}

export function determineWeek():string{
    const todayDate = new Date();
    const end = lastDayOfWeek(todayDate).toDateString();
    const start = startOfWeek(todayDate).toDateString();
    const periodString =`${start}-${end}`;
    return periodString;
}

export function getDateStringByDuration(days:number){
    const dateUntil= new Date(new Date().setHours(0,0,0,0));
    const dateFrom = new Date(new Date().setHours(0,0,0,0));
    dateFrom.setDate(dateFrom.getDate() - days)
    const dateFromString = dateFrom.toISOString();
    const dateUntilString = dateUntil.toISOString();
    return [dateFromString,dateUntilString];
}
