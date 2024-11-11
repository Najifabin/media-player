import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

// save videoapi - called by add component , http req : post
export const saveVideoAPI = async (videoDetails)=>{
   return await commonAPI("POST",`${SERVERURL}/uploadVideos`,videoDetails)
}

// getAllVideoAPI get http rest called view component displayed in browser inside its useeffect hook
export const getAllVideosAPI = async()=>{
    return await commonAPI("GET",`${SERVERURL}/uploadVideos`,"")
}
// save history api : post http rqst to http://localhost:3000/history called by videocard component when we play video
export const saveHistoryAPI = async(historyDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/history`,historyDetails)
}

// getAllHistoryAPI
export const getAllHistoryAPI = async()=>{
    return await commonAPI("GET",`${SERVERURL}/history`,"")
}

// delete history
export const deleteHistoryAPI = async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/history/${id}`,{})
}

// removeVideoAPI
export const removeVideoAPI = async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/uploadVideos/${id}`,{})
}

// saveCategoryAPI -post http reqst 
// categoryDetails={categoryName,allVideos}
export const saveCategoryAPI = async(categoryDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/categories`,categoryDetails)
}
// getAllCategoryAPI -get http reqst
export const getAllCategoryAPI = async()=>{
    return await commonAPI("GET",`${SERVERURL}/categories`,{})
}
// deleteCategoryAPI
export const deleteCategoryAPI = async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/categories/${id}`,{})
}
// updateCategoryAPI - put http reqst called by category component when video drop over at the category
export const updateCategoryAPI = async(categoryDetails)=>{
    return await commonAPI("PUT",`${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
}