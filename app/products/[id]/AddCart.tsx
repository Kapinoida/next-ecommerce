'use client'

import { useCartStore } from "@/store"
import { AddCartType } from "@/types/AddCartType"
import { useState } from "react"



export default function AddCart({ name, id, image, unit_amount, quantity }: AddCartType) {
    const cartStore = useCartStore()
    const [added, setAdded] = useState(false)

    const handleAdd = () => {
        cartStore.addProduct({ name, id, image, unit_amount, quantity })
        setAdded(true)
        setTimeout(() => setAdded(false), 1000)
    }
    return (
        <>
            <button onClick={handleAdd} disabled={added} className="my-4 btn btn-primary w-full">{!added && <span>Add to cart</span>} {added && <span>Adding to cart</span>}</button>
        </>
    )
}