import React, { FC } from "react";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

interface ILoadingBlockTypes {
  type: "loading" | "error";
  message: string;
}

const LoadingBlock: FC<ILoadingBlockTypes> = ({ type, message }) => {
  if (type === "loading") {
    return (
      <div className="flex items-center my-10">
        <LoadingSpinner />{" "}
        <p className="text-4xl font-semibold ml-8">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center my-10">
      <p className="text-4xl font-semibold">{message}</p>
    </div>
  );
};

export default LoadingBlock;
