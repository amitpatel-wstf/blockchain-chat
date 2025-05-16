import axios from 'axios';

export async function getResponseByPrompt(prompt:string){
    try {
        const BE = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(`${BE}/api/prompt`,{
            prompt
        })

        return response.data.message ?? "Something Went Wrong"
    } catch (error) {
        return "Something went wrong. Please try again later."
    }
}