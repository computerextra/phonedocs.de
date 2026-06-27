import { Minus, Plus } from "lucide-react";
import { Link } from "react-router";

const faqs = [
  {
    question: "Wie lange dauert eine Reparatur?",
    answer:
      "Standardreparaturen wie Displaywechsel, Akkuwechsel oder Ladebuchse erledigen wir in vielen Fällen noch am selben Tag. Bei komplexeren Schäden wie Wasserschaden oder Platinenarbeit nennen wir Ihnen nach der Diagnose einen realistischen Zeitrahmen.",
  },
  {
    question: "Was kostet ein Displaywechsel beim iPhone?",
    answer:
      "Der Preis hängt vom Modell und von der gewählten Displayqualität ab (z. B. LCD/INCELL oder OLED). Sie erhalten vorab eine klare Preisangabe, damit Sie transparent entscheiden können.",
  },
  {
    question:
      "Lohnt sich die Reparatur oder sollte ich lieber ein neues Handy kaufen?",
    answer:
      "In vielen Fällen lohnt sich die Reparatur wirtschaftlich und nachhaltig. Wir sagen ehrlich, ob eine Reparatur sinnvoll ist und welche Option für Sie langfristig die bessere Entscheidung darstellt.",
  },
  {
    question: "Kann ein wasserbeschädigtes Handy noch gerettet werden?",
    answer:
      "Ja, oft ist das möglich - aber Zeit ist entscheidend. Wichtig: Gerät ausschalten, nicht laden und nicht in Reis legen. Je schneller wir das Gerät professionell reinigen und messen, desto höher ist die Rettungschance.",
  },
  {
    question: "Verwenden Sie Original-Ersatzteile?",
    answer:
      "Wir arbeiten je nach Reparatur mit originalen oder hochwertigen, passenden Ersatzteilen und erklären die Unterschiede transparent. Sie entscheiden auf Basis von Qualität, Verfügbarkeit und Budget.",
  },
  {
    question: "Reparieren Sie auch MacBooks und iPads?",
    answer:
      "Ja. Neben Smartphones reparieren wir auch MacBooks und iPads, inklusive Display, Akku, Ladeproblemen und Diagnosen. Wenn ein Sonderfall vorliegt, prüfen wir das individuell für Sie.",
  },
  {
    question: "Brauche ich einen Termin?",
    answer:
      "Nein, in der Regel nicht. Sie können einfach vorbeikommen oder vorab kurz anrufen. Dann können wir Ihr Anliegen direkt einschätzen und den nächsten sinnvollen Schritt abstimmen.",
  },
  {
    question: "Stellen Sie Kostenvoranschläge für Versicherungen aus?",
    answer:
      "Ja. Sie erhalten auf Wunsch einen offiziellen Kostenvoranschlag mit nachvollziehbarer Auflistung und Stempel - geeignet für Versicherungen und Schadensmeldungen.",
  },
];

export default function FAQ() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-blue-200/70 bg-linear-to-br from-white via-blue-50/60 to-cyan-50/60 p-6 shadow-lg shadow-blue-900/10 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-300/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-cyan-300/20 blur-2xl" />

        <div className="relative max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-blue-200 bg-white/75 px-3 py-1 text-sm font-semibold text-blue-700">
            FAQ - Häufige Fragen
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Antworten, bevor Sie Ihr Gerät abgeben.
          </h1>
          <p className="mt-3 text-slate-700 sm:text-lg">
            Hier finden Sie die wichtigsten Fragen rund um Reparaturdauer,
            Kosten, Ersatzteile und Ablauf. Wenn Sie mehr wissen möchten,
            beraten wir Sie direkt und verständlich.
          </p>

          {/* TODO: Bildplatzhalter FAQ durch echtes Bild ersetzen */}
          <div className="mt-5 rounded-xl border-2 border-dashed border-blue-200 bg-white/70 p-4 shadow-sm shadow-blue-900/5">
            <div className="flex min-h-28 items-center justify-center rounded-lg bg-linear-to-r from-blue-50/80 to-cyan-50/80 text-center">
              <p className="px-4 text-sm font-semibold text-blue-700">
                Bildplatzhalter FAQ
                <span className="mt-1 block text-xs font-medium text-slate-600">
                  z. B. Teamfoto oder Werkstattdetail
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-blue-100 bg-white/85 p-5 shadow-sm shadow-blue-900/5"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-bold text-slate-900 marker:content-none">
              <span>{item.question}</span>
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-200 text-blue-700">
                <span className="relative h-4 w-4">
                  <Plus className="absolute inset-0 h-4 w-4 transition-all duration-300 ease-out group-open:rotate-90 group-open:scale-75 group-open:opacity-0" />
                  <Minus className="absolute inset-0 h-4 w-4 -rotate-90 scale-75 opacity-0 transition-all duration-300 ease-out group-open:rotate-0 group-open:scale-100 group-open:opacity-100" />
                </span>
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-slate-700">{item.answer}</p>
          </details>
        ))}
      </section>

      <section className="rounded-2xl border border-blue-200 bg-linear-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg shadow-blue-600/30 sm:p-8">
        <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ihr Fall ist nicht dabei?
            </h2>
            <p className="mt-2 max-w-2xl text-white/95 sm:text-lg">
              Schicken Sie uns Ihr Gerät und den Fehler per Anfrage oder rufen
              Sie direkt an. Wir geben Ihnen schnell eine klare Einschätzung.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/Kontakt"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-white px-5 py-3 text-base font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Jetzt Anfrage senden
            </Link>
            <a
              href="tel:056160144180"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-white/70 px-5 py-3 text-base font-bold text-white transition hover:bg-white/10"
            >
              0561/60144-180
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
