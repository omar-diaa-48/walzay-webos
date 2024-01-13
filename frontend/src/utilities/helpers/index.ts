import CryptoJS from "crypto-js";
import { LOCAL_STORAGE_JWT_KEY } from "../constants";

export async function buildFetchRequest<T>(method: 'GET' | 'POST', path: string, data: any = undefined, includeHeaders: boolean = true): Promise<T> {
    const date = formatRequestDate()

    let headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-GIFTLOV-DATE': date,
    }

    if (includeHeaders) {
        const token = localStorage.getItem(LOCAL_STORAGE_JWT_KEY) ?? ''

        const signature = path + method + date + token;
        const secret = import.meta.env.VITE_API_SECRET

        const signatureHeader = hashRequestHeader(signature, secret)

        headers = {
            ...headers,
            'signature': signatureHeader,
            'Authorization': token
        }
    }

    const body = data ? JSON.stringify(data) : undefined

    return fetch(`https://staging.giftlov.com/api/Base/${path}`, {
        headers,
        method,
        body
    })
        .then((res) => res.json() as T)
}

export const formatRequestDate = () => {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}${month}${year}${hours}${minutes}${seconds}`;
    return formattedDate;
}

export const hashRequestHeader = (inputValue: string, secret: string) => {
    const hashedValue = CryptoJS.HmacSHA512(inputValue, secret).toString(CryptoJS.enc.Hex);

    return hashedValue;
};