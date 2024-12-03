import {Button, Label} from 'flowbite-react';
import React, {useState} from 'react';
// import {post} from "../../api/api.ts";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

// project
import { LoginData } from '../../store/UserData.ts';

// css
import {IoIosArrowRoundForward} from 'react-icons/io';

interface LoginProps {
    setState: () => void;
}

function Login({setState}: LoginProps): React.JSX.Element {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    });

    // handler
    const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // api
    const login = async () => {
        const url = `${import.meta.env.VITE_API_URL_NGROK}auth/login`;
        try {
            const response: AxiosResponse = await axios.post(url, loginData, {withCredentials: true});
            const accessToken = response.headers['authorization'];
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken.split(' ')[1]);
                navigate('/');
            }
        } catch (err) {
            console.error('로그인 요청 실패: ', err);
        }
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
                    <input type="email" name="email"
                           className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300"
                           onChange={loginHandler}
                           value={loginData.email}
                           required
                    />
                </div>
                <div>
                    <div className="block">
                        <Label htmlFor="password1" value="PASSWORD"/>
                    </div>
                    <input type="password" name="password"
                           className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300"
                           onChange={loginHandler}
                           value={loginData.password}
                           required
                    />
                </div>
                <Button
                  className="bg-button-text mt-5 shadow-md"
                  onClick={login}
                >
                    로그인
                </Button>
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