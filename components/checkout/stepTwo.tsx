"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';


const StepTwo = ({
  toggleStep,
  openSteps,
  setOpenSteps,
  // packageSaved,
  // packageData,
  // setPackageSaved,
  // setPackageData,
  user 
}:any) => {


    const [packageData, setPackageData] = useState({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      postalCode: "",
      city: "",
    });


      const [packageSaved, setPackageSaved] = useState(false);
    



      const inputstyling =
    "w-full bg-gray-50 border hover:bg-white p-3 outline-none";

  const headingStyling =  
    "text-black text-[24px] font-semibold flex items-center gap-3";

  const editBtnClass =
    "rounded-none h-10 w-full lg:w-auto text-black bg-transparent border border-black";



      useEffect(() => {
        if (user) {
          setPackageData({
            firstName: user?.first_name || "",
            lastName: user?.last_name || "",
            address1: "",
            address2: "",
            postalCode: user?.postal_code,
            city: "",
          });
        }
      }, [user]);


  return (
    <div>

     <div className="p-4 lg:p-6 border-b">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleStep("package")}
            >
              <div className={`${headingStyling} text-[18px] lg:text-[24px]`}>
                <p>2</p>
                <p>Package Options</p>
              </div>
              <span className="text-[22px]">
                {openSteps.package ? "−" : "+"}
              </span>
            </div>

            {packageSaved && (
              <div className="border p-4 mt-5">
                <p className="font-semibold">
                  {packageData.firstName} {packageData.lastName}
                </p>
                <p>{packageData.address1}</p>
                <p>{packageData.address2}</p>
                <p>
                  {packageData.city}, {packageData.postalCode}
                </p>
              </div>
            )}

            {openSteps.package && !packageSaved && (
              <div className="mt-4 space-y-3">

                <input
                  value={packageData.firstName}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      firstName: e.target.value,
                    })
                  }
                  className={inputstyling}
                  placeholder="First Name*"
                />

                <input
                  value={packageData.lastName}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      lastName: e.target.value,
                    })
                  }
                  className={inputstyling}
                  placeholder="Last Name*"
                />

                <input
                  value={packageData.address1}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      address1: e.target.value,
                    })
                  }
                  className={inputstyling}
                  placeholder="Address 1*"
                />

                <input
                  value={packageData.address2}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      address2: e.target.value,
                    })
                  }
                  className={inputstyling}
                  placeholder="Address 2*"
                />

                <div className="flex gap-2">
                  <input
                    value={packageData.postalCode}
                    onChange={(e) =>
                      setPackageData({
                        ...packageData,
                        postalCode: e.target.value,
                      })
                    }
                    className={inputstyling}
                    placeholder="Postal Code*"
                  />

                  <input
                    value={packageData.city}
                    onChange={(e) =>
                      setPackageData({
                        ...packageData,
                        city: e.target.value,
                      })
                    }
                    className={inputstyling}
                    placeholder="City*"
                  />
                </div>

                <Button
                  onClick={() => {
                    setPackageSaved(true);
                    setOpenSteps((prev:any) => ({
                      ...prev,
                      payment: true,
                    }));
                  }}
                  className="w-full rounded-none h-13 bg-black text-white mt-5  cursor-pointer"
                >
                  Save and Continue
                </Button>
              </div>
            )}


             <div className="w-full py-1 mt-3 flex justify-center">
                      {packageSaved && (
                        <Button
                          className={`rounded-none h-10 w-full   text-black bg-transparent border border-black cursor-pointer`}
                          onClick={() => {
                            setPackageSaved(false);
                            setOpenSteps((prev: any) => ({
                              ...prev,
                              contact: true,
                            }));
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </div>


          </div>
    </div>

  )
}

export default  React.memo(StepTwo) 
