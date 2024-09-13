import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
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
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">
              Search Job</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Better Way to Find Opportunities</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Finding your next job opportunity just got easier. With Search Job, you can streamline your job hunt and land the right position faster. Say goodbye to tedious application processes and hello to an optimized workflow designed to get you hired quickly
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
              A Better Workflow, A Brighter Future At Search Job, we believe in providing tools that save you time and effort. Easily create and update your profile, browse personalized job listings, and apply with just a few clicks. Our platform helps you focus on what matters most: landing the job that’s right for you.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900 mr-1">Secure and Efficient Process Push to deploy.</strong> 
                    We take care of the technical details, so you don’t have to. With automatic database backups and SSL encryption, 
                    your data is secure, allowing you to focus on job searching without worry.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900 mr-1">Push to Apply</strong> 
                    Gone are the days of filling out endless forms. With our "push to apply" feature,
                     you can apply to multiple jobs at once, saving you time and keeping you organized.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900 mr-1">Job Search Without the Hassle</strong>  
                    No company website? No problem. Our platform is built to give you access to job listings
                     from a variety of sources, so you never miss out on an opportunity. 
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Unlock your potential with ease and efficiency. Our platform is designed to streamline your job search, making the process as smooth as possible. Whether you're looking for your first job or your next big opportunity, we've got you covered. With advanced search filters and personalized recommendations, finding the right job has never been easier.
                </p>
                <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">No experience with server management? No problem.</h2>
                <p className="mt-2"> You don't need a technical background to get started. Our platform does the heavy lifting for you, providing seamless integration with job boards and recruitment sites. Effortlessly manage your applications and focus on what matters—finding the job that's the perfect fit for you. Stay ahead of the competition without worrying about complex processes, and let us handle the backend work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
