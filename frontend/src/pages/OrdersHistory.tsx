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
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5">Previous Orders</p>
                    {data?.orders?.map((item) => (
                        <div key={item.id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full hidden md:block" src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress" />
                                <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">Premium Quaility Dress</h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span> Italic Minimal Design</p>
                                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p>
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base dark:text-white xl:text-lg leading-6">$36.00 <span className="text-red-300 line-through"> $45.00</span></p>
                                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">01</p>
                                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">$36.00</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageContainer>
    )
}

export default OrdersHistory