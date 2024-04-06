import React from "react";

const Error = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-red-600 font-bold p-1  text-sm">{children}</p>;
};

export default Error;
