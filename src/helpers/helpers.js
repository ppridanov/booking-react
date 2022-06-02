import { differenceInCalendarDays, format } from 'date-fns';

export const sendData = async (options) => {
    return fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(options.body)
    })
}

export const isObjectNotEmpty = (obj) => {
    return Object.keys(obj).length !== 0;
}

export const getUniquesDates = (startDate, endDate) => {
    let uniqueDays = "";
    for (let i = startDate; i <= endDate; i = i + 24 * 60 * 60 * 1000) {
        uniqueDays += format(new Date(i), 'ddMyyyy') + ',';
    }
    return uniqueDays;
}

export const getAllDates = (startDate, endDate) => {
    let allDates = "";
    for (let i = startDate; i <= endDate; i = i + 24 * 60 * 60 * 1000) {
        allDates += format(new Date(i), 'yyyy-MM-dd') + ',';
    }
    return allDates;
}

export const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd');
}

export const getMinPrice = (prices) => {
    return prices.reduce((acc, v) => +acc.price < +v.price ? acc.price : v.price);
}

export const getSumm = (dates, prices) => {
    if (!dates || !prices) {
        throw new Error('Не получены даты или цены');
    }
    let result = 0;
    const allDates = getAllDates(Date.parse(dates[0]), Date.parse(dates[1])).split(',');
    const allDays = differenceInCalendarDays(dates[1], dates[0]);
    for (let priceObj of prices) {
        const priceDate = getAllDates(Date.parse(priceObj.start_date), Date.parse(priceObj.end_date));
        for (let i = 0; i < allDays; i++) {
            if (allDates[i] && priceDate.includes(allDates[i])) {
                result += +priceObj.price;
            }
        }
    }
    return result;
}

export const jsonCustomParser = (json) => {
    try {
        if (json === null) return false;
        return JSON.parse(json);
    } catch (err) {
        return false;
    }
}

export const cropTextLength = (text) => {
    if (!text) {
        return "";
    }
    let result = '';
    return (text.length > 100) ? result = text.slice(0, 100) + '...' : result
}

// Надыбал где то в вебе. Для склонения в зависимости от количества
export const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

export const getNumberOfDays = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}