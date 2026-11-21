import React from 'react';
import { createPortal } from 'react-dom';
import { ContentRepository } from '../../../data/repositories/contentRepository';
import logo from '@/assets/png/logo.png';

// A one-page A4 checklist that only exists on paper. It is portalled next to #root,
// and the print stylesheet in index.html hides the website and shows only this sheet.
// Items ticked on the website print as ticked.

const Box: React.FC<{ checked: boolean }> = ({ checked }) => (
  <span className="mt-[1pt] flex h-[11pt] w-[11pt] shrink-0 items-center justify-center rounded-[2pt] border-[1pt] border-ink">
    {checked && (
      <svg viewBox="0 0 12 12" className="h-[9pt] w-[9pt]" aria-hidden="true">
        <path d="M2 6.5 5 9.5 10 3" fill="none" stroke="#3F6B0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </span>
);

const Field: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-end gap-[6pt]">
    <span className="shrink-0 text-[9pt] text-muted">{label}</span>
    <span className="h-[14pt] flex-1 border-b-[0.75pt] border-ink/60" />
  </div>
);

const PrintChecklist: React.FC<{ ready: Set<string> }> = ({ ready }) => {
  const docs = ContentRepository.getDocuments();
  const year = ContentRepository.getTaxYear();
  const contact = ContentRepository.getContact();
  const total = docs.reduce((n, d) => n + d.items.length, 0);

  return createPortal(
    <div className="print-only bg-white font-sans text-ink">
      {/* Header */}
      <header className="flex items-start justify-between border-b-[2pt] border-ink pb-[10pt]">
        <img src={logo} alt="InTaxBD" className="h-[34pt] w-auto" />
        <div className="text-right">
          <h1 className="font-display text-[20pt] font-semibold leading-none tracking-tight">Document checklist</h1>
          <p className="mt-[5pt] text-[10pt] font-semibold">Assessment Year: {year.assessmentYear}</p>
          <p className="text-[9pt] text-muted">Income Year: {year.incomeYear}</p>
        </div>
      </header>

      {/* Client details to fill in by hand */}
      <section className="mt-[14pt] grid grid-cols-2 gap-x-[18pt] gap-y-[8pt]">
        <Field label="Name" />
        <Field label="TIN" />
        <Field label="Phone" />
        <Field label="Date" />
      </section>

      <p className="mt-[14pt] text-[9.5pt] leading-snug text-muted">
        Collect every paper that applies to you for the income year above. Tick each box as you find it, then send
        clear photos or scans to us. Leave out anything that does not apply.
      </p>

      {/* Document groups */}
      <section className="mt-[12pt] grid grid-cols-2 gap-x-[24pt] gap-y-[14pt]">
        {docs.map((doc) => (
          <div key={doc.id} className="break-inside-avoid">
            <h2 className="border-b-[0.75pt] border-ink pb-[3pt] font-display text-[12pt] font-semibold tracking-tight">
              {doc.category}
            </h2>
            <ul className="mt-[6pt] space-y-[5pt]">
              {doc.items.map((item, idx) => (
                <li key={item} className="flex items-start gap-[7pt] text-[10.5pt] leading-tight">
                  <Box checked={ready.has(`${doc.id}-${idx}`)} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Notes fills the last grid cell */}
        <div className="break-inside-avoid">
          <h2 className="border-b-[0.75pt] border-ink pb-[3pt] font-display text-[12pt] font-semibold tracking-tight">
            Notes
          </h2>
          <div className="mt-[4pt] space-y-[2pt]">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[16pt] border-b-[0.5pt] border-ink/30" />
            ))}
          </div>
        </div>
      </section>

      <p className="mt-[14pt] text-[9pt] text-muted">
        {ready.size > 0 ? `${ready.size} of ${total} documents ticked on the website.` : `${total} documents in total.`}
      </p>

      {/* How to send */}
      <footer className="mt-[10pt] rounded-[4pt] bg-paper p-[10pt]">
        <p className="text-[10.5pt] font-semibold">Send your documents to InTaxBD</p>
        <div className="mt-[4pt] grid grid-cols-3 gap-[10pt] text-[9.5pt]">
          <p>
            <span className="block text-muted">WhatsApp or call</span>
            {contact.phoneDisplay}
          </p>
          <p>
            <span className="block text-muted">Email</span>
            {contact.email}
          </p>
          <p>
            <span className="block text-muted">Website</span>
            {contact.website}
          </p>
        </div>
      </footer>
    </div>,
    document.body,
  );
};

export default PrintChecklist;
