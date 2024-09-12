import { userData } from "@/store/authuser";

export default async function handler(req, res) {
    try {
        const response = await fetch(`${process.env.BE_URL}/api/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(req.body)
        });
        const data = await response.json();

            
        const responseID = await fetch(`${process.env.BE_URL}/api/user/${data.userID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-token':data.token
           }
        });
        const dataID = await responseID.json();
        
        // const account = accountID.data;
        
        const dt ={...data, 'user':dataID[0].data[0]}
          
        res.json(dt);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
