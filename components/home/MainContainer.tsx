import React from "react";

export const MainContainer = ({
  children,
}: {
  children: React.ReactChild[];
}): JSX.Element => {
  return (
    <div className="h-[100vh] flex flex-col justify-between">{children}</div>
  );
};
