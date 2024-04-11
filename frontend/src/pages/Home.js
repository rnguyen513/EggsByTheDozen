import React, { useState } from "react";
import eggz from "../eggs.jpg"

export const ImageForm = () => {

    const [firstImage, setFirstImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
  
    const [eggNo, setEggNo] = useState(null);
  
    const handleFirstImageChange = (event) => {
      setFirstImage(event.target.files[0]);
    };
  
    const handleSecondImageChange = (event) => {
      setSecondImage(event.target.files[0]);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('firstImage', firstImage);
      formData.append('secondImage', secondImage);
  
      //post to server maybe????
      fetch('/upload-images', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  
      setEggNo(Math.floor(Math.random()*99)+1);
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
        <h1>Result: {eggNo ? (<b className="font-bold text-5xl text-red-400">{eggNo} eggs</b>):(null)}</h1>
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