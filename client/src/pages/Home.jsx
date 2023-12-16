import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div className=''>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
           Browse through many <span className='text-slate-500'>ads</span>
           <br/>
           posted on our platform
        </h1>
        <div className='text-gray-500 text-xs sm:text-sm'>
          find the products and services you want on our site and post your own ad as well
          <br/>
          we look forward to creating a dyncamic ecosystem for an online ad site
        </div>
        <Link to='/search' className='text-xs sm:text-sm text-blue-900 font-bold hover:underline'>
        Browse now from a variety of ads..
        </Link>
      </div>
    </div>
  )
}
