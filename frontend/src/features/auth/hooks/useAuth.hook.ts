import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { login } from "../api/auth.api";

type Data = {
    email: string,
    password: string
}

export function useAuth () {

     const context = useContext(AuthContext);

     if (!context) {
      throw new Error("useAuth must be used within AuthContextProvider");
     }

     const {user, setUser, loading, setLoading} = context;

     async function handleLogin ({email, password}: Data) {
        setLoading(true);
        try{
            const response = await login({email,password});
            setUser(response.user);
        }
        catch(error: unknown){
           console.log(error)
        }
        finally{
            setLoading(false);
        }
     }

     return {
        handleLogin,
        user,
        loading
     }
}