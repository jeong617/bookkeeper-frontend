import { Button, Label } from 'flowbite-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// project
import { post } from '../../api/api.ts';

// css
import { IoIosArrowRoundForward } from 'react-icons/io';

interface LoginProps {
  setState: () => void;
}

function Login({ setState }: LoginProps): React.JSX.Element {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();

  // handler
  const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // api
  const login = async () => {
    const url = 'auth/login';
    try {
      await post({ url: url, data: loginData });
    } catch (err) {
      console.error('로그인 요청 실패: ', err);
    }
  };


  return (
    <>
      <h2 className='text-5xl font-extrabold text-black mb-8'>Log In</h2>
      {/* form 영역 */}
      <form className='flex flex-col gap-5'
            onSubmit={handleSubmit(async (data) => {
              await new Promise((r) => setTimeout(r, 1000));
              alert(JSON.stringify(data));
            })}>
        <div>
          <div className='block'>
            <Label htmlFor='email1' value='ID' />
          </div>
          <input type='text'
                 className='block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300'
                 placeholder='abcd@kakao.com'
                 {...register('email', {
                   required: '필수 입력 란입니다.',
                   pattern: {
                     value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                     message: '이메일 형식에 맞지 않습니다.',
                   },
                 })}
          />
          {errors.email && <small className='text-error'>{errors.email.message as string}</small>}
        </div>
        <div>
          <div className='block'>
            <Label htmlFor='password1' value='PASSWORD' />
          </div>
          <input type='password'
                 className='block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300'
                 placeholder='••••••••'
                 {...register('password', {
                   required: '필수 입력 란입니다.',
                 })}
          />
          {errors.password && <small className='text-error'>{errors.password.message as string}</small>}
        </div>
        <Button
          className='bg-button-text mt-5 shadow-md disabled:bg-gray-600'
          type='submit'
          disabled={isSubmitting}
        >
          로그인
        </Button>
      </form>
      <p
        className='mt-2 text-sm text-button-text/70 hover:cursor-pointer hover:text-button-text justify-self-center flex items-center gap-1'
        onClick={setState}
      >
        회원가입 하러가기
        <IoIosArrowRoundForward />
      </p>
    </>
  );
}

export default Login;