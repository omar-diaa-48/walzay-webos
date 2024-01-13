import React from 'react'
import Button from '../../handlers/Button'
import { ICatalogue } from '../../../utilities/interfaces/catalogue.interface'

interface Props {
    item: ICatalogue;
}

const CatalogueCard: React.FC<Props> = ({ item }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={item.cardFaceImage} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
            </div>
            <div className="px-6">
                {item.categories.map((category) => (
                    <span key={category} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #{category}
                    </span>
                ))}
            </div>
            <Button>Place Order</Button>
        </div>
    )
}

export default CatalogueCard