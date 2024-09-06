import { Link, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BiWorld, BiTimeFive } from "react-icons/bi";

function JobInfoPage() {
  let { state } = useLocation();

  if (!state || !state.page) {
    return (
      <div className="bg-background min-h-screen text-secondary flex justify-center items-center">
        <p>Error: Job information is not available.</p>
      </div>
    );
  }

  var dateTimeExp = new Date(state.page.job_offer_expiration_timestamp * 1000);
  var dateTimePosted = new Date(state.page.job_posted_at_timestamp * 1000);
  var des = state.page.job_description;
  des = des.replaceAll("\n\n", "<br/>").replaceAll("•", "-");
  let keys = Object.keys(state.page.job_highlights);

  return (
    <div className="bg-background min-h-screen text-secondary">
      <div className="font-Poppins max-w-full p-4 text-2xl md:p-8 cursor-pointer text-black sticky top-0 bg-background">
        <b>Jobs</b> Portal
      </div>
      <main className="flex flex-wrap md:flex-nowrap">
        <aside className="px-4 mb-4 md:px-8 w-full h-fit md:max-w-xs bg-background">
          <Link to="/" state={{ pagination: state.pagination }} className="flex items-center gap-4 mb-4">
            <HiOutlineArrowNarrowLeft className="text-primary text-base inline" />
            <span className="text-primary text-base"> Back to search </span>
          </Link>
          <div className="mb-4">
            <h3 className="text-[#B9BDCF] uppercase text-base font-bold mb-4">
              How to Apply
            </h3>
            <div className="mb-2">
              <span className="font-semibold ">Company website:</span>{" "}
              {state.page.employer_website ? (
                <a href={state.page.employer_website} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-blue-500">
                  {state.page.employer_name}
                </a>
              ) : (
                <span className="text-gray-500">{state.page.employer_name}</span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Salary:</span> As per the Industry Standard
            </div>
            <div className="mb-2">
              <span className="font-semibold">Publisher:</span> {state.page.job_publisher ? state.page.job_publisher : "NA"}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Apply Before:</span>{" "}
              <span className="underline underline-offset-2 decoration-wavy decoration-violet-500">
                {dateTimeExp.toDateString()}
              </span>
            </div>
            <a href={state.page.job_apply_link} target="_blank" rel="noopener noreferrer">
              <button className="bg-primary mb-4 text-white bg-blue-500 px-4 py-2 text-base rounded-md flex-none hover:bg-sky-700">
                Apply Now
              </button>
            </a>
          </div>
        </aside>
        <section className="w-full md:w-3/4 px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4">
            <h1 className="text-2xl font-bold">{state.page.job_title}</h1>
            <div className="border-2 text-xs rounded px-2 py-1 border-secondary">
              {state.page.job_employment_type}
            </div>
          </div>
          <div className="text-gray-400 text-xs mb-8 flex items-center gap-2">
            <BiTimeFive className="inline" />
            <span>{dateTimePosted.toDateString()}</span>
          </div>

          <div className="flex gap-4 flex-wrap mb-8">
            <img
              src={
                state.page.employer_logo
                  ? state.page.employer_logo
                  : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
              }
              alt="company img"
              className="h-16 w-16 border rounded-md"
            />
            <div className="flex flex-col justify-around">
              <h3 className="text-base font-bold truncate">{state.page.employer_name}</h3>
              <div className="text-gray-400 text-xs flex items-center gap-2">
                <BiWorld className="inline" />
                <span>{state.page.job_country}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Job Info:</h3>
            <hr className="mb-4 border-secondary" />
            <div className="font-Poppins whitespace-break-spaces text-sm leading-relaxed">
              {parse(des)}
            </div>
          </div>

          {keys.map((item, i) => (
            <div key={i} className="mb-8">
              <h3 className="text-lg font-bold mb-4">{item.replace(/_/g, " ").toUpperCase()}:</h3>
              <hr className="mb-4 border-secondary" />
              <ul className="list-disc ml-4 text-sm leading-relaxed">
                {state.page.job_highlights[item].map((pro, j) => (
                  <li key={j} className="mb-2">
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default JobInfoPage;
