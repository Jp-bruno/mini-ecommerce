import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  if (req.method === 'POST') {
    const itemsIDs = req.body.id;

    const itemsQuantity = req.body.quantity;

    //aqui eu pego o preço de cada item a partir de suas ID's
    const itemsPrices = await Promise.all(
      itemsIDs.map( //aqui eu retorno uma array de promessas onde cada promessa vai me retornar o objeto price do produto desejado
        async (el:string) => {
          //primeiro eu procuro quais objetos price tem como produto o produto com o ID desejado
          let item = await stripe.prices.search({
            query: `product: "${el}"`
          })

          return item.data[0]
        }
      )
    ).then(res => res.map(el => el.id));

    const lineItems = itemsQuantity.map((el:number, index:number) => {
      return {
        price: itemsPrices[index],
        quantity: el,
      }
    })


    try {
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.redirect(303, session.url);
    } catch (err) {
      res.status((err as any).statusCode || 500).json((err as any).message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }

}