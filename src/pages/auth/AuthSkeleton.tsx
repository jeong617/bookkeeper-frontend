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
            {/* 로고 */}
            <div
                className={`absolute z-10 flex h-full w-1/2 bg-main items-center justify-center flex-col transform transition-transform duration-700 ${
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
            <div className="flex flex-1 items-center justify-center bg-white">
                <div className="w-96">
                    <Register setState={handleToggle}/>
                </div>
            </div>

            {/* 로그인 영역(오른쪽) */}
            <div className="flex flex-1 items-center justify-center bg-white">
                <div className="w-96">
                    <Login setState={handleToggle}/>
                </div>
            </div>
        </div>
    );
}

export default AuthSkeleton;