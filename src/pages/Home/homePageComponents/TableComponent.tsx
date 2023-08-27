import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { getForms } from '../formSlice'
import FilterCalendar from '../../../components/FilterCalendar'
import { BsSearch } from 'react-icons/bs'

export default function TableComponent() {
  const { userFormData } = useAppSelector((state) => state.form)
  const { dateRange } = useAppSelector((state) => state.table)
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = React.useState('');
  let filteredData
  try {

    filteredData = userFormData?.filter(item => {
      // Convert the createdAt value to a Date object
      const createdAt = new Date(item.createdAt);
      // Check if the createdAt value is within the selected date range
      return (
        (!dateRange[0] || createdAt >= dateRange[0]) &&
        (!dateRange[1] || createdAt <= dateRange[1])
      );
    })
      .filter(item => {
        // Check if the item matches the search query
        return Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
  } catch (error) {
    console.log(error)
  }
  React.useEffect(() => {
    const gettingForms = async () => dispatch(getForms())
    gettingForms()
  }, [dispatch])
  return (
    userFormData?.length > 0 ?
      <div className=' md:mx-[1%] p-2 rounded-lg '>
        <div className="mt-3 bg-[#F7FAFC] overflow-y-auto w-screen sm:w-auto rounded-[24px]">
          <div className="p-5 flex flex-col gap-2 sm:gap-0 sm:flex-row sm:items-center sm:justify-between ">
            <div>
              <p className="text-[16px] capitalize leading-[16px] font-metroSemiBold">
                Previous Submissions:
              </p>
            </div>
            <div className="flex justify-between sm:justify-normal sm:flex-row sm:items-center gap-1 sm:gap-3">
              <div className="w-[190px]">
                <label
                  htmlFor="search"
                  className="w-full relative text-gray-400 focus-within:text-gray-600 block"
                >
                  <BsSearch
                    className="absolute left-3 top-[25%]"
                    height={24}
                    fill="#818181"
                    width={24}
                  />
                  <input
                    type="search"
                    name="search"
                    id="search"
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search By Name"
                    className="bg-white w-full border border-[#ebebeb] focus:outline-none font-sans1 rounded-[8px] pl-10 py-1  "
                  />
                </label>
              </div>
              <div className="flex gap-1">

                <div className="ml-auto w-[91px]">
                  <FilterCalendar />
                </div>
              </div>
            </div>
          </div>
          <table className="table-auto mr-2 sm:mr-auto lg:w-full w-[900px] border-y">
            <thead className="">
              <tr className="bg-[#E3E3E333] h-[50px]">

                <th className='text-[#818181] text-center font-light py-2 font-metroMedium text-xs sm:text-[14px]'>
                  Name
                </th>
                <th className='text-[#818181] text-center font-light py-2 font-metroMedium text-xs sm:text-[14px]'>
                  Email
                </th>
                <th className='text-[#818181] text-center font-light py-2 font-metroMedium text-xs sm:text-[14px]'>
                  Phone
                </th>
                <th className='text-[#818181] text-center font-light py-2 font-metroMedium text-xs sm:text-[14px]'>
                  Address
                </th>
                <th className='text-[#818181] text-center font-light py-2 font-metroMedium text-xs sm:text-[14px]'>
                  Geolocation
                </th>
                <th className='text-[#818181] px-4 text-center font-light py-2 font-metroMedium text-xs sm:text-[14px]'>
                  Files
                </th>
                <th className='text-[#818181]  pr-3 text-center font-light py-2 font-metroMedium text-xs sm:text-[14px]'>
                  Languages
                </th>
              </tr>
            </thead>
            <tbody>

              {
                filteredData?.map((form) =>
                  filteredData.length > 0 && (
                    <tr key={form._id} className='' >
                      <td className='pl-2 text-center border-y text-md sm:py-2 text-[#414141] font-metroRegular text-[8px] lg:text-[15px]'>
                        {form.name}
                      </td>
                      <td className='pl-2 text-center border-y text-md sm:py-2 text-[#414141] font-metroRegular text-[8px] lg:text-[15px]'>
                        {form.email}
                      </td>
                      <td className='pl-2 text-center border-y text-md sm:py-2 text-[#414141] font-metroRegular text-[8px] lg:text-[15px]'>
                        {form.phone}
                      </td>
                      <td className='pl-2 text-center border-y text-md sm:py-2 text-[#414141] font-metroRegular text-[8px] lg:text-[15px]'>
                        {
                          Object.keys(form.address).map((addressKey) => {
                            if (addressKey !== '_id') {
                              return `${form.address[addressKey]}, `
                            }
                            return
                          })
                        }
                      </td>
                      <td className='pl-2 text-center border-y text-md sm:py-2 text-[#414141] font-metroRegular text-[8px] lg:text-[15px]'>
                        {form.geolocationStatus === '' ? '-' : form.geolocationStatus}
                      </td>
                      <td className='pl-2 pr-2 text-center border-y text-md sm:py-2 text-[#414141] font-metroRegular text-[8px] sm:text-[15px]'>
                        {
                          form.files.length === 0 ? '-' :
                            form.files.map((file) => <span key={file.id}>{file.name} <br /></span>)
                        }
                      </td>
                      <td className='pl-2 pr-2  text-center border-y text-md sm:py-2 text-[#414141] font-metroRegular text-[8px] lg:text-[15px]'>
                        {
                          form.languages.length === 0 ? '-' :
                            form.languages.map((language) => <span >{language} <br /></span>)
                        }
                      </td>
                    </tr>
                  )
                )
              }

            </tbody>

          </table>
          {
            filteredData?.length === 0 && <div className='text-3xl mt-10 w-full font-metroBold flex justify-center items-center'>Nothing to show!</div>
          }
        </div>
      </div>
      :
      <div className="flex mt-[65%] lg:mt-[10%] font-metroSemiBold text-xl sm:text-2xl gap-3 flex-col justify-center items-center">
        You have no previous Submissions!
        <button data-hs-overlay="#hs-vertically-centered-scrollable-modal" className="p-3 text-base rounded-full text-white bg-blue-500">Create One</button>
      </div>
  )
}