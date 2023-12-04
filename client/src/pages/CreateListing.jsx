import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { app } from '../firebase';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function CreateListing() {
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user)
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls:[],
        name:'',
        description:'',
        address:'',
        price:1,
        type:'',


    });
    const [ImageUploadError, setImageUploadError] = useState(false);
    const [uploading,setUpLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading]= useState(false);
    console.log(formData);
    const handleImageSubmit = (e) => {
        if(files.length>0  && files.length + formData.imageUrls.length < 7){
            setUpLoading(true); 
            const promises= [];

            for (let i=0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, imageUrls:formData.imageUrls.concat(urls)});
                setImageUploadError(false);
                

            }).catch((err) => {
                setImageUploadError('image upload failed(2 mb, per image)');
                setUpLoading(false);
            })  .finally(() => {
                setUpLoading(false); 
              });
            

            
        }else{
            setImageUploadError('you can only upload 6 images per listing');
            setUpLoading(false);
        }

    };
    const storeImage = async(file) => {
        return new Promise((resolve, reject) => {
           const storage= getStorage(app); 
           const fileName = new Date().getTime() + file.name;
           const storageRef= ref(storage,fileName);
           const uploadTask =uploadBytesResumable(storageRef, file);
           uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress= 
                (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                console.log(`upload is ${progress}& is done`)

            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);

                });
            }
           )
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        })
    }

  
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       if(formData.imageUrls.length<1) return setError('you must upload atleast one image');
       setLoading(true);
       setError(false);
       const res = await fetch ('/api/listing/create', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
        }),
       }) ;
       const data = await res.json();
       setLoading(false);
       if(data.success ===false) {
        setError(data.message);
       }

       
      //navigate(`/listing/${data._id}`) 
    } catch (error) {
       setError(error.message);
       setLoading(false); 
    }
  }
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
        <select
        className='border p-3 rounded-lg'
        id='type'
        required
        onChange={handleChange}
        value={formData.type}
>
        <option value='' disabled>Select Type</option>
        <option value='Services'>Services</option>
        <option value='Product'>Product</option>
        </select>

            <input type='text' placeholder='Name' className='border p-3 rounded-lg ' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name}/>
            <textarea type='text' placeholder='Description' className='border p-3 rounded-lg ' id='description' maxLength='62' minLength='10' required onChange={handleChange} value={formData.description} />
            <input type='text' placeholder='Address' className='border p-3 rounded-lg ' id='address'  required onChange={handleChange} value={formData.address} />
        <div className='flex items-center gap-2'>
            <input type='number' id='price'  required className='p-3 border border-gray-300 rounded-lg' min='1' max='1000000' onChange={handleChange} value={formData.price} />
            <div><p>price</p></div>
        </div>
        </div>

        <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover(max 6)</span>
            </p>
            <div className='flex gap-4 '>
                <input onChange={(e) => setFiles(e.target.files) } className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple />
                <button type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border-green-500 rounded uppercase hover:shadow-lg disabled:opacity-80' disabled={uploading}>
                    {uploading ? 'uploading...' : 'upload'}
                    </button>
            </div>
        <p className='text-red-700'>{ImageUploadError && ImageUploadError}</p>
        {
            formData.imageUrls.length>0 && formData.imageUrls.map((url, index) => (
                <div key={url} className=' flex justify-between p-3 border items-center'>
                <img src={url} alt='listing images' className='w-20 h-20 object-contain rounded-lg' />
                <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-95'>Delete</button>

                </div>
            ))
        }

         <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Creating ...' : 'create listing'}
            </button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
       
        </div>
        
    </form>
   </main>
  )
}
