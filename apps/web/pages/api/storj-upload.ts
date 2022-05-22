import type { NextApiRequest, NextApiResponse } from 'next';

/* type Data = {
  name: string
} */

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;

  switch (method) {
    case 'POST':
      res.json({ method: 'POST', endpoint: 'Users' });

      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }

  res.status(200).end();
}
