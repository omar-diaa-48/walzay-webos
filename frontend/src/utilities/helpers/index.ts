import CryptoJS from "crypto-js";

export async function buildFetchRequest<T>(method: 'GET' | 'POST', path: string, data: any = undefined, includeHeaders: boolean = true): Promise<T> {
    const date = formatRequestDate()

    let headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-GIFTLOV-DATE': date,
    }

    if (includeHeaders) {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNdW5lcm8iLCJleHAiOjE3MDUxODI5NDMsInR5cGUiOiJBdXRob3JpemF0aW9uVG9rZW4iLCJjcmVhdGlvbkRhdGUiOjE3MDUwOTY1NDMsInVzZXJJZCI6MTEzLCJ2ZXJzaW9uIjoxfQ.0fsBbbFFlxeiqYVrEo2zrvOUuLZ7AR5fDu2RDfVzC6U'

        const signature = path + method + date + token;
        const secret = 'coding_challenge_1'

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