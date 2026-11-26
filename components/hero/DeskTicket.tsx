/** The work-desk ticket (INS-23): "GRCN-1 · Find a product intern · In review", as a tracker card. */
export function DeskTicket({ ticket, className }: { ticket: string; className?: string }) {
  const [id = "", title = "", status = ""] = ticket.split(" · ");
  return (
    <div
      className={`w-64 max-w-full rounded-md border border-line bg-paper p-4 shadow-lift ${className ?? ""}`}
    >
      <p lang="en" className="font-mono text-label tracking-wide text-ink-muted">
        {id}
      </p>
      {/* The title is in the page language; only the tracker chrome around it (ID, status) is English */}
      <p className="mt-1 font-bold wrap-anywhere">{title}</p>
      <p
        lang="en"
        className="mt-3 inline-flex items-center gap-2 rounded-sm border border-ink px-2 py-1 font-mono text-label tracking-wide uppercase"
      >
        <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        {status}
      </p>
    </div>
  );
}
