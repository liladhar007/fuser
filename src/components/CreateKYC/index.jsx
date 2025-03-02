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








"use client";

import { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const CreateKYC = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [idProofType, setIdProofType] = useState("Aadhar Card");

  // Navigate back to the profile page
  const handleBackClick = () => {
    router.push("/profile");
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const freelancerId = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!freelancerId || !token) {
      toast.error("User session expired. Please log in again.");
      return;
    }

    if (!file) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    formData.append("idProofType", idProofType);

    try {
      const response = await fetch(
        `https://freelancify-backend.vercel.app/resumes/uploadAadharCard/${freelancerId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Corrected syntax for the token
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("ID proof uploaded successfully!");
        setTimeout(() => {
          router.push("/profile"); 
        }, 3000); 
        
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to upload ID proof.");
      }
    } catch (error) {
      console.error("Error uploading ID proof:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <ToastContainer />
      <Breadcrumb pageName="Create KYC" />
      <div className="mb-2 text-end justify-end">
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={handleBackClick}
            className="flex items-center rounded-full bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800"
          >
            <ArrowLeftIcon className="h-5 w-5 me-2" />
            Back
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full rounded-lg border border-gray-300 p-3"
        >
          <div className="-mx-3 mb-2 flex flex-wrap">
            <div className="w-full p-3 md:w-1/2 xl:w-1/2">
              <label
                htmlFor="id_p"
                className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                Select ID Proof
              </label>
              <select
                id="id_p"
                value={idProofType}
                onChange={(e) => setIdProofType(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="Pass Port">Pass Port</option>
                <option value="Votter Id">Votter Id</option>
              </select>
            </div>
            <div className="w-full p-3 md:w-1/2 xl:w-1/2">
              <label
                className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="user_avatar"
              >
                Choose File  (only pdf file allowed)
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                id="user_avatar"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateKYC;


