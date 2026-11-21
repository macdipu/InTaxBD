import React, { useRef, useState } from 'react';
import { Phone, Mail, Globe, MessageCircle, Loader2 } from 'lucide-react';
import { Section, SectionHeading, Button } from '../ui/Primitives';
import { MaskWords, Rule, Stamp } from '../ui/Motion';
import { ContentRepository } from '../../../data/repositories/contentRepository';

const fieldClass =
  'mt-2 block w-full rounded-md border border-white/25 bg-white/5 px-4 py-3 text-[16px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/50 focus:bg-white/10';

type FormKey = 'name' | 'phone' | 'email' | 'message';
type Errors = Partial<Record<FormKey, string>>;

const validate = (f: Record<FormKey, string>): Errors => {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Enter your name so we know who we are talking to.';
  if (f.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a phone number with at least 10 digits so we can reply.';
  if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'This email looks incomplete. Check it or leave it empty.';
  if (!f.message.trim()) e.message = 'Tell us briefly what you need to file.';
  return e;
};

const AboutContact: React.FC = () => {
  const leader = ContentRepository.getLeadership();
  const contact = ContentRepository.getContact();
  const year = ContentRepository.getTaxYear();
  const [form, setForm] = useState<Record<FormKey, string>>({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [shakeKey, setShakeKey] = useState<{ field: FormKey | null; n: number }>({ field: null, n: 0 });
  const [status, setStatus] = useState<'idle' | 'opening' | 'sent'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const update = (key: FormKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
    if (status === 'sent') setStatus('idle');
  };

  // The form hands the message to WhatsApp, where the team replies.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = (['name', 'phone', 'email', 'message'] as FormKey[]).find((k) => found[k]);
    if (first) {
      setShakeKey((s) => ({ field: first, n: s.n + 1 }));
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const text = [
      `Hello InTaxBD, I'm ${form.name}.`,
      form.message,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
    ]
      .filter(Boolean)
      .join('\n');
    setStatus('opening');
    window.setTimeout(() => {
      window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setStatus('sent');
    }, 600);
  };

  const field = (key: FormKey, label: string, input: React.ReactNode, extra = '') => (
    <div className={extra}>
      <label htmlFor={`f-${key}`} className="block text-sm font-medium text-white/80">
        {label}
      </label>
      <div
        key={shakeKey.field === key ? shakeKey.n : 0}
        className={`field-wrap ${shakeKey.field === key && shakeKey.n ? 'shake' : ''}`}
      >
        {input}
      </div>
      {errors[key] && (
        <p id={`e-${key}`} className="mt-1.5 text-sm text-[#F4B4A6]">
          {errors[key]}
        </p>
      )}
    </div>
  );

  const aria = (key: FormKey) => ({
    id: `f-${key}`,
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `e-${key}` : undefined,
  });

  const expertise = ['Income tax', 'VAT', 'Regulatory compliance', 'Company affairs (RJSC)'];
  const values = ['Integrity', 'Compliance', 'Precision'];

  return (
    <>
      {/* About */}
      <Section id="about">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Leader portrait: side by side with the caption on phones */}
          <figure data-reveal className="flex items-end gap-5 sm:gap-8 lg:col-span-4 lg:block">
            <div className="rv-print w-32 shrink-0 overflow-hidden rounded-xl sm:w-44 lg:w-56">
              <img
                src={leader.photo}
                alt={`Portrait of ${leader.name}`}
                width={720}
                height={964}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover object-top"
              />
            </div>
            <figcaption className="rv-fade lg:mt-5" style={{ '--d': '400ms' } as React.CSSProperties}>
              <p className="font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{leader.name}</p>
              <p className="mt-0.5 text-[15px] font-medium text-brand">{leader.role}</p>
              <ul className="mt-2 space-y-0.5 text-[13px] leading-snug text-muted sm:text-sm">
                {leader.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </figcaption>
          </figure>

          <div className="lg:col-span-8">
            <SectionHeading
              title="Simplifying tax for individuals, small businesses and companies"
              intro="Expert guidance for Tax, VAT, Regulatory Compliance and Company Affairs (RJSC), from a team of income tax lawyers and qualified accountants."
            />

            <ul data-reveal className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2 md:mt-10">
              {expertise.map((item, i) => (
                <li key={item}>
                  <Rule className="text-ink" delay={i * 90} />
                  <p
                    className="rv-fade py-3 font-display text-xl font-semibold tracking-tight"
                    style={{ '--d': `${150 + i * 90}ms` } as React.CSSProperties}
                  >
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-10 rounded-xl bg-surface p-5 md:mt-12 md:p-8">
              <h3 className="text-sm font-medium text-muted">What we stand for</h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 md:gap-x-8">
                {values.map((v, i) => (
                  <li key={v} className="font-display text-[28px] font-semibold tracking-tight text-brand md:text-4xl">
                    <MaskWords text={v} delay={i * 140} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact: the one dark block on the page, it opens out as you reach it */}
      <div data-reveal className="rv-open bg-night">
        <Section id="contact" className="on-dark pb-10 text-white md:pb-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeading
                onDark
                title="Tell us what you need to file"
                intro="Send a message and we reply on WhatsApp. Or call, if you would rather talk it through."
              />

              <ul className="mt-8 space-y-1 text-[17px] md:mt-10">
                <li>
                  <a href={contact.phoneHref} className="group flex min-h-[56px] items-center gap-4 hover:text-leaf">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110">
                      <Phone className="h-5 w-5 text-leaf" aria-hidden="true" />
                    </span>
                    <span>
                      {contact.phoneDisplay}
                      <span className="block text-sm text-white/60">Phone and WhatsApp</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="group flex min-h-[56px] items-center gap-4 break-all hover:text-leaf">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110">
                      <Mail className="h-5 w-5 text-leaf" aria-hidden="true" />
                    </span>
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={contact.websiteHref} className="group flex min-h-[56px] items-center gap-4 hover:text-leaf">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110">
                      <Globe className="h-5 w-5 text-leaf" aria-hidden="true" />
                    </span>
                    {contact.website}
                  </a>
                </li>
              </ul>
            </div>

            <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5 lg:col-span-7">
              <div className="grid gap-5 sm:grid-cols-2">
                {field('name', 'Name', <input type="text" autoComplete="name" value={form.name} onChange={update('name')} className={fieldClass} {...aria('name')} />)}
                {field('phone', 'Phone', <input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} className={fieldClass} {...aria('phone')} />)}
              </div>
              {field('email', 'Email (optional)', <input type="email" inputMode="email" autoComplete="email" value={form.email} onChange={update('email')} className={fieldClass} {...aria('email')} />)}
              {field(
                'message',
                'How can we help?',
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={update('message')}
                  placeholder={`For example: I'm a freelancer with foreign income and need to file for ${year.assessmentYear}.`}
                  className={`${fieldClass} resize-none`}
                  {...aria('message')}
                />,
              )}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button type="submit" variant="accent" disabled={status === 'opening'} className="w-full sm:w-auto">
                  {status === 'opening' ? (
                    <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  ) : (
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  )}
                  {status === 'opening' ? 'Opening WhatsApp…' : 'Send on WhatsApp'}
                </Button>
                <div className="h-9" aria-live="polite">
                  <Stamp show={status === 'sent'} className="!text-leaf">
                    Sent to WhatsApp
                  </Stamp>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t border-white/15 pt-8 text-sm text-white/60 sm:flex-row sm:justify-between md:mt-20">
            <p>&copy; {new Date().getFullYear()} InTaxBD. All rights reserved.</p>
            <p>Certified tax professionals, Dhaka, Bangladesh</p>
          </div>
        </Section>
      </div>
    </>
  );
};

export default AboutContact;
