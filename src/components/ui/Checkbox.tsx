import { Check } from "lucide-react";
import { ReactNode, forwardRef } from "react";

type Props = {
  id: string;
  checked?: boolean;
  textHtmlFormat?: ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ id, checked, textHtmlFormat, onChange, name }, ref) => {
    return (
      <label className="cursor-pointer inline-flex">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          hidden
        />

        <div className="flex gap-3 items-center">
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-sm border border-(--neutral-light-grey)
            ${checked ? "bg-(--primary)" : "bg-(--neutral-white)"}`}
          >
            {checked && <Check width={24} height={16} className="text-white" />}
          </div>

          <div className="text-(--neutral-light-grey) select-none">
            {textHtmlFormat}
          </div>
        </div>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
