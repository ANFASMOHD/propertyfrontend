import axios from "axios"


 export const commonAPI = async(httpRequest,url,reqbody,reqHeader)=>{


    const reqconfig = {
        method:httpRequest,
        url,
        data:reqbody,
        headers:reqHeader?reqHeader:{'Content-Type':"application/json"}
    }
   

     return await axios(reqconfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })

}