import axios from 'axios';

const authApi = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});

type Data = {
     email: string;
     password: string;
}

async function register ({email, password}: Data) {
      try{
         const response = await authApi.post("/auth/login", {email, password});
         console.log(response.data);
         return response.data
      }
      catch(error: unknown){
        console.log(error)
      }
}

export {register}
