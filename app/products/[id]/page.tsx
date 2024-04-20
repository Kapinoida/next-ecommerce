import Image from "next/image";
import { SearchParamTypes } from "@/types/SearchParamTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";

export default async function Product({ searchParams }: SearchParamTypes) {
    return (
        <div className="flex flex-col 2xl:flex-row items-center justify-between gap-16">
            <Image className="w-full rounded-lg" src={searchParams.image} width={600} height={600} alt={searchParams.name}></Image>
            <div className="font-medium">
                <h1 className="text-2xl py-2">{searchParams.name}</h1>
                <p className="py-2">{searchParams.description}</p>
                <p className="py-2">{searchParams.features}</p>
                <div className="flex gap-2">
                    <p className="font-bold text-primary">
                        {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
                    </p>
                </div>
                <AddCart {...searchParams} />
            </div>
        </div>
    )
}