import React from "react";

export const LandingContainer = ({
  children,
}: {
  children: React.ReactChild[] | React.ReactChild;
}): JSX.Element => {
  return (
    <div className="h-full flex items-center">
      <div className="w-full flex flex-row items-center justify-center">
        {children}
      </div>
    </div>
  );
};
