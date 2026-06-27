export default function Impressum() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-5 wrap-break-word text-2xl font-bold text-slate-900 sm:mb-6 sm:text-4xl">
        Impressum
      </h1>
      <article className="relative overflow-hidden rounded-2xl border border-blue-100/80 bg-white/85 p-5 shadow-lg shadow-blue-900/5 backdrop-blur-sm sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />

        <div className="relative space-y-5 wrap-break-word text-slate-700 [&_a]:wrap-anywhere [&_a]:font-semibold [&_a]:text-blue-700 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_p]:text-base [&_p]:leading-relaxed [&_strong]:text-slate-900">
          <section className="rounded-xl border border-blue-100 bg-blue-50/45 p-4 sm:p-5">
            <p>
              Computer Extra GmbH <br />
              Harleshäuser Straße 8 <br />
              34130 Kassel
              <br />
            </p>
            <p className="mt-4">
              Handelsregister: HRB 19697 <br />
              Registergericht: Amtsgericht Kassel
            </p>

            <p className="mt-4">
              <strong>Vertreten durch:</strong>
              <br />
              Christian Krauss
            </p>
          </section>

          <section className="rounded-xl border border-blue-100 bg-white/90 p-4 sm:p-5">
            <h2>Kontakt</h2>
            <p className="mt-2">
              Telefon: 0561 / 60 144 0<br />
              Telefax: 0561 / 60 144 199
              <br />
              E-Mail: info [AT] computer-extra [PUNKT] de
            </p>
          </section>

          <section className="rounded-xl border border-blue-100 bg-white/90 p-4 sm:p-5">
            <h2>Umsatzsteuer-ID</h2>
            <p className="mt-2">
              Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a
              Umsatzsteuergesetz:
              <br />
              DE357590630
            </p>
          </section>

          <section className="rounded-xl border border-blue-100 bg-white/90 p-4 sm:p-5">
            <h2>Redaktionell verantwortlich</h2>
            <p className="mt-2">
              Computer Extra GmbH
              <br />
              Johannes Kirchner
              <br />
              Christian Krauss
            </p>
          </section>

          <section className="rounded-xl border border-blue-100 bg-white/90 p-4 sm:p-5">
            <h2>EU-Streitschlichtung</h2>
            <p className="mt-2">
              Die Europ&auml;ische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section className="rounded-xl border border-blue-100 bg-white/90 p-4 sm:p-5">
            <h2>
              Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
            </h2>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>

          <section className="rounded-xl border border-blue-100 bg-white/90 p-4 sm:p-5">
            <h2>
              Zentrale Kontaktstelle nach dem Digital Services Act - DSA
              (Verordnung (EU) 2022/265)
            </h2>
            <p className="mt-2">
              Unsere zentrale Kontaktstelle f&uuml;r Nutzer und Beh&ouml;rden
              nach Art. 11, 12 DSA erreichen Sie wie folgt:
            </p>
            <p className="mt-4">
              E-Mail: info [AT] computer-extra [PUNKT] de
              <br />
              Telefon: 0561 / 60 144 0
            </p>
            <p className="mt-4">
              Die für den Kontakt zur Verf&uuml;gung stehenden Sprachen sind:
              Deutsch, Englisch.
            </p>
            <p className="mt-4">
              Quelle: <a href="https://www.e-recht24.de">eRecht24</a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
