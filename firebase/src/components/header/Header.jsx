import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { FaSearchLocation } from "react-icons/fa";
import './Header.css'


const features = [
  {
    name: 'Secure and Reliable',
    description:
      'We prioritize your privacy and security, safeguarding your personal information while you explore and apply for positions.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Streamlined Job Search',
    description:
      'Quickly search and filter opportunities by keyword, location, and industry to connect with the perfect role faster.',
    icon: LockClosedIcon,
  },
  {
    name: 'Organized Application Management',
    description:
      'Efficiently manage your job applications with our simple and intuitive tracking system. Stay organized and never miss an opportunity.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Enhanced User Experience',
    description:
      ' Tailored job recommendations and a detailed overview of job postings ensure you find the best matches for your career goals.',
    icon: FingerPrintIcon,
  },
]

export default function Example() {
  return (
    <div className="py-24 sm:py-32">
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Empower Your Career <span className='text-pink-500'>Search</span> One Platform,<span className='text-pink-500'>  Infinite Opportunities</span>
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Our platform aggregates job listings from leading sources, including LinkedIn, Indeed, Glassdoor, and more, allowing you to search, filter, and explore opportunities all in one place.
          </p>
          <div className="items-center justify-center mt-5">
          <a href="/main"><span className="text-base font-semibold leading-7 text-white mt-3 bg-pink-500 p-3 rounded-full">Search the perfect job <FaSearchLocation className='inline text-1xl' /> </span></a>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
