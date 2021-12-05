import React from "react";

export const TokenContainer = ({
  children,
}: {
  children: React.ReactChild;
}) => {
  return (
    <div className="bg-white/5 h-[100vh] flex flex-col justify-between">
      <div className="h-full flex items-center">
        <div className="w-full flex flex-row items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};
