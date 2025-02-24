import React, {useState} from 'react';

// project
import Login from './Login.tsx';
import Register from './Register.tsx';
import {AuthType} from "../../store/types.tsx";

function AuthSkeleton(): React.JSX.Element {
    const [toggle, setToggle] = useState<AuthType>(AuthType.Login);

    // handler
    const handleToggle = () => {
        setToggle((prev) => (
            prev === AuthType.Login ? AuthType.Register : AuthType.Login
        ));
    }
    return (
        <div className="flex h-screen">
            {/* Desktop */}
            <div className='hidden md:flex w-full'>
                {/* 로고 */}
                <div
                    className={`absolute z-10 flex h-full w-1/2 bg-[#FFFAEB] items-center justify-center flex-col transform transition-transform duration-700 ${
                        toggle === AuthType.Login ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <img
                        src="/logo.png" // 로고 이미지 경로
                        alt="Logo"
                        className="scale-75"
                    />
                    <img
                        src="/logo-fox.png" // 마스코트 이미지 경로
                        alt="Mascot"
                        className="w-96"
                    />
                </div>

                {/* 회원가입 영역(왼쪽) */}
                <div className="flex flex-1 items-center justify-center bg-white w-1/2">
                    <div className="w-96">
                        <Register setState={handleToggle}/>
                    </div>
                </div>

                {/* 로그인 영역(오른쪽) */}
                <div className="flex flex-1 items-center justify-center bg-white w-1/2">
                    <div className="w-96">
                        <Login setState={handleToggle}/>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className='flex flex-col md:hidden w-full h-full'>
                <div className='flex flex-col flex-1 w-full px-10 justify-center bg-white gap-20'>
                    <div className='flex justify-center items-center'>
                        <img
                            src="/logo.png"
                            alt="Logo"
                        />
                    </div>
                    {toggle === AuthType.Login ? (
                        <Login setState={handleToggle}/>
                    ) : (
                        <Register setState={handleToggle}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthSkeleton;