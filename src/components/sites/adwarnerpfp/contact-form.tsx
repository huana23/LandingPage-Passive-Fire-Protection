"use client";

import { useState, useEffect, useRef } from "react";
import { ShieldCheckIcon } from "@/components/sites/adwarnerpfp/icons";
import { CONTACT_FIELDS } from "@/components/sites/adwarnerpfp/data";

// Load EmailJS only when the user submits the form.
const emailjsModuleRef: {
  current: Promise<typeof import("@emailjs/browser").default> | null;
} = {
  current: null,
};

function loadEmailJs() {
  if (!emailjsModuleRef.current) {
    emailjsModuleRef.current = import("@emailjs/browser").then(
      (m) => m.default,
    );
  }

  return emailjsModuleRef.current;
}

// Override browser autofill background.
const autofillOverride = `
#contact-form input:-webkit-autofill,
#contact-form input:-webkit-autofill:hover,
#contact-form input:-webkit-autofill:focus,
#contact-form textarea:-webkit-autofill,
#contact-form textarea:-webkit-autofill:hover,
#contact-form textarea:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px var(--background, #fff) inset !important;
  -webkit-text-fill-color: var(--foreground, #000) !important;
  transition: background-color 5000s ease-in-out 0s;
}
`;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  const dateInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Inject autofill styles once.
  useEffect(() => {
    const styleId = "contact-form-autofill";

    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = autofillOverride;
      document.head.appendChild(style);
    }
  }, []);

  // Scroll to the success notification after submission.
  useEffect(() => {
    if (done) {
      successRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [done]);

  const TEMPLATE_PARAM_MAP: Record<string, string> = {
    name: "name",
    company: "company",
    phone: "phone",
    email: "email",
    projectName: "project_name",
    projectLocation: "project_location",
    scope: "approximate_scope",
    startDate: "when",
    message: "message",
  };

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (submitting) return;

    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string | null)?.trim() ?? "";
    const email = (data.get("email") as string | null)?.trim() ?? "";

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitting(true);

    try {
      const templateParams: Record<string, string> = {};

      for (const [internalKey, templateKey] of Object.entries(
        TEMPLATE_PARAM_MAP,
      )) {
        const raw = data.get(internalKey);
        let value = typeof raw === "string" ? raw.trim() : "";

        // Format the date as plain text for EmailJS.
        if (
          internalKey === "startDate" &&
          /^\d{4}-\d{2}-\d{2}$/.test(value)
        ) {
          const [y, mo, d] = value.split("-").map(Number);
          const date = new Date(y, mo - 1, d);

          const formatted = date.toLocaleDateString("en-AU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          value = `Approx. ${formatted}`;
        }

        templateParams[templateKey] = value;
      }

      const emailjs = await loadEmailJs();

      await emailjs.send(
        "service_r1076ib",
        "template_o6sa02n",
        templateParams,
        {
          publicKey: "3KVGEKm65rW7Opyga",
        },
      );

      setDone(true);
      form.reset();
      setFileNames([]);
      setSelectedDate("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your enquiry.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-lg border border-foreground/10 bg-card p-6 shadow-xl shadow-foreground/5 md:p-8"
      noValidate
      style={{ colorScheme: "light" }}
    >
      {/* Decorative top accent bar */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-accent via-accent/50 to-transparent" />

      {/* Decorative corner accents */}
      <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-accent/5" />
      <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-accent/10" />

      <div className="grid gap-6">
        {/* Success notification */}
        {done && (
          <div
            ref={successRef}
            role="status"
            aria-live="polite"
            tabIndex={-1}
            className="scroll-mt-24 rounded-lg border-2 border-green-500 bg-green-50 p-6 shadow-lg dark:border-green-400 dark:bg-green-950/40"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                <ShieldCheckIcon
                  className="h-7 w-7"
                  strokeWidth={2}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold leading-tight text-green-800 dark:text-green-300">
                  Enquiry submitted successfully!
                </p>

                <p className="mt-2 text-sm leading-relaxed text-green-800 dark:text-green-200">
                  Thank you for contacting A&D Warner.
                  We have received your enquiry, and a member
                  of our team will be in touch shortly to
                  discuss the project scope and timing.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setDone(false);
                    setFileNames([]);
                    setSelectedDate("");
                    setError(null);
                  }}
                  className="mt-4 inline-flex min-h-[44px] items-center rounded-md bg-green-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500"
                >
                  Submit another enquiry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form fields */}
        <div className="grid gap-6 sm:grid-cols-2">
          {CONTACT_FIELDS.map((field) =>
            field.type === "textarea" ? (
              <div key={field.name} className="sm:col-span-2">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {field.label}
                  {field.required ? (
                    <span
                      className="ml-1 text-accent"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  ) : null}
                </label>

                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  rows={5}
                  placeholder={
                    field.name === "message"
                      ? "Tell us about the project, fireproofing systems specified, program and any fire engineering requirements."
                      : undefined
                  }
                  className="mt-2 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
            ) : (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {field.label}
                  {field.required ? (
                    <span
                      className="ml-1 text-accent"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  ) : null}
                </label>

                {field.name === "startDate" ? (
                  <div className="mt-2 relative">
                    <input
                      ref={dateInputRef}
                      id={field.name}
                      name={field.name}
                      type="date"
                      required={field.required}
                      value={selectedDate}
                      onChange={(e) =>
                        setSelectedDate(e.target.value)
                      }
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0"
                      style={{ colorScheme: "light" }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        dateInputRef.current?.showPicker()
                      }
                      className="absolute top-1/2 right-2 -translate-y-1/2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/20 hover:text-foreground"
                      aria-label="Open date picker"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                        <circle
                          cx="12"
                          cy="15"
                          r="1"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={
                      field.name === "scope"
                        ? "e.g. structural steel to Levels 3–8"
                        : undefined
                    }
                    className="mt-2 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:[color-scheme:dark]"
                  />
                )}
              </div>
            ),
          )}

          {/* Attachments */}
          <div className="sm:col-span-2">
            <label
              htmlFor="attachments"
              className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Drawings, specifications or photos
            </label>

            <label
              htmlFor="attachments"
              className="mt-2 flex min-h-[44px] w-full cursor-pointer items-center gap-3 border border-dashed border-foreground/30 bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
              >
                <path d="M13.234 20.252 21 12.3" />
                <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656l-5.656 0a4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
              </svg>

              {fileNames.length === 0
                ? "Attach up to 5 files (10MB each)"
                : `${fileNames.length} / 5 files selected — click to add more`}
            </label>

            <input
              id="attachments"
              name="attachments"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.dwg"
              className="sr-only"
              onChange={(e) => {
                const files = Array.from(
                  e.currentTarget.files ?? [],
                );

                setFileNames((prev) => {
                  const combined = [
                    ...prev,
                    ...files.map((file) => file.name),
                  ];

                  return combined.slice(0, 5);
                });
              }}
            />

            {/* Selected file list */}
            {fileNames.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1.5">
                {fileNames.map((name, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 rounded border border-border bg-muted/50 px-3 py-2 text-sm"
                  >
                    <span
                      className="truncate text-foreground"
                      title={name}
                    >
                      {name}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setFileNames((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        )
                      }
                      className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive"
                      aria-label={`Remove ${name}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Error message */}
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        {/* Submit button */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-[44px] items-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-foreground hover:text-background hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit enquiry"}
          </button>
        </div>
      </div>
    </form>
  );
}
