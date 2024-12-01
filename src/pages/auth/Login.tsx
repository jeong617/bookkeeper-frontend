import {Button, Label} from 'flowbite-react';
import {IoIosArrowRoundForward} from 'react-icons/io';
import React, {useState} from 'react';
import {post} from "../../api/api.ts";

interface LoginProps {
    setState: () => void;
}

function Login({setState}: LoginProps): React.JSX.Element {
    const loginData = useState({
        email: '',
        password: '',
    })

    // handler
    const loginHandler = async () => {
        try {
            const url = `auth/login`;
            await post(url, loginData);
        } catch ((error) => {
            console.error(error);
        })
    }

    return (
        <>
            <h2 className="text-5xl font-extrabold text-black mb-8">Log In</h2>
            {/* form 영역 */}
            <section className="flex flex-col gap-5">
                <div>
                    <div className="block">
                        <Label htmlFor="email1" value="ID"/>
                    </div>
                    <input type="email" id="email"
                           className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300"
                           onChange={(e) => setEmail(e.target.value)}
                           required
                    />
                </div>
                <div>
                    <div className="block">
                        <Label htmlFor="password1" value="PASSWORD"/>
                    </div>
                    <input type="password" id="password"
                           className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300"
                           onChange={(e) => setPassword(e.target.value)}
                           required
                    />
                </div>
                <Button className="bg-button-text mt-5 shadow-md">로그인</Button>
            </section>
            <p className="mt-2 text-sm text-button-text/70 hover:cursor-pointer hover:text-button-text justify-self-center flex items-center gap-1"
               onClick={setState}
            >
                회원가입 하러가기
                <IoIosArrowRoundForward/>
            </p>
        </>
    );
}

export default Login;