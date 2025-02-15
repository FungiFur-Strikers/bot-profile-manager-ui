import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef, ReactNode } from "react";

export interface InputLabelProps extends InputProps {
  label?: string;
  name?: string;
  errorMessage?: ReactNode;
}

export const InputLabelComponent = forwardRef<
  HTMLInputElement,
  InputLabelProps
>(({ label, placeholder, value, name, errorMessage, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <div>
        {label && (
          <Label htmlFor={props.id} className="text-sm font-medium">
            {label}
          </Label>
        )}
        <Input
          placeholder={placeholder}
          value={value}
          name={name}
          className="w-full"
          ref={ref}
          {...props}
        />
      </div>

      {errorMessage}
    </div>
  );
});
