import axios from "../../Utiliss/axios";
import {loadperson} from "../Reducers/PersonSlice";
export {removeperson} from "../Reducers/PersonSlice"

export const asyncloadperson = (id) => async (dispatch, getState) =>{
    try{
        const detail= await axios.get(`/person/${id}`);
        const externalid= await axios.get(`/person/${id}/external_ids`);
        const combinedcredits= await axios.get(`/person/${id}/combined_credits`);
        const moviecredits= await axios.get(`/person/${id}/movie_credits`);
        const tvcredits= await axios.get(`/person/${id}/tv_credits`);
      
        let theultimatedetails = {
            detail: detail.data, 
            externalid: externalid.data,
            combinedcredits: combinedcredits.data,
            tvcredits: tvcredits.data,
            moviecredits: moviecredits.data,

        };
        console.log(theultimatedetails);
        dispatch(loadperson(theultimatedetails));
    }
    catch(error){
        console.log("Error: ", error);
    }
};