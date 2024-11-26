import React from 'react';

// css
import { Button, Label, TextInput } from 'flowbite-react';


function Login(): React.JSX.Element {
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

      {/* 오른쪽 영역 */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-96">
          <h2 className="text-5xl font-extrabold text-black mb-8">Log In</h2>
          {/* form 영역 */}
          <section className='flex flex-col gap-5'>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="ID" />
              </div>
              <TextInput id="email" type="email" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="PASSWORD" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <Button className="bg-button-text mt-5">로그인</Button>
          </section>
          <p className='text-button-text font-light underline underline-offset-4 decoration-button-text/30 hover:cursor-pointer'>회원가입 하러가기</p>
        </div>
      </div>
    </div>
  );
}

export default Login;