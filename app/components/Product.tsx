import Image from 'next/image'
import formatPrice from '@/util/PriceFormat'
import { ProductType } from '@/types/ProductType'

export default function Product({ name, image, price }: ProductType) {
    return (
        <div className='text-gray-700'>
            <Image className='w-full h-96 object-cover rounded-lg' src={image} width={800} height={800} alt={name} />
            <div className='font-medium py-2'>
                <h1>{name}</h1>
                <h2 className='text-sm'>{price !== null ? formatPrice(price as number) : 'N/A'}</h2>
            </div>
        </div>
    )
}