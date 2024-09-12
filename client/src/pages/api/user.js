export default async function handler(req, res) {
    try {
        const id = req.body.id
        const token = req.headers['x-token']

        const response = await fetch(`${process.env.BE_URL}/api/user/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-token':token
             }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
