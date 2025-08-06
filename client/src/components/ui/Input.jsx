// src/components/ui/Input.jsx

import * as React from "react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={
        "flex h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-50 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50 " + className
      }
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };