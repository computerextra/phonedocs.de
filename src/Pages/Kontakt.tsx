import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { z } from "zod";
import Datenschutz from "./Datenschutz";

const fehlerOptionen = [
  "Displaywechsel",
  "Akkuwechsel",
  "Wasserschaden",
  "Ladebuchse reparieren",
  "Kostenvoranschlag",
  "Fehlerdiagnose",
  "Datensicherung",
  "Recycling",
] as const;

function isValidPhoneNumber(value: string) {
  if (!/^[0-9+()\s/-]+$/.test(value)) {
    return false;
  }

  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) {
    return false;
  }

  const compact = value.replace(/\s+/g, "");
  const hasPrefix = compact.startsWith("+") || compact.startsWith("0");

  if (hasPrefix) {
    return digits.length >= 6;
  }

  return digits.length >= 3 && digits.length <= 8;
}

const kontaktSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  telefonnummer: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || isValidPhoneNumber(value),
      "Bitte geben Sie eine gültige Telefonnummer ein.",
    ),
  email: z.email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  geraet: z.string().min(2, "Bitte geben Sie ein Gerät an (z. B. iPhone 16)."),
  fehler: z.string().min(1, "Bitte wählen Sie einen Fehler aus."),
  fehlerbeschreibung: z
    .string()
    .min(10, "Bitte beschreiben Sie den Fehler etwas genauer."),
  datenschutz: z
    .boolean()
    .refine((value) => value, "Bitte stimmen Sie der Datenschutzerklärung zu."),
});

function firstError(errors: unknown[] | undefined) {
  if (!errors || errors.length === 0) {
    return null;
  }

  const first = errors[0];
  return typeof first === "string" ? first : "Bitte Eingabe prüfen.";
}

function fieldBase(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white/85 px-4 py-3.5 text-slate-900 shadow-sm shadow-blue-900/5 outline-none backdrop-blur-xs transition duration-200",
    hasError
      ? "border-red-300 ring-2 ring-red-200"
      : "border-blue-100 focus:-translate-y-px focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
  ].join(" ");
}

export default function Kontakt() {
  const [submitInfo, setSubmitInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!isPrivacyOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPrivacyOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isPrivacyOpen]);

  const form = useForm({
    defaultValues: {
      name: "",
      telefonnummer: "",
      email: "",
      geraet: "",
      fehler: "",
      fehlerbeschreibung: "",
      datenschutz: false,
    },
    onSubmit: async ({ value }) => {
      setSubmitInfo(null);

      const parsed = kontaktSchema.safeParse(value);
      if (!parsed.success) {
        setSubmitInfo({
          type: "error",
          message: "Bitte prüfen Sie Ihre Eingaben im Formular.",
        });
        return;
      }

      const payload = new FormData();
      payload.append("name", parsed.data.name);
      payload.append("telefonnummer", parsed.data.telefonnummer ?? "");
      payload.append("email", parsed.data.email);
      payload.append("geraet", parsed.data.geraet);
      payload.append("fehler", parsed.data.fehler);
      payload.append("fehlerbeschreibung", parsed.data.fehlerbeschreibung);
      payload.append("datenschutz", parsed.data.datenschutz ? "1" : "0");

      try {
        const response = await fetch(
          "https://api.computer-extra.de/phonedocs.php",
          {
            method: "POST",
            body: payload,
          },
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        setSubmitInfo({
          type: "success",
          message: "Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.",
        });
        form.reset();
      } catch {
        setSubmitInfo({
          type: "error",
          message:
            "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
        });
      }
    },
  });

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-blue-200/70 bg-linear-to-br from-white via-blue-50/60 to-cyan-50/60 p-6 shadow-lg shadow-blue-900/10 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-300/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-cyan-300/20 blur-2xl" />

        <div className="relative">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Kontakt
          </h1>
          <p className="mt-2 max-w-3xl text-slate-700 sm:text-lg">
            Wir helfen Ihnen schnell weiter. Schicken Sie uns eine Anfrage über
            das Formular oder kontaktieren Sie uns direkt per Telefon oder
            E-Mail.
          </p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-xl border border-blue-100 bg-white/85 p-5 shadow-sm shadow-blue-900/5">
          <h2 className="text-lg font-bold text-slate-900">Adresse</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Computer Extra GmbH
            <br />
            Harleshäuser Straße 8
            <br />
            34130 Kassel
          </p>
        </article>

        <article className="rounded-xl border border-blue-100 bg-white/85 p-5 shadow-sm shadow-blue-900/5">
          <h2 className="text-lg font-bold text-slate-900">Öffnungszeiten</h2>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-blue-100/80 bg-white/80 px-3 py-2">
              <p className="text-xs font-semibold tracking-wide text-blue-700">
                Montag - Freitag
              </p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                09:00 - 13:00 und 14:00 - 18:00 Uhr
              </p>
            </div>
            <div className="rounded-lg border border-slate-200/90 bg-slate-50/90 px-3 py-2">
              <p className="text-xs font-semibold tracking-wide text-slate-600">
                Wochenende
              </p>
              <p className="mt-0.5 text-sm font-medium text-slate-700">
                Samstag und Sonntag geschlossen.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-blue-100 bg-white/85 p-5 shadow-sm shadow-blue-900/5">
          <h2 className="text-lg font-bold text-slate-900">
            Kontaktmöglichkeiten
          </h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            E-Mail: phonedocs[AT]computer-extra.de
            <br />
            Telefon:{" "}
            <a
              href="tel:+4956160144180"
              className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-600"
            >
              0561/60 144 - 180
            </a>
          </p>
        </article>
      </section>

      {/* TODO: Bildplatzhalter Kontakt durch echtes Bild ersetzen */}
      <section className="rounded-xl border-2 border-dashed border-blue-200 bg-white/75 p-4 shadow-sm shadow-blue-900/5 sm:p-5">
        <div className="flex min-h-32 items-center justify-center rounded-lg bg-linear-to-r from-blue-50/80 to-cyan-50/80 text-center">
          <p className="px-4 text-sm font-semibold text-blue-700">
            Bildplatzhalter Kontakt
            <span className="mt-1 block text-xs font-medium text-slate-600">
              z. B. Ladenansicht, Teamfoto oder Empfangsbereich
            </span>
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-blue-200/80 bg-linear-to-br from-white via-blue-50/75 to-cyan-50/75 p-6 shadow-lg shadow-blue-900/10 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Anfrage senden
          </h2>
          <p className="mt-2 text-slate-700">
            Beschreiben Sie Ihr Gerät und den Fehler. Wir melden uns zeitnah bei
            Ihnen.
          </p>
        </div>

        <form
          className="relative mt-6 grid gap-5 rounded-2xl border border-white/70 bg-white/70 p-5 shadow-inner shadow-white/70 backdrop-blur-md sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          noValidate
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                kontaktSchema.shape.name.safeParse(value).success
                  ? undefined
                  : "Bitte geben Sie Ihren Namen ein.",
              onSubmit: ({ value }) =>
                kontaktSchema.shape.name.safeParse(value).success
                  ? undefined
                  : "Bitte geben Sie Ihren Namen ein.",
            }}
          >
            {(field) => {
              const error = firstError(field.state.meta.errors);
              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-semibold tracking-wide text-slate-800"
                  >
                    Name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={fieldBase(Boolean(error))}
                    placeholder="Max Mustermann"
                    autoComplete="name"
                  />
                  {error ? (
                    <p className="text-sm text-red-700">{error}</p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="telefonnummer"
            validators={{
              onChange: ({ value }) => {
                const result =
                  kontaktSchema.shape.telefonnummer.safeParse(value);
                return result.success
                  ? undefined
                  : "Bitte geben Sie eine gültige Telefonnummer ein.";
              },
              onSubmit: ({ value }) => {
                const result =
                  kontaktSchema.shape.telefonnummer.safeParse(value);
                return result.success
                  ? undefined
                  : "Bitte geben Sie eine gültige Telefonnummer ein.";
              },
            }}
          >
            {(field) => {
              const error = firstError(field.state.meta.errors);
              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-semibold tracking-wide text-slate-800"
                  >
                    Telefonnummer (optional)
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={fieldBase(Boolean(error))}
                    placeholder="0561 / 123456"
                    autoComplete="tel"
                  />
                  {error ? (
                    <p className="text-sm text-red-700">{error}</p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                kontaktSchema.shape.email.safeParse(value).success
                  ? undefined
                  : "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
              onSubmit: ({ value }) =>
                kontaktSchema.shape.email.safeParse(value).success
                  ? undefined
                  : "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
            }}
          >
            {(field) => {
              const error = firstError(field.state.meta.errors);
              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-semibold tracking-wide text-slate-800"
                  >
                    E-Mail
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={fieldBase(Boolean(error))}
                    placeholder="name@beispiel.de"
                    autoComplete="email"
                  />
                  {error ? (
                    <p className="text-sm text-red-700">{error}</p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="geraet"
            validators={{
              onChange: ({ value }) =>
                kontaktSchema.shape.geraet.safeParse(value).success
                  ? undefined
                  : "Bitte geben Sie ein Gerät an (z. B. iPhone 16).",
              onSubmit: ({ value }) =>
                kontaktSchema.shape.geraet.safeParse(value).success
                  ? undefined
                  : "Bitte geben Sie ein Gerät an (z. B. iPhone 16).",
            }}
          >
            {(field) => {
              const error = firstError(field.state.meta.errors);
              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-semibold tracking-wide text-slate-800"
                  >
                    Gerät
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={fieldBase(Boolean(error))}
                    placeholder="z. B. iPhone 16"
                  />
                  {error ? (
                    <p className="text-sm text-red-700">{error}</p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="fehler"
            validators={{
              onChange: ({ value }) =>
                kontaktSchema.shape.fehler.safeParse(value).success
                  ? undefined
                  : "Bitte wählen Sie einen Fehler aus.",
              onSubmit: ({ value }) =>
                kontaktSchema.shape.fehler.safeParse(value).success
                  ? undefined
                  : "Bitte wählen Sie einen Fehler aus.",
            }}
          >
            {(field) => {
              const error = firstError(field.state.meta.errors);
              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-semibold tracking-wide text-slate-800"
                  >
                    Fehler
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={fieldBase(Boolean(error))}
                  >
                    <option value="">Bitte auswählen</option>
                    {fehlerOptionen.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {error ? (
                    <p className="text-sm text-red-700">{error}</p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="fehlerbeschreibung"
            validators={{
              onChange: ({ value }) =>
                kontaktSchema.shape.fehlerbeschreibung.safeParse(value).success
                  ? undefined
                  : "Bitte beschreiben Sie den Fehler etwas genauer.",
              onSubmit: ({ value }) =>
                kontaktSchema.shape.fehlerbeschreibung.safeParse(value).success
                  ? undefined
                  : "Bitte beschreiben Sie den Fehler etwas genauer.",
            }}
          >
            {(field) => {
              const error = firstError(field.state.meta.errors);
              return (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-semibold tracking-wide text-slate-800"
                  >
                    Fehlerbeschreibung
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={fieldBase(Boolean(error))}
                    placeholder="Seit wann tritt der Fehler auf, was haben Sie bereits getestet?"
                    rows={5}
                  />
                  {error ? (
                    <p className="text-sm text-red-700">{error}</p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="datenschutz"
            validators={{
              onChange: ({ value }) =>
                kontaktSchema.shape.datenschutz.safeParse(value).success
                  ? undefined
                  : "Bitte stimmen Sie der Datenschutzerklärung zu.",
              onSubmit: ({ value }) =>
                kontaktSchema.shape.datenschutz.safeParse(value).success
                  ? undefined
                  : "Bitte stimmen Sie der Datenschutzerklärung zu.",
            }}
          >
            {(field) => {
              const error = firstError(field.state.meta.errors);
              return (
                <div className="space-y-2 rounded-xl border border-blue-100/80 bg-white/80 p-4">
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                    <input
                      id={field.name}
                      name={field.name}
                      type="checkbox"
                      checked={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      Ich habe die{" "}
                      <button
                        type="button"
                        onClick={() => setIsPrivacyOpen(true)}
                        className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-600"
                      >
                        Datenschutzerklärung
                      </button>{" "}
                      gelesen und stimme der Verarbeitung meiner Daten zu.
                    </span>
                  </label>
                  {error ? (
                    <p className="text-sm text-red-700">{error}</p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          {submitInfo ? (
            <p
              className={
                submitInfo.type === "success"
                  ? "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                  : "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              }
            >
              {submitInfo.message}
            </p>
          ) : null}

          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? "Wird gesendet..." : "Anfrage absenden"}
              </button>
            )}
          </form.Subscribe>
        </form>
      </section>

      {isPrivacyOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/55 backdrop-blur-sm"
              onClick={() => setIsPrivacyOpen(false)}
              role="presentation"
            >
              <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
                <div
                  className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl shadow-slate-950/25"
                  onClick={(event) => event.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Datenschutzerklärung"
                >
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-blue-100/80 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-6">
                    <p className="text-sm font-semibold tracking-wide text-slate-800 sm:text-base">
                      Datenschutzerklärung
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsPrivacyOpen(false)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                    >
                      Schließen
                    </button>
                  </div>

                  <div className="max-h-[calc(92vh-58px)] overflow-y-auto p-4 sm:p-6">
                    <Datenschutz />
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
