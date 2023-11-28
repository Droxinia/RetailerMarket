import React from 'react'

export default function CreateListing() {
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
    <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
        <select
        className='border p-3 rounded-lg'
        id='type'
        required
>
        <option value=''>Select Type</option>
        <option value='Services'>Services</option>
        <option value='Product'>Product</option>
        </select>

            <input type='text' placeholder='Name' className='border p-3 rounded-lg ' id='name' maxLength='62' minLength='10' required />
            <textarea type='text' placeholder='Description' className='border p-3 rounded-lg ' id='description' maxLength='62' minLength='10' required />
            <input type='text' placeholder='Address' className='border p-3 rounded-lg ' id='address'  required />
        <div className='flex items-center gap-2'>
            <input type='number' id='Price' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
            <div><p>price</p></div>
        </div>
        </div>

        <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover(max 6)</span>
            </p>
            <div className='flex gap-4 '>
                <input className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple />
                <button className='p-3 text-green-700 border-green-500 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
            </div>
         <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create the AD</button>
       
        </div>
    </form>
   </main>
  )
}
