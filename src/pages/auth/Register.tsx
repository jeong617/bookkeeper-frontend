import {Button, Label} from 'flowbite-react';
import {IoIosArrowRoundForward} from 'react-icons/io';
import React, {useState} from 'react';

// project
import {UserData} from "../../store/UserData.ts";

interface RegisterProps {
    setState: () => void;
}

function Register({ setState }: RegisterProps): React.JSX.Element {
    const [userInfo, setUserInfo] = useState<UserData>({
        email: '',
        password: '',
        name: '',
        gender: ''
    });

    return (
        <>
            <h2 className="text-5xl font-extrabold text-black mb-8">Register</h2>
            {/* form 영역 */}
            <section className="flex flex-col gap-5">
                <div>
                    <div className="block">
                        <Label htmlFor="email1" value="ID"/>
                    </div>
                    <input type="email" id="email"
                           className=" block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300"
                           placeholder="abcd@kakao.com" required/>
                </div>
                <div>
                    <div className="block">
                        <Label htmlFor="password1" value="PASSWORD"/>
                    </div>
                    <input type="password" id="password"
                           className=" block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300"
                           required/>
                </div>
                <div>
                    <div className="block">
                        <Label htmlFor="name" value="이름"/>
                    </div>
                    <input type="text" id="name"
                           className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300"
                           required/>
                </div>
                <div>
                    <div className="block">
                        <Label htmlFor="name" value="나이"/>
                    </div>
                    <input type="number" id="age"
                           className="block w-1/2 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300"
                           min='0' max='100'
                           required/>
                </div>
                <div className="gap-10 items-center">
                    <div className="block">
                        <Label htmlFor="name" value="성별"/>
                    </div>
                    <div className="flex w-full space-x-4">
                        {["남자", "여자"].map((gender) => (
                            <button
                                key={gender}
                                type="button"
                                onClick={() => setUserInfo((prev) => ({...prev, gender: gender}))}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium w-full
                                    ${userInfo.gender === gender
                                    ? "bg-orange-400 text-white"
                                    : "bg-gray-100 text-gray-900 border border-gray-300"
                                } hover:bg-main hover:text-gray-600`}
                            >
                                {gender}
                            </button>
                        ))}
                    </div>
                </div>
                <Button className="bg-button-text mt-5 shadow-md">회원가입</Button>
            </section>
            <p className="mt-2 text-sm text-button-text/70 hover:cursor-pointer hover:text-button-text justify-self-center flex items-center gap-1"
               onClick={setState}
            >
                이미 회원이신가요?
                <IoIosArrowRoundForward/>
            </p>

        </>
    );
}

export default Register;