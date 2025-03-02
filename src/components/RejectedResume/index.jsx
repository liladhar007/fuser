"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { BiSolidShow } from "react-icons/bi";
import ShowResumeRS from "../ShowResumeRS/index";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../common/Loader";

const RejectedResume = () => {
  const headers = ["RESUME NO", "RESUME ID", "LAST SAVED ON", "ACTION"];
  const [data, setData] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const freelancerId = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRejectedResumes = async () => {
      if (!freelancerId) {
        alert("Freelancer ID is missing.");
        return;
      }

      if (!token) {
        alert("Authentication token is missing.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://freelancify-backend.vercel.app/resumes/rejected/${freelancerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // const data = await response.json();
        // setData(data);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Error fetching rejected resumes:",
          error.response ? error.response.data : error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedResumes();
  }, [freelancerId, token]);

  const handleViewClick = (row) => {
    setSelectedResume(row);
  };

  return (
    <>
      {!selectedResume ? (
        <div className="mx-auto max-w-7xl">
          <Breadcrumb pageName="Rejected Resume" />
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-full lg:w-full xl:w-full 2xl:w-full">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index} scope="col" className="px-6 py-3">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`${rowIndex % 2 === 0
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-50 dark:bg-gray-700"
                          } border-b dark:border-gray-700`}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {rowIndex + 1}
                        </td>
                        <td className="px-6 py-4">{row.resume_id}</td>
                        <td className="px-6 py-4">
                          {new Date(row.submission_date).toLocaleString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            },
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewClick(row)}
                            className="rounded-md bg-indigo-500 p-3 font-medium text-blue-600 shadow-lg hover:underline dark:text-blue-500"
                          >
                            <span className="text-white">
                              <BiSolidShow />
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={headers.length}
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div>
          <ShowResumeRS row={selectedResume} allData={data} />
        </div>
      )}
    </>
  );
};

export default RejectedResume;
