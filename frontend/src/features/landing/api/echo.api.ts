import axios from 'axios';

const echoApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const askEcho = async (question: string) => {
    const response = await echoApi.post("/echo/chat", {question});
    console.log(response.data);
    return response.data;
}