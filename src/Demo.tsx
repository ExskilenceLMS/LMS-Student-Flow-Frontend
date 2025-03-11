import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "Stubborn"; 

const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const decryptData = (encryptedData: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};

const Demo: React.FC = () => {
    const [data, setData] = useState("");
    useEffect(() => {
        const encryptedValue = encryptData("Varun");
        sessionStorage.setItem("SessionData", encryptedValue);

        const storedValue = sessionStorage.getItem("SessionData");
        setData(storedValue ?? "");

        if (storedValue) {
            const decryptedValue = decryptData(storedValue);
            console.log("Decrypted Value:", decryptedValue);
        }
    }, []);

    return (
        <div>
            <h1>Demo</h1>
            <p>{data}</p>
        </div>
    );
};

export default Demo;
