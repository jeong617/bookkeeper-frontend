import React from 'react';

// project
import Login from './Login.tsx';
import Register from '../Register.tsx';


function AuthSkeleton(): React.JSX.Element {
  return (
    <div className="flex h-screen">
      {/* 왼쪽 영역 */}
      <div className="flex flex-1 bg-main items-center justify-center flex-col">
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
      {/*<div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-96">
          <Register />
        </div>
      </div>*/}

      {/* 오른쪽 영역 */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-96">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default AuthSkeleton;