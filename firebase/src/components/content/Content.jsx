import React, { useState } from 'react'


const Content = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    }
  
    const closeModal = () =>{
      setIsModalOpen(false);
    
  
  };


  return (
    <>
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Vite React Modal</h1>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Open Modal
      </button>
      {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg shadow-lg relative">
           <button
             onClick={closeModal}
             className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
           >
             &times;
           </button>
           <h2 className="text-xl font-bold mb-2">This is a modal!</h2>
           <p className="mb-4">Here you can place any content you like.</p>
           <button
             onClick={closeModal}
             className="px-4 py-2 bg-red-500 text-white rounded-lg"
           >
             Close Modal
           </button>
         </div>
       </div>        
      )}
    </div>
    
    
    </>
  )
}

export default Content