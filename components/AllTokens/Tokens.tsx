import React from "react";

export const Tokens = ({ children }: { children: React.ReactChild[] }) => {
  return (
    <div className="w-3/4">
      <div className="grid auto-rows-auto auto-cols-max grid-cols-tokens gap-2 text-center">
        {children}
      </div>
    </div>
  );
};
