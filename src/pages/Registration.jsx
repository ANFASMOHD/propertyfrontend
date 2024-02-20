import React, { useState } from 'react'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import { registerApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function Registration() {

  /* radiobutton */
  const [type,setType]=useState();

  console.log(type);
/* checkbox */
  const [wifi, setwifi]=useState(true)
  const [water, setwater]=useState(true)
  const [road, setroad]=useState(true)

  const handleChange=(data)=>{
    if(data=="wifi")
    {
      if(wifi==true){
        console.log(data,"our value");
      }
      setwifi(!wifi)
    }
    if(data=="water")
    {
      if(water==true){
        console.log(data,"our value");
      }
      setwater(!water)
    }
    if(data=="road")
    {
      if(road==true){
        console.log(data,"our value");
      }
      setroad(!road)
    }

  }
  
/* dropdown */
const[select,setselet]=useState();

console.log(select);

/* year */
const[year,setyear]=useState("")

const handleInputChange = (e)=>{
  setyear(e.target.value)
}
/* multipleDropDown */
const [value, setvalue] = useState('')

const  handleOnchange  =  val  => {
  setvalue(val)
}

const  options  = [
  { label:  'Residential', value:  'Residential'  },
  { label:  'Commercial', value:  'Commercial'  },
  { label:  'playground', value:  'playground'  },
  { label:  'prayer Room', value:  'prayer Room'  },
  { label:  'Pool', value:  'Pool'  }
]
console.log(value);


/* multiple images */

const [image,setImage]=useState([])

const handleImageUpload =(e)=>{
  const files=Array.from(e.target.files);
  const imageUrls =files.map((files)=>URL.createObjectURL(files))

  setImage([...image,...imageUrls])
  console.log(setImage);
}

const  [userData , setUserData]=useState({
    propertyname:"",
    propertylocation:"",
    propertynumber:"", 
    propertyyear:"",
    facilities:""


 
  
})
console.log(userData);

// navigatwe
const navigate = useNavigate()

    const handleRegister = async(e)=>{
  e.preventDefault()
  const  {propertyname,
  propertylocation,
  propertynumber,
  propertyyear,
 
 }=userData  

 if(!propertyname || !propertylocation|| !propertynumber||!propertyyear ){ 

         toast.info('please fill the form completely') 
}
    else{
      const result = await registerApi(userData)
     /*  console.log(result.data); */
     if(result.status ===200){
      toast.success(`${result.data.propertyname} is SuccessFully registered`)
      setUserData({
        propertyname:"",
        propertylocation:"",
        propertynumber:"", 
        propertyyear:"",
        propertytype:"",
      })
      //move to Admin Page
      navigate("/admin") 
     }
     else{
      toast.error(result.response.data)
     }
    } 
  

  }

  
  return (
    <div className='d-flex justify-content-center align-items-center p-5'>
        <div className='w-35  container'>
    
            <div className='card  p-5 rounded shadow' style={{backgroundColor:'bisque'}}>
             

            <h1 className='text-center text-align mb-5'>Property Registration</h1> 
           
           
            <div className='col-lg-6'>  
      
            
       
               <div className='d-flex mb-3 me-2'>

                    <label htmlFor="text">Property Name:</label>
                    <input type="text" class="form-control" placeholder='Enter the name' value={userData.propertyname} onChange={(e)=>setUserData({...userData,propertyname:e.target.value})}/>
               </div>
               <div className='d-flex mb-3 me-2'>
                    <label htmlFor="text">Property Location:</label>
                    <input type="text" class="form-control" placeholder='Enter the location' value={userData.propertylocation} onChange={(e)=>setUserData({...userData,propertylocation:e.target.value})}/>
               </div>
               <div className='d-flex mb-3 me-2'>
                    <label htmlFor="text">Property Number:</label>
                    <input type="number" class="form-control" placeholder='Enter the number' value={userData.propertynumber} onChange={(e)=>setUserData({...userData,propertynumber:e.target.value})}/>
               </div>
          
              
               
               <div className='d-flex mb-3 me-3'>
                 <label htmlFor="text" >Property type:</label>
                 <h6 className='ms-3'>{type}</h6>
                            <input className='ms-3' type="radio" name='Property Type' value="Rent" onChange={e=>setType(e.target.value)}/>Rent
                            <input  type="radio" name='Property Type' value="Leese" onChange={e=>setType(e.target.value)}/>Lease
                         </div>
    
                         <div className='d-flex mb-3 me-3'>
                 <label htmlFor="text" >Facilities:</label>
                 </div>
                    <div className='mb-3'>
                       <input type="checkbox" value={wifi} onChange={()=>handleChange("wifi")}/>Wifi<br></br>
                       <input type="checkbox" value={water} onChange={()=>handleChange("water")} />Water<br></br>
                       <input type="checkbox" value={road}  onChange={()=>handleChange("road")} />Main Road<br></br>
                    </div>
                    
    
                   <div className='d-flex me-3 mb-3 ' >
                 <label htmlFor="text" >Property Type:</label>
                          <h6 className='ms-3'>{select}</h6>
                         
                   <select className='ms-3'  value={select} onChange={e=>setselet(e.target.value)} >
                    <option></option>
                    <option>Commercial</option>
                    <option>Residential</option>
                   </select>
                   </div>
    
                   <div className='d-flex mb-3 me-3 '>
                    <label htmlFor="year">Property year:</label>
                    <input className='ms-3 rounded' type="number"  style={{backgroundColor:'white', color:'black'}} value={userData.propertyyear} onChange={(e)=>setUserData({...userData,propertyyear:e.target.value})}/>
               </div>
    
               <div  className="preview-values mb-3">
               <label className='me-3' htmlFor="year">Property Includes:</label> 
          </div>
    
        <div className='d-flex justify-content-center pt-20px mb-3'>
            <MultiSelect
              onChange={handleOnchange}
              options={options}
            />
        </div>
    
        <div>
        <label className='me-3 ' htmlFor="photo">Property Photos:</label>
        <input type="file" className='rounded'  accept='image/*'multiple onChange={handleImageUpload}/>
        <div>
          {image.map((imageUrls,index)=>(
            <img key={index} src={imageUrls} alt={`Image${index}`} style={{maxWidth:'200px', maxHeight:'200px', margin:'5px'}} />
          ))}
        </div>
        </div>
    
                    <div className='col-lg-6 p-3'>
       
                        <div className='d-flex align-items-center flex-column'>
                              
                    <div className=' d-flex align-items-center'>
          <button onClick={handleRegister} className='btn btn-success text-center'>Submit</button>
                </div>
         
                 </div>
         
       
          </div>

                 </div> 

                </div>
      </div>
      <ToastContainer autoClose={2000} theme='colored' position='top-center' />
                </div>
      
       
   
  )
}


export default Registration

