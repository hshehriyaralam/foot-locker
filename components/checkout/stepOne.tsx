import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";


const StepOne = ({ toggleStep, openSteps, setOpenSteps, user }: any) => {

  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setContactData({
        firstName: user?.first_name || "",
        lastName: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone_number || "",
      });
    }
  }, [user]);

  const [contactSaved, setContactSaved] = useState(false);

  const inputstyling =
    "w-full bg-gray-50 border hover:bg-white p-3 outline-none";

  const headingStyling =
    "text-black text-[24px] font-semibold flex items-center gap-3";

  const editBtnClass =
    "rounded-none h-10 w-full lg:w-auto text-black bg-transparent border border-black cursor-pointer";

  const cancelData = () => {
    setContactData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div>
      <div className="p-4 lg:p-6 border-b">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep("contact")}
        >
          <div className={`${headingStyling} text-[18px] lg:text-[24px]`}>
            <p>1</p>
            <p>Contact Information</p>
          </div>
          <span className="text-[22px]">{openSteps.contact ? "−" : "+"}</span>
        </div>

        {contactSaved && (
          <div className="border p-4 mt-5">
            <p className="font-semibold">
              {contactData.firstName} {contactData.lastName}
            </p>
            <p>{contactData.email}</p>
            <p>{contactData.phone}</p>
          </div>
        )}

        {openSteps.contact && !contactSaved && (
          <div className="w-full mt-4 space-y-3">
            <div className="flex flex-col lg:flex-row gap-2">
              <input
                value={contactData.firstName}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    firstName: e.target.value,
                  })
                }
                className={inputstyling}
                placeholder="First Name*"
              />

              <input
                value={contactData.lastName}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    lastName: e.target.value,
                  })
                }
                className={inputstyling}
                placeholder="Last Name*"
              />
            </div>

            <input
              value={contactData.email}
              onChange={(e) =>
                setContactData({
                  ...contactData,
                  email: e.target.value,
                })
              }
              className={inputstyling}
              placeholder="Email Address*"
            />

            <input
              value={contactData.phone}
              onChange={(e) =>
                setContactData({
                  ...contactData,
                  phone: e.target.value,
                })
              }
              className={inputstyling}
              placeholder="Telephone*"
            />

            <div className="flex flex-col lg:flex-row gap-3 mt-5">
              <Button
                onClick={() => {
                  setContactSaved(true);
                  setOpenSteps((prev: any) => ({
                    ...prev,
                    package: true,
                  }));
                }}
                className="rounded-none h-11 w-full lg:w-auto bg-black text-white
                      cursor-pointer "
              >
                Save and Continue
              </Button>

              <Button onClick={cancelData} className={editBtnClass}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="w-full py-1 mt-3 flex justify-center">
          {contactSaved && (
            <Button
              className={`rounded-none h-10 w-full   text-black bg-transparent border border-black cursor-pointer`}
              onClick={() => {
                setContactSaved(false);
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
  );
};

export default StepOne;
