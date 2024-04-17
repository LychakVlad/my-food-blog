"use client";

import Link from "next/link";
import React from "react";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <p className="mb-10 text-6xl font-bold">
          {error.message || "Something went wrong"}
        </p>
        <div className="flex justify-center mt-6 gap-10">
          <button onClick={reset} className="black_btn">
            Try again
          </button>
          <Link href={"/"} className="black_btn">
            Go to your profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
