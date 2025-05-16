import axios from 'axios';

export async function getResponseByPrompt(prompt:string){
    try {
        const BE = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(`${BE}/api/prompt`,{
            prompt
        },{
             headers: {
        'Content-Type': 'application/json',
    },
        })
        console.log("Response ==> ",response);
        const msg = JSON.parse(response.data.message);
        console.log("MSG=>",msg)
        return {data : response.data.message, summary : response.data.summary}
    } catch (error) {
        return {data:"Something went wrong. Please try again later.", summary:""}
    }
}