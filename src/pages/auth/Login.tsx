import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundForward } from 'react-icons/io';
import React from 'react';

function Login(): React.JSX.Element {
  return (
    <>
      <h2 className="text-5xl font-extrabold text-black mb-8">Log In</h2>
      {/* form 영역 */}
      <section className="flex flex-col gap-5">
        <div>
          <div className="block">
            <Label htmlFor="email1" value="ID" />
          </div>
          <TextInput id="email" type="email" required
                     className="focus:outline-none"
          />
        </div>
        <div>
          <div className="block">
            <Label htmlFor="password1" value="PASSWORD" />
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <Button className="bg-button-text mt-5 shadow-md">로그인</Button>
      </section>
      <Link to="/register">
        <p className="mt-2 text-sm text-button-text/70 hover:cursor-pointer hover:text-button-text justify-self-center flex items-center gap-1">
          회원가입 하러가기
          <IoIosArrowRoundForward />
        </p>
      </Link>
    </>
  );
}

export default Login;