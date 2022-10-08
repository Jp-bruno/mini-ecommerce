import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        res.end('Invalid method')
    }

    try {
        const user = await User.create([req.body]);

        console.log(user)

        res.status(201).json({ success: true, data: user })

        // console.log('hi')
    } catch(error) {
        res.status(400).send(error)
    }
}