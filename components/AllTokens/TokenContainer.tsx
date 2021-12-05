import React from "react";

export const TokenContainer = ({
  children,
}: {
  children: React.ReactChild;
}) => {
  return (
    <div className="w-full flex items-center justify-center">{children}</div>
  );
};
