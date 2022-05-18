import { format } from 'date-fns';

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

export const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd');
}

export const getMinPrice = (prices) => {
    return prices.reduce((acc, v) => +acc.price < +v.price ? acc.price : v.price);
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