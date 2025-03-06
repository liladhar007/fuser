// "use client";

// import Breadcrumb from "../Breadcrumbs/Breadcrumb";
// import { useRouter } from "next/navigation";

// const CreateKYC = () => {
//   const router = useRouter();
//   const handleBackClick = () => {
//     router.push(`/profile`);
//   };
//   return (
//     <div className="mx-auto max-w-7xl">
//       <Breadcrumb pageName="Create KYC" />
//       <div class="mb-2 text-end">
//         <button
//           type="button"
//           onClick={() => handleBackClick()}
//           class="mb-2 me-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
//         >
//           back
//         </button>

// <form class="mx-auto w-full border p-3 border-gray-300 rounded-lg">          <div class="-mx-3 mb-2 flex flex-wrap">
//             <div class="w-full p-3 md:w-1/2 xl:w-1/2">
//               <label
//                 for="id_p"
//                 class="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Select ID Proof
//               </label>
//               <select
//                 id="id_p"
//                 class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//               >
//                 <option> Aadhar Card</option>
//                 <option>PAN Card</option>
//               </select>
//             </div>
//             <div class="w-full p-3 md:w-1/2 xl:w-1/2">
//               <label
//                 class="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
//                 for="user_avatar"
//               >
//                 Choose File
//               </label>
//               <input
//                 class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
//                 aria-describedby="user_avatar_help"
//                 id="user_avatar"
//                 type="file"
//               />
//             </div>
//           </div>
//           {/* <div class="-mx-3 mb-2 flex flex-wrap">
//             <div class="w-full p-3 md:w-1/2 xl:w-1/2">
//               <label
//                 for="id_p"
//                 class="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Select Address Proof{" "}
//               </label>
//               <select
//                 id="id_p"
//                 class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//               >
//                 <option> Electricity Bill</option>
//                 <option>Gas Bill</option>
//                 <option>Phone Bill</option>
//                 <option>Rent Agreement</option>
//                 <option>Any Other Utility Bill</option>
//               </select>
//             </div>
//             <div class="w-full p-3 md:w-1/2 xl:w-1/2">
//               <label
//                 class="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
//                 for="user_avatar"
//               >
//                 Choose File
//               </label>
//               <input
//                 class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
//                 aria-describedby="user_avatar_help"
//                 id="user_avatar"
//                 type="file"
//               />
//             </div>
//           </div> */}
//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateKYC;








// "use client";

// import { useState } from "react";
// import Breadcrumb from "../Breadcrumbs/Breadcrumb";
// import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import { ArrowLeftIcon } from "@heroicons/react/outline";

// const CreateKYC = () => {
//   const router = useRouter();
//   const [file, setFile] = useState(null);
//   const [idProofType, setIdProofType] = useState("Aadhar Card");

//   // Navigate back to the profile page
//   const handleBackClick = () => {
//     router.push("/profile");
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const freelancerId = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!freelancerId || !token) {
//       toast.error("User session expired. Please log in again.");
//       return;
//     }

//     if (!file) {
//       toast.error("Please upload a file before submitting.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("document", file);
//     formData.append("idProofType", idProofType);

//     try {
//       const response = await fetch(
//         // `https://f-backend-fgtt.onrender.com/resumes/uploadAddressProof/${freelancerId}`,
//     ` https://f-backend-fgtt.onrender.com/resumes/uploadAddressProof/${freelancerId}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`, // Corrected syntax for the token
//           },
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         toast.success("ID proof uploaded successfully!");
//         setTimeout(() => {
//           router.push("/profile"); 
//         }, 3000); 
        
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || "Failed to upload ID proof.");
//       }
//     } catch (error) {
//       console.error("Error uploading ID proof:", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="mx-auto max-w-7xl">
//       <ToastContainer />
//       <Breadcrumb pageName="Create KYC" />
//       <div className="mb-2 text-end justify-end">
//         <div className="flex justify-end mb-2">
//           <button
//             type="button"
//             onClick={handleBackClick}
//             className="flex items-center rounded-full bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800"
//           >
//             <ArrowLeftIcon className="h-5 w-5 me-2" />
//             Back
//           </button>
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           className="mx-auto w-full rounded-lg border border-gray-300 p-3"
//         >
//           <div className="-mx-3 mb-2 flex flex-wrap">
//             <div className="w-full p-3 md:w-1/2 xl:w-1/2">
//               <label
//                 htmlFor="id_p"
//                 className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Select ID Proof
//               </label>
//               <select
//                 id="id_p"
//                 value={idProofType}
//                 onChange={(e) => setIdProofType(e.target.value)}
//                 className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-gray-700 dark:text-white"
//               >
//                 <option value="Aadhar Card">Aadhar Card</option>
//                 <option value="Pass Port">Pass Port</option>
//                 <option value="Votter Id">Votter Id</option>
//               </select>
//             </div>
//             <div className="w-full p-3 md:w-1/2 xl:w-1/2">
//               <label
//                 className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
//                 htmlFor="user_avatar"
//               >
//                 Choose File  (only pdf file allowed)
//               </label>
//               <input
//                 className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
//                 id="user_avatar"
//                 type="file"
//                 accept=".pdf"
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>

//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );      
// };

// export default CreateKYC;

"use client";

import { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const CreateKYC = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [addressProofFile, setAddressProofFile] = useState(null);
  const [idProofType, setIdProofType] = useState("Aadhar Card");
  const [addressProofType, setAddressProofType] = useState("Electricity Bill");

  const handleBackClick = () => router.push("/profile");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const freelancerId = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!freelancerId || !token) {
      toast.error("User session expired. Please log in again.");
      return;
    }

    if (!file || !addressProofFile) {
      toast.error("Please upload both files before submitting.");
      return;
    }

    const formData1 = new FormData();
    formData1.append("document", file);
    formData1.append("idProofType", idProofType);

    const formData2 = new FormData();
    formData2.append("document", addressProofFile);
    formData2.append("proofType", addressProofType);

    try {
      const response1 = await fetch(
        `https://f-backend-fgtt.onrender.com/resumes/uploadAadharCard/${freelancerId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData1,
        }
      );

      const response2 = await fetch(
        `https://f-backend-fgtt.onrender.com/resumes/uploadAddressProof/${freelancerId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData2,
        }
      );

      if (response1.ok && response2.ok) {
        toast.success("Both proofs uploaded successfully!");
        setTimeout(() => router.push("/profile"), 3000);
      } else {
        toast.error("Failed to upload proofs.");
      }
    } catch (error) {
      console.error("Error uploading proofs:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
    
      <ToastContainer />
      <Breadcrumb pageName="Create KYC" />

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={handleBackClick}
          className="flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>
      </div>

    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ID Proof Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select ID Proof Type</label>
            <select
              value={idProofType}
              onChange={(e) => setIdProofType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm"
            >
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Pass Port">Passport</option>
              <option value="Voter Id">Voter ID</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload ID Proof (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm cursor-pointer"
            />
          </div>
        </div>

        {/* Address Proof Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Address Proof Type</label>
            <select
              value={addressProofType}
              onChange={(e) => setAddressProofType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm"
            >
              <option value="Electricity Bill">Electricity Bill</option>
              <option value="Water Bill">Water Bill</option>
              <option value="Gas Bill">Gas Bill</option>
              <option value="Other Utility Bill">Other Utility Bill</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Address Proof (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setAddressProofFile(e.target.files[0])}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm cursor-pointer"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateKYC;
