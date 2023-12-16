import React from 'react';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Ad Market</h1>
      <p className='mb-8 text-slate-700'>
        Ad Market is a dynamic advertising platform dedicated to connecting businesses with their target audience through innovative and effective marketing solutions. Our platform empowers businesses of all sizes to create impactful ad campaigns, reach a broader audience, and achieve their marketing objectives.
      </p>
      <p className='mb-8 text-slate-700'>
        At Ad Market, we are committed to redefining the advertising landscape by providing cutting-edge tools and personalized strategies. Our mission is to help businesses thrive in the digital realm by offering insights, technology, and creative solutions that drive results.
      </p>
      <p className='mb-8 text-slate-700'>
        With a team of passionate professionals, Ad Market leverages industry expertise to navigate the complexities of the advertising world. Whether you are a small startup or an established enterprise, we are dedicated to being your strategic partner, guiding you towards success in the competitive market.
      </p>

      {/* Developer Info Section */}
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4 text-slate-800'>Developer Info</h2>
        <div className='mb-4 text-slate-700'>
          <p>Name: Dagmawi Shimelis</p>
          <p className='text-blue-700'>Email: dagmawishimelis2@gmail.com</p>
          <p className='text-blue-700'>GitHub: <a href='https://github.com/Droxinia' target='_blank' rel='noopener noreferrer'>https://github.com/Droxinia</a></p>
        </div>
      </div>
    </div>
  );
}

