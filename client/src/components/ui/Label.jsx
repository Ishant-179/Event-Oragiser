// src/components/ui/Label.jsx

import * as React from "react";
import { cva } from "class-variance-authority";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    className={labelVariants({ className })}
    ref={ref}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };