import React, { useState, useEffect } from "react";
import eggz from "../common/eggs.jpg";

export const ImageForm = () => {
    const endpoint_calculation = "http://localhost:8000/upload-images";
    const [fileUpload, setFirstImage] = useState(null);
    const [fileUpload2, setSecondImage] = useState(null);
    const [severity, setSeverity] = useState(null);
    const [eggNo, setEggNo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (setter) => (event) => {
        setter(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!fileUpload || !fileUpload2) {
          console.log("NO IMG1 OR IMG2!!!");
          setEggNo("NEED BOTH IMG1 & IMG2!!!");
          return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file_upload', fileUpload);
        formData.append('file_upload2', fileUpload2);

        const response = await fetch(endpoint_calculation, {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();
        if (response.ok) {
            const averageNum = responseData.Average;
            setEggNo(averageNum);
            setSeverity(getSeverityLevel(averageNum));
        } else {
            console.error("Error in image submission");
        }

        setLoading(false);
    };

    const getSeverityLevel = (averageNum) => {
        if (averageNum >= 750) return "Severe";
        if (averageNum >= 400) return "Moderate";
        if (averageNum >= 250) return "Mild";
        return "Low Risk";
    };

    return (
        <div className="w-1/4 mx-auto bg-white p-6 border border-gray-200 mt-10 rounded-lg shadow-sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <FileInput label="First Image:" onChange={handleImageChange(setFirstImage)} />
                <FileInput label="Second Image:" onChange={handleImageChange(setSecondImage)} />
                <SubmitButton />
            </form>
            <ResultsDisplay loading={loading} eggNo={eggNo} severity={severity} />
        </div>
    );
};

const Testimonials = () => {
    const [visible, setVisible] = useState(true);

  return (
    <div>
        {visible ?
        (<div className="bg-gray-100 py-8 text-2xl font-bold mt-20 ring-black ring-4 rounded-xl">
            <div className="max-w-6xl mx-auto px-4">
            <a className="absolute text-3xl text-red-400 rounded-full font-bold hover:cursor-pointer" href={null} onClick={() => {setVisible(false)}}>X</a>
                <h2 className="text-2xl font text-center">What Our Customers Say</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 shadow rounded-lg">
                        <p className="text-gray-600">"Amazing product! Really helped me out, will definitely use again!"</p>
                        <div className="mt-4 text-sm text-gray-700">
                            — Jane Doe, <span className="text-gray-500">CEO at Example</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <p className="text-gray-600">"The customer service was top-notch, and the delivery was on time. Highly recommend."</p>
                        <div className="mt-4 text-sm text-gray-700">
                            — John Smith, <span className="text-gray-500">Freelancer</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <p className="text-gray-600">"I’ve used this service for a year now and my experience has been nothing but excellent."</p>
                        <div className="mt-4 text-sm text-gray-700">
                            — Sarah Wilson, <span className="text-gray-500">Blogger</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>) : (null)}
    </div>
  )
}

const Footer = () => {
  return (
      <footer className="absolute bottom-0 w-full min-w-screen bg-gray-800 text-white mt-12">
          <div className="mx-auto px-4 py-6">
              <div className="text-center text-sm">
                  © {new Date().getFullYear()} Alex Yung, Tanishk Govil, Sharon Biju, Shaunak Sinha, Ryan Nguyen. All rights reserved.
              </div>
          </div>
      </footer>
  );
};


const FileInput = ({ label, onChange }) => (
    <div>
        <label className="block text-lg font-bold text-gray-900">{label}</label>
        <input
            type="file"
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500"
            onChange={onChange}
            accept="image/*"
        />
    </div>
);

const SubmitButton = ({img1, img2}) => (
  <button
      type="submit"
      className="w-full py-3 mt-3 bg-indigo-600 text-white font-bold text-3xl hover:bg-indigo-700 rounded-md shadow"
  >
      Analyze
  </button>
);

const ResultsDisplay = ({ loading, eggNo, severity }) => (
    <div className="mt-6 text-center text-3xl">
        <h1 className="text font-bold text-gray-900">McMaster Score: {loading ? "Analyzing..." : <b className="text-red-400">{eggNo}</b>}</h1>
        <h2 className="text font-bold text-gray-900">Severity: {loading ? "Please wait" : severity}</h2>
    </div>
);

const VirusAlert = ({setShowVirus}) => {

  const [fileCount, setFileCount] = useState(1);
  const [done, setDone] = useState("");

  useEffect(() => {
    if (fileCount < 2000) {
        const increment = 28;
        const timer = setTimeout(() => setFileCount(fileCount + increment), 20);
        return () => clearTimeout(timer);
    }
    else {
      if (!done) {
        setDone("華語");
        return;
      }
      const timer = setTimeout(() => setDone(done + ["#","2","%","!!!",")(#","華語","@","l","$$$","0","1","zr","a","p","a","99"][Math.floor(Math.random()*16)]), 20);
      return () => clearTimeout(timer);
    }
}, [fileCount, done]);

  return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50 text-wrap">
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg p-40 text-4xl text-wrap">
              <h2 className="text-8xl font-bold">WARNING: VIRUS DETECTED!</h2>
              <p>Accessing bank credentials... downloading files {fileCount}/2017...</p>
              <p className="text-wrap whitespace-pre-line mt-5">{done}</p>
              {/* <button onClick={() => {setShowVirus(false); setFileCount(1);}} className="mt-4 bg-white text-black px-4 py-2 rounded shadow">
                  Close
              </button> */}
          </div>
      </div>
  );
};

const Home = () => {
  
  const [showVirus, setShowVirus] = useState(false);

  useEffect(() => {
      const handleKeyPress = (event) => {
          if (event.key === 'q') {
              setShowVirus(!showVirus);
          }
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {
          window.removeEventListener('keydown', handleKeyPress);
      };
  }, [showVirus]);

  useEffect(() => {
    document.title = "Eggs By The Dozen";
  }, []);

  return(
    <div className="overflow-hidden">
        <header className="bg-gray-900 text-white py-4">
            <div className="container mx-auto px-4 flex items-center justify-center">
                <img src={eggz} className="h-12 w-12 rounded-full" alt="logo" />
                <h1 className="text-2xl font-bold ml-3">Eggs By The Dozen</h1>
            </div>
        </header>
        <main className="flex flex-col items-center mt-8">
          <p className="font-bold text-4xl">Two images to calculate average <a href="https://web.uri.edu/wp-content/uploads/sites/241/McMaster-Test_Final3.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline hover:cursor:pointer">McMaster Score &#9432;</a></p>
          <ImageForm />
          <Testimonials />
        </main>
        {showVirus && <VirusAlert setShowVirus={setShowVirus} />}
        <Footer />
    </div>
  );
};

export default Home;