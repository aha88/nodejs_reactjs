export default async function handler(req, res) {
    try {
        const token = req.headers['x-token'];
        const id = req.body.id

        const response = await fetch(`${process.env.BE_URL}/api/customers_delete/${id}`, {
              method: 'POST',
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
