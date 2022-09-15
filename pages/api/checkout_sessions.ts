import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let lineItems;

  if (req.method === 'POST') {
    const itemsIDs = req.body.id;

    const itemsQuantity = req.body.quantity;

    if (typeof itemsIDs === 'string') {
      lineItems = await (async () => {
        let item = await stripe.prices.search({
          query: `product: "${itemsIDs}"`
        })

        return [{
          price: item.data[0].id,
          quantity: Number(itemsQuantity)
        }]
      })()

      console.log(lineItems)

    } else {
      //aqui eu pego o preço de cada item a partir de suas ID's
      const itemsPrices = await Promise.all(
        itemsIDs.map( //aqui eu retorno uma array de promessas onde cada promessa vai me retornar o objeto price do produto desejado
          async (productID: string) => {
            let item = await stripe.prices.search({
              query: `product: "${productID}"`
            })

            return item.data[0]
          }
        )
      ).then(res => res.map(el => el.id));

      lineItems = itemsQuantity.map((el: number, index: number) => {
        return {
          price: itemsPrices[index],
          quantity: el,
        }
      })
    }
  }


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
}