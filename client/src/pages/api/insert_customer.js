export default async function handler(req, res) {
    try {
        
        const token = req.headers['x-token']
        console.log(req.body)
        
        const response = await fetch(`${process.env.BE_URL}/api/customer/add`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-token':token
             },
             body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
