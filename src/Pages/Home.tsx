import { useEffect, useState } from "react";
import { Link } from "react-router";
import { cn } from "../lib/utils";

const services = [
  {
    title: "Displaywechsel",
    summary:
      "Ob Glasbruch, Streifen oder schwarze Flecken: Wir tauschen Displays bei Smartphone, Tablet und MacBook mit passender Teilequalität.",
    hint: "Typische Anzeichen: Risse, Touch reagiert schlecht, Bildfehler.",
  },
  {
    title: "Akkuwechsel",
    summary:
      "Wenn das Gerät schnell leer ist oder unerwartet ausgeht, tauschen wir den Akku professionell und prüfen gleichzeitig die Ladeleistung.",
    hint: "Typische Anzeichen: kurze Laufzeit, Performance-Einbruch, Aufblähung.",
  },
  {
    title: "Wasserschaden",
    summary:
      "Nach Feuchtigkeit zählt jede Stunde. Wir reinigen die Platine fachgerecht und prüfen alle kritischen Komponenten unter dem Mikroskop.",
    hint: "Wichtig: Nicht laden, nicht in Reis legen, schnell vorbeikommen.",
  },
  {
    title: "Ladebuchse reparieren",
    summary:
      "Von Verschmutzung bis Lötarbeit: Wir finden die Ursache bei Wackelkontakt oder Ladeproblemen und beheben sie nachhaltig.",
    hint: "Typische Anzeichen: Laden nur in bestimmtem Winkel, kein Kontakt.",
  },
  {
    title: "Kostenvoranschlag",
    summary:
      "Sie erhalten einen offiziellen, nachvollziehbaren Kostenvoranschlag mit Stempel, z. B. für Versicherungen oder Schadensmeldungen.",
    hint: "Transparent: Diagnose, Teile, Arbeitszeit und Gesamtkosten klar gelistet.",
  },
  {
    title: "Fehlerdiagnose",
    summary:
      "Mit professionellem Messequipment analysieren wir systematisch, warum ein Gerät ausfällt, statt nur auf Verdacht zu tauschen.",
    hint: "Messung mit u. a. Multimeter und Mikroskoptechnik.",
  },
  {
    title: "Datensicherung",
    summary:
      "Auf Wunsch sichern, übertragen oder retten wir Fotos, Kontakte und Dokumente, damit keine wichtigen Daten verloren gehen.",
    hint: "Vor jeder Reparatur empfehlen wir ein Backup.",
  },
  {
    title: "Recycling",
    summary:
      "Defekte Altgeräte nehmen wir an, bereiten Rettbares auf und entsorgen nicht mehr nutzbare Technik fachgerecht und umweltbewusst.",
    hint: "Einfach vorbeibringen, kein Termin erforderlich.",
  },
];

const benefits = [
  "Ehrliche Diagnose statt Teiletausch auf Verdacht",
  "Mehr als 15 Jahre Erfahrung in der Reparatur",
  "Klare Preise und transparente Kommunikation",
  "Schnelle Hilfe für Smartphone, Tablet und MacBook",
];

function getBerlinTimeParts(now: Date) {
  const formatter = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekdayRaw = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? "0",
  );

  return {
    weekdayRaw,
    minutesOfDay: hour * 60 + minute,
  };
}

function isOpenNow(now: Date) {
  const { weekdayRaw, minutesOfDay } = getBerlinTimeParts(now);
  const weekday = weekdayRaw.replace(".", "").toLowerCase();
  const isWeekday = ["mo", "di", "mi", "do", "fr"].includes(weekday);

  if (!isWeekday) {
    return false;
  }

  const morningOpen = minutesOfDay >= 9 * 60 && minutesOfDay < 13 * 60;
  const afternoonOpen = minutesOfDay >= 14 * 60 && minutesOfDay < 18 * 60;

  return morningOpen || afternoonOpen;
}

function getLiveTickerMessage(now: Date) {
  const { weekdayRaw, minutesOfDay } = getBerlinTimeParts(now);
  const weekday = weekdayRaw.replace(".", "").toLowerCase();
  const isWeekday = ["mo", "di", "mi", "do", "fr"].includes(weekday);

  if (isWeekday && minutesOfDay >= 9 * 60 && minutesOfDay < 13 * 60) {
    return "Jetzt vorbeikommen: Wir sind heute bis 13:00 Uhr für Sie da.";
  }

  if (isWeekday && minutesOfDay >= 14 * 60 && minutesOfDay < 18 * 60) {
    return "Jetzt vorbeikommen: Wir sind heute bis 18:00 Uhr für Sie da.";
  }

  if (isWeekday && minutesOfDay >= 13 * 60 && minutesOfDay < 14 * 60) {
    return "Aktuell Mittagspause. Ab 14:00 Uhr sind wir wieder erreichbar.";
  }

  if (isWeekday && minutesOfDay < 9 * 60) {
    return "Noch geschlossen. Heute ab 09:00 Uhr wieder geöffnet.";
  }

  if (weekday === "fr" && minutesOfDay >= 18 * 60) {
    return "Jetzt geschlossen. Montag ab 09:00 Uhr sind wir wieder da.";
  }

  if (["sa", "so"].includes(weekday)) {
    return "Am Wochenende geschlossen. Montag ab 09:00 Uhr wieder für Sie da.";
  }

  return "Jetzt geschlossen. Morgen ab 09:00 Uhr wieder geöffnet.";
}

export default function Home() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  const currentlyOpen = isOpenNow(now);
  const liveTickerMessage = getLiveTickerMessage(now);

  return (
    <div className="space-y-10 text-slate-800 sm:space-y-12">
      <section className="relative overflow-hidden rounded-2xl border border-blue-200/70 bg-linear-to-br from-white via-blue-50/60 to-cyan-50/60 p-6 shadow-lg shadow-blue-900/10 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-300/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-cyan-300/20 blur-2xl" />

        <div className="relative grid gap-7 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div className="space-y-5">
            <p className="inline-flex items-center rounded-full border border-blue-200 bg-white/75 px-3 py-1 text-sm font-semibold text-blue-700">
              Fachwerkstatt in Kassel
            </p>

            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Reparieren statt neu kaufen.
              <span className="block text-blue-700">
                Schnell, ehrlich und nachvollziehbar.
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              PhoneDocs bringt Smartphones, Tablets und MacBooks wieder in Form.
              Wir erklären verständlich, was wirklich defekt ist, und zeigen
              Ihnen eine faire Lösung ohne Fachchinesisch.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/Kontakt"
                className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-3 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-700 hover:to-cyan-600"
              >
                Jetzt Anfrage senden
              </Link>
              <a
                href="tel:056160144180"
                className="inline-flex items-center justify-center rounded-xl border border-blue-300 bg-white px-5 py-3 text-base font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Direkt anrufen
              </a>
            </div>

            <p className="text-sm text-slate-600 sm:text-base">
              Keine lange Wartezeit und keine versteckten Kosten.
              <span className="font-semibold text-slate-700">
                {" "}
                Erst Diagnose, dann Entscheidung.
              </span>
            </p>
          </div>

          <div className="space-y-4">
            {/* TODO: Bildplatzhalter Hero durch echtes Bild ersetzen */}
            <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-white/70 p-4 shadow-sm shadow-blue-900/5 sm:p-5">
              <div className="flex aspect-4/3 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 text-center">
                <p className="px-4 text-sm font-semibold text-blue-700">
                  Bildplatzhalter Hero
                  <span className="mt-1 block text-xs font-medium text-slate-600">
                    z. B. Werkstatt, Mikroskop oder Reparaturarbeitsplatz
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-200/80 bg-white/80 p-5 shadow-md shadow-blue-900/10 sm:p-6">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Warum sich eine Reparatur lohnt
              </h2>
              <ul className="mt-4 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-linear-to-r from-blue-600 to-cyan-500" />
                    <span className="text-sm leading-relaxed text-slate-700 sm:text-base">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-blue-200/70 bg-linear-to-r from-white via-blue-50/60 to-cyan-50/60 p-6 shadow-sm shadow-blue-900/5 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Öffnungszeiten
            </h2>
            <p className="mt-1 text-slate-700 sm:text-lg">
              Montag - Freitag: 09:00 - 13:00 und 14:00 - 18:00 Uhr
            </p>
            <p className="text-slate-700 sm:text-lg">
              Samstag und Sonntag geschlossen.
            </p>
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold",
              currentlyOpen
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-rose-300 bg-rose-50 text-rose-700",
            )}
            aria-live="polite"
          >
            <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full animate-ping",
                  currentlyOpen ? "bg-emerald-400/75" : "bg-rose-400/75",
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-2.5 w-2.5 rounded-full",
                  currentlyOpen ? "bg-emerald-500" : "bg-rose-500",
                )}
              />
            </span>
            {liveTickerMessage}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Unsere Leistungen
            </h2>
            <p className="mt-1 text-slate-700 sm:text-lg">
              Verständlich erklärt, damit Sie schnell die passende Hilfe finden.
            </p>
          </div>
          <a
            href="tel:056160144180"
            className="inline-flex items-center rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Direkt anrufen: 0561/60144-180
          </a>
        </div>

        {/* TODO: Bildplatzhalter Leistungen durch echtes Bild ersetzen */}
        <div className="rounded-xl border-2 border-dashed border-blue-200 bg-white/70 p-4 shadow-sm shadow-blue-900/5">
          <div className="flex min-h-28 items-center justify-center rounded-lg bg-linear-to-r from-blue-50/80 to-cyan-50/80 text-center">
            <p className="px-4 text-sm font-semibold text-blue-700">
              Bildplatzhalter Leistungen
              <span className="mt-1 block text-xs font-medium text-slate-600">
                z. B. Vorher/Nachher-Reparatur oder Teamfoto
              </span>
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-xl border border-blue-100 bg-white/85 p-5 shadow-sm shadow-blue-900/5"
            >
              <h3 className="text-xl font-bold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {service.summary}
              </p>
              <p className="mt-3 rounded-lg bg-blue-50/70 px-3 py-2 text-sm text-blue-800">
                {service.hint}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 rounded-2xl border border-blue-200/70 bg-linear-to-r from-blue-50/70 via-white to-cyan-50/70 p-6 sm:p-8 lg:grid-cols-3">
        <div className="rounded-xl border border-blue-100 bg-white/85 p-5">
          <h3 className="text-lg font-bold text-slate-900">
            1. Kurze Erstprüfung
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            Wir schauen uns das Gerät direkt an und sagen Ihnen ehrlich, welche
            Reparatur sinnvoll ist.
          </p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-white/85 p-5">
          <h3 className="text-lg font-bold text-slate-900">
            2. Transparente Absprache
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            Sie erhalten eine klare Einschätzung zu Aufwand, Kosten und Dauer,
            bevor wir starten.
          </p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-white/85 p-5">
          <h3 className="text-lg font-bold text-slate-900">
            3. Zuverlässige Reparatur
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
            Nach der Reparatur prüfen wir alle wichtigen Funktionen, damit Ihr
            Gerät wieder alltagstauglich ist.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-blue-200 bg-linear-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg shadow-blue-600/30 sm:p-8">
        <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Lassen Sie uns Ihr Gerät retten.
            </h2>
            <p className="mt-2 max-w-2xl text-white/95 sm:text-lg">
              Nutzen Sie das Kontaktformular oder rufen Sie uns direkt an. Wir
              helfen schnell und sagen offen, was möglich ist.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/Kontakt"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-white px-5 py-3 text-base font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Zum Kontaktformular
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
