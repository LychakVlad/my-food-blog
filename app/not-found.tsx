import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <p className="mb-10 text-5xl">Page not found</p>
        <div className="flex justify-center ">
          <Link href={"/"} className="black_btn">
            Back to main page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
