import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TopBanner = () => {
  const bannerData = [
    {
       id : 1,
       text : 'Festival fits in ASICS, Nike, adidas & more ',
       link : 'SHOP NOW  >'
   },
    // {
    //   id: 2,
    //   text: "Get the perfect Gift",
    //   link: "Shop Gift Cards >",
    // },
    //  {
    //     id : 3,
    //     text : 'Students, Youth & Key Workers get 10% off',
    //     link : 'login >'
    // },
  ];
  return (
    <div className="w-full py-2  bg-black text-white  flex items-center justify-between px-8">
      <ChevronLeft className="w-5  text-white  cursor-pointer" />
      {bannerData?.map((data) => (
        <div key={data.id} className="flex  gap-2  text-sm  font-semibold">
          <p className="">{data.text}</p>
          <p className="underline     cursor-pointer">{data.link}</p>
        </div>
      ))}
      <ChevronRight className="w-5  text-white  cursor-pointer" />
    </div>
  );
};

export default React.memo(TopBanner);
