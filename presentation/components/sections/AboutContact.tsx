import React, { useState } from 'react';
import { Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const fieldClass =
  'mt-2 w-full rounded-md border border-white/25 bg-white/5 px-4 py-3 text-[16px] text-white placeholder:text-white/40 focus:border-leaf';

const AboutContact: React.FC = () => {
  const leader = ContentRepository.getLeadership();
  const contact = ContentRepository.getContact();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  // The form hands the message to WhatsApp, where the team replies.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Hello InTaxBD, I'm ${form.name}.`,
      form.message,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const initials = leader.name
    .replace('MD.', '')
    .trim()
    .split(' ')
    .map((p) => p[0])
    .join('');

  return (
    <>
      {/* About */}
      <Section id="about">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              title="Tax advisors for every taxpayer in Bangladesh"
              intro="InTaxBD is a tax consultancy for income tax filing and advisory, serving individuals and businesses across the country."
            />
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="border-t border-ink pt-4">
                <h3 className="font-display text-xl font-semibold tracking-tight">Mission</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">
                  To simplify tax compliance and give every taxpayer in Bangladesh expert guidance.
                </p>
              </div>
              <div className="border-t border-ink pt-4">
                <h3 className="font-display text-xl font-semibold tracking-tight">Values</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">
                  Integrity, transparency, confidentiality, excellence.
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-5 border-t border-rule pt-8">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand font-display text-xl font-semibold text-white"
                aria-hidden="true"
              >
                {initials}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{leader.name}</h3>
                <p className="text-[15px] font-medium text-brand">{leader.role}</p>
                <ul className="mt-1 text-sm text-muted">
                  {leader.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact: the one dark block on the page */}
      <Section id="contact" className="on-dark bg-night pb-32 text-white lg:pb-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              onDark
              title="Tell us what you need to file"
              intro="Send a message and we reply on WhatsApp. Or call, if you would rather talk it through."
            />

            <ul className="mt-10 space-y-5 text-[17px]">
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-4 hover:text-leaf">
                  <Phone className="h-5 w-5 text-leaf" aria-hidden="true" />
                  <span>
                    {contact.phoneDisplay}
                    <span className="block text-sm text-white/60">Phone and WhatsApp</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 hover:text-leaf">
                  <Mail className="h-5 w-5 text-leaf" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.websiteHref} className="flex items-center gap-4 hover:text-leaf">
                  <Globe className="h-5 w-5 text-leaf" aria-hidden="true" />
                  {contact.website}
                </a>
              </li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-white/80">
                Name
                <input required type="text" autoComplete="name" value={form.name} onChange={update('name')} className={fieldClass} />
              </label>
              <label className="block text-sm font-medium text-white/80">
                Phone
                <input required type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} className={fieldClass} />
              </label>
            </div>
            <label className="block text-sm font-medium text-white/80">
              Email (optional)
              <input type="email" autoComplete="email" value={form.email} onChange={update('email')} className={fieldClass} />
            </label>
            <label className="block text-sm font-medium text-white/80">
              How can we help?
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={update('message')}
                placeholder="For example: I'm a freelancer with foreign income and need to file for 2026-27."
                className={`${fieldClass} resize-none`}
              />
            </label>
            <Button type="submit" variant="accent">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Send on WhatsApp
            </Button>
          </form>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-white/15 pt-8 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} InTaxBD. All rights reserved.</p>
          <p>Certified tax professionals, Dhaka, Bangladesh</p>
        </div>
      </Section>
    </>
  );
};

export default AboutContact;
