import Image from 'next/image'
import formatPrice from '@/util/PriceFormat'
import { ProductType } from '@/types/ProductType'
import Link from 'next/link'

export default function Product({ name, image, unit_amount, id, description, metadata }: ProductType) {
    const { features } = metadata
    return (
        <Link href={{pathname: `/products/${id}`, query: {name, image, unit_amount, id, description, features}}}>
            <div>
                <Image className='w-full h-96 object-cover rounded-lg' src={image} width={800} height={800} alt={name} />
                <div className='font-medium py-2'>
                    <h1>{name}</h1>
                    <h2 className='text-sm text-primary'>{unit_amount !== null ? formatPrice(unit_amount as number) : 'N/A'}</h2>
                </div>
            </div>
        </Link>
    )
}