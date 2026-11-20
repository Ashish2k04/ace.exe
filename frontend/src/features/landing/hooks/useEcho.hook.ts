import { askEcho } from "../api/echo.api";

export const useEcho = () => {
     async function handleEcho (question: string) {
        const response = await askEcho(question);
        console.log(response.aiResponse);
        return response.aiResponse;
     }

     return {handleEcho}
}