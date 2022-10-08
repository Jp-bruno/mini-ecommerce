import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import Router from 'next/router';

dbConnect();

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        res.send('Invalid method')
    }

    try {
        const userDataObject = JSON.parse(req.body)

        bcrypt.genSalt(10, (saltError, salt) => {
            if (saltError) {
                throw saltError
            } else {
                bcrypt.hash(userDataObject.password, salt, async (hashError, hash) => {
                    if (hashError) {
                        throw hashError
                    } else {
                        userDataObject.password = hash

                        const user = await User.create([userDataObject]).then(res => console.log(res));

                        res.redirect('/')
                    }
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}