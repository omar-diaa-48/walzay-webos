import CryptoJS from "crypto-js";

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