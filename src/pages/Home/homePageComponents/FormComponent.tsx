
import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IFormData } from '../../../interfaces/form'
import { formSubmit, getForms } from '../formSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Loader } from '../../../components/Loader';
import Select from 'react-select';
const options = [
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'English', label: 'English' },
  { value: 'Telugu', label: 'Telugu' },
];

export default function FormComponent() {
  const loading = useAppSelector(state => state.form.loading)
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<readonly { value: string; label: string; }[]>([]);
  const { register, handleSubmit, control, reset, formState: { errors, isValid } } = useForm<IFormData>({ mode: "all" });
  const [geolocationStatus, setGeolocationStatus] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    data.geolocationStatus = geolocationStatus
    data.languages = [...selectedOptions];
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'files') {
        Array.from(data.files).forEach(file => formData.append('files', file));
      }
      else if (key === 'address') {
        Object.keys(data.address).forEach(addressKey => {
          formData.append(`address[${addressKey}]`, data.address[addressKey]);
        })
      } else if (key === 'languages') {
        data.languages.forEach(language =>
          formData.append('languages', language.value)
        );
      }
      else {
        formData.append(key, data[key]);
      }
    })
    await dispatch(formSubmit(formData))
    await dispatch(getForms())
    reset()
    setStep(1);

    (document.querySelector('[data-hs-overlay="#hs-vertically-centered-scrollable-modal"]') as HTMLElement).click();
    

  }

  const handleButtonClick = () => {
    // Trigger a click event on the hidden file input element
    fileInputRef.current?.click();
  };
  const handleGeolocation = () => {
    setGeolocationStatus('Acquiring coordinates...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocationStatus(`Coordinates recorded: ${position.coords.latitude}, ${position.coords.longitude}`);
      },
      (error) => {
        setGeolocationStatus(`Error acquiring coordinates: ${error.message}`);
      }
    );
  };


  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className='font-metroRegular'>
      <button type="button" className="sm:py-3 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
        New Submission
      </button>

      <div id="hs-vertically-centered-scrollable-modal" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-4xl sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-2rem)] flex justify-center items-center">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl ">
            <div className="flex justify-between items-center py-3 px-4 border-b">
      
              <div className="flex flex-col min-w-full  ">
                          <div className="flex-1 mr-2">
                            <div className="rounded bg-gray-200 h-2">
                              <div
                                className="rounded w-full !bg-indigo-500 h-2"
                                style={{ width: `${(step / 3) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div>Step {step} of 3</div>
                        </div>
              
            </div>
            <div className="p-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  {loading && <Loader />}
                  <div className="" >

                    <form onSubmit={handleSubmit(onSubmit)} className='' >
                      <div className=''>
                        
                        {step === 1 && (
                          <div className='bg-white flex flex-col'>
                            <legend className='font-metroBold text-xl'>Basic Information:</legend>
                            <div className='flex sm:flex-row flex-col gap-2'>


                              <div className=''>
                                <label className='font-metroSemiBold' htmlFor="name">Name:
                                </label>
                                <br />
                                <input
                                  className='border-2 border-gray-500 px-2 py-1 rounded-full'
                                  type="text"
                                  id="name"
                                  {...register('name', {
                                    required: {
                                      value: true,
                                      message: `please provide name`
                                    }
                                  })}
                                />
                                {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                              </div>
                              <div>
                                <label className='font-metroSemiBold' htmlFor="email">Email:
                                </label>
                                <br />
                                <input
                                  className='border-2 border-gray-500 px-2 py-1 rounded-full'
                                  type="email"
                                  id="email"

                                  {...register('email', {
                                    required: {
                                      value: true,
                                      message: `please provide email`
                                    }
                                  })}
                                />
                                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                              </div>
                              <div>
                                <label className='font-metroSemiBold' htmlFor="phone">Phone: </label>
                                <br />
                                <input
                                  className='border-2 border-gray-500 px-2 py-1 rounded-full'
                                  type="tel"
                                  id="phone"
                                  {...register('phone', {
                                    required: {
                                      value: true,
                                      message: `please provide number`
                                    }
                                  })}
                                />


                                {errors.phone && <p className='text-red-600'>{errors.phone.message}</p>}
                              </div>
                            </div>







                            <fieldset className='flex flex-col'>
                              <legend className='text-xl font-metroBold'>Address:</legend>
                              <label className='font-metroSemiBold' htmlFor="line1">Address Line 1</label>
                              <input
                                className='border-2 border-gray-500 px-2 py-1 rounded-full'
                                type="text"
                                id="line1"

                                {...register('address.line1', {
                                  required: {
                                    value: true,
                                    message: `please provide address`
                                  }
                                })}

                              />
                              {errors.address?.line1 && <p className='text-red-600'>{errors.address.line1.message}</p>}
                              <label className='font-metroSemiBold' htmlFor="line2">Address Line 2</label>
                              <input
                                className='border-2 border-gray-500 px-2 py-1 rounded-full'
                                type="text"
                                id="line2"
                                {...register('address.line2')}
                              />
                              <label className='font-metroSemiBold' htmlFor="city">City</label>
                              <input
                                className='border-2 border-gray-500 px-2 py-1 rounded-full'
                                type="text"
                                id="city"
                                {...register('address.city', {
                                  required: {
                                    value: true,
                                    message: `please provide city`
                                  }
                                })}

                              />
                              {errors.address?.city && <p className='text-red-600'>{errors.address.city.message}</p>}

                              <label className='font-metroSemiBold' htmlFor="state">State</label>
                              <input
                                className='border-2 border-gray-500 px-2 py-1 rounded-full'
                                type="text"
                                id="state"
                                {...register('address.state', {
                                  required: {
                                    value: true,
                                    message: `please provide state`
                                  }
                                })}

                              />
                              {errors.address?.state && <p className='text-red-600'>{errors.address.state.message}</p>}
                              <label className='font-metroSemiBold' htmlFor="pincode">Pincode</label>
                              <input
                                className='border-2 border-gray-500 px-2 py-1 rounded-full'
                                type="text"
                                {...register('address.pincode', {
                                  required: {
                                    value: true,
                                    message: `please provide pincode`
                                  }
                                })}

                              />
                              {errors.address?.pincode && <p className='text-red-600'>{errors.address.pincode.message}</p>}
                              <label className='font-metroSemiBold' htmlFor="country">Country</label>
                              <input
                                className='border-2 border-gray-500 px-2 py-1 rounded-full'
                                type="text"
                                id="country"
                                {...register('address.country', {
                                  required: {
                                    value: true,
                                    message: `please provide country`
                                  }
                                })}

                              />
                              {errors.address?.country && <p className='text-red-600'>{errors.address.country.message}</p>}
                            </fieldset>
                          </div>
                        )}
                        {step === 2 && (
                          <div className='flex flex-col sm:px-36 gap-4'>
                            <label className='font-metroSemiBold' htmlFor="files">
                              Upload Files (PNG or PDF, up to 3 files)
                            </label>
                            <Controller
                              name="files"
                              control={control}
                              defaultValue={[]}
                              render={({ field }) => (
                                <>
                                  <input
                                    className="hidden"
                                    type="file"
                                    ref={fileInputRef}
                                    id="files"
                                    accept=".png,.pdf"
                                    multiple
                                    onChange={(event) => {
                                      if (event.target.files && event.target.files.length <= 3) {
                                        field.onChange(event.target.files);
                                      }
                                    }}
                                  />
                                  <button className='bg-indigo-500 text-white p-2 px-2 py-1 rounded-full' type="button" onClick={handleButtonClick}>
                                    Select Files {field.value.length > 0 && field.value.length}
                                  </button>
                                  <ul>
                                    {Array.from(field.value).map((file, index) => (
                                      <li key={index}>{file.name}</li>
                                    ))}
                                  </ul>
                                  {field.value.length === 3 && <div className='text-red-600'>You cannot add anymore files</div>}
                                </>
                              )}
                            />
                            <button
                              type="button"
                              onClick={handleGeolocation}
                              className="bg-indigo-500 rounded-full text-white px-4 py-2  hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
                            >
                              Record Geolocation
                            </button>
                            <p>{geolocationStatus}</p>
                          </div>
                        )}
                        {step === 3 && (
                          <div className='h-[200px] flex flex-col gap-4'>
                            <span className='font-metroBold text-xl'>Select All the Languages You know:</span>
                            <Select
                              isMulti
                              options={options}
                              onChange={(newValue)=>setSelectedOptions(newValue)}
                             
                            />
                    
                          </div>
                        )}
                        <div className='flex border-t px-32 py-2 items-center justify-center'>
                          {step > 1 && (
                            <button
                              type="button"
                              onClick={handlePrevious}
                              className="bg-indigo-500 rounded-full text-white px-4 py-2  mr-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
                            >
                              Previous
                            </button>
                          )}
                          {step < 3 && (

                            <button
                              type="button"
                              onClick={handleNext}
                              disabled={!isValid}
                              className="bg-indigo-500 rounded-full text-white px-4 py-2 disabled:bg-gray-400  hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
                            >
                              Next
                            </button>

                          )}
                          {step === 3 &&
                            (
                              <button
                                type="submit"
                                //  data-hs-overlay="#hs-vertically-centered-scrollable-modal"
                                className="bg-indigo-500 rounded-full  text-white px-4 py-2  hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
                              >
                                Submit
                              </button>
                            )

                          }
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button type="button" className="hs-dropdown-toggle py-3 px-4 bg-red-500 text-white inline-flex justify-center items-center gap-2 px-2 py-1 rounded-full border font-mediumshadow-sm align-middle hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
                Cancel
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
