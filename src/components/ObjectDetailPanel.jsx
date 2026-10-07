import React, { useRef, useEffect, useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Radio,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Compass,
  Atom,
  Clock,
  ShieldAlert,
  Database,
  Crosshair,
  Orbit,
  Languages
} from 'lucide-react';

// UI Labels Translation
const LABELS = {
  en: {
    moonMonument: 'Moon Monument',
    marsMonument: 'Mars Monument',
    coordinates: 'Coordinates',
    landingDate: 'Landing Date',
    leftBehind: 'Left Behind',
    lastContact: 'Last Contact',
    centerCamera: 'Center Camera',
    whyLeft: 'Why It Was Left Behind',
    scienceEnabled: 'What Science It Enabled',
    funFact: 'Space Archaeologist Fact',
    nasaSource: 'NASA Source:',
    datasetId: 'Dataset ID:',
    archivalRecord: 'Archival Record',
    closeTelemetry: 'Close Telemetry',
    spaceApps: 'NASA Space Apps',
    toggleTo: 'বাংলা',
  },
  bn: {
    moonMonument: 'চাঁদের স্মৃতিস্তম্ভ',
    marsMonument: 'মঙ্গলের স্মৃতিস্তম্ভ',
    coordinates: 'স্থানাঙ্ক',
    landingDate: 'অবতরণের তারিখ',
    leftBehind: 'রেখে আসার তারিখ',
    lastContact: 'সর্বশেষ যোগাযোগ',
    centerCamera: 'ক্যামেরা ফোকাস করুন',
    whyLeft: 'কেন সেখানে রেখে আসা হয়েছিল',
    scienceEnabled: 'কী বৈজ্ঞানিক আবিষ্কার সম্ভব হয়েছে',
    funFact: 'মহাকাশ প্রত্নতাত্ত্বিক তথ্য',
    nasaSource: 'নাসার তথ্যসূত্র:',
    datasetId: 'ডাটাবেজ আইডি:',
    archivalRecord: 'ঐতিহাসিক রেকর্ড',
    closeTelemetry: 'টেলিমেট্রি বন্ধ করুন',
    spaceApps: 'নাসা স্পেস অ্যাপস',
    toggleTo: 'English',
  }
};

// Full Bangla Narratives for Every Relic
const ARTIFACT_BN = {
  'apollo-11-lm': {
    name: 'অ্যাপোলো ১১ লুনার মডিউল ডিসেন্ট স্টেজ (ঈগল)',
    whyLeft: 'ডিসেন্ট স্টেজটি নীল আর্মস্ট্রং ও বাজ অলড্রিনকে চাঁদের কক্ষপথে ফেরত পাঠাতে একটি স্থায়ী উৎক্ষেপণ মঞ্চ হিসেবে ব্যবহৃত হয়েছিল। এটিকে পৃথিবীতে ফিরিয়ে আনা ওজনের কারণে অসম্ভব ছিল।',
    scienceEnabled: 'মানবজাতির প্রথম চাঁদে পদার্পণ সম্ভব করেছে, লেজার রেঞ্জিং রেট্রোরিফ্লেক্টর (LRRR) স্থাপন করেছে এবং ২১.৫৫ কেজি চাঁদের পাথর ও মাটির নমুনা সংগ্রহ করতে সাহায্য করেছে।',
    funFact: "এর সামনের পায়ায় খোদাই করা ধাতব ফলকে লেখা আছে: 'এখানেই পৃথিবী গ্রহের মানুষ প্রথম চাঁদে পা রেখেছিল। আমরা সমগ্র মানবজাতির জন্য শান্তির বার্তা নিয়ে এসেছি।'"
  },
  'apollo-12-lm': {
    name: 'অ্যাপোলো ১২ ডিসেন্ট স্টেজ ও আলসেপ',
    whyLeft: 'সুনির্দিষ্ট অবতরণের পর চাঁদে রেখে আসা হয়। এর পারমাণবিক ক্ষমতাসম্পন্ন ALSEP বৈজ্ঞানিক গবেষণাগারটি টানা ৮ বছর ধরে সিসমিক ও সৌর বায়ুর অমূল্য তথ্য পাঠাতে থাকে।',
    scienceEnabled: 'সার্ভেয়র ৩-এর কাছে নিখুঁত ল্যান্ডিং প্রযুক্তি প্রমাণ করে। চাঁদের গভীরের ভূকম্পন (মুনকোয়েক) এবং দুর্বল চৌম্বক ক্ষেত্র পরিমাপ করে।',
    funFact: 'মহাকাশচারীরা হেঁটে মাত্র ১৮০ মিটার দূরে থাকা সার্ভেয়র ৩ রোবটের কাছে যান — এটিই মহাবিশ্বের ইতিহাসে অন্য গ্রহে রোবটকে মানুষের হাত দিয়ে ছুঁয়ে দেখার একমাত্র ঘটনা!'
  },
  'apollo-15-lrv': {
    name: 'অ্যাপোলো ১৫ লুনার রোভিং ভেহিকল (LRV-001)',
    whyLeft: '২১০ কেজি ওজনের বৈদ্যুতিক রোভারটি কক্ষপথে ফিরিয়ে আনা ওজনের কারণে অসম্ভব ছিল। অ্যাপোলোর উড্ডয়ন রঙিন ক্যামেরায় পৃথিবীতে সরাসরি সম্প্রচার করতে এটিকে ৯০ মিটার দূরে পার্ক করা হয়েছিল।',
    scienceEnabled: 'অনুসন্ধানের পরিধি ২৭.৯ কিমি পর্যন্ত বিস্তৃত করে এবং ৪.১ বিলিয়ন বছরের প্রাচীন বিখ্যাত "জেনেসিস রক" আবিষ্কারে সাহায্য করে।',
    funFact: 'চাকার টায়ারগুলো রাবারের নয়, বরং বোনা স্টিল ও টাইটানিয়ামের তৈরি ছিল — কারণ চাঁদের চরম ঠান্ডায় সাধারণ রাবার ফেটে যেত!'
  },
  'apollo-16-lrv': {
    name: 'অ্যাপোলো ১৬ লুনার রোভার (LRV-002)',
    whyLeft: 'উড্ডয়ন রেকর্ড করতে এবং মানব প্রকৌশলের চিরন্তন স্মৃতিস্তম্ভ হিসেবে দেকার্তে উচ্চভূমিতে পার্ক করা হয়েছিল।',
    scienceEnabled: '২৬.৭ কিমি ভূখণ্ড ঘুরে প্রমাণ করেছে দেকার্তে উচ্চভূমি প্রাচীন আগ্নেয়গিরি নয়, বরং উল্কাপাতের মাধ্যমে গঠিত হয়েছিল।',
    funFact: 'মহাকাশচারী জন ইয়ং এই রোভার দিয়ে চাঁদের সর্বোচ্চ গতির রেকর্ড গড়েন — খাড়া ঢালে প্রায় ১৮ কিমি/ঘণ্টা!'
  },
  'apollo-17-lrv': {
    name: 'অ্যাপোলো ১৭ লুনার রোভার (LRV-003)',
    whyLeft: 'চাঁদে ফেলে আসা সর্বশেষ চালিত রোভার। চ্যালেঞ্জার স্টেজের উড্ডয়ন পৃথিবী থেকে সরাসরি নিয়ন্ত্রণ করে দেখতে ভিআইপি সাইটে পার্ক করা হয়।',
    scienceEnabled: '৩৫.৯ কিমি এলাকা ভ্রমণ করে ৩.৬৪ বিলিয়ন বছর আগের ঐতিহাসিক কমলা রঙের আগ্নেয় কাঁচের পুঁতি আবিষ্কার করেছে।',
    funFact: 'রোভারের একটি ফেন্ডার ভেঙে গেলে মহাকাশচারীরা চাঁদের মানচিত্র, ডাক্ট টেপ এবং ক্ল্যাম্প দিয়ে তা মেরামত করেছিলেন!'
  },
  'surveyor-1': {
    name: 'সার্ভেয়র ১ লুনার সফট ল্যান্ডার',
    whyLeft: 'অ্যাপোলো অভিযানের পথপ্রদর্শক। চরম -১৫০° সেলসিয়াস চাঁদের রাতের ঠান্ডায় ব্যাটারি শেষ হয়ে গেলে স্থায়ীভাবে ঘুমিয়ে পড়ে।',
    scienceEnabled: '১১,২৩৭টি ছবি পাঠিয়ে প্রমাণ করেছে চাঁদের ধূলিকণার স্তর মানুষকে চোরাবালির মতো গিলে ফেলবে না, বরং মানুষ ও মহাকাশযান ধারণে সক্ষম।',
    funFact: 'সার্ভেয়র ১ অবতরণের আগে অনেক বিজ্ঞানী ভেবেছিলেন চাঁদের পৃষ্ঠে মাইলের পর মাইল নরম ধুলো রয়েছে যা রকেটকে গিলে ফেলবে!'
  },
  'surveyor-3': {
    name: 'সার্ভেয়র ৩ লুনার ল্যান্ডার',
    whyLeft: 'তুফান সাগরে অবস্থানরত ল্যান্ডার। আড়াই বছর পর অ্যাপোলো ১২-এর মহাকাশচারীরা এর কাছে যান এবং দীর্ঘমেয়াদে মহাকাশীয় বিকিরণের প্রভাব জানতে এর যন্ত্রাংশ খুলে আনেন।',
    scienceEnabled: 'প্রথমবারের মতো চাঁদের মাটি খনন করে মাটির দৃঢ়তা বিশ্লেষণ করেছে।',
    funFact: 'অ্যাপোলো ১২ যখন এর ক্যামেরা পৃথিবীতে ফিরিয়ে আনে, তখন গবেষকরা ভেতরে স্ট্রেপ্টোকক্কাস ব্যাকটেরিয়া খুঁজে পেয়েছিলেন!'
  },
  'lcross-impact': {
    name: 'এলক্রস প্রভাবক ও সেন্টর রকেট স্টেজ',
    whyLeft: 'ঘণ্টায় ৯,০০০ কিমি বেগে ইচ্ছাকৃতভাবে চাঁদের স্থায়ী ছায়াযুক্ত ক্যাবেয়াস খাদে আছড়ে ফেলা হয়েছিল ভূগর্ভস্থ উপাদান উন্মোচন করতে।',
    scienceEnabled: 'চাঁদের দক্ষিণ মেরুর চির অন্ধকারে ঢাকা খাদে প্রায় ৫.৬% জমাট বরফ পানির অস্তিত্ব অকাট্যভাবে প্রমাণ করেছে।',
    funFact: 'এই গতিশীল সংঘর্ষটি ২০ মিটার চওড়া গর্ত তৈরি করে এবং ৩৫০ মেট্রিক টন চাঁদের ধুলো ও বরফ আকাশে ছুঁড়ে দিয়েছিল!'
  },
  'lunar-prospector': {
    name: 'লুনার প্রসপেক্টর অরবিটার',
    whyLeft: 'মিশন শেষে দক্ষিণ মেরুর শুমেকার খাদে পরিকল্পিতভাবে বিধ্বস্ত করা হয়।',
    scienceEnabled: 'চাঁদের মাধ্যাকর্ষণ ও চৌম্বক ক্ষেত্র পরিমাপ করে এবং দুই মেরুতে হাইড্রোজেনের ঘনত্বের মানচিত্র তৈরি করেছে।',
    funFact: 'এটিতে প্রখ্যাত ভূতত্ত্ববিদ ইউজিন শুমেকারের চিতাভস্মের একটি ক্ষুদ্র ক্যাপসুল বহন করা হয়েছিল, যা তাকে চাঁদে সমাহিত একমাত্র মানুষ বানিয়েছে।'
  },
  'oppy-rover': {
    name: 'অপরচুনিটি রোভার (MER-B / অপি)',
    whyLeft: '৯০ দিনের জন্য তৈরি রোভারটি ১৫ বছর কাজ করেছে। ২০১৮ সালে এক বিশ্বব্যাপী ধূলিঝড় এর সোলার প্যানেলে সূর্যালোক আটকে দিলে এর ব্যাটারি নিঃশেষ হয়ে যায়।',
    scienceEnabled: 'হেমাটাইটের ক্ষুদ্র গোলক (ব্লুবেরি) আবিষ্কার করে অকাট্য প্রমাণ দিয়েছে যে একসময় মঙ্গলের বুকে তরল পানি প্রবাহিত হতো।',
    funFact: 'অপি ভিনগ্রহের মাটিতে প্রথম সম্পূর্ণ ম্যারাথন দূরত্ব (৪৫.১৬ কিলোমিটার) অতিক্রম করেছে!'
  },
  'spirit-rover': {
    name: 'স্পিরিট রোভার (MER-A)',
    whyLeft: '২০০৯ সালে নরম বালিতে আটকে যায় এবং সামনের একটি চাকা অচল হয়ে পড়ে। এরপর স্থির গবেষণাগার হিসেবে কাজ করে শীতের ঠান্ডায় যোগাযোগ হারিয়ে ফেলে।',
    scienceEnabled: 'ভাঙা চাকাটি টেনে চলার সময় দুর্ঘটনাবশত মাটি খুঁড়ে ৯০% খাঁটি সিলিকা উন্মোচন করে, যা প্রাচীন গরম প্রস্রবণের প্রমাণ।',
    funFact: 'ভাঙা চাকা টেনে চলার কারণেই স্পিরিট রোভারের সবচেয়ে বড় বৈজ্ঞানিক আবিষ্কারটি সম্ভব হয়েছিল!'
  },
  'viking-1-lander': {
    name: 'ভাইকিং ১ ল্যান্ডার',
    whyLeft: 'মঙ্গলে মানবজাতির প্রথম দীর্ঘমেয়াদী স্টেশন। ১৯৮২ সালে গ্রাউন্ড কন্ট্রোল থেকে ভুল সফটওয়্যার কমান্ডের কারণে অ্যান্টেনায় যোগাযোগ বিচ্ছিন্ন হয়ে যায়।',
    scienceEnabled: 'মঙ্গলের পৃষ্ঠ থেকে প্রথম রঙিন প্যানোরামা ছবি পাঠায়, বায়ুমণ্ডলীয় উপাদান বিশ্লেষণ করে এবং স্বয়ংক্রিয় জৈবিক পরীক্ষা চালায়।',
    funFact: 'ভাইকিং ১ পারমাণবিক শক্তিতে টানা ৬ বছর সক্রিয় ছিল, যেখানে প্রকৌশলীরা মাত্র ৯০ দিনের গ্যারান্টি দিয়েছিলেন।'
  },
  'viking-2-lander': {
    name: 'ভাইকিং ২ ল্যান্ডার',
    whyLeft: 'উত্তর আগ্নেয়গিরির সমভূমিতে স্থাপিত হয়। প্রায় ৪ বছর সক্রিয় থাকার পর ব্যাটারি শেষ হয়ে যায়।',
    scienceEnabled: 'সিসমোমিটার চালিয়েছে, মঙ্গলের চরম শীতে পাথরের ওপর জমে থাকা পানির বরফের তুষারপাত ছবি তুলে রেকর্ড করেছে।',
    funFact: 'ভাইকিং ২ শীতকালে ল্যান্ডারের চারপাশের লাল পাথরের ওপর জমে থাকা খাঁটি বরফের স্পষ্ট ছবি তুলেছিল।'
  },
  'pathfinder-sojourner': {
    name: 'মার্স পাথফাইন্ডার ও সোজার্নার রোভার',
    whyLeft: 'এয়ারব্যাগ ল্যান্ডিং ব্যবস্থার সূচনা করে এবং সোজার্নার ছিল মঙ্গলে প্রথম চাকাযুক্ত রোভার। মাস্টার ব্যাটারি শেষ হলে অভিযান শেষ হয়।',
    scienceEnabled: 'প্রমাণ করেছে ভিনগ্রহের রুক্ষ মাটিতে চাকাযুক্ত রোবট চালানো সম্ভব। আলফা প্রোটন এক্স-রে দিয়ে প্রথম শিলা বিশ্লেষণ করেছে।',
    funFact: 'সোজার্নার মাত্র একটি মাইক্রোওয়েভ ওভেনের সমান বড় ছিল (১০.৫ কেজি) এবং এর গতি ছিল সেকেন্ডে মাত্র ১ সেন্টিমিটার!'
  },
  'insight-lander': {
    name: 'ইনসাইট ভূকম্পন ল্যান্ডার',
    whyLeft: 'মঙ্গলের সূক্ষ্ম বায়ুমণ্ডলীয় ধুলো এর গোল সোলার প্যানেল ঢেকে দিলে ২০২২ সালের ডিসেম্বরে এর বিদ্যুৎ উৎপাদন পুরোপুরি বন্ধ হয়ে যায়।',
    scienceEnabled: 'মঙ্গলের মাটিতে সরাসরি ভূকম্পন পরিমাপক গম্বুজ স্থাপন করে ১,৩১৯টির বেশি মঙ্গল-কম্পন (Marsquake) রেকর্ড করেছে এবং মঙ্গলের গলিত কেন্দ্র পরিমাপ করেছে।',
    funFact: 'ইনসাইট অন্য কোনো গ্রহে রেকর্ড করা সবচেয়ে বড় ৪.৭ মাত্রার মঙ্গল-কম্পন শনাক্ত করেছিল যা টানা ১০ ঘণ্টা ধরে কাঁপছিল!'
  },
  'phoenix-lander': {
    name: 'ফিনিক্স মার্স ল্যান্ডার',
    whyLeft: 'উত্তর মেরুর চরম শীতে চির অন্ধকার ও ঘন শুষ্ক বরফে (হিমায়িত কার্বন ডাই অক্সাইড) ঢেকে গেলে যোগাযোগ বিচ্ছিন্ন হয়।',
    scienceEnabled: 'রোবোটিক হাত দিয়ে লাল ধুলোর নিচে মাত্র কয়েক সেন্টিমিটার গভীরে খাঁটি জলজ বরফ খুঁড়ে বের করেছে।',
    funFact: 'ফিনিক্সের খুঁড়ে বের করা বরফের টুকরো ৪ দিন পর সরাসরি বাষ্পে পরিণত হয়েছিল, যা প্রমাণ করে সেটি খাঁটি জলীয় বরফ!'
  },
  'ingenuity-helicopter': {
    name: 'ইনজেনুইটি মার্স হেলিকপ্টার',
    whyLeft: 'মঙ্গলে ৭২টি সফল উড্ডয়ন সম্পন্ন করেছে (তৈরি হয়েছিল মাত্র ৫টির জন্য)। ২০২৪ সালের জানুয়ারিতে শেষ অবতরণের সময় রটার ব্লেড ক্ষতিগ্রস্ত হলে একে স্থায়ীভাবে অবসর দেওয়া হয়।',
    scienceEnabled: 'ভিনগ্রহের মাটিতে প্রথম পরিচালিত বায়ুগতিশীল উড্ডয়ন প্রমাণ করেছে, যেখানে বায়ুমণ্ডলের ঘনত্ব পৃথিবীর মাত্র ১%।',
    funFact: 'এর সোলার প্যানেলের নিচে ১৯০৩ সালের রাইট ব্রাদার্সের প্রথম উড়োজাহাজের ডানার এক টুকরো মসলিন কাপড় লাগানো ছিল!'
  }
};

export default function ObjectDetailPanel({
  selectedObject,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onFlyTo
}) {
  const panelRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [lang, setLang] = useState('en'); // 'en' | 'bn'

  // Prevent scroll bleeding: when cursor is inside this sidebar,
  // scrolling must NEVER move or scroll the underlying webpage.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const handleWheel = (e) => {
      const scrollEl = scrollContainerRef.current;
      if (!scrollEl) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const isDown = e.deltaY > 0;
      const isUp = e.deltaY < 0;

      // If wheeling over header/footer bar, redirect scroll to inner container
      if (!e.target.closest('.custom-scrollbar')) {
        scrollEl.scrollTop += e.deltaY;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // If at top and trying to scroll up, prevent window scroll
      if (isUp && scrollTop <= 0) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // If at bottom and trying to scroll down, prevent window scroll
      if (isDown && Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Stop propagation to avoid any parent page triggers
      e.stopPropagation();
    };

    panel.addEventListener('wheel', handleWheel, { passive: false });
    return () => panel.removeEventListener('wheel', handleWheel);
  }, [selectedObject]);

  // Keyboard Accessibility: Escape closes modal, Left/Right arrows navigate relics
  useEffect(() => {
    if (!selectedObject) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObject, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!selectedObject) return null;

  const props = selectedObject.properties;
  const isMoon = props.body === 'Moon';
  const labels = LABELS[lang];
  const bnData = ARTIFACT_BN[props.id] || {};

  // Active localized content
  const activeName = lang === 'bn' && bnData.name ? bnData.name : props.name;
  const activeWhyLeft = lang === 'bn' && bnData.whyLeft ? bnData.whyLeft : props.whyLeft;
  const activeScience = lang === 'bn' && bnData.scienceEnabled ? bnData.scienceEnabled : props.scienceEnabled;
  const activeFunFact = lang === 'bn' && bnData.funFact ? bnData.funFact : props.funFact;

  return (
    <aside
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="monument-title"
      className="relative w-full h-full max-h-[92vh] lg:max-h-full rounded-2xl sm:rounded-[2rem] p-1 sm:p-1.5 ring-1 ring-emerald-500/25 bg-emerald-950/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(16,185,129,0.18)] transition-all duration-300 flex flex-col overflow-hidden overscroll-contain select-text"
      style={{ overscrollBehavior: 'contain' }}
      aria-label="Object Telemetry Panel"
    >
      {/* Inner Screen Container */}
      <div className="relative overflow-hidden rounded-[calc(1rem-0.125rem)] sm:rounded-[calc(2rem-0.375rem)] bg-black/85 inner-highlight flex flex-col h-full text-white">
        
        {/* Subtle Ambient Cosmic Aurora Mesh */}
        <div className="aurora-mesh-bg opacity-20 pointer-events-none" aria-hidden="true" />

        {/* Top Header Bar */}
        <div className="relative z-10 px-4 sm:px-5 py-3 border-b border-white/10 flex items-center justify-between gap-2 bg-black/40 backdrop-blur-md">
          {/* Left Badges */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1 ${
                isMoon
                  ? 'radiant-badge text-amber-300'
                  : 'bg-rose-950/40 border border-rose-500/40 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
              }`}
            >
              <span>{isMoon ? '🌕' : '🔴'}</span>
              <span className="truncate max-w-[100px] sm:max-w-none">{labels[isMoon ? 'moonMonument' : 'marsMonument']}</span>
            </span>

            <span className="hidden xs:inline-block px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-white/5 text-slate-300 border border-white/10">
              {props.type}
            </span>

            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30">
              {props.year}
            </span>
          </div>

          {/* Action Controls & Language Switcher */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            {/* Bangla <-> English Toggle Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1 border cursor-pointer ${
                lang === 'bn'
                  ? 'bg-emerald-400 text-emerald-950 border-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.6)]'
                  : 'bg-white/5 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:border-emerald-400'
              }`}
              title={lang === 'en' ? 'বাংলা ভাষায় দেখুন' : 'Switch to English'}
              aria-label="Switch Language"
            >
              <Languages className="w-3 h-3" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {hasPrev && (
              <button
                onClick={onPrev}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-emerald-500/20 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                title="Previous Monument"
                aria-label="Previous Monument"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}
            {hasNext && (
              <button
                onClick={onNext}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-emerald-500/20 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                title="Next Monument"
                aria-label="Next Monument"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-rose-500/20 hover:border-rose-500/40 border border-white/10 hover:text-rose-300 text-slate-300 transition-all flex items-center justify-center cursor-pointer ml-0.5"
              title="Close Panel"
              aria-label="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Telemetry Details */}
        <div
          ref={scrollContainerRef}
          className="relative z-10 flex-1 overflow-y-auto px-3.5 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5 custom-scrollbar overscroll-contain"
          style={{ overscrollBehavior: 'contain' }}
        >
          {/* Mission Tag & Radiant Title */}
          <div>
            <div className="flex items-center space-x-1.5 mb-1.5">
              <Orbit className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-semibold">
                {props.mission}
              </span>
            </div>
            <h2 id="monument-title" className="text-xl xs:text-2xl sm:text-3xl font-display font-extrabold uppercase leading-tight radiant-headline">
              {activeName}
            </h2>
          </div>

          {/* Archival NASA Image Container with Bezel */}
          {props.image && (
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/25 bg-black/60 shadow-xl group ring-1 ring-white/5">
              <img
                src={props.image}
                alt={activeName}
                className="w-full h-52 sm:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-300">
                <span className="truncate max-w-[240px] bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                  📷 {props.imageCredit}
                </span>
                <span className="radiant-badge px-2 py-0.5 rounded-full text-emerald-300 font-bold flex items-center space-x-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{labels.archivalRecord}</span>
                </span>
              </div>
            </div>
          )}

          {/* Telemetry Matrix Grid (Glassmorphic HUD Cards) */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {/* Coordinates */}
            <div className="p-3 rounded-2xl bg-white/[0.03] hover:bg-emerald-950/20 border border-white/10 hover:border-emerald-500/30 transition-all backdrop-blur-md">
              <div className="flex items-center text-slate-400 mb-1 font-mono text-[10px]">
                <MapPin className="w-3 h-3 mr-1 text-emerald-400" />
                <span className="uppercase tracking-wider">{labels.coordinates}</span>
              </div>
              <p className="font-mono text-slate-100 text-[11px] leading-tight font-semibold">
                {props.coordinatesFormatted}
              </p>
              {onFlyTo && (
                <button
                  onClick={() => onFlyTo(selectedObject.geometry.coordinates)}
                  className="mt-2 text-[10px] text-emerald-400 hover:text-emerald-300 font-mono flex items-center space-x-1 group/btn cursor-pointer"
                >
                  <Crosshair className="w-3 h-3 group-hover/btn:rotate-45 transition-transform" />
                  <span className="underline">{labels.centerCamera}</span>
                </button>
              )}
            </div>

            {/* Landing Date */}
            <div className="p-3 rounded-2xl bg-white/[0.03] hover:bg-emerald-950/20 border border-white/10 hover:border-emerald-500/30 transition-all backdrop-blur-md">
              <div className="flex items-center text-slate-400 mb-1 font-mono text-[10px]">
                <Calendar className="w-3 h-3 mr-1 text-cyan-400" />
                <span className="uppercase tracking-wider">{labels.landingDate}</span>
              </div>
              <p className="font-mono text-slate-100 text-[11px] leading-tight font-semibold">
                {props.landingDate}
              </p>
            </div>

            {/* Left-Behind Date */}
            <div className="p-3 rounded-2xl bg-white/[0.03] hover:bg-emerald-950/20 border border-white/10 hover:border-emerald-500/30 transition-all backdrop-blur-md">
              <div className="flex items-center text-slate-400 mb-1 font-mono text-[10px]">
                <Clock className="w-3 h-3 mr-1 text-amber-400" />
                <span className="uppercase tracking-wider">{labels.leftBehind}</span>
              </div>
              <p className="font-mono text-slate-100 text-[11px] leading-tight font-semibold">
                {props.leftBehindDate}
              </p>
            </div>

            {/* Last Contact */}
            <div className="p-3 rounded-2xl bg-white/[0.03] hover:bg-emerald-950/20 border border-white/10 hover:border-emerald-500/30 transition-all backdrop-blur-md">
              <div className="flex items-center text-slate-400 mb-1 font-mono text-[10px]">
                <Radio className="w-3 h-3 mr-1 text-rose-400" />
                <span className="uppercase tracking-wider">{labels.lastContact}</span>
              </div>
              <p className="font-mono text-slate-100 text-[11px] leading-tight font-semibold">
                {props.lastContact}
              </p>
            </div>
          </div>

          {/* Narrative Card 1: Why It Was Left Behind (Space Archaeology) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-black/60 border border-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <div className="flex items-center space-x-2 text-emerald-400 mb-2">
              <ShieldAlert className="w-4 h-4" />
              <h3 className="font-display font-bold text-xs uppercase tracking-wider radiant-subhead">
                {labels.whyLeft}
              </h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {activeWhyLeft}
            </p>
          </div>

          {/* Narrative Card 2: What Science It Enabled */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-black/60 border border-cyan-500/25 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <div className="flex items-center space-x-2 text-cyan-400 mb-2">
              <Atom className="w-4 h-4" />
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                {labels.scienceEnabled}
              </h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {activeScience}
            </p>
          </div>

          {/* Narrative Card 3: Space Archaeologist Youth Fact */}
          {activeFunFact && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/30 to-black/60 border border-amber-500/25 shadow-[0_0_20px_rgba(251,191,36,0.1)]">
              <div className="flex items-center space-x-2 text-amber-300 mb-2">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]">
                  {labels.funFact}
                </h3>
              </div>
              <p className="text-xs text-amber-100/90 leading-relaxed font-sans italic">
                "{activeFunFact}"
              </p>
            </div>
          )}

          {/* Verification & Dataset ID Terminal */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-[10px] font-mono">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-slate-400" />
                <span>{labels.nasaSource}</span>
              </span>
              <span className="text-slate-200 truncate max-w-[200px] font-semibold">
                {props.nasaSource}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-white/5">
              <span>{labels.datasetId}</span>
              <span className="text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30 shadow-[0_0_8px_rgba(52,211,153,0.2)]">
                {props.datasetId}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="relative z-10 px-5 py-3 border-t border-white/10 bg-black/70 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400 tracking-wider">{labels.spaceApps}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.35)] cursor-pointer"
          >
            {labels.closeTelemetry}
          </button>
        </div>

      </div>
    </aside>
  );
}
