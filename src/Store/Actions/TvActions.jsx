import axios from "../../Utiliss/axios";
import {loadtv} from "../Reducers/TvSlice";
export {removetv} from "../Reducers/TvSlice"

export const asyncloadtv = (id) => async (dispatch, getState) =>{
    try{
        const detail= await axios.get(`/tv/${id}`);
        const externalid= await axios.get(`/tv/${id}/external_ids`);
        const recommendations= await axios.get(`/tv/${id}/recommendations`);
        const translations= await axios.get(`/tv/${id}/translations`);
        const credits= await axios.get(`/tv/${id}/credits`);
        const similar= await axios.get(`/tv/${id}/similar`);
        const videos= await axios.get(`/tv/${id}/videos`);
        // const episodes= await axios.get(`/tv/${id}/season/`);
        const watchproviders= await axios.get(`/tv/${id}/watch/providers`);
        let theultimatedetails = {
            detail: detail.data, 
            externalid: externalid.data,
            translations: translations.data.translations.map(t=>t.english_name),
            credits: credits.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m=>m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
        };
        console.log(theultimatedetails);
        dispatch(loadtv(theultimatedetails));
    }
    catch(error){
        console.log("Error: ", error);
    }
};