import React from "react";
import Link from "next/link";
export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link {...rest} className="text-neutral-200 hover:text-white block py-2">
      {children}
    </Link>
  );
};
