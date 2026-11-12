"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const StepTwo = ({
  toggleStep,
  openSteps,
  setOpenSteps,
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

  const inputstyling = "w-full bg-gray-50 border hover:bg-white p-3 outline-none";
  const headingStyling = "text-black text-[24px] font-semibold flex items-center gap-3";

  useEffect(() => {
    if (user) {
      setPackageData({
        firstName: user?.first_name || "",
        lastName: user?.last_name || "",
        address1: "",
        address2: "",
        // ✅ FIX: Number ko String me convert kiya taake .trim() kaam kare
        postalCode: user?.postal_code ? String(user.postal_code) : "",
        city: "",
      });
    }
  }, [user]);

  // ✅ VALIDATION LOGIC
  const handleSaveContinue = () => {
    // Safe approach: String() me wrap kar ke trim karein
    if (
      !String(packageData.firstName).trim() || 
      !String(packageData.lastName).trim() || 
      !String(packageData.address1).trim() || 
      !String(packageData.postalCode).trim() || 
      !String(packageData.city).trim()
    ) {
      toast.error("Please fill all required fields (Address 1, City, Postal Code etc.).", { position: "top-center" });
      return;
    }

    setPackageSaved(true);
    setOpenSteps((prev:any) => ({
      ...prev,
      payment: true,
    }));
  };

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
            {packageData.address2 && <p>{packageData.address2}</p>}
            <p>
              {packageData.city}, {packageData.postalCode}
            </p>
          </div>
        )}

        {openSteps.package && !packageSaved && (
          <div className="mt-4 space-y-3">
            <div className="flex flex-col lg:flex-row gap-2">
              <input
                value={packageData.firstName}
                onChange={(e) => setPackageData({ ...packageData, firstName: e.target.value })}
                className={inputstyling}
                placeholder="First Name*"
              />
              <input
                value={packageData.lastName}
                onChange={(e) => setPackageData({ ...packageData, lastName: e.target.value })}
                className={inputstyling}
                placeholder="Last Name*"
              />
            </div>

            <input
              value={packageData.address1}
              onChange={(e) => setPackageData({ ...packageData, address1: e.target.value })}
              className={inputstyling}
              placeholder="Address 1*"
            />

            {/* 👇 Address 2 is Optional */}
            <input
              value={packageData.address2}
              onChange={(e) => setPackageData({ ...packageData, address2: e.target.value })}
              className={inputstyling}
              placeholder="Address 2 (Optional)"
            />

            <div className="flex flex-col lg:flex-row gap-2">
              <input
                value={packageData.postalCode}
                onChange={(e) => setPackageData({ ...packageData, postalCode: e.target.value })}
                className={inputstyling}
                placeholder="Postal Code*"
              />
              <input
                value={packageData.city}
                onChange={(e) => setPackageData({ ...packageData, city: e.target.value })}
                className={inputstyling}
                placeholder="City*"
              />
            </div>

            <Button
              onClick={handleSaveContinue}
              className="w-full rounded-none h-13 bg-black text-white mt-5 cursor-pointer hover:bg-gray-800"
            >
              Save and Continue
            </Button>
          </div>
        )}

        <div className="w-full py-1 mt-3 flex justify-center">
          {packageSaved && (
            <Button
              className="rounded-none h-10 w-full text-black bg-transparent border border-black cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setPackageSaved(false);
                setOpenSteps((prev: any) => ({
                  ...prev,
                  package: true,
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

export default React.memo(StepTwo);