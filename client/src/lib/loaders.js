import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request,params}) =>{
    //console.log(request)
    const res = await apiRequest("/posts/"+ params.id)
    return res.data;
}