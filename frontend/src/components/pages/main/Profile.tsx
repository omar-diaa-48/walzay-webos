import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store';

interface Props {
    wallets: Array<IWallet>
}

const Profile: React.FC<Props> = ({ wallets }) => {

    const { fullName, organization, privileges } = useAppSelector((state: RootState) => state.user)

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="flex flex-col h-full">
                <div className="flex-grow p-5">
                    <div className="flex justify-between items-start">
                        <header>
                            <div className="flex mb-2">
                                <div className="flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full">
                                    <p>
                                        {fullName[0]}
                                    </p>
                                </div>
                                <div className="mt-1 px-1">
                                    <h2 className="text-xl leading-snug justify-center font-semibold">
                                        {fullName}
                                    </h2>
                                    <div className="flex items-center">
                                        <span>{organization}</span>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                    <hr className='my-2' />
                    <div className="mt-2">
                        Privileges
                        <div className="text-sm">
                            {privileges.join((', '))}
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='mt-w'>
                        Wallets
                        {wallets.map((wallet, index) => (
                            <div key={wallet.id}>
                                <p>#{index + 1}: {wallet.title}, <span>{wallet.balance} {wallet.currency}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile