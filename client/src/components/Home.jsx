import { useState } from "react";
import { FaFileWord } from "react-icons/fa";
import axios from "axios";


const Home = () => {

  const [file, setFile] = useState(null)
  const [convert, setConvert] = useState("")
const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!file){
      setConvert("Please select a file");
      return ;
    }
    
    const formData =  new FormData();
    formData.append("file", file)
    try {
      const response = await axios.post('http://localhost:4001/convertfile', formData, {
        responseType : "blob",
      });
      console.log(response.data);

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      )
      console.log(url)

      const link = document.createElement("a");
      console.log(link);

      link.href = url;
      console.log(link);


      link.setAttribute("download", file.name.replace(/\.[^/.]+$/,"")+".pdf");
      console.log(link);


      document.body.appendChild(link);
      link.click()
      link.parentNode.removeChild(link)
      setFile(null)
      setDownloadError("")
      setConvert("file converted successfully")

    } catch (error) {
      console.log(error)
      if(error.response && error.response.status == 400){
          setDownloadError("Error occured : ",error.respnse.data.message);
      }
      else {
           setConvert("");
      } 
    }
  }

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40"
    >
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-3 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
            <h1 className="text-3xl font-extrabold text-center mb-4">Convert Word To Pdf Online</h1>
            <p className="text-sm text-center mb-5">Easily convert Word documents to PDF format online, without having to install any software.</p>
      
        <div className="flex flex-col items-center space-y-4">
            <input 
            type="file" 
            accept=".doc, .docx" className="hidden"
            id="fileInput"
            onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg 
            shadow-lg cursor-pointer border-blue-300 hover:bg-blue-500 duration-300 hover:text-white font-bold">
            <FaFileWord className="text-4xl pr-3 " />
<span className="text-2xl mr-2">{file ? file.name : "Choose File"}</span></label>
            <button 
            className="px-5 py-2 rounded-lg mt-3 bg-blue-500 font-semibold hover:text-white hover:bg-blue-600 duration-300 
            disabled:bg-gray-400 disabled:pointer-events-none" disabled = {!file}
            onClick={handleSubmit}
            >Convert File</button>

            {convert && (<div className="text-green-500 text-center">{convert}</div>)}
            {downloadError && (<div className="text-red-500 text-center">{downloadError}</div>)}
              </div>
        </div>
      </div>
    </div>
  )
}

export default Home
