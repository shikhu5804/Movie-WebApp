import axios from "../../Utiliss/axios";
import {loadmovie} from "../Reducers/MovieSlice";
export {removemovie} from "../Reducers/MovieSlice"

export const asyncloadmovie = (id) => async (dispatch, getState) =>{
    try{
        const detail= await axios.get(`/movie/${id}`);
        const externalid= await axios.get(`/movie/${id}/external_ids`);
        const recommendations= await axios.get(`/movie/${id}/recommendations`);
        const translations= await axios.get(`/movie/${id}/translations`);
        const similar= await axios.get(`/movie/${id}/similar`);
        const videos= await axios.get(`/movie/${id}/videos`);
        const watchproviders= await axios.get(`/movie/${id}/watch/providers`);
        let theultimatedetails = {
            detail: detail.data, 
            externalid: externalid.data,
            translations: translations.data.translations.map(t=>t.english_name),
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m=>m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
        };
        console.log(theultimatedetails);
        dispatch(loadmovie(theultimatedetails));
    }
    catch(error){
        console.log("Error: ", error);
    }
};