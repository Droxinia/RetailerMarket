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
  