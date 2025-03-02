// "use client";
// import { SetStateAction, useEffect, useState } from "react";
// import Breadcrumb from "../Breadcrumbs/Breadcrumb";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Loader from "@/components/common/Loader";

// const NewResume = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true); // State to manage loading status
//   const [resumeUrl, setResumeUrl] = useState("");
//   const [error, setError] = useState(false);
//   const freelancerId = localStorage.getItem("user");
//   const token = localStorage.getItem("token");

//   // Fetch the current resume on component mount or on freelancer_id change
//   useEffect(() => {
//     const fetchCurrentResume = async () => {
//       try {
//         const response = await fetch(
//           "https://freelancify-backend.vercel.app/freelancer/getFreelancerResume/" +
//           freelancerId,
//           {
//             method: "GET",
//             headers: {
//               Authorization: "Bearer " + token,
//             },
//           },
//         );

//         if (response.ok) {
//           const data = await response.json();
//           if (data.current_resume_id) {
//             setCurrentIndex(data.current_resume_id);
//             checkResumeValidity(selectedResume.resume_url);
//           } else {
//             setError(true);
//           }
//         } else {
//           setError(true);
//           console.log("Failed to fetch resume details.");
//         }
//       } catch (error) {
//         setError(true);
//         console.error("Error fetching resume data:", error);
//       }
//     };

//     fetchCurrentResume();
//   }, [freelancerId, token]); // Empty array means it will run only once when the component is mounted

//   // Get the selected resume based on currentIndex
//   const selectedResume = {
//     no: `${currentIndex}`,
//     resumeid: `${currentIndex}`,
//     resume_url:
//       "https://freelancify-backend.vercel.app/resumes/download/" +
//       currentIndex +
//       "#toolbar=0",
//   };

//   // Function to handle "Next" button click
//   const handleNext = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://freelancify-backend.vercel.app/freelancer/updateFreelancerResume/` +
//         freelancerId,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token,
//           },
//           body: JSON.stringify({ current_resume_id: currentIndex + 1 }),
//         },
//       );

//       if (response.ok) {
//         setCurrentIndex(currentIndex + 1);

//         // Reset the form data
//         setFormData({
//           resume_id: currentIndex + 1, // Update resume_id as per current index
//           freelancer_id: freelancerId || "",
//           first_name: "",
//           middle_name: "",
//           last_name: "",
//           date_of_birth: "",
//           gender: "",
//           nationality: "",
//           marital_status: "",
//           passport: "",
//           hobbies: "",
//           language_known: "",
//           address: "",
//           landmark: "",
//           city: "",
//           state: "",
//           pincode: "",
//           mobile: "",
//           email: "",
//           SSC_result: "",
//           SSC_board: "",
//           SSC_pass_year: "",
//           HSC_result: "",
//           HSC_board: "",
//           HSC_pass_year: "",
//           graduation_degree: "",
//           graduation_result: "",
//           graduation_university: "",
//           graduation_year: "",
//           post_graduation_degree: "",
//           post_graduation_result: "",
//           post_graduation_year: "",
//           higher_level_education: "",
//           total_work_experience_in: "Month",
//           total_work_experience: "",
//           no_of_companies: "",
//           last_employer: "",
//           status: "Saved",
//         });
//         // alert("Current resume updated successfully!");
//       } else {
//         console.log("Failed to update current resume.");
//       }
//     } catch (error) {
//       console.error("Error updating current resume:", error);
//       console.log("Error updating current resume.");
//     }
//   };

//   // State to manage the form data
//   const [formData, setFormData] = useState({
//     resume_id: currentIndex,
//     freelancer_id: "",
//     first_name: "",
//     middle_name: "",
//     last_name: "",
//     date_of_birth: "",
//     gender: "",
//     nationality: "",
//     marital_status: "",
//     passport: "",
//     hobbies: "",
//     language_known: "",
//     address: "",
//     landmark: "",
//     city: "",
//     state: "",
//     pincode: "",
//     mobile: "",
//     email: "",
//     SSC_result: "",
//     SSC_board: "",
//     SSC_pass_year: "",
//     HSC_result: "",
//     HSC_board: "",
//     HSC_pass_year: "",
//     graduation_degree: "",
//     graduation_result: "",
//     graduation_university: "",
//     graduation_year: "",
//     post_graduation_degree: "",
//     post_graduation_result: "",
//     post_graduation_year: "",
//     higher_level_education: "",
//     total_work_experience_in: "Month",
//     total_work_experience: "",
//     no_of_companies: "",
//     last_employer: "",
//     status: "",
//   });

//   // Handle input changes
//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form handleSubmit
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     formData.resume_id = currentIndex;
//     formData.freelancer_id = freelancerId || "";
//     formData.status = "Submitted";

//     try {
//       const response = await fetch(
//         "https://freelancify-backend.vercel.app/resumes/save",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token,
//           },
//           body: JSON.stringify(formData),
//         },
//       );

//       if (response.ok) {
//         toast.success("Resume Submitted successfully!");
//         handleNext();
//       } else {
//         toast.error("Error uploading resume");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.info("Error uploading resume");
//     }
//     setLoading(false);
//   };

//   // Handle form handleSave
//   const handleSave = async (e: any) => {
//     e.preventDefault();
//     if (!formData.first_name) {
//       toast.error("all filde requed");
//     }
//     setLoading(true);

//     formData.resume_id = currentIndex;
//     formData.freelancer_id = freelancerId || "";
//     formData.status = "Saved";

//     try {
//       const response = await fetch(
//         "https://freelancify-backend.vercel.app/resumes/save",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token,
//           },
//           body: JSON.stringify(formData),
//         },
//       );

//       if (response.ok) {
//         toast.success("Resume Saved successfully!");
//         handleNext();
//       } else {
//         toast.error("Error Resume Saved");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.info("Error Resume Saved");
//     }
//     setLoading(false);
//   };

//   // Check if the resume URL exists before rendering the embed tag
//   const checkResumeValidity = async (url: string) => {
//     if (currentIndex != 0) {
//       try {
//         const response = await fetch(url, { method: "HEAD" }); // Use HEAD to only check the resource without downloading
//         console.log(response);
//         if (response.ok) {
//           setResumeUrl(url);
//           setLoading(false);
//           setError(false);
//           return true;  // If the response is valid, we update the URL
//         } else {
//           handleError();  // If the resource is not available (404, etc.)
//           return false;
//         }
//       } catch (error) {
//         handleError();  // Catch any errors (e.g., network issues)
//         return false;
//       }
//     }
//     else {
//       setError(false);
//       setLoading(true);
//     }
//   };

//   // Function to handle the case where the resume fails to load
//   const handleError = () => {
//     setLoading(false); // Hide the loader if the resume fails to load
//     setError(true); // Mark error as true
//   };

//   // Render the embed only when currentIndex is not 0
//   useEffect(() => {
//     if (selectedResume.resume_url) {
//       checkResumeValidity(selectedResume.resume_url); // Validate the resume URL before rendering
//     }
//   }, [selectedResume.resume_url]);  // Re-run the check when resume URL changes

//   return (
//     <div className="mx-auto max-w-7xl">

//       {loading && <Loader />}

//       {!loading && (<>
//         <ToastContainer />
//         <Breadcrumb pageName="New Resume" />

//         <div className="flex flex-wrap gap-3">
//           <div className="w-full lg:w-[65%]">
//             <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
//               <div className="row align-items-center p-2">
//                 {/* {JSON.stringify(data.resume)} */}
//                 <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
//                   {/* Title */}
//                   <h6 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white md:mb-0">
//                     <i>Resume in PDF</i>
//                   </h6>

//                   {/* Skip Button */}
//                   <span className="flex justify-end">
//                     <button
//                       onClick={handleNext}
//                       className="me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
//                     >
//                       Skip
//                     </button>
//                   </span>
//                 </div>
//               </div>
//               <div className="flex-1 p-2">
//                 <embed
//                   src={resumeUrl}
//                   type="application/pdf"
//                   className="h-[600px] w-full"
//                   onError={handleError}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="w-full lg:w-1/3">
//             <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
//               <div className="row align-items-center p-2">
//                 <div className="col-6 border-b border-gray-200 pb-3 dark:border-gray-700">
//                   <h6 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
//                     <i>Fill the form</i>
//                   </h6>
//                 </div>
//               </div>
//               <div className="mb-2 mt-2 h-[600px] w-full flex-1 overflow-auto p-2">
//                 <form className="mx-auto max-w-sm ">
//                   <h2 className="mb-4 text-lg font-semibold text-primary">
//                     Personal Details
//                   </h2>

//                   <div className="mb-5">
//                     <label
//                       htmlFor="first_name"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       id="first_name"
//                       name="first_name"
//                       value={formData.first_name}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="middle_name"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Middle Name
//                     </label>
//                     <input
//                       type="text"
//                       id="middle_name"
//                       name="middle_name"
//                       value={formData.middle_name}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="last_name"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       id="last_name"
//                       name="last_name"
//                       value={formData.last_name}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="date_of_birth"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Date Of Birth
//                     </label>
//                     <input
//                       type="text"
//                       id="date_of_birth"
//                       name="date_of_birth"
//                       value={formData.date_of_birth}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="gender"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Gender
//                     </label>
//                     <input
//                       type="text"
//                       id="gender"
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="nationality"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Nationality
//                     </label>
//                     <input
//                       type="text"
//                       id="nationality"
//                       name="nationality"
//                       value={formData.nationality}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="marital_status"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Marital Status
//                     </label>
//                     <input
//                       type="text"
//                       id="marital_status"
//                       name="marital_status"
//                       value={formData.marital_status}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="passport"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Passport
//                     </label>
//                     <input
//                       type="text"
//                       id="passport"
//                       name="passport"
//                       value={formData.passport}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="hobbies"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Hobbies
//                     </label>
//                     <input
//                       type="text"
//                       id="hobbies"
//                       name="hobbies"
//                       value={formData.hobbies}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="language_known"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Language Known
//                     </label>
//                     <input
//                       type="text"
//                       id="language_known"
//                       name="language_known"
//                       value={formData.language_known}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>

//                   <h2 className="mb-4 text-lg font-semibold text-primary">
//                     Communication Details
//                   </h2>

//                   <div className="mb-5">
//                     <label
//                       htmlFor="address"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>

//                   <div className="mb-5">
//                     <label
//                       htmlFor="landmark"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Landmark
//                     </label>
//                     <input
//                       type="text"
//                       id="landmark"
//                       name="landmark"
//                       value={formData.landmark}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="city"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       id="city"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="state"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       State
//                     </label>
//                     <input
//                       type="text"
//                       id="state"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="pincode"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Pincode
//                     </label>
//                     <input
//                       type="text"
//                       id="pincode"
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="mobile"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Mobile
//                     </label>
//                     <input
//                       type="text"
//                       id="mobile"
//                       name="mobile"
//                       value={formData.mobile}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="email"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>

//                   <h2 className="mb-4 text-lg font-semibold text-primary">
//                     Qualification Details
//                   </h2>

//                   <div className="mb-5">
//                     <label
//                       htmlFor="SSC_result"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       SSC Result
//                     </label>
//                     <input
//                       type="text"
//                       id="SSC_result"
//                       name="SSC_result"
//                       value={formData.SSC_result}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="SSC_board"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       SSC Board
//                     </label>
//                     <input
//                       type="text"
//                       id="SSC_board"
//                       name="SSC_board"
//                       value={formData.SSC_board}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="SSC_pass_year"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       SSC Pass Year
//                     </label>
//                     <input
//                       type="text"
//                       id="SSC_pass_year"
//                       name="SSC_pass_year"
//                       value={formData.SSC_pass_year}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="HSC_result"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       HSC Result
//                     </label>
//                     <input
//                       type="text"
//                       id="HSC_result"
//                       name="HSC_result"
//                       value={formData.HSC_result}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="HSC_board"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       HSC Board
//                     </label>
//                     <input
//                       type="text"
//                       id="HSC_board"
//                       name="HSC_board"
//                       value={formData.HSC_board}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="HSC_pass_year"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       HSC Pass Year
//                     </label>
//                     <input
//                       type="text"
//                       id="HSC_pass_year"
//                       name="HSC_pass_year"
//                       value={formData.HSC_pass_year}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="graduation_degree"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Graduation Degree
//                     </label>
//                     <input
//                       type="text"
//                       id="graduation_degree"
//                       name="graduation_degree"
//                       value={formData.graduation_degree}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="graduation_result"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Graduation Result
//                     </label>
//                     <input
//                       type="text"
//                       id="graduation_result"
//                       name="graduation_result"
//                       value={formData.graduation_result}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="graduation_university"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Graduation University
//                     </label>
//                     <input
//                       type="text"
//                       id="graduation_university"
//                       name="graduation_university"
//                       value={formData.graduation_university}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="graduation_year"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Grduation Year
//                     </label>
//                     <input
//                       type="text"
//                       id="graduation_year"
//                       name="graduation_year"
//                       value={formData.graduation_year}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="post_graduation_degree"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Post Graduation Degree
//                     </label>
//                     <input
//                       type="text"
//                       id="post_graduation_degree"
//                       name="post_graduation_degree"
//                       value={formData.post_graduation_degree}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="post_graduation_result"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Post Graduation Result
//                     </label>
//                     <input
//                       type="text"
//                       id="post_graduation_result"
//                       name="post_graduation_result"
//                       value={formData.post_graduation_result}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="post_graduation_year"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Post Graduation Year
//                     </label>
//                     <input
//                       type="text"
//                       id="post_graduation_year"
//                       name="post_graduation_year"
//                       value={formData.post_graduation_year}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="higher_level_education"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Higher Level Education
//                     </label>
//                     <input
//                       type="text"
//                       id="higher_level_education"
//                       name="higher_level_education"
//                       value={formData.higher_level_education}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>

//                   <h2 className="mb-4 text-lg font-semibold text-primary">
//                     Employment Details
//                   </h2>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="total_work_experience_in"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Total Work Experience In
//                     </label>
//                     <select
//                       id="countries"
//                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     >
//                       {/* <option selected>Choose a country</option> */}
//                       <option value="Month">Month</option>
//                       <option value="Years">Years</option>
//                     </select>
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="total_work_experience"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Total Work Experience
//                     </label>
//                     <input
//                       type="text"
//                       id="total_work_experience"
//                       name="total_work_experience"
//                       value={formData.total_work_experience}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="no_of_companies"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       No Of Companies
//                     </label>
//                     <input
//                       type="text"
//                       id="no_of_companies"
//                       name="no_of_companies"
//                       value={formData.no_of_companies}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="last_employer"
//                       className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Last Employer
//                     </label>
//                     <input
//                       type="text"
//                       id="last_employer"
//                       name="last_employer"
//                       value={formData.last_employer}
//                       onChange={handleInputChange}
//                       className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     />
//                   </div>

//                   <div className="bothbtn border-t border-gray-200 pt-2 text-center">
//                     <button
//                       type="button"
//                       onClick={handleSave}
//                       className="mb-2 me-2 rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-8 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800"
//                     >
//                       Save Resume
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handleSubmit}
//                       className="mb-2 me-2 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 px-8 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400"
//                     >
//                       {" "}
//                       Submit Resume
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>)}

//       {/* Show error message if the file doesn't exist (404) */}
//       {error && <p className="flex justify-center mt-30 bg-teal-50 text-xl text-slate-900">Sorry, the resume could not be found.</p>}
//     </div>
//   );
// };

// export default NewResume;

"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/common/Loader";

// interface FormData {
//   resume_id: number;
//   freelancer_id: string;
//   first_name: string;
//   middle_name: string;
//   last_name: string;
//   date_of_birth: string;
//   gender: string;
//   nationality: string;
//   marital_status: string;
//   passport: string;
//   hobbies: string;
//   language_known: string;
//   address: string;
//   landmark: string;
//   city: string;
//   state: string;
//   pincode: string;
//   mobile: string;
//   email: string;
//   SSC_result: string;
//   SSC_board: string;
//   SSC_pass_year: string;
//   HSC_result: string;
//   HSC_board: string;
//   HSC_pass_year: string;
//   graduation_degree: string;
//   graduation_result: string;
//   graduation_university: string;
//   graduation_year: string;
//   post_graduation_degree: string;
//   post_graduation_result: string;
//   post_graduation_university:string
//   post_graduation_year: string;
//   higher_level_education: string;
//   total_work_experience_in: string;
//   total_work_experience: string;
//   no_of_companies: string;
//   last_employer: string;
//   status: string;
// }

interface FormData {
  resume_id: any;
  freelancer_id: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  date_of_birth: any;
  gender: any;
  nationality: any;
  marital_status: any;
  passport: any;
  hobbies: any;
  languages_known: any;
  address: any;
  landmark: any;
  city: any;
  state: any;
  pincode: any;
  mobile: any;
  email: any;
  ssc_result: any;
  ssc_board: any;
  ssc_year_of_passing: any;
  hsc_result: any;
  hsc_board: any;
  hsc_year_of_passing: any;
  graduation_degree: any;
  graduation_result: any;
  graduation_university: any;
  graduation_year_of_passing: any;
  post_graduation_degree: any;
  post_graduation_result: any;
  post_graduation_university: any;
  post_graduation_year_of_passing: any;
  higher_education_qualification: any;
  total_work_experience_months: any;
  number_of_companies_worked: any;
  last_employer: any;
  status: any;
}

const NewResume = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [resumeUrl, setResumeUrl] = useState("");
  const [error, setError] = useState(false);
  const freelancerId = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // State to manage the form data
  const [formData, setFormData] = useState<FormData>(
    //   {
    //   resume_id: currentIndex,
    //   freelancer_id: "",
    //   first_name: "",
    //   middle_name: "",
    //   last_name: "",
    //   date_of_birth: "",
    //   gender: "",
    //   nationality: "",
    //   marital_status: "",
    //   passport: "",
    //   hobbies: "",
    //   language_known: "",
    //   address: "",
    //   landmark: "",
    //   city: "",
    //   state: "",
    //   pincode: "",
    //   mobile: "",
    //   email: "",
    //   SSC_result: "",
    //   SSC_board: "",
    //   SSC_pass_year: "",
    //   HSC_result: "",
    //   HSC_board: "",
    //   HSC_pass_year: "",
    //   graduation_degree: "",
    //   graduation_result: "",
    //   graduation_university: "",
    //   graduation_year: "",
    //   post_graduation_degree: "",
    //   post_graduation_result: "",
    //   post_graduation_university:"",
    //   post_graduation_year: "",
    //   higher_level_education: "",
    //   total_work_experience_in: "Month",
    //   total_work_experience: "",
    //   no_of_companies: "",
    //   last_employer: "",
    //   status: "",
    // }

    {
      resume_id: currentIndex,
      freelancer_id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      nationality: "",
      marital_status: "",
      passport: "",
      hobbies: "",
      languages_known: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      mobile: "",
      email: "",
      ssc_result: "",
      ssc_board: "",
      ssc_year_of_passing: "",
      hsc_result: "",
      hsc_board: "",
      hsc_year_of_passing: "",
      graduation_degree: "",
      graduation_result: "",
      graduation_university: "",
      graduation_year_of_passing: "",
      post_graduation_degree: "",
      post_graduation_result: "",
      post_graduation_university: "",
      post_graduation_year_of_passing: "",
      higher_education_qualification: "",
      total_work_experience_months: "",
      number_of_companies_worked: "",
      last_employer: "",
      status: "",
    },
  );

  // State to manage validation errors
  const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>(
    {},
  );

  // Fetch the current resume on component mount or on freelancer_id change
  useEffect(() => {
    const fetchCurrentResume = async () => {
      try {
        const response = await fetch(
          `https://freelancify-backend.vercel.app/freelancer/getFreelancerResume/${freelancerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          if (data.current_resume_id) {
            setCurrentIndex(data.current_resume_id);
            checkResumeValidity(selectedResume.resume_url);
          } else {
            setError(true);
          }
        } else {
          setError(true);
          console.log("Failed to fetch resume details.");
        }
      } catch (error) {
        setError(true);
        console.error("Error fetching resume data:", error);
      }
    };

    fetchCurrentResume();
  }, [freelancerId, token]);

  // Get the selected resume based on currentIndex
  const selectedResume = {
    no: `${currentIndex}`,
    resumeid: `${currentIndex}`,
    resume_url: `https://freelancify-backend.vercel.app/resumes/download/${currentIndex}#toolbar=0`,
  };

  // Function to handle "Next" button click
  const handleNext = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://freelancify-backend.vercel.app/freelancer/updateFreelancerResume/${freelancerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ current_resume_id: currentIndex + 1 }),
        },
      );

      if (response.ok) {
        setCurrentIndex(currentIndex + 1);
        resetForm(currentIndex + 1);
      } else {
        console.log("Failed to update current resume.");
      }
    } catch (error) {
      console.error("Error updating current resume:", error);
      console.log("Error updating current resume.");
    }
  };

  // Reset the form data
  const resetForm = (newResumeId: number) => {
    setFormData(
      //   {
      //   resume_id: newResumeId,
      //   freelancer_id: freelancerId || "",
      //   first_name: "",
      //   middle_name: "",
      //   last_name: "",
      //   date_of_birth: "",
      //   gender: "",
      //   nationality: "",
      //   marital_status: "",
      //   passport: "",
      //   hobbies: "",
      //   language_known: "",
      //   address: "",
      //   landmark: "",
      //   city: "",
      //   state: "",
      //   pincode: "",
      //   mobile: "",
      //   email: "",
      //   SSC_result: "",
      //   SSC_board: "",
      //   SSC_pass_year: "",
      //   HSC_result: "",
      //   HSC_board: "",
      //   HSC_pass_year: "",
      //   graduation_degree: "",
      //   graduation_result: "",
      //   graduation_university: "",
      //   graduation_year: "",
      //   post_graduation_degree: "",
      //   post_graduation_result: "",
      //   post_graduation_university:"",
      //   post_graduation_year: "",
      //   higher_level_education: "",
      //   total_work_experience_in: "Month",
      //   total_work_experience: "",
      //   no_of_companies: "",
      //   last_employer: "",
      //   status: "Saved",
      // }

      {
        resume_id: newResumeId,
        freelancer_id: freelancerId || "",
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        nationality: "",
        marital_status: "",
        passport: "",
        hobbies: "",
        languages_known: "",
        address: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        mobile: "",
        email: "",
        ssc_result: "",
        ssc_board: "",
        ssc_year_of_passing: "",
        hsc_result: "",
        hsc_board: "",
        hsc_year_of_passing: "",
        graduation_degree: "",
        graduation_result: "",
        graduation_university: "",
        graduation_year_of_passing: "",
        post_graduation_degree: "",
        post_graduation_result: "",
        post_graduation_university: "",
        post_graduation_year_of_passing: "",
        higher_education_qualification: "",
        total_work_experience_months: "",
        number_of_companies_worked: "",
        last_employer: "",
        status: "",
      },
    );
    setErrors({});
    setLoading(false);
  };

  // Handle input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field on change
    validateField(name as keyof FormData, value);
  };

  // Validate a single field
  const validateField = (fieldName: keyof FormData, value: string) => {
    let errorMsg = "";

    // Define validation rules
    if (
      [
        "first_name",
        "last_name",
        "middle_name",
        "date_of_birth",
        "gender",
        "nationality",
        "marital_status",
        "passport",
        "hobbies",
        "languages_known",
        "address",
        "landmark",
        "city",
        "state",
        "pincode",
        "mobile",
        "email",
        "ssc_result",
        "ssc_board",
        "ssc_year_of_passing",
        "hsc_result",
        "hsc_board",
        "hsc_year_of_passing",
        "graduation_degree",
        "graduation_result",
        "graduation_university",
        "graduation_year_of_passing",
        "post_graduation_degree",
        "post_graduation_result",
        "post_graduation_university",
        "post_graduation_year_of_passing",
        "higher_education_qualification",
        "total_work_experience_months",
        "number_of_companies_worked",
        "last_employer",
      ].includes(fieldName)
    ) {
      if (!value.trim()) {
        errorMsg = "This field is required.";
      }
    }

    // Additional specific validations
    // if (fieldName === "email" && value) {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailRegex.test(value)) {
    //     errorMsg = "Please enter a valid email address.";
    //   }
    // }

    // if (fieldName === "mobile" && value) {
    //   const mobileRegex = /^[0-9]{10}$/;
    //   if (!mobileRegex.test(value)) {
    //     errorMsg = "Please enter a valid 10-digit mobile number.";
    //   }
    // }

    // if (fieldName === "pincode" && value) {
    //   const pincodeRegex = /^[0-9]{6}$/;
    //   if (!pincodeRegex.test(value)) {
    //     errorMsg = "Please enter a valid 6-digit pincode.";
    //   }
    // }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMsg,
    }));
  };

  // Validate the entire form
  const validateForm = (): boolean => {
    const newErrors: { [key in keyof FormData]?: string } = {};

    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const value = formData[field];
      if (
        [
          "first_name",
          "last_name",
          "middle_name",
          "date_of_birth",
          "gender",
          "nationality",
          "marital_status",
          "passport",
          "hobbies",
          "languages_known",
          "address",
          "landmark",
          "city",
          "state",
          "pincode",
          "mobile",
          "email",
          "ssc_result",
          "ssc_board",
          "ssc_year_of_passing",
          "hsc_result",
          "hsc_board",
          "hsc_year_of_passing",
          "graduation_degree",
          "graduation_result",
          "graduation_university",
          "graduation_year_of_passing",
          "post_graduation_degree",
          "post_graduation_result",
          "post_graduation_university",
          "post_graduation_year_of_passing",
          "higher_education_qualification",
          "total_work_experience_months",
          "number_of_companies_worked",
          "last_employer",
        ].includes(field)
      ) {
        if (!value.trim()) {
          newErrors[field] = "This field is required.";
        }
      }

      // Specific validations
      // if (field === "email" && value) {
      //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //   if (!emailRegex.test(value)) {
      //     newErrors[field] = "Please enter a valid email address.";
      //   }
      // }

      // if (field === "mobile" && value) {
      //   const mobileRegex = /^[0-9]{10}$/;
      //   if (!mobileRegex.test(value)) {
      //     newErrors[field] = "Please enter a valid 10-digit mobile number.";
      //   }
      // }

      // if (field === "pincode" && value) {
      //   const pincodeRegex = /^[0-9]{6}$/;
      //   if (!pincodeRegex.test(value)) {
      //     newErrors[field] = "Please enter a valid 6-digit pincode.";
      //   }
      // }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (Submit Resume)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const updatedFormData = {
      ...formData,
      resume_id: currentIndex,
      freelancer_id: freelancerId || "",
      status: "Submitted",
    };

    try {
      const response = await fetch(
        "https://freelancify-backend.vercel.app/resumes/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFormData),
        },
      );

      if (response.ok) {
        toast.success("Resume Submitted successfully!");
        handleNext();
      } else {
        toast.error("Error uploading resume");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading resume");
    }
    setLoading(false);
  };

  // Handle form save (Save Resume)
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const updatedFormData = {
      ...formData,
      resume_id: currentIndex,
      freelancer_id: freelancerId || "",
      status: "Saved",
    };

    try {
      const response = await fetch(
        "https://freelancify-backend.vercel.app/resumes/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFormData),
        },
      );

      if (response.ok) {
        toast.success("Resume Saved successfully!");
        handleNext();
      } else {
        toast.error("Error saving resume");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error saving resume");
    }
    setLoading(false);
  };

  // Check if the resume URL exists before rendering the embed tag
  const checkResumeValidity = async (url: string) => {
    if (currentIndex !== 0) {
      try {
        const response = await fetch(url, { method: "HEAD" });
        console.log(response);
        if (response.ok) {
          setResumeUrl(url);
          setLoading(false);
          setError(false);
          return true;
        } else {
          handleError();
          return false;
        }
      } catch (error) {
        handleError();
        return false;
      }
    } else {
      setError(false);
      setLoading(true);
    }
  };

  // Function to handle the case where the resume fails to load
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  // Render the embed only when currentIndex is not 0
  useEffect(() => {
    if (selectedResume.resume_url) {
      checkResumeValidity(selectedResume.resume_url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResume.resume_url]);

  return (
    <div className="mx-auto max-w-7xl">
      {loading && <Loader />}

      {!loading && (
        <>
          <ToastContainer />
          <Breadcrumb pageName="New Resume" />

          <div className="flex flex-wrap gap-3">
            {/* Resume PDF Section */}
            <div className="w-full lg:w-[65%]">
              <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                <div className="row align-items-center p-2">
                  <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                    {/* Title */}
                    <h6 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white md:mb-0">
                      <i>Resume in PDF</i>
                    </h6>

                    {/* Skip Button */}
                    <span className="flex justify-end">
                      <button
                        onClick={handleNext}
                        className="me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                      >
                        Skip
                      </button>
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <embed
                    src={resumeUrl}
                    type="application/pdf"
                    className="h-[600px] w-full"
                    onError={handleError}
                  />
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/3">
              <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                <div className="row align-items-center p-2">
                  <div className="col-6 border-b border-gray-200 pb-3 dark:border-gray-700">
                    <h6 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                      <i>Fill the form</i>
                    </h6>
                  </div>
                </div>
                <div className="mb-2 mt-2 h-[600px] w-full flex-1 overflow-auto p-2">
                  <form className="mx-auto max-w-sm">
                    {/* Personal Details */}
                    <h2 className="mb-4 text-lg font-semibold text-primary">
                      Personal Details
                    </h2>

                    {/* First Name */}
                    <div className="mb-5">
                      <label
                        htmlFor="first_name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.first_name
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.first_name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.first_name}
                        </p>
                      )}
                    </div>

                    {/* Middle Name */}
                    <div className="mb-5">
                      <label
                        htmlFor="middle_name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Middle Name
                      </label>
                      <input
                        type="text"
                        id="middle_name"
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.middle_name
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.middle_name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.middle_name}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="mb-5">
                      <label
                        htmlFor="last_name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.last_name
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.last_name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.last_name}
                        </p>
                      )}
                    </div>

                    {/* Date Of Birth */}
                    <div className="mb-5">
                      <label
                        htmlFor="date_of_birth"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date Of Birth
                      </label>
                      <input
                        type="text"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.date_of_birth
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.date_of_birth && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.date_of_birth}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="mb-5">
                      <label
                        htmlFor="gender"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Gender
                      </label>

                      <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.gender ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.gender}
                        </p>
                      )}
                    </div>

                    {/* Nationality */}
                    <div className="mb-5">
                      <label
                        htmlFor="nationality"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nationality
                      </label>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.nationality
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.nationality && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.nationality}
                        </p>
                      )}
                    </div>

                    {/* Marital Status */}
                    <div className="mb-5">
                      <label
                        htmlFor="marital_status"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Marital Status
                      </label>

                      <input
                        type="text"
                        id="marital_status"
                        name="marital_status"
                        value={formData.marital_status}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.marital_status
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.marital_status && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.marital_status}
                        </p>
                      )}
                    </div>

                    {/* Passport */}
                    <div className="mb-5">
                      <label
                        htmlFor="passport"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Passport
                      </label>
                      <input
                        type="text"
                        id="passport"
                        name="passport"
                        value={formData.passport}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.passport ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.passport && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.passport}
                        </p>
                      )}
                    </div>

                    {/* Hobbies */}
                    <div className="mb-5">
                      <label
                        htmlFor="hobbies"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Hobbies
                      </label>
                      <input
                        type="text"
                        id="hobbies"
                        name="hobbies"
                        value={formData.hobbies}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.hobbies ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.hobbies && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.hobbies}
                        </p>
                      )}
                    </div>

                    {/* Language Known */}
                    <div className="mb-5">
                      <label
                        htmlFor="languages_known"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Language Known
                      </label>
                      <input
                        type="text"
                        id="languages_known"
                        name="languages_known"
                        value={formData.languages_known}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.languages_known
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.languages_known && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.languages_known}
                        </p>
                      )}
                    </div>

                    {/* Communication Details */}
                    <h2 className="mb-4 text-lg font-semibold text-primary">
                      Communication Details
                    </h2>

                    {/* Address */}
                    <div className="mb-5">
                      <label
                        htmlFor="address"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Landmark */}
                    <div className="mb-5">
                      <label
                        htmlFor="landmark"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Landmark
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.landmark ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.landmark && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.landmark}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div className="mb-5">
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div className="mb-5">
                      <label
                        htmlFor="state"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.state}
                        </p>
                      )}
                    </div>

                    {/* Pincode */}
                    <div className="mb-5">
                      <label
                        htmlFor="pincode"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.pincode ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.pincode}
                        </p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div className="mb-5">
                      <label
                        htmlFor="mobile"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mobile
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.mobile ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Qualification Details */}
                    <h2 className="mb-4 text-lg font-semibold text-primary">
                      Qualification Details
                    </h2>

                    {/* SSC Result */}
                    <div className="mb-5">
                      <label
                        htmlFor="ssc_result"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        SSC Result
                      </label>
                      <input
                        type="text"
                        id="ssc_result"
                        name="ssc_result"
                        value={formData.ssc_result}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.ssc_result
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.ssc_result && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.ssc_result}
                        </p>
                      )}
                    </div>

                    {/* SSC Board */}
                    <div className="mb-5">
                      <label
                        htmlFor="SSC_board"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        SSC Board
                      </label>
                      <input
                        type="text"
                        id="ssc_board"
                        name="ssc_board"
                        value={formData.ssc_board}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.ssc_board
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.ssc_board && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.ssc_board}
                        </p>
                      )}
                    </div>

                    {/* SSC Pass Year */}
                    <div className="mb-5">
                      <label
                        htmlFor="SSC_pass_year"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        SSC Pass Year
                      </label>
                      <input
                        type="text"
                        id="ssc_year_of_passing"
                        name="ssc_year_of_passing"
                        value={formData.ssc_year_of_passing}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.ssc_year_of_passing
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.ssc_year_of_passing && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.ssc_year_of_passing}
                        </p>
                      )}
                    </div>

                    {/* HSC Result */}
                    <div className="mb-5">
                      <label
                        htmlFor="HSC_result"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        HSC Result
                      </label>
                      <input
                        type="text"
                        id="hsc_result"
                        name="hsc_result"
                        value={formData.hsc_result}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.hsc_result
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.hsc_result && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.hsc_result}
                        </p>
                      )}
                    </div>

                    {/* HSC Board */}
                    <div className="mb-5">
                      <label
                        htmlFor="HSC_board"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        HSC Board
                      </label>
                      <input
                        type="text"
                        id="hsc_board"
                        name="hsc_board"
                        value={formData.hsc_board}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.hsc_board
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.hsc_board && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.hsc_board}
                        </p>
                      )}
                    </div>

                    {/* HSC Pass Year */}
                    <div className="mb-5">
                      <label
                        htmlFor="HSC_pass_year"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        HSC Pass Year
                      </label>
                      <input
                        type="number"
                        id="hsc_year_of_passing"
                        name="hsc_year_of_passing"
                        value={formData.hsc_year_of_passing}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.hsc_year_of_passing
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.hsc_year_of_passing && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.hsc_year_of_passing}
                        </p>
                      )}
                    </div>

                    {/* Graduation Degree */}
                    <div className="mb-5">
                      <label
                        htmlFor="graduation_degree"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Graduation Degree
                      </label>
                      <input
                        type="text"
                        id="graduation_degree"
                        name="graduation_degree"
                        value={formData.graduation_degree}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.graduation_degree
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.graduation_degree && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.graduation_degree}
                        </p>
                      )}
                    </div>

                    {/* Graduation Result */}
                    <div className="mb-5">
                      <label
                        htmlFor="graduation_result"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Graduation Result
                      </label>
                      <input
                        type="text"
                        id="graduation_result"
                        name="graduation_result"
                        value={formData.graduation_result}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.graduation_result
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.graduation_result && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.graduation_result}
                        </p>
                      )}
                    </div>

                    {/* Graduation University */}
                    <div className="mb-5">
                      <label
                        htmlFor="graduation_university"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Graduation University
                      </label>
                      <input
                        type="text"
                        id="graduation_university"
                        name="graduation_university"
                        value={formData.graduation_university}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.graduation_university
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.graduation_university && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.graduation_university}
                        </p>
                      )}
                    </div>

                    {/* Graduation Year */}
                    <div className="mb-5">
                      <label
                        htmlFor="graduation_year"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Graduation Year
                      </label>
                      <input
                        type="number"
                        id="graduation_year_of_passing"
                        name="graduation_year_of_passing"
                        value={formData.graduation_year_of_passing}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.graduation_year_of_passing
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.graduation_year_of_passing && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.graduation_year_of_passing}
                        </p>
                      )}
                    </div>

                    {/* Post Graduation Degree */}
                    <div className="mb-5">
                      <label
                        htmlFor="post_graduation_degree"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Post Graduation Degree
                      </label>
                      <input
                        type="text"
                        id="post_graduation_degree"
                        name="post_graduation_degree"
                        value={formData.post_graduation_degree}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.post_graduation_degree
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.post_graduation_degree && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.post_graduation_degree}
                        </p>
                      )}
                    </div>

                    {/* Post Graduation Result */}
                    <div className="mb-5">
                      <label
                        htmlFor="post_graduation_result"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Post Graduation Result
                      </label>
                      <input
                        type="text"
                        id="post_graduation_result"
                        name="post_graduation_result"
                        value={formData.post_graduation_result}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.post_graduation_result
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.post_graduation_result && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.post_graduation_result}
                        </p>
                      )}
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="post_graduation_university"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Post Graduation University{" "}
                      </label>
                      <input
                        type="text"
                        id="post_graduation_university"
                        name="post_graduation_university"
                        value={formData.post_graduation_university}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.post_graduation_university
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.post_graduation_university && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.post_graduation_university}
                        </p>
                      )}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="post_graduation_year"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Post Graduation Year
                      </label>
                      <input
                        type="text"
                        id="post_graduation_year_of_passing"
                        name="post_graduation_year_of_passing"
                        value={formData.post_graduation_year_of_passing}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.post_graduation_year_of_passing
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.post_graduation_year_of_passing && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.post_graduation_year_of_passing}
                        </p>
                      )}
                    </div>

                    {/* Higher Level Education */}
                    <div className="mb-5">
                      <label
                        htmlFor="higher_level_education"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Higher Level Education
                      </label>
                      <input
                        type="text"
                        id="higher_education_qualification"
                        name="higher_education_qualification"
                        value={formData.higher_education_qualification}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.higher_education_qualification
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.higher_education_qualification && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.higher_education_qualification}
                        </p>
                      )}
                    </div>

                    {/* Employment Details */}
                    <h2 className="mb-4 text-lg font-semibold text-primary">
                      Employment Details
                    </h2>

                    {/* Total Work Experience In */}
                    {/* <div className="mb-5">
                      <label
                        htmlFor="total_work_experience_in"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Work Experience In
                      </label>
                      <select
                        id="total_work_experience_in"
                        name="total_work_experience_in"
                        value={formData.total_work_experience_months}
                        onChange={handleInputChange}
                        className={`block w-full rounded-lg border ${
                          errors.total_work_experience_months
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      >
                        <option value="Month">Month</option>
                        <option value="Years">Years</option>
                      </select>
                      {errors.total_work_experience_months && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.total_work_experience_months}
                        </p>
                      )}
                    </div> */}

                    {/* Total Work Experience */}
                    <div className="mb-5">
                      <label
                        htmlFor="total_work_experience"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Work Experience (in months)
                      </label>
                      <input
                        type="text"
                        id="total_work_experience_months"
                        name="total_work_experience_months"
                        value={formData.total_work_experience_months}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.total_work_experience_months
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.total_work_experience_months && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.total_work_experience_months}
                        </p>
                      )}
                    </div>

                    {/* No Of Companies */}
                    <div className="mb-5">
                      <label
                        htmlFor="no_of_companies"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        No Of Companies
                      </label>
                      <input
                        type="text"
                        id="number_of_companies_worked"
                        name="number_of_companies_worked"
                        value={formData.number_of_companies_worked}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.number_of_companies_worked
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.number_of_companies_worked && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.number_of_companies_worked}
                        </p>
                      )}
                    </div>

                    {/* Last Employer */}
                    <div className="mb-5">
                      <label
                        htmlFor="last_employer"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Employer
                      </label>
                      <input
                        type="text"
                        id="last_employer"
                        name="last_employer"
                        value={formData.last_employer}
                        onChange={handleInputChange}
                        className={`dark:shadow-sm-light block w-full rounded-lg border ${
                          errors.last_employer
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      />
                      {errors.last_employer && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.last_employer}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="bothbtn border-t border-gray-200 pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="mb-2 me-2 rounded-lg bg-gradient-to-br from-green-400 to-blue-600 px-8 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800"
                      >
                        Save Resume
                      </button>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="mb-2 me-2 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 px-8 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400"
                      >
                        Submit Resume
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Show error message if the file doesn't exist (404) */}
      {error && (
        <p className="mt-30 flex justify-center bg-teal-50 text-xl text-slate-900">
          Sorry, the resume could not be found.
        </p>
      )}
    </div>
  );
};

export default NewResume;
