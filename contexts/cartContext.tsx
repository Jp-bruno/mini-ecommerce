import Router from "next/router";
import { createContext, useState, PropsWithChildren, MouseEventHandler } from "react";

export class Product {
    id: string;
    name: string;
    value: string;
    image: string;
    quantity: number;

    constructor(id: string, name: string, value: string, image: string, quantity = 1) {
        this.id = id
        this.name = name
        this.value = value
        this.image = image,
        this.quantity = quantity
    }
}

export const CartContext = createContext({
    products: [{} as Product],
    addItemToCart: (ev:any) => {},
    checkout: () => {}
});


export default function CartContextProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState<{ products: Product[] }>({
        products: []
    })

    function addItemToCart(ev:any) {
        const parent = (ev.target as HTMLButtonElement).parentElement;

        const id = parent?.getAttribute('data-id') as string
        const name = parent?.getAttribute('data-name') as string
        const value = parent?.getAttribute('data-value') as string
        const image = parent?.getAttribute('data-image') as string

        let newProduct = new Product(id, name, value, image);

        //se já houverem produtos no carrinho (ou seja, carrinho nao está vazio)
        if (state.products.length > 0) {
            let alreadyHasProduct = state.products.some(el => el.id === id)

            //se o produto selecionado já tiver uma cópia no carrinho, aumentar a quantidade desse produto
            if (alreadyHasProduct) {
                let equalElementIndex = state.products.findIndex(el => el.id === id)

                const newArr = state.products.map((el, index) => {
                    if (index === equalElementIndex) {
                        el.quantity = el.quantity + 1
                        return el
                    }

                    return el
                })

                setState({
                    products: newArr
                })

                return
            }

            //se nao tiver o produto no carrinho, adicioná-lo
            const newArr = state.products.map(el => el)

            newArr.push(newProduct)

            setState({
                products: newArr
            })

            return
        }


        //se não houver item nenhum dentro do carrinho
        setState({
            products: [new Product(id, name, value, image)]
        })

        return
    }

    function removeItemFromCart(ev: MouseEvent) {

    }

    async function checkout() {
        const jsonData = JSON.stringify(state.products);

        const data = await fetch('/api/checkout_sessions', {
            method: 'POST',
            body: jsonData
        }).then(res => console.log(res))
    }

    return (
        <CartContext.Provider value={{ products: state.products, addItemToCart, checkout }}>
            {children}
        </CartContext.Provider>
    )
}