import CryptoJS from "crypto-js";
import { LOCAL_STORAGE_JWT_KEY } from "../constants";

export async function buildFetchRequest<T>(method: 'GET' | 'POST', path: string, data: any = undefined, params: any = undefined, includeHeaders: boolean = true): Promise<T> {
    const date = formatRequestDate()

    let headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-GIFTLOV-DATE': date,
    }

    if (includeHeaders) {
        const token = localStorage.getItem(LOCAL_STORAGE_JWT_KEY) ?? ''

        let signature = path + method;

        if (params) {
            signature += params;
        }

        signature += date + token;

        const secret = import.meta.env.VITE_API_SECRET;

        const signatureHeader = hashRequestHeader(signature, secret)

        headers = {
            ...headers,
            'signature': signatureHeader,
            'Authorization': token
        }
    }

    const body = data ? JSON.stringify(data) : undefined

    try {
        const res = await fetch(`https://staging.giftlov.com/api/Base/${path}`, {
            headers,
            method,
            body
        })

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        throw error;
    }
}

export const formatRequestDate = () => {
    const currentDate = new Date();

    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());
    const hours = String(currentDate.getUTCHours()).padStart(2, '0');
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');

    const formattedDate = `${day}${month}${year}${hours}${minutes}${seconds}`;
    return formattedDate;
}

export const hashRequestHeader = (inputValue: string, secret: string) => {
    const hashedValue = CryptoJS.HmacSHA512(inputValue, secret).toString(CryptoJS.enc.Hex);

    return hashedValue;
};

const getFieldValue = (field: any) => {

}