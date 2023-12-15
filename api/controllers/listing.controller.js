import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createListing = async(req,res,next) => {
    try {
        const listing= await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async(req,res,next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404, "listing not found"))
    }

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(404, "You can only delete your own lisitng"))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Lisitng has been deleted');
    } catch (error) {
        next(error);
    }
}

export const updateListing= async (req, res, next) => {
    const listing= await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(404, 'listing not found'));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, 'you can only update your own lisitings!'));
    }
    try {
        const updatedListing= await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true }
        );
      res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}
export const getListing =async (req, res, next) => {
    try {
       const listing =await Listing.findById(req.params.id);
       if(!listing) {
        return next(errorHandler(401, 'listing not found!'));
       } 
       res.status(200).json(listing);
    } catch (error) {
      next(error);  
    }
}

// export const getListings = async (req, res, next) => {
//     try {
//       const limit = parseInt(req.query.limit) || 9;
//       const startIndex = parseInt(req.query.startIndex) || 0; 
//       let offer = req.query.offer;

//       if (type === 'Services') {
//         type = {$in: 'Services'}
//       }
//       if (type === 'Product') {
//         type = {$in: 'Product'}
//       }

//       const  searchTerm = req.query.searchTerm || '';

//       const sort = req.query.sort || 'createdAt';

//       const order = req.query.order || 'desc';

//       const listings = await Listing.find ({
//         name: {$regex: searchTerm, $optiones: 'i'},
//         type,
//         address,
//       }).sort(
//         {[sort] : order}
//       ).limit(limit).skip(startIndex);
//       return res.status(200).json(listings);
//     } catch (error) {
//         next(error);
//     }
// }



// export const getListings = async (req, res, next) => {
//     try {
//       const limit = parseInt(req.query.limit) || 9;
//       const startIndex = parseInt(req.query.startIndex) || 0;
  
//       let type = req.query.type;
//       let offer = req.query.offer;
//       const searchTerm = req.query.searchTerm || '';
  
//       // Convert offer to boolean
//       offer = offer === 'true';
  
//       // Filter by type if provided
//       const typeFilter = type ? { type: type } : {};
  
//       // Search by name using regex
//       const nameFilter = { name: { $regex: searchTerm, $options: 'i' } };
  
//       // Combine filters
//       const filters = { ...typeFilter, ...nameFilter, offer: offer };
  
//       const sort = req.query.sort || 'createdAt';
//       const order = req.query.order || 'desc';
  
//       const listings = await Listing.find(filters)
//         .sort({ [sort]: order })
//         .limit(limit)
//         .skip(startIndex);
  
//       return res.status(200).json(listings);
//     } catch (error) {
//       next(error);
//     }
//   };
  

export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
  
      const searchTerm = req.query.searchTerm || '';
      const type = req.query.type || 'all';
  
      let typeFilter;
      if (type !== 'all') {
        typeFilter = { type: type };
      }
  
      const nameFilter = searchTerm !== '' ? { name: { $regex: searchTerm, $options: 'i' } } : {};
  
      const filters = { ...nameFilter, ...typeFilter };
  
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find(filters)
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };
  