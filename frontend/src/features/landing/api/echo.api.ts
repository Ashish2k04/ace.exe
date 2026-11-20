import axios from 'axios';

const echoApi = axios.create({
    baseURL: "http://localhost:3000/api/echo",
});

export const askEcho = async (question: string) => {
    const response = await echoApi.post("/chat", {question});
    console.log(response.data);
    return response.data;
}