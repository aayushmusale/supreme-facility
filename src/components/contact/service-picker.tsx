import { serviceOptions } from "@/lib/enquiry-options";

/**
 * Radio group styled as selectable chips: every service is visible at once instead of hidden
 * in a dropdown. Native radios stay in the DOM (visually hidden), so keyboard, form posting and
 * screen readers behave exactly like a select.
 */
export function ServicePicker({
  value,
  error,
}: {
  value?: string;
  error?: string;
}) {
  return (
    <fieldset
      id="enquiry-service"
      tabIndex={-1}
      aria-describedby={error ? "enquiry-service-error" : undefined}
      aria-invalid={Boolean(error)}
      className="min-w-0 focus:outline-none"
    >
      <legend className="font-medium">
        Service of interest<span className="text-brand-700"> *</span>
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {serviceOptions.map((option, i) => (
          <label key={option.value} className="relative cursor-pointer">
            <input
              type="radio"
              name="service"
              value={option.value}
              defaultChecked={value === option.value}
              required={i === 0}
              className="peer absolute inset-0 size-full cursor-pointer opacity-0"
            />
            <span className="block rounded-full border border-line bg-white px-4 py-2 text-[0.95rem] transition-colors duration-200 hover:border-brand-600/60 peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-600">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id="enquiry-service-error" className="mt-2 text-sm font-medium text-brand-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}
