import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function ImageQuiz() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

     
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit=async(e)=>{
      e.preventDefault();
      const token=localStorage.getItem('token');

      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);

      try {
        // const response=await axios.post('http://localhost:3000/user/upload-image',formData,{
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });
        // setImageUrl(response.data.url);
        // console.log(response.data);
        
      } catch (error) {
        console.error('error uploading file:',error);
      }

    };
  return (
    <div>
    <form onSubmit={handleSubmit}>
    <div>
     <label htmlFor="image">Upload Image:</label>
    <input
     type="file"
    id="image"
    onChange={handleFileChange}
    required
       />
    </div>
   <button type="submit">Submit</button>

    </form>
    <h1> The url is:
        {imageUrl}
    </h1>
    </div>
  )
}

export default ImageQuiz;