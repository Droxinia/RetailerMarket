import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate =useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm:'',
        type:'all',
        sort:'created_at',
        order: 'desc',
       
       
    }); 

    const [loading, setLoading] = useState(false);
    const [listings, setListings] =useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlparams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlparams.get('searchTerm');
        const typeFromUrl = urlparams.get('type');
        const sortFromUrl= urlparams.get('sort');
        const orderFromUrl = urlparams.get('order');


        if(
            searchTermFromUrl ||
            typeFromUrl ||
            sortFromUrl  ||
            orderFromUrl 
        ){
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }
        

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlparams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if(data.length > 8){
              setShowMore(true);
            }else{
              setShowMore(false)
            }
            setListings(data);
            setLoading(false);
        }

        fetchListings();

    }, [location.search])

   

  

    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'product' || e.target.id === 'services') {
          setSidebardata({ ...sidebardata, type: e.target.id });
        }
      
        if (e.target.id === 'searchTerm') {
          setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }
      
        if (e.target.id === 'sort_order') {
          const sort = e.target.value.split('_')[0] || 'created_at';
          const order = e.target.value.split('_')[1] || 'desc';
      
          setSidebardata({ ...sidebardata, sort, order });
        }
      };
      


      const handleSubmit = (e) => {
        e.preventDefault();
        const urlparams = new URLSearchParams();
        urlparams.set('searchTerm', sidebardata.searchTerm);
        urlparams.set('type', sidebardata.type);
        urlparams.set('sort', sidebardata.sort);
        urlparams.set('order', sidebardata.order);
      
        const searchQuery = urlparams.toString();
        console.log("Search Parameters:", searchQuery); // Add this line for debugging
        navigate(`/search?${searchQuery}`);
      };

      const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
          setShowMore(false);
        }
        setListings([...listings, ...data]);
      };
   

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 borrder-b-2 sm:border-r-2 md:min-h-screen'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
           <div className=' flex items-center gap-2'>
            <label className='whitespace-nowrap'> Search Term:</label>
            < input type='text' 
                id='searchTerm' 
                placeholder='search ...' 
                className='border rounded-lg p-3 w-full'
                value={sidebardata.searchTerm}
                onChange={handleChange}
            />
            </div> 
            <div className='flex gap-2 flex-wrap items-center'>
                <label>Type:</label>
                <div className='flex gap-2'>
                    <input type= 'checkbox' id="all" className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.type === 'all'}
                    />
                    <span>Product & services</span>
                </div>
                <div className='flex gap-2'>
                    <input type= 'checkbox' id="product" className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.type === "product"}
                    />
                    <span>Product</span>
                </div>
                <div className='flex gap-2'>
                    <input type= 'checkbox' id="services" className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.type === "services"}
                    />
                    <span>services</span>
                </div>
            </div>

            <div className='flex gap-2 items-center'>
                <label>Sort: </label>
                <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3'>
                    <option value='regularPrice_desc'>highest to lowest</option>
                    <option value='regularPrice_asc'>Lowest to highest</option>
                    <option value='create_at_desc'>Latest</option>
                    <option value='create_at_asc'>Oldest</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                Search
            </button>
          </form>
        </div>
        <div className='flex-1'>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
        <div className='p-7'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}

          {loading && (
            <p className='text-xl text-slate-700 text-center'>Loading...</p>
          )}
         <div className='flex flex-wrap gap-4'>
           {
            !loading && listings && listings.map((listing) => 
                <ListingItem key={listing._id} listing={listing}/>
            )
          } 
         </div>
          {showMore && (
            <button onClick={
              onShowMoreClick
            }
            className='text-green-700 hover:underline p-7 text-center w-full'
            >show more</button>
          )}
        </div>
        </div>

    </div>
  )
}
