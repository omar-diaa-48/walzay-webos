import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';

const Profile = () => {

    const { fullName, organization } = useAppSelector((state: RootState) => state.user)

    return (
        <section className="flex flex-col justify-center antialiased text-gray-600">
            <div className="h-full">
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
                            <div className="mt-2">
                                <div className="text-sm">
                                    Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer &
                                    PHP Lover.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile