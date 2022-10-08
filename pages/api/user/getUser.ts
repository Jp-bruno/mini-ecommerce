import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        res.end('Invalid method')
    }

    try {
        const user = await User.find(req.body);
        res.status(200).json({ success: true, data: user })
    } catch (error) {
        res.send(error)
    }

}