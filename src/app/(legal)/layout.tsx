export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-[calc(var(--nav-h)+6rem)] sm:px-6">
      <div className="space-y-6 [&_h1]:text-[clamp(2.2rem,5vw,3.4rem)] [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-tinte [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-tinte [&_p]:leading-relaxed [&_p]:text-tinte-2">
        {children}
      </div>
    </section>
  );
}
