import axios from 'axios';

const authApi = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});

type Data = {
     email: string;
     password: string;
}

async function login ({email, password}: Data) {
         const response = await authApi.post("/auth/login", {email, password});
         console.log(response.data);
         return response.data
}

export {login}
