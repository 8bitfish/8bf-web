import React from "react";

export const MainContainer = ({
  children,
}: {
  children: React.ReactChild[];
}): JSX.Element => {
  // Move to landing for new page
  return (
    <div className="h-[100vh] flex flex-col justify-between">{children}</div>
  );
};
