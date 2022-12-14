import { NextApiRequest, NextApiResponse } from "next"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const items = await stripe.products.list().then((result:any) => result.data)
    const prices = await stripe.prices.list().then((result:any) => result.data)

    let result = items.map((el:any, index:any) => {
        let v = Array.from(prices[index].unit_amount_decimal);

        v.splice(-2, 0, ',');

        let values_with_period = v.join('');

        return {
            id: el.id,
            name: el.name,
            description: el.description,
            value: values_with_period,
            images: el.images
        }
    })
    
    res.json(result)
}