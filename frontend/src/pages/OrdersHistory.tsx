import { useQuery } from "@tanstack/react-query";
import { buildFetchRequest } from "../utilities/helpers";
import PageContainer from "../components/containers/PageContainer";

const OrdersHistory = () => {
    const { data, isLoading, error } = useQuery<{ orders: Array<IOrder> }>({
        queryFn: () => buildFetchRequest<{ orders: Array<IOrder> }>('GET', 'orders'),
        queryKey: ['orders']
    });

    return (
        <PageContainer isLoading={isLoading} error={error} title='Orders History'>
            <div className="grid gap-10 grid-cols-3 mx-12">
                {data?.orders.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md flex flex-col transition-all overflow-hidden hover:shadow-2xl">
                        <div className="  p-6">
                            <div className="pb-3 mb-4 border-b border-stone-200 text-xs font-medium flex justify-between text-blue-900">
                                <span className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    {item.creationDate} by {item.customerName}
                                </span>
                            </div>
                            <h3 className="mb-4 font-semibold  text-2xl"><a href="" className="transition-all text-blue-900 hover:text-blue-600">{item.deliveryChannel}</a></h3>
                            <p className="text-sky-800 text-sm mb-0">
                                #{item.referenceNo}
                            </p>
                            <div>
                                {item.lineItems.map((item) => (
                                    <span key={item.lineNumber} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                        <span className="line-through">{item.settlementPrice}</span> {item.netPrice} {item.settlementCurrency}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </PageContainer>
    )
}

export default OrdersHistory