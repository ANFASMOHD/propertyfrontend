// register api

import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonApi"

 export const registerApi=async(reqBody,reqHeader)=>{
    return await  commonAPI("POST",`${BASE_URL}/user/register`,reqBody,reqHeader)
}