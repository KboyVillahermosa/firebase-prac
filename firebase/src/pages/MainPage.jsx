// MainPage.jsx
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

import JobCards from "../components/JobCards";

import { MdWorkOutline } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { demo } from "../demoApiData";

function MainPage() {
  let { state } = useLocation();

  let currPage = state == null ? 0 : state.pagination;
  const [query, setQuery] = useState("");
  const [fullTime, setFullTime] = useState(false);
  const [location, setLocation] = useState("");
  const [pagination, setPagination] = useState(currPage);

  const [actualQuery, setActualQuery] = useState("");
  const [actualLocation, setActualLocation] = useState("");

  let que = actualQuery == "" ? "Full Stack Developer" : actualQuery;
  let loc = actualLocation == "" ? "Philippines" : actualLocation;

  const [apiData, setApiData] = useState();

  const [error, setError] = useState(null);
  const HandleSubmit = (event) => {
    event.preventDefault();
    setActualQuery(query);
    setActualLocation(location);
    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      params: {
        query: que + " in " + loc,
        page: "1",
        num_pages: "15",
        employment_types: fullTime ? "FULLTIME" : "PARTTIME",
      },
      headers: {
        "X-RapidAPI-Key": "73e2260d8cmshc17285a275c812ap10ec6djsn301f833294f7",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };
    axios.request(options).then((res) => {
      console.log(res);
      setApiData(res.data.data);
    });
    //setApiData(apiData)
  };
  const handleFullTime = () => {
    setFullTime((prev) => !prev);
  };
  const handleLocation = (e) => {
    setLocation("" + e.target.value);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search?",
      params: {
        query: que + " in " + loc,
        page: "1",
        num_pages: "15",
        employment_types: fullTime ? "FULLTIME" : "PARTTIME",
      },
      headers: {
        "X-RapidAPI-Key": "73e2260d8cmshc17285a275c812ap10ec6djsn301f833294f7",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => setApiData(res.data.data))
      .catch((err) => setError(err));
    //console.log(apiData)
  }, []);

  //console.log(error)
  return (
    <div className="bg-background min-h-screen">
       <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className=" font-Poppins max-w-full p-4 text-xl md:p-8 cursor-pointer ">
        SearchJob
      </div>
      {error != null && (
        <div className="bg-primary text-sm rounded text-white font-Poppins max-w-full p-4 mx-4 mb-4 md:p-8 md:mx-8 md:mb-8">
          <div>
            <div className="text-black">{error.code}</div>
            <br />
            {error.response.data.message}
            <br />
            <br />
            Note:{" "}
            <i>
              Due to exceeded MONTHLY quota for Requests. You cannot do more
              requests for the end of the month.
            </i>
            <br />
            <b>
              <u>Currently it shows demo API data.</u>
            </b>
          </div>
        </div>
      )}

      <header
        className="font-Roboto max-w-full 
                           mx-4 h-32 rounded-lg 
                         bg-jobs-background bg-left-bottom 
                         flex items-center justify-center 
                         md:mx-8 md:bg-cover "
      >
        <form
          onSubmit={(e) => HandleSubmit(e)}
          className="bg-white flex items-center justify-between gap-4 rounded-lg p-4 w-full md:w-2/3"
        >
          <div className="flex items-center gap-2 w-full">
            <MdWorkOutline className="text-xl text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, companies, expertise or benefits"
              className="outline-0 text-sm grow w-full px-4 py-2 rounded-md border border-pink-500 text-gray-700 focus:border-pink-600 focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <input
            type="submit"
            value="Search"
            className="bg-primary text-white px-6 py-2 text-sm rounded-md hover:bg-primary-dark transition-all duration-300"
          />
        </form>
      </header>
      <main className="flex flex-col w-full md:flex-row">
        <form
          className="p-4 py-8 font-Roboto text-secondary 
                         text-sm font-normal w-full 
                         md:pl-8 md:pr-0 md:w-1/3 sm:text-lg"
        >
          <input
            type="checkbox"
            checked={fullTime}
            className="w-4 h-4 mx-3 mb-4"
            onChange={handleFullTime}
          />{" "}
          Full Time
          <br />
          <label className="font-bold text-gray-400">Location</label>
          <div
            className="flex items-center bg-white 
                            shadow rounded p-4 my-4 gap-2 w-full "
          >
            <BiWorld />
            <input
              type="text"
              className="text-sm outline-none grow w-full"
              placeholder="City, state, zip code or country"
              onChange={(e) => handleLocation(e)}
            />
          </div>
          <label>
            <input
              type="radio"
              name="radio-location"
              className="w-4 h-4 mx-3 mb-4"
              value="Philippines"
              onClick={(e) => handleLocation(e)}
            />
            Philippines
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="radio-location"
              className="w-4 h-4 mx-3 mb-4"
              value="London"
              onClick={(e) => handleLocation(e)}
            />
            London
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="radio-location"
              className="w-4 h-4 mx-3 mb-4"
              value="New York"
              onClick={(e) => handleLocation(e)}
            />
            New York
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="radio-location"
              className="w-4 h-4 mx-3 mb-4"
              value="Japan"
              onClick={(e) => handleLocation(e)}
            />
           Japan
          </label>
          <br />
        </form>
        <section className="p-4 w-full md:w-2/3 md:p-8 ">
          {/* {demo.jobs_results.map((item,i) => <JobCard key={i} data={item}/>)} */}
          {apiData == null ? (
            <div className="flex flex-col justify-center items-center h-full">
              <svg
                aria-hidden="true"
                className="w-12 h-12 mr-2 text-white 
                           animate-spin dark:text-gray-300 
                           fill-pink-600 mb-4 "
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <h3>Loading Jobs...</h3>
            </div>
          ) : (
            apiData && <JobCards apiData={apiData} pagination={pagination} />
          )}
        </section>
      </main>
    </div>
  );
}
export default MainPage;
