import React from "react";
import Pagetext from "./Pagetext";

const PageOne = () => {
  return (
    <div className="w-full pb-10 text-white px-4 md:px-12 font-['General Sans'] mt-[1vw] md:mt-[7rem]">
      <h2 className="text-center underline w-full font-semibold text-xl text-[#999999] lg:hidden">MY COLLECTION</h2>
      <Pagetext />
    </div>
  );
};

export default PageOne;