import React, { useState } from "react";
import eggz from "../eggs.jpg"

export const ImageForm = () => {

    const endpoint_calculation = "http://localhost:8000/upload-images"

    const [file_upload, setFirstImage] = useState(null);
    const [file_upload2, setSecondImage] = useState(null);
    const [severity, setSeverity] = useState(null);
  
    const [eggNo, setEggNo] = useState(null);
    const [loading, setLoading] = useState(null);
  
    const handleFirstImageChange = (event) => {
      setFirstImage(event.target.files[0]);
    };
  
    const handleSecondImageChange = (event) => {
      setSecondImage(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true)
  
      const formData = new FormData();
      formData.append('file_upload', file_upload);
      formData.append('file_upload2', file_upload2);
  
      //post to server maybe????
      const response = await fetch(endpoint_calculation, {
        method: 'POST',
        body: formData,
      })
      
      if(response.ok){
        console.log("Success")
        console.log(response)
        const response_data = await response.json()
        const average_num = response_data.Average
        setEggNo(average_num);
        if (average_num >= 250 && average_num < 400){
          setSeverity("Mild infection");
        } else if (average_num >= 400 && average_num < 750){
          setSeverity("Moderate infection");
        } else if (average_num >= 750){
          setSeverity("Severe infection");
        } else {
          setSeverity("Low Risk of infection");
        }
        
      } else {
        console.error("No video selected")
      }

      setLoading(false)
    };
  
    return (
      <div>
        <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
          <p>Upload the first image to be processed:</p>
          <input
            type="file"
            alt="img-upload"
            className="hover:text-blue-200 hover:cursor-pointer"
            onChange={handleFirstImageChange}
            accept="image/*"
          />
  
          <p>Upload the second image to be processed:</p>
          <input
            type="file"
            alt="img-upload"
            className="hover:text-blue-200 hover:cursor-pointer"
            onChange={handleSecondImageChange}
            accept="image/*"
          />
  
          <input
            type="submit"
            value="Submit Images!"
            className="bg-red-200/10 rounded-lg hover:text-blue-300 hover:cursor-pointer"
          />
        </form>
        <h1>McMaster Score: {loading ? "Loading...": (eggNo ? <b className="font-bold text-5xl text-red-400">{eggNo}</b> :null)}</h1>
        <h1>Severity: {loading ? "Loading...": (severity ? <b className="font-bold text-5xl text-red-400">{severity}</b> :null)}</h1>
      </div>
    );
  };

const Home = () => {
    return(
        <div>
            <header className="App-header">
                <div className="">
                    <img src={eggz} className="App-logo rounded-2xl" alt="logo"/>
                </div>

                <h1 className="text-5xl font-bold text-blue-200 mb-10">Eggs By The Dozen</h1>
                <ImageForm/>
            </header>
        </div>
    )
}

export default Home;