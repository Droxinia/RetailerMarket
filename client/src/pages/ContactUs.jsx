import React from 'react';

export default function ContactUs() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto text-center'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>Contact Us</h1>
      <p className='mb-4 text-slate-700'>
        We would love to hear from you! Feel free to reach out through the following contact options:
      </p>
      <div className='mb-4'>
        <p className='text-slate-800 font-semibold'>Phone Number:</p>
        <p className='text-slate-700'>+1 (555) 123-4567</p>
      </div>
      <div>
        <p className='text-slate-800 font-semibold'>Email:</p>
        <p className='text-slate-700'>info@admarket.com</p>
      </div>
    </div>
  );
}
