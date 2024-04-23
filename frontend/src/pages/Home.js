import React, { useState } from "react";
import eggz from "../eggs.jpg";

export const ImageForm = () => {
    const endpoint_calculation = "http://localhost:8000/upload-images";
    const [fileUpload, setFirstImage] = useState(null);
    const [fileUpload2, setSecondImage] = useState(null);
    const [severity, setSeverity] = useState(null);
    const [eggNo, setEggNo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFirstImageChange = (event) => {
        setFirstImage(event.target.files[0]);
    };

    const handleSecondImageChange = (event) => {
        setSecondImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('file_upload', fileUpload);
        formData.append('file_upload2', fileUpload2);

        const response = await fetch(endpoint_calculation, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            const averageNum = responseData.Average;
            setEggNo(averageNum);

            if (averageNum >= 250 && averageNum < 400) {
                setSeverity("Mild infection");
            } else if (averageNum >= 400 && averageNum < 750) {
                setSeverity("Moderate infection");
            } else if (averageNum >= 750) {
                setSeverity("Severe infection");
            } else {
                setSeverity("Low risk of infection");
            }
        } else {
            console.error("No images selected");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 mt-10 rounded-lg shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload the first image:</label>
                    <input
                        type="file"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleFirstImageChange}
                        accept="image/*"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload the second image:</label>
                    <input
                        type="file"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleSecondImageChange}
                        accept="image/*"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit Images
                </button>
            </form>
            <div className="mt-6">
                <h1 className="text-lg font-semibold text-gray-900">McMaster Score: {loading ? "Loading..." : eggNo}</h1>
                <h2 className="text-lg font-semibold text-gray-900">Severity: {loading ? "Loading..." : severity}</h2>
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div>
            <header className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-6 flex justify-center">
                    <img src={eggz} className="h-16 w-16 rounded-full" alt="logo"/>
                    <h1 className="text-3xl font-bold ml-4">Eggs By The Dozen</h1>
                </div>
            </header>
            <main className="mt-10">
                <ImageForm />
            </main>
        </div>
    );
}

export default Home;
