import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 borrder-b-2 sm:border-r-2 md:min-h-screen'>
          <form className='flex flex-col gap-4'>
           <div className=' flex items-center gap-2'>
            <label className='whitespace-nowrap'> Search Term:</label>
            < input type='text' id='searchTerm' placeholder='search ...' className='border rounded-lg p-3 w-full'/>
            </div> 
            <div className='flex gap-2 items-center'>
                <label>Type:</label>
                <select id='choose_type' className='border rounded-lg p-3'>
                    <option>Product</option>
                    <option>Services</option>
                </select>
            </div>

            <div className='flex gap-2 items-center'>
                <label>Sort: </label>
                <select id='sort_order' className='border rounded-lg p-3'>
                    <option>highest to lowest</option>
                    <option>Lowest to highest</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                Search
            </button>
          </form>
        </div>
        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
        </div>
    </div>
  )
}
