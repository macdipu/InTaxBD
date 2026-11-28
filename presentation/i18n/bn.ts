// Casual (চলিত) Bangla for the whole site. Keys are the exact English text shown on the page.
// Brand and tax terms people say in English (TIN, TDS, VAT, NBR, WhatsApp, RJSC, ITP, CA) stay in English letters.
// Native-speaker review recommended before launch.
export const BN: Record<string, string> = {
  // ---- Nav, tabs, chrome
  'Services': 'সেবা', 'Pricing': 'ফি', 'Tax calculator': 'কর ক্যালকুলেটর', 'How it works': 'কীভাবে কাজ হয়', 'Documents': 'কাগজপত্র',
  'FAQ': 'প্রশ্নোত্তর', 'About': 'আমাদের কথা', 'Call': 'কল', 'WhatsApp': 'WhatsApp', 'Chat': 'চ্যাট', 'Home': 'হোম', 'Fees': 'ফি',
  'Calculate': 'হিসাব', 'Papers': 'কাগজ', 'Close menu': 'মেনু বন্ধ করুন', 'Open menu': 'মেনু খুলুন', 'Close': 'বন্ধ করুন',
  'Switch to light mode': 'লাইট মোডে যান', 'Switch to dark mode': 'ডার্ক মোডে যান', 'Filing for Assessment Year': 'রিটার্ন জমা দিচ্ছেন করবর্ষ',
  'Assessment Year': 'করবর্ষ', 'Income year': 'আয়বর্ষ', 'AY': 'করবর্ষ', 'Main': 'প্রধান মেনু', 'Mobile': 'মোবাইল মেনু', 'App': 'অ্যাপ মেনু',
  'InTaxBD home': 'InTaxBD হোম', 'Tk': 'টাকা', 'Quick pick': 'দ্রুত বেছে নিন',

  // ---- Hero & fee card
  'Total income or assets': 'মোট আয় বা সম্পদ', 'Below 4 lacs': '৪ লাখের নিচে', 'Over 1 crore': '১ কোটির বেশি', 'Ready to file': 'জমা দেওয়ার জন্য তৈরি',
  'Know someone who uses InTaxBD? Pay less.': 'InTaxBD-র কাউকে চেনেন? কম ফিতে করুন।', 'Normal fee': 'সাধারণ ফি', 'With a reference': 'রেফারেন্স থাকলে', 'Lower fee': 'কম ফি',
  'Tell us who referred you. We confirm your lower fee before we start. Tap to add.': 'কে রেফার করেছেন বলুন। কাজ শুরুর আগেই আপনার কম ফি জানিয়ে দেব। ট্যাপ করে যোগ করুন।',
  'All fees': 'সব ফি', 'Calculate my tax': 'আমার কর হিসাব করুন', 'Return deadline': 'রিটার্ন জমার শেষ তারিখ', 'Deadline passed': 'শেষ তারিখ পেরিয়ে গেছে',
  'days': 'দিন', 'hrs': 'ঘণ্টা', 'min': 'মিনিট', 'sec': 'সেকেন্ড', 'Season opens': 'মৌসুম শুরু', 'NBR notice': 'NBR-এর নোটিশ',
  'The date has passed. Late filing can cost a penalty, but we can still help.': 'তারিখ পেরিয়ে গেছে। দেরিতে দিলে জরিমানা হতে পারে, তবে আমরা এখনও সাহায্য করতে পারি।',
  'Last day! Message us now.': 'আজই শেষ দিন! এখনই মেসেজ দিন।', 'Final week. Send your documents today.': 'শেষ সপ্তাহ। আজই কাগজপত্র পাঠিয়ে দিন।',
  'Getting close. Start this week to stay relaxed.': 'সময় ঘনিয়ে আসছে। এই সপ্তাহেই শুরু করুন, টেনশন থাকবে না।', 'You have time. Filing takes us only 48 hours.': 'হাতে সময় আছে। আমাদের রিটার্ন তৈরি করতে লাগে মাত্র ৪৮ ঘণ্টা।',
  'Send documents by': 'কাগজপত্র পাঠান', 'and we file before the deadline.': 'এর মধ্যে, আমরা শেষ তারিখের আগেই জমা দিয়ে দেব।',

  // ---- Start here
  'Fees start at': 'ফি শুরু', 'We will help with': 'আমরা যা করে দেব', 'Keep these ready': 'এগুলো তৈরি রাখুন', 'Start as': 'শুরু করুন',
  'Salaried': 'চাকরিজীবী', 'Individual tax return': 'ব্যক্তিগত কর রিটার্ন', 'Tax certificate support': 'ট্যাক্স সার্টিফিকেট সহায়তা',
  'Rebate planning': 'রিবেট পরিকল্পনা', 'Freelancer': 'ফ্রিল্যান্সার', 'Freelancer income tax': 'ফ্রিল্যান্সার আয়কর', 'Tax planning': 'কর পরিকল্পনা',
  'NRB (abroad)': 'প্রবাসী (NRB)', 'NRB tax return': 'প্রবাসীদের কর রিটার্ন', 'Investment & asset disclosure': 'বিনিয়োগ ও সম্পদের বিবরণ',
  'Business owner': 'ব্যবসায়ী', 'Proprietorship / partnership return': 'একক মালিকানা / অংশীদারি রিটার্ন', 'Financial statements': 'আর্থিক বিবরণী', 'VAT return': 'VAT রিটার্ন',
  'Company': 'কোম্পানি', 'Company return': 'কোম্পানি রিটার্ন', 'RJSC return': 'RJSC রিটার্ন', 'Internal audit & SOP': 'ইন্টারনাল অডিট ও SOP',

  // ---- Services
  'Who we file for': 'আমরা কাদের রিটার্ন করি', 'Pick the line that matches you. Fees start at 1,500 Tk and depend on your income or assets.': 'আপনার সাথে যেটা মেলে সেটা বেছে নিন। ফি শুরু ১,৫০০ টাকা থেকে, আপনার আয় বা সম্পদের উপর নির্ভর করে।',
  'Your return is handled by CA professionals, Income Tax Practitioners (ITP), income tax lawyers and qualified accountants, working as one team.': 'আপনার রিটার্ন সামলাবেন CA, আয়কর প্র্যাকটিশনার (ITP), আয়কর আইনজীবী ও দক্ষ হিসাবরক্ষকেরা, সবাই মিলে এক টিমে।',
  'Get a free consultation': 'ফ্রি পরামর্শ নিন', 'See the fee': 'ফি দেখুন',
  'Individual Tax Return': 'ব্যক্তিগত কর রিটার্ন', 'Salaried employees': 'চাকরিজীবী', 'Professionals': 'পেশাজীবী', 'NRBs (Non-Resident Bangladeshis)': 'প্রবাসী বাংলাদেশি (NRB)',
  'Business Tax Services': 'ব্যবসার কর সেবা', 'Proprietorship': 'একক মালিকানা', 'Partnership firms': 'অংশীদারি প্রতিষ্ঠান', 'Financial statements review': 'আর্থিক বিবরণী পর্যালোচনা',
  'Specialized Services': 'বিশেষ সেবা', 'Financial statements preparation': 'আর্থিক বিবরণী তৈরি',
  'Internal audit & process development': 'ইন্টারনাল অডিট ও প্রসেস উন্নয়ন', 'SOP development': 'SOP তৈরি', 'Company registration': 'কোম্পানি নিবন্ধন',
  'Training on tax, VAT & regulatory compliance': 'কর, VAT ও আইনি কমপ্লায়েন্স ট্রেনিং',

  // ---- Pricing
  'One fee, set by your income': 'একটাই ফি, আপনার আয় অনুযায়ী', 'No hidden costs.': 'কোনো লুকানো খরচ নেই।',
  'The fee follows your total gross income or assets, and you see it before we start.': 'ফি ঠিক হয় আপনার মোট আয় বা সম্পদ দেখে, আর কাজ শুরুর আগেই আপনি তা জেনে যাবেন।',
  'All fees exclude VAT and government taxes. For custom business engagements, call or message us for a quote.': 'সব ফি VAT ও সরকারি করের বাইরে। ব্যবসার বিশেষ কাজের জন্য কল বা মেসেজ করে দর জেনে নিন।',
  'Advisory fee': 'পরামর্শ ফি', 'Advisory fee by total income or assets': 'মোট আয় বা সম্পদ অনুযায়ী পরামর্শ ফি', 'Send this on WhatsApp': 'WhatsApp-এ পাঠান', 'Your fee for': 'আপনার ফি',
  'First time with us, or referred by someone?': 'আমাদের সাথে প্রথমবার, নাকি কেউ রেফার করেছেন?', 'Ask about special pricing': 'বিশেষ দাম জিজ্ঞেস করুন',
  'Below 4,00,000 Tk': '৪ লাখ টাকার নিচে', 'Up to 10 lacs Tk': '১০ লাখ টাকা পর্যন্ত', '10–25 lacs Tk': '১০–২৫ লাখ টাকা', '25–40 lacs Tk': '২৫–৪০ লাখ টাকা',
  '40–60 lacs Tk': '৪০–৬০ লাখ টাকা', '60 lacs–1 crore Tk': '৬০ লাখ–১ কোটি টাকা', 'More than 1 crore Tk': '১ কোটি টাকার বেশি',

  // ---- Process
  'Six steps from first message to filed return': 'প্রথম মেসেজ থেকে রিটার্ন জমা, ছয় ধাপে', 'You are only needed at': 'আপনাকে লাগবে শুধু',
  'Book a free consultation': 'ফ্রি পরামর্শ বুক করুন', 'You approve here': 'এখানে আপনি অনুমোদন দেন', 'Submitted to NBR': 'NBR-এ জমা হয়েছে',
  'Get in touch': 'যোগাযোগ করুন', 'Call, WhatsApp us, or send the form below.': 'কল করুন, WhatsApp-এ মেসেজ দিন, অথবা নিচের ফর্ম পাঠান।',
  'Send your documents': 'কাগজপত্র পাঠান', 'Photos or PDFs on WhatsApp or email are fine.': 'WhatsApp বা ইমেইলে ছবি বা PDF পাঠালেই চলবে।',
  'We review and calculate': 'আমরা দেখে হিসাব করি', 'A qualified accountant prepares your return and works out the tax.': 'দক্ষ হিসাবরক্ষক আপনার রিটার্ন বানান এবং কর হিসাব করেন।',
  'You confirm the figures': 'আপনি হিসাব নিশ্চিত করেন', 'We show you the numbers. Nothing is filed until you approve.': 'আমরা সব অঙ্ক দেখাই। আপনি অনুমোদন না দিলে কিছুই জমা হয় না।',
  'We submit to the NBR': 'আমরা NBR-এ জমা দিই', 'Your return is filed and you get the acknowledgement receipt.': 'আপনার রিটার্ন জমা হয় আর আপনি প্রাপ্তিস্বীকারপত্র পান।',
  'Support after filing': 'জমার পরেও সহায়তা', 'Help with tax certificates or notices, all year.': 'ট্যাক্স সার্টিফিকেট বা নোটিশের ব্যাপারে সারা বছর পাশে আছি।',
  'Your return': 'আপনার রিটার্ন', 'Filed with NBR': 'NBR-এ জমা', 'of': 'এর মধ্যে', 'done': 'শেষ',

  // ---- Documents
  'Documents to gather': 'যেসব কাগজ জোগাড় করবেন', 'Print or save as PDF': 'প্রিন্ট করুন বা PDF সেভ করুন', 'Answer a few quick questions': 'কয়েকটা সহজ প্রশ্নের উত্তর দিন',
  'Tap every one that is true for you. We will show only the papers you need.': 'যেগুলো আপনার জন্য সত্যি সেগুলোতে ট্যাপ করুন। আমরা শুধু আপনার দরকারি কাগজগুলো দেখাব।',
  'Do you work for a salary?': 'আপনি কি বেতনে চাকরি করেন?', 'A job at a company, bank, NGO or government office': 'কোম্পানি, ব্যাংক, এনজিও বা সরকারি অফিসের চাকরি',
  'Do you run a business or shop?': 'আপনি কি ব্যবসা বা দোকান চালান?', 'Proprietorship, partnership or company': 'একক মালিকানা, অংশীদারি বা কোম্পানি',
  'Is this your first time with InTaxBD?': 'InTaxBD-র সাথে কি এটা আপনার প্রথমবার?', 'We need a few papers to set you up': 'আপনাকে সেট করতে কয়েকটা কাগজ লাগবে',
  'Any tax already deducted or paid, or inherited property?': 'আগেই কোনো কর কাটা বা দেওয়া হয়েছে, বা উত্তরাধিকারসূত্রে সম্পত্তি আছে?', 'TDS, advance tax, or property from family': 'TDS, অগ্রিম কর, বা পরিবার থেকে পাওয়া সম্পত্তি',
  'Yes': 'হ্যাঁ', 'Tap if yes': 'হ্যাঁ হলে ট্যাপ করুন',
  'Your list is below. Tick each paper as you find it. The ticks are only for you. Nothing is sent.': 'আপনার তালিকা নিচে। কাগজ পেলেই টিক দিন। টিক শুধু আপনার নিজের জন্য, কিছু পাঠানো হয় না।',
  'Everyone needs the first group below. Tap an answer above to add more.': 'নিচের প্রথম গ্রুপ সবার লাগে। আরও যোগ করতে উপরের কোনো উত্তরে ট্যাপ করুন।',
  'Your profile may need other documents too.': 'আপনার ক্ষেত্রে আরও কিছু কাগজ লাগতে পারে।',
  'This list covers the usual papers. After you contact us, we check your situation and tell you exactly what else to send.': 'এই তালিকায় সাধারণ কাগজগুলো আছে। আপনি যোগাযোগ করলে আমরা আপনার অবস্থা দেখে বলে দেব আর কী কী পাঠাতে হবে।',
  'Have it': 'আছে', 'All set': 'সব তৈরি', 'ready': 'তৈরি',
  "You have everything. Send it over and we'll start your return.": 'সব কাগজ আছে! পাঠিয়ে দিন, আমরা আপনার রিটার্ন শুরু করে দিই।', 'Send my documents': 'আমার কাগজ পাঠাই',
  'For All Clients': 'সব ক্লায়েন্টের জন্য', 'Everyone needs these': 'এগুলো সবার লাগে', 'Employees': 'চাকরিজীবী', 'Only if you have a job': 'শুধু চাকরি থাকলে',
  'Business Owners': 'ব্যবসায়ী', 'Only if you run a business': 'শুধু ব্যবসা থাকলে', 'New Clients': 'নতুন ক্লায়েন্ট', 'Only if this is your first time with us': 'শুধু আমাদের সাথে প্রথমবার হলে',
  'Additional': 'অতিরিক্ত', 'Only if they apply to you': 'শুধু প্রযোজ্য হলে',
  'Bank statements': 'ব্যাংক স্টেটমেন্ট', 'Investment documents': 'বিনিয়োগের কাগজ', 'Loan & gift documents': 'ঋণ ও উপহারের কাগজ', 'Other income details': 'অন্য আয়ের তথ্য',
  'Salary certificate': 'বেতনের সার্টিফিকেট', 'Income & expense statement': 'আয়-ব্যয়ের বিবরণী', 'Bank statement': 'ব্যাংক স্টেটমেন্ট',
  'Last year tax return': 'গত বছরের কর রিটার্ন', 'TIN certificate': 'TIN সার্টিফিকেট', 'NID & photo': 'NID ও ছবি', 'TDS certificates': 'TDS সার্টিফিকেট',
  'Advance tax challan': 'অগ্রিম কর চালান', 'Inherited property documents': 'উত্তরাধিকার সম্পত্তির কাগজ',

  // ---- FAQ
  'Questions people ask': 'সবাই যা জানতে চান', "Can't find yours? Ask us directly.": 'আপনার প্রশ্নটা নেই? সরাসরি আমাদের জিজ্ঞেস করুন।', 'Ask on WhatsApp': 'WhatsApp-এ জিজ্ঞেস করুন',
  'Who needs to file income tax return in Bangladesh?': 'বাংলাদেশে কাদের আয়কর রিটার্ন দিতে হয়?',
  'Generally, if you have a taxable income above the threshold (Tk 4,00,000 for general individuals), own a car, have a trade license, or own specific assets, you must file a return.': 'সাধারণভাবে, আপনার করযোগ্য আয় সীমার (সাধারণ ব্যক্তির জন্য ৪,০০,০০০ টাকা) বেশি হলে, গাড়ি থাকলে, ট্রেড লাইসেন্স থাকলে বা নির্দিষ্ট সম্পদ থাকলে রিটার্ন দিতে হয়।',
  'What happens if I file late?': 'দেরিতে রিটার্ন দিলে কী হয়?',
  'Late filing can result in penalties, interest on tax payable, and inability to access certain government services requiring a tax certificate.': 'দেরিতে দিলে জরিমানা হতে পারে, দেয় করের উপর সুদ লাগতে পারে, আর ট্যাক্স সার্টিফিকেট লাগে এমন কিছু সরকারি সেবা পেতে সমস্যা হয়।',
  'Is it safe to send my documents online?': 'অনলাইনে কাগজ পাঠানো কি নিরাপদ?',
  'We use secure, encrypted channels for document transfer and ensure your data is handled with strict confidentiality.': 'কাগজ আদান-প্রদানে আমরা নিরাপদ, এনক্রিপ্টেড মাধ্যম ব্যবহার করি আর আপনার তথ্য কঠোর গোপনীয়তায় রাখি।',
  'Do you handle freelancers and NRBs?': 'আপনারা কি ফ্রিল্যান্সার ও প্রবাসীদের কাজ করেন?',
  'Yes, we specialize in foreign remittance declaration for freelancers and NRBs to ensure you get legal tax exemptions.': 'জি, ফ্রিল্যান্সার ও প্রবাসীদের বৈদেশিক রেমিট্যান্স ঘোষণায় আমরা বিশেষজ্ঞ, যাতে আপনি আইনি কর ছাড় পান।',
  'Who sees my financial information?': 'আমার আর্থিক তথ্য কারা দেখেন?',
  'Your financial data is strictly confidential and shared only with the NBR for filing purposes.': 'আপনার আর্থিক তথ্য পুরোপুরি গোপন, শুধু রিটার্ন জমার জন্য NBR-কে দেওয়া হয়।',
  'How long does it take?': 'কতদিন লাগে?', 'Typically, we prepare your return within 48 hours of receiving all necessary documents.': 'সব দরকারি কাগজ পাওয়ার পর সাধারণত ৪৮ ঘণ্টার মধ্যে আমরা আপনার রিটার্ন তৈরি করে ফেলি।',
  'What do I get after filing?': 'রিটার্ন জমার পর আমি কী পাব?', 'We provide the acknowledgment receipt immediately and help you with tax clearance certificates or audit notices if they arise.': 'আমরা সাথে সাথে প্রাপ্তিস্বীকারপত্র দিয়ে দিই, আর পরে ট্যাক্স ক্লিয়ারেন্স সার্টিফিকেট বা অডিট নোটিশ এলে সাহায্য করি।',

  // ---- About & contact
  'Simplifying tax for individuals, small businesses and companies': 'ব্যক্তি, ছোট ব্যবসা ও কোম্পানির কর হবে সহজ',
  'Expert guidance for Tax, VAT, Regulatory Compliance and Company Affairs (RJSC), from one team of CA professionals, Income Tax Practitioners (ITP), income tax lawyers and qualified accountants.': 'কর, VAT, আইনি কমপ্লায়েন্স ও কোম্পানি বিষয়ক (RJSC) কাজে বিশেষজ্ঞ পরামর্শ, CA, আয়কর প্র্যাকটিশনার (ITP), আয়কর আইনজীবী ও দক্ষ হিসাবরক্ষকদের একই টিম থেকে।',
  'Income tax': 'আয়কর', 'VAT': 'VAT', 'Regulatory compliance': 'আইনি কমপ্লায়েন্স', 'Company affairs (RJSC)': 'কোম্পানি বিষয়ক (RJSC)',
  'The team behind your return': 'আপনার রিটার্নের পেছনের টিম', 'You do not deal with one person. You get a full team, so every part of your filing is checked by the right expert.': 'আপনি একজনের সাথে নয়, পুরো একটা টিমের সাথে কাজ করবেন। তাই রিটার্নের প্রতিটা অংশ দেখেন সঠিক বিশেষজ্ঞ।',
  'CA professionals': 'CA পেশাজীবী', 'Chartered accountants for audit, accounts and financial statements': 'অডিট, হিসাব ও আর্থিক বিবরণীর জন্য চার্টার্ড অ্যাকাউন্ট্যান্ট',
  'Income Tax Practitioners (ITP)': 'আয়কর প্র্যাকটিশনার (ITP)', 'Registered practitioners who prepare and file your return': 'নিবন্ধিত প্র্যাকটিশনার, যাঁরা আপনার রিটার্ন বানান ও জমা দেন',
  'Income tax lawyers': 'আয়কর আইনজীবী', 'Advice on notices, disputes and legal compliance': 'নোটিশ, বিরোধ ও আইনি বিষয়ে পরামর্শ',
  'Qualified accountants': 'দক্ষ হিসাবরক্ষক', 'Day-to-day calculation, VAT and bookkeeping support': 'দৈনন্দিন হিসাব, VAT ও বুককিপিং সহায়তা',
  'What we stand for': 'আমরা যা বিশ্বাস করি', 'Tell us what you need to file': 'কী জমা দিতে চান আমাদের বলুন',
  'Send a message and we reply on WhatsApp. Or call, if you would rather talk it through.': 'একটা মেসেজ দিন, আমরা WhatsApp-এ উত্তর দেব। কথা বলতে চাইলে কল করুন।',
  'Phone and WhatsApp': 'ফোন ও WhatsApp', 'Name': 'নাম', 'Phone': 'ফোন', 'Email (optional)': 'ইমেইল (ঐচ্ছিক)', 'Referred by someone?': 'কেউ রেফার করেছেন?', 'Get special pricing.': 'পান বিশেষ দাম।',
  'First time with us counts too. Tap to add a name.': 'আমাদের সাথে প্রথমবার হলেও হবে। ট্যাপ করে নাম দিন।', 'Referred by (optional)': 'রেফার করেছেন (ঐচ্ছিক)',
  'Name and phone of the person who referred you': 'যিনি রেফার করেছেন তাঁর নাম ও ফোন', 'How can we help?': 'আমরা কীভাবে সাহায্য করতে পারি?',
  'Opening WhatsApp…': 'WhatsApp খুলছে…', 'Send on WhatsApp': 'WhatsApp-এ পাঠান', 'Sent to WhatsApp': 'WhatsApp-এ পাঠানো হয়েছে',
  'Enter your name so we know who we are talking to.': 'নামটা লিখুন, যাতে জানি কার সাথে কথা বলছি।', 'Enter a phone number with at least 10 digits so we can reply.': 'অন্তত ১০ সংখ্যার ফোন নম্বর দিন, যাতে আমরা উত্তর দিতে পারি।',
  'This email looks incomplete. Check it or leave it empty.': 'ইমেইলটা অসম্পূর্ণ মনে হচ্ছে। দেখে নিন, অথবা ফাঁকা রাখুন।', 'Tell us briefly what you need to file.': 'সংক্ষেপে বলুন কী জমা দিতে চান।',
  'All rights reserved.': 'সর্বস্বত্ব সংরক্ষিত।', 'InTaxBD. All rights reserved.': 'InTaxBD. সর্বস্বত্ব সংরক্ষিত।', 'Photos or PDFs on WhatsApp are fine.': 'WhatsApp-এ ছবি বা PDF পাঠালেই চলবে।', 'Certified tax professionals, Dhaka, Bangladesh': 'সার্টিফায়েড কর পেশাজীবী, ঢাকা, বাংলাদেশ',
  'MD. Reyad Chowdhury': 'এমডি রিয়াদ চৌধুরী', 'CEO, InTaxBD': 'সিইও, InTaxBD', 'CA Professional Level, ICAB': 'CA প্রফেশনাল লেভেল, ICAB', 'MBA & BBA (Finance, University of Dhaka)': 'MBA ও BBA (ফাইন্যান্স, ঢাকা বিশ্ববিদ্যালয়)',
  'Processing': 'প্রসেসিং', 'To prepare your return once documents arrive': 'কাগজ পাওয়ার পর রিটার্ন তৈরিতে', 'Clients': 'ক্লায়েন্ট', 'Individuals and businesses filed for': 'যাদের রিটার্ন আমরা জমা দিয়েছি, ব্যক্তি ও ব্যবসা',
  'Expert': 'বিশেষজ্ঞ', 'Team': 'টিম', 'CA professionals, Income Tax Practitioners (ITP), tax lawyers and accountants': 'CA, আয়কর প্র্যাকটিশনার (ITP), কর আইনজীবী ও হিসাবরক্ষক',
  'Compliance': 'কমপ্লায়েন্স', 'Filed in line with the Income Tax Act 2023': 'আয়কর আইন ২০২৩ মেনে জমা',

  // ---- Widgets
  'Tax experts on WhatsApp': 'WhatsApp-এ কর বিশেষজ্ঞ', 'Assalamu alaikum! Welcome to InTaxBD. How can we help with your income tax return?': 'আসসালামু আলাইকুম! InTaxBD-তে স্বাগতম। আপনার আয়কর রিটার্নে কীভাবে সাহায্য করতে পারি?',
  'How much will my tax return cost?': 'আমার রিটার্নের খরচ কত পড়বে?', 'Which documents do I need?': 'আমার কী কী কাগজ লাগবে?', 'I am a freelancer with foreign income.': 'আমি বিদেশি আয়ের ফ্রিল্যান্সার।',
  'Can you file before the deadline?': 'শেষ তারিখের আগে কি জমা দিতে পারবেন?', 'Type your message…': 'আপনার মেসেজ লিখুন…', 'Type your message': 'আপনার মেসেজ লিখুন', 'Send message': 'মেসেজ পাঠান',
  'Open WhatsApp': 'WhatsApp খুলুন', 'Open chat': 'চ্যাট খুলুন', 'Close chat': 'চ্যাট বন্ধ করুন', 'Chat with InTaxBD': 'InTaxBD-র সাথে চ্যাট',
  'Thanks! We opened WhatsApp with your message. Press send there and a team member will reply.': 'ধন্যবাদ! আপনার মেসেজসহ WhatsApp খুলে দিয়েছি। ওখানে সেন্ড চাপুন, আমাদের একজন উত্তর দেবেন।',
  'Thanks! Tap below to open WhatsApp with your message. A team member will reply there.': 'ধন্যবাদ! নিচে ট্যাপ করে মেসেজসহ WhatsApp খুলুন। ওখানে আমাদের একজন উত্তর দেবেন।',
  'Latest from the NBR': 'NBR-এর সর্বশেষ নোটিশ', 'Official notices, copied from': 'সরকারি নোটিশ, উৎস:', 'Last checked': 'সর্বশেষ দেখা হয়েছে',
  'Need help finding your fee?': 'আপনার ফি খুঁজে পেতে সাহায্য লাগবে?', 'Message us on WhatsApp. A real person replies.': 'WhatsApp-এ মেসেজ দিন। সত্যিকারের একজন মানুষ উত্তর দেবেন।', 'Chat now': 'এখনই চ্যাট করুন', 'Need help?': 'সাহায্য লাগবে?', 'Help with numbers?': 'হিসাবে সাহায্য লাগবে?',
  'Not sure about your numbers?': 'হিসাব নিয়ে নিশ্চিত নন?', 'Send us what you have. We will work it out with you.': 'যা আছে পাঠিয়ে দিন। আমরা আপনার সাথে মিলিয়ে বের করে দেব।',

  // ---- Calculator
  'Tell us about you': 'আপনার সম্পর্কে বলুন', 'Tap everything that is true. You can pick more than one.': 'যা যা সত্যি সবগুলোতে ট্যাপ করুন। একাধিক বেছে নিতে পারেন।',
  'No income now': 'এখন আয় নেই', 'Student, unemployed or homemaker': 'শিক্ষার্থী, বেকার বা গৃহিণী', 'I have a job': 'আমি চাকরি করি', 'Business or freelance': 'ব্যবসা বা ফ্রিল্যান্স',
  'I earn rent': 'আমি ভাড়া পাই', 'Farming': 'কৃষি', 'Pension, interest, other': 'পেনশন, সুদ, অন্যান্য', 'Who is filing?': 'কে রিটার্ন দিচ্ছেন?',
  'General': 'সাধারণ', 'Woman or 65+': 'নারী বা ৬৫+', 'Person with disability': 'প্রতিবন্ধী ব্যক্তি', 'Freedom fighter': 'মুক্তিযোদ্ধা',
  'This is my first time paying income tax': 'এটাই আমার প্রথম আয়কর দেওয়া',
  'The tax-free amount is higher for women, people 65 or older, people with disability and freedom fighters.': 'নারী, ৬৫ বা তার বেশি বয়সী, প্রতিবন্ধী ও মুক্তিযোদ্ধাদের করমুক্ত সীমা বেশি।',
  'Your income this year': 'এই বছরের আপনার আয়', 'Pick at least one option in step 1, or': 'ধাপ ১-এ অন্তত একটা বেছে নিন, অথবা', 'show every income type': 'সব ধরনের আয় দেখুন',
  'No income means no tax to pay.': 'আয় না থাকলে কর দিতে হয় না।', 'Your tax-free limit is': 'আপনার করমুক্ত সীমা',
  '. You can still get a TIN and file a return, which helps with a bank account, loan, visa, job or a future business. Tick anything in step 3 that applies to you.': '। তবু চাইলে TIN নিয়ে রিটার্ন দিতে পারেন, এতে ব্যাংক অ্যাকাউন্ট, ঋণ, ভিসা, চাকরি বা ভবিষ্যতের ব্যবসায় সুবিধা হয়। ধাপ ৩-এ আপনার সাথে যা মেলে তাতে টিক দিন।',
  'I have another type of income': 'আমার আরেক ধরনের আয় আছে', 'Show only my income types': 'শুধু আমার আয়ের ধরন দেখান', 'Ways to pay less': 'কম কর দেওয়ার উপায়',
  'Add income in step 2 to see investment and tax-paid options.': 'বিনিয়োগ ও আগে-দেওয়া-করের অপশন দেখতে ধাপ ২-এ আয় যোগ করুন।', 'Do any of these apply to you?': 'এগুলোর কোনোটা কি আপনার ক্ষেত্রে সত্যি?',
  'Even with a low income, owning these can mean you must file a return and pay a minimum tax. This is general guidance. We confirm it for you.': 'আয় কম হলেও এগুলো থাকলে রিটার্ন দিতে ও ন্যূনতম কর দিতে হতে পারে। এটা সাধারণ নির্দেশনা, আমরা আপনার জন্য নিশ্চিত করে দেব।',
  'I own a car or jeep': 'আমার গাড়ি বা জিপ আছে', 'I have a trade licence': 'আমার ট্রেড লাইসেন্স আছে', 'I own a house or flat in a city corporation area': 'সিটি কর্পোরেশন এলাকায় আমার বাড়ি বা ফ্ল্যাট আছে',
  'I am a member of a professional body (doctor, lawyer, engineer, accountant)': 'আমি পেশাজীবী সংস্থার সদস্য (ডাক্তার, আইনজীবী, প্রকৌশলী, হিসাবরক্ষক)', 'I already have a TIN and filed last year': 'আমার আগে থেকেই TIN আছে এবং গত বছর রিটার্ন দিয়েছি',
  'I want a tax certificate for a bank loan, visa, tender or business': 'ব্যাংক ঋণ, ভিসা, টেন্ডার বা ব্যবসার জন্য আমার ট্যাক্স সার্টিফিকেট লাগবে',
  'Net wealth (advanced)': 'নিট সম্পদ (অ্যাডভান্সড)', 'All your assets (land, flats, cars, savings, gold) minus loans. A surcharge only applies above 4 crore Tk. Leave blank if below.': 'আপনার সব সম্পদ (জমি, ফ্ল্যাট, গাড়ি, সঞ্চয়, সোনা) থেকে ঋণ বাদ দিন। সারচার্জ লাগে ৪ কোটি টাকার বেশি হলে। কম হলে ফাঁকা রাখুন।',
  'Papers to keep ready': 'যেসব কাগজ তৈরি রাখবেন', 'Start over': 'আবার শুরু করুন', 'Add your income to see your tax.': 'কর দেখতে আপনার আয় যোগ করুন।',
  'Your income is within the tax-free limit, but what you ticked in step 3 may still mean you need to file. Minimum tax is shown.': 'আপনার আয় করমুক্ত সীমার মধ্যে, তবে ধাপ ৩-এ যা টিক দিয়েছেন তাতে রিটার্ন দিতে হতে পারে। ন্যূনতম কর দেখানো হয়েছে।',
  'Your income is above the tax-free limit, so you need to file a return.': 'আপনার আয় করমুক্ত সীমার বেশি, তাই রিটার্ন দিতে হবে।',
  'Your income is within the tax-free limit. Many people still file to keep a tax certificate.': 'আপনার আয় করমুক্ত সীমার মধ্যে। তবু অনেকে ট্যাক্স সার্টিফিকেটের জন্য রিটার্ন দেন।',
  'Taxable income': 'করযোগ্য আয়', 'Salary part not taxed': 'বেতনের করমুক্ত অংশ', 'Tax-free limit': 'করমুক্ত সীমা', 'Tax on slabs': 'স্ল্যাব অনুযায়ী কর', 'Investment rebate': 'বিনিয়োগ রিবেট',
  'Minimum tax applied': 'ন্যূনতম কর ধরা হয়েছে', 'Total tax': 'মোট কর', 'Already paid': 'আগেই দেওয়া', 'Nothing more to pay': 'আর কিছু দিতে হবে না',
  'Invest about': 'প্রায়', 'more in approved savings and your tax could drop by up to': 'আরও অনুমোদিত সঞ্চয়ে বিনিয়োগ করলে আপনার কর কমতে পারে সর্বোচ্চ', '.': '।',
  'Tip: tax is often already cut from salary. Add it under "Tax you already paid" so you do not pay twice.': 'টিপ: বেতন থেকে অনেক সময় আগেই কর কাটা হয়। দুইবার না দেওয়ার জন্য "যে কর আগেই দিয়েছেন" অংশে সেটা যোগ করুন।',
  'How your tax builds up': 'আপনার কর কীভাবে জমা হলো', 'An estimate for common cases. It does not cover capital gains, foreign income, company tax, or special exemptions. Rates can change with each Finance Act. A qualified accountant will confirm your exact tax.': 'সাধারণ ক্ষেত্রের জন্য একটা আনুমানিক হিসাব। মূলধনী মুনাফা, বিদেশি আয়, কোম্পানি কর বা বিশেষ ছাড় এতে ধরা হয়নি। প্রতি অর্থ আইনে হার বদলাতে পারে। আপনার সঠিক কর নিশ্চিত করে দেবেন একজন দক্ষ হিসাবরক্ষক।',
  'Check this with an expert': 'বিশেষজ্ঞের সাথে মিলিয়ে নিন', 'See our fees': 'আমাদের ফি দেখুন', 'See breakdown': 'বিস্তারিত দেখুন', 'Back': 'ফিরে যান',
  'Words explained': 'শব্দের মানে', 'What happens next': 'এরপর কী হবে', 'Send your papers': 'কাগজ পাঠান', 'We confirm your exact tax': 'আমরা আপনার সঠিক কর নিশ্চিত করি',
  'A qualified accountant checks every figure and shows you before filing.': 'দক্ষ হিসাবরক্ষক প্রতিটা অঙ্ক দেখেন এবং জমার আগে আপনাকে দেখান।', 'We file within 48 hours': 'আমরা ৪৮ ঘণ্টার মধ্যে জমা দিই',
  'We submit to the NBR and send your acknowledgement receipt.': 'আমরা NBR-এ জমা দিই আর আপনাকে প্রাপ্তিস্বীকারপত্র পাঠাই।', 'What does this mean?': 'এর মানে কী?',
  'Monthly': 'মাসিক', 'Yearly': 'বার্ষিক', 'One total': 'একটাই মোট', 'Break it down': 'ভেঙে লিখুন', 'Adds to income': 'আয়ে যোগ হবে', 'Is a cost': 'এটা খরচ',
  'Per month or per year': 'মাসে নাকি বছরে', 'How to enter': 'কীভাবে দেবেন', 'Adds or subtracts': 'যোগ নাকি বিয়োগ', 'What is it?': 'এটা কী?', 'Item name': 'আইটেমের নাম', 'Remove this item': 'এটা সরিয়ে দিন',
  'Amount': 'পরিমাণ', 'Sum:': 'যোগফল:', 'Yearly total:': 'বছরে মোট:', '(a loss counts as zero)': '(লোকসান হলে শূন্য ধরা হবে)', 'minus': 'বিয়োগ',
  'Salary': 'বেতন', 'Money from a job: company, bank, NGO, school, government.': 'চাকরির আয়: কোম্পানি, ব্যাংক, এনজিও, স্কুল, সরকারি।', 'Total salary': 'মোট বেতন',
  'Everything you get from your employer before any tax is cut': 'কর কাটার আগে নিয়োগকর্তার কাছ থেকে যা যা পান', 'Example: 45,000 a month': 'উদাহরণ: মাসে 45,000',
  'Add another pay item': 'আরেকটা বেতনের আইটেম যোগ করুন', 'Look at your payslip or salary certificate. Use the gross amount, before deductions.': 'পেস্লিপ বা বেতনের সার্টিফিকেট দেখুন। কাটাকাটির আগের মোট অঙ্কটা দিন।',
  'Basic salary': 'মূল বেতন', 'House rent allowance': 'বাড়িভাড়া ভাতা', 'Medical allowance': 'চিকিৎসা ভাতা', 'Conveyance allowance': 'যাতায়াত ভাতা', 'Festival bonus': 'উৎসব বোনাস',
  'Eid bonus, usually twice a year': 'ঈদ বোনাস, সাধারণত বছরে দুইবার', 'Other allowances or overtime': 'অন্য ভাতা বা ওভারটাইম',
  'A shop, company profit, consulting, or online / freelance work.': 'দোকান, কোম্পানির মুনাফা, কনসাল্টিং, বা অনলাইন / ফ্রিল্যান্স কাজ।', 'Profit for the year': 'বছরের মুনাফা',
  'What you earned minus what you spent running it': 'যা আয় করেছেন থেকে চালাতে যা খরচ হয়েছে তা বাদ', 'Example: 8,00,000 profit in the year': 'উদাহরণ: বছরে 8,00,000 মুনাফা', 'Add another item': 'আরেকটা আইটেম যোগ করুন',
  'Not sure of profit? Switch to "Break it down" and enter sales and costs. We subtract for you.': 'মুনাফা নিয়ে নিশ্চিত নন? "ভেঙে লিখুন" বেছে বিক্রি ও খরচ দিন। বিয়োগটা আমরা করে দেব।',
  'Total sales or fees received': 'মোট বিক্রি বা পাওয়া ফি', 'Cost of goods or materials': 'পণ্য বা কাঁচামালের খরচ', 'Staff pay': 'কর্মীদের বেতন', 'Shop or office rent': 'দোকান বা অফিসের ভাড়া',
  'Utilities, internet, transport': 'বিল, ইন্টারনেট, যাতায়াত', 'House or shop rent': 'বাড়ি বা দোকানের ভাড়া', 'Rent you receive from a property you own.': 'নিজের সম্পত্তি থেকে যে ভাড়া পান।',
  'Rent received': 'পাওয়া ভাড়া', 'Total rent paid to you, before any cost': 'খরচ বাদ দেওয়ার আগে আপনাকে দেওয়া মোট ভাড়া', 'Example: 20,000 a month': 'উদাহরণ: মাসে 20,000', 'Add another rent or cost': 'আরেকটা ভাড়া বা খরচ যোগ করুন',
  'A standard 25% deduction on rent is applied for you. Add only real extra costs such as loan interest.': 'ভাড়ার উপর ২৫% স্ট্যান্ডার্ড ছাড় আমরা ধরে দিচ্ছি। শুধু ঋণের সুদের মতো বাড়তি আসল খরচ যোগ করুন।',
  'Rent received (property 1)': 'পাওয়া ভাড়া (সম্পত্তি ১)', 'Rent received (property 2)': 'পাওয়া ভাড়া (সম্পত্তি ২)', 'Home loan interest paid': 'গৃহঋণের সুদ দেওয়া হয়েছে',
  'Land tax or council tax': 'ভূমি উন্নয়ন কর বা কাউন্সিল ট্যাক্স', 'Insurance on the property': 'সম্পত্তির বিমা', 'Income from crops, fish, livestock or poultry.': 'ফসল, মাছ, গবাদিপশু বা হাঁস-মুরগি থেকে আয়।',
  'Net farming income': 'কৃষি থেকে নিট আয়', 'Sales minus the cost of farming': 'বিক্রি থেকে চাষের খরচ বাদ', 'Example: 3,00,000 for the year': 'উদাহরণ: বছরে 3,00,000', 'Sales of produce': 'উৎপাদিত পণ্য বিক্রি',
  'Seeds, feed, labour and other costs': 'বীজ, খাবার, শ্রমিক ও অন্য খরচ', 'Other income': 'অন্যান্য আয়', 'Bank interest, dividend, pension, gifts, or anything else.': 'ব্যাংক সুদ, লভ্যাংশ, পেনশন, উপহার, বা অন্য যেকোনো কিছু।',
  'Total other income': 'মোট অন্যান্য আয়', 'All other money you received in the year': 'বছরে পাওয়া অন্য সব টাকা', 'Example: 40,000 for the year': 'উদাহরণ: বছরে 40,000', 'Add another income': 'আরেকটা আয় যোগ করুন',
  'Bank or savings interest': 'ব্যাংক বা সঞ্চয়ের সুদ', 'Dividend from shares': 'শেয়ার থেকে লভ্যাংশ', 'Pension': 'পেনশন', 'Anything else': 'অন্য কিছু',
  'Your investments': 'আপনার বিনিয়োগ', 'Money you put into approved savings. This can give you a tax rebate.': 'অনুমোদিত সঞ্চয়ে যে টাকা রেখেছেন। এতে কর রিবেট পেতে পারেন।', 'Total invested': 'মোট বিনিয়োগ',
  'Everything you invested in the year': 'বছরে যা কিছু বিনিয়োগ করেছেন', 'Add another investment': 'আরেকটা বিনিয়োগ যোগ করুন', 'Keep the receipts. We will check which ones qualify when you file.': 'রসিদ রেখে দিন। জমার সময় কোনগুলো গ্রহণযোগ্য আমরা দেখে নেব।',
  'Savings certificates (Sanchayapatra)': 'সঞ্চয়পত্র', 'DPS or fixed savings': 'DPS বা স্থায়ী সঞ্চয়', 'Life insurance premium': 'জীবন বিমার প্রিমিয়াম', 'Shares or mutual funds': 'শেয়ার বা মিউচুয়াল ফান্ড',
  'Zakat fund or approved donation': 'জাকাত ফান্ড বা অনুমোদিত দান', 'Tax you already paid': 'যে কর আগেই দিয়েছেন', 'Tax cut from your pay or paid in advance. It reduces what you owe now.': 'বেতন থেকে কাটা বা অগ্রিম দেওয়া কর। এতে এখন যা দিতে হবে তা কমে।',
  'Total tax already paid': 'আগেই দেওয়া মোট কর', 'TDS certificates and advance tax receipts': 'TDS সার্টিফিকেট ও অগ্রিম করের রসিদ', 'Example: 5,000 a month cut from salary': 'উদাহরণ: বেতন থেকে মাসে 5,000 কাটা হয়',
  'Add another payment': 'আরেকটা পেমেন্ট যোগ করুন', 'Tax cut from salary (TDS)': 'বেতন থেকে কাটা কর (TDS)', 'Tax cut from bank interest': 'ব্যাংক সুদ থেকে কাটা কর', 'Advance tax paid': 'অগ্রিম কর দেওয়া হয়েছে',
  'Tax paid on a car or other items': 'গাড়ি বা অন্য কিছুর উপর দেওয়া কর',
  'The part of your yearly income that is not taxed at all. Tax starts only on income above it.': 'আপনার বার্ষিক আয়ের যে অংশে কোনো কর নেই। এর বেশি আয়ের উপর থেকে কর শুরু।',
  'Slab': 'স্ল্যাব', 'Income is taxed in steps. Each step has its own rate, so only the part inside a step is taxed at that rate.': 'আয়ের উপর কর ধাপে ধাপে বসে। প্রতি ধাপের আলাদা হার, তাই শুধু ওই ধাপের ভেতরের অংশেই সেই হার লাগে।',
  'TDS': 'TDS', 'Tax Deducted at Source. Your employer or bank cuts it before paying you. It counts as tax you already paid.': 'উৎসে কর কর্তন। আপনাকে টাকা দেওয়ার আগেই নিয়োগকর্তা বা ব্যাংক কেটে রাখে। এটা আপনার আগেই দেওয়া কর হিসেবে ধরা হয়।',
  'Advance tax': 'অগ্রিম কর', 'Tax you pay during the year before you file. It is also deducted from what you owe.': 'রিটার্ন দেওয়ার আগে বছরের মধ্যে যে কর দেন। এটাও আপনার দেয় কর থেকে বাদ যায়।',
  'Rebate': 'রিবেট', 'A reduction on your tax for investing in approved savings.': 'অনুমোদিত সঞ্চয়ে বিনিয়োগের জন্য করের উপর ছাড়।', 'Minimum tax': 'ন্যূনতম কর',
  'The least tax a person above the limit must pay, even if the slabs give a smaller number.': 'সীমার উপরে থাকা একজনকে স্ল্যাবে কম এলেও যে ন্যূনতম কর দিতে হয়।', 'TIN': 'TIN',
  'Taxpayer Identification Number. You need one to file a return. We can help you get it.': 'করদাতা শনাক্তকরণ নম্বর। রিটার্ন দিতে এটা লাগে। নিতে আমরা সাহায্য করব।', 'Assessment year': 'করবর্ষ',
  'The year in which you file. It follows the income year, which is the year you earned the money.': 'যে বছরে রিটার্ন দেন। এটা আয়বর্ষের পরে আসে, আয়বর্ষ হলো যে বছরে টাকা আয় করেছেন।',
};

// Patterns for text built with numbers. Matched against a single text node.
export const BN_RULES: [RegExp, (...m: string[]) => string][] = [
  [/^About (.+) a month if you set it aside\.$/, (_m, a) => `মাসে প্রায় ${a} করে আলাদা রাখলে হয়ে যাবে।`],
  [/^You still need to pay (.+)$/, (_m, a) => `আপনাকে এখনও ${a} দিতে হবে`],
  [/^You may get back (.+)$/, (_m, a) => `আপনি ${a} ফেরত পেতে পারেন`],
  [/^(\d+)% on (.+)$/, (_m, p, a) => `${a} এর উপর ${p}%`],
  [/^Wealth surcharge \((.+)\)$/, (_m, a) => `সম্পদ সারচার্জ (${a})`],
  [/^Fees start at (.+)$/, (_m, a) => `ফি শুরু ${a}`],
  [/^for (.+)\. Move the slider above to change\.$/, (_m, a) => `${a} এর জন্য। বদলাতে উপরের স্লাইডার সরান।`],
  [/^Your fee for (.+)$/, (_m, a) => `${a} এর জন্য আপনার ফি`],
  [/^(\d+) of (\d+) done$/, (_m, a, b) => `${b} এর মধ্যে ${a} শেষ`],
  [/^(\d+) of (\d+) ready$/, (_m, a, b) => `${b} এর মধ্যে ${a} তৈরি`],
  [/^Start as (.+)$/, (_m, a) => `${a} হিসেবে শুরু করুন`],
  [/^Filing for Assessment Year (.+)$/, (_m, a) => `করবর্ষ ${a}-এর রিটার্ন`],
  [/^\. Last checked (.+)\.$/, (_m, a) => `। সর্বশেষ দেখা হয়েছে ${a}।`],
  [/^Return deadline: (.+)$/, (_m, a) => `রিটার্ন জমার শেষ তারিখ: ${a}`],
  [/^Step (\d+):$/, (_m, a) => `ধাপ ${a}:`],
  [/^Confirm my fee \((.+)\)$/, (_m, a) => `আমার ফি জানুন (${a})`],
  [/^Assessment Year (.+)$/, (_m, a) => `করবর্ষ ${a}`],
  [/^Income year (.+)$/, (_m, a) => `আয়বর্ষ ${a}`],
  [/^© (\d+) InTaxBD\. All rights reserved\.$/, (_m, a) => `© ${a} InTaxBD. সর্বস্বত্ব সংরক্ষিত।`],
  [/^(.+) \(a loss counts as zero\)$/, (_m, a) => `${a} (লোকসান হলে শূন্য ধরা হবে)`],
];

const MONTHS: Record<string, string> = {
  January: 'জানুয়ারি', February: 'ফেব্রুয়ারি', March: 'মার্চ', April: 'এপ্রিল', May: 'মে', June: 'জুন', July: 'জুলাই',
  August: 'আগস্ট', September: 'সেপ্টেম্বর', October: 'অক্টোবর', November: 'নভেম্বর', December: 'ডিসেম্বর',
};
const MONTH_RE = new RegExp(`\\b(${Object.keys(MONTHS).join('|')})\\b`, 'g');

/** Translate one piece of text. Returns the input unchanged when nothing matches. */
export const translateBn = (raw: string): string => {
  const text = raw.replace(/\s+/g, ' ').trim();
  if (!text) return raw;
  const lead = raw.match(/^\s*/)?.[0] ?? '';
  const trail = raw.match(/\s*$/)?.[0] ?? '';
  let out = BN[text];
  if (out === undefined) {
    for (const [re, fn] of BN_RULES) {
      const m = text.match(re);
      if (m) { out = fn(...m); break; }
    }
  }
  if (out === undefined && /\d/.test(text) && MONTH_RE.test(text)) {
    out = text.replace(MONTH_RE, (m) => MONTHS[m]).replace(/ to /g, ' থেকে ');
  }
  MONTH_RE.lastIndex = 0;
  if (out === undefined && /\bTk\b/.test(text)) out = text.replace(/\bTk\b/g, 'টাকা');
  if (out === undefined || out === '') return raw;
  return lead + out.replace(/\bTk\b/g, 'টাকা') + trail;
};
