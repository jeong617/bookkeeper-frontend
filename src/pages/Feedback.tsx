import {FaHeart, FaPaperPlane} from 'react-icons/fa6';
import {Header} from '../components/header';
import {Textarea} from 'flowbite-react';
import React from 'react';

function Feedback(): React.JSX.Element {
  return (
    <>
      <Header/>
      <section id='feedback-input-area'
               className="flex flex-col justify-center items-center w-full h-screen"
      >
        <div className='flex items-center'>
          <h2 className='text-xl'>서비스에 대한 의견을 자유롭게 남겨주세요</h2>
          <FaHeart/>
        </div>
        <div className='w-full px-1'>
          <Textarea name='feedback'
                    placeholder='의견 또는 문의를 남겨주세요.' required rows={4}
                    className='focus:border-transparent focus:ring-0 focus:outline-1 focus:outline-[#DBB185]/80 mt-3'
          />
        </div>
        <button className='flex items-center gap-1 rounded-normal-radius mt-3 px-5 bg-button justify-self-end'>
          <p className='text-white font-bold'>전송하기</p>
          <FaPaperPlane
            className='fill-white h-10 rounded-normal-radius hover:bg-button-text hover:cursor-pointer'/>
        </button>
      </section>
    </>
  );
}

export default Feedback;