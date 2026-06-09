import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  School,
  MapPin,
  Phone,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  CheckCircle,
  Menu,
  X,
  Clock,
  Heart,
  Smile,
  Check,
  ChevronDown,
  Building,
  HelpCircle,
  FileSpreadsheet,
  Globe,
  PlusCircle,
  Trash2,
  Map,
  Navigation
} from "lucide-react";
import { Inquiry, FAQItem, AcademicProgram, Testimonial, SchoolFeature } from "./types";

// Master data set for features, programs, testimonials, and FAQs
const SCHOOL_FEATURES: SchoolFeature[] = [
  {
    id: "safety",
    title: "100% Safe Campus",
    description: "Fully fenced perimeter, zero-tolerance playground supervision, and safe clean drinking water facilities.",
    iconName: "ShieldCheck"
  },
  {
    id: "modern",
    title: "Modern Smart-Learning",
    description: "Interactive visual screens, picture charts, and play-based tools for modern science and math education.",
    iconName: "BookOpen"
  },
  {
    id: "foundation",
    title: "Strong Moral Values",
    description: "We instil daily discipline, respect for elders, hygienic habits, and traditional Indian direct value-based culture.",
    iconName: "Award"
  }
];

const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: "primary-foundation",
    gradeRange: "Nursery & Kindergarten (LKG, UKG)",
    title: "Playway Foundation",
    description: "Gentle introductory education concentrating on language sounds, writing shapes, numbers, basic English greetings, and safe outdoor play.",
    highlights: ["Interactive alphabet screens", "Small-group friendly tables", "Active speaking practice", "Daily creative drawing"],
    iconName: "Smile"
  },
  {
    id: "junior-classes",
    gradeRange: "Class 1 to Class-3",
    title: "Primary Spark",
    description: "Developing robust competencies in reading English texts, foundational math calculation, science charts, and dual-language comprehension.",
    highlights: ["Weekly speaking sessions", "Special mental math kits", "Hindi and English writing", "Basic computer introduce"],
    iconName: "BookOpen"
  },
  {
    id: "prep-classes",
    gradeRange: "Class 4 to Class 5",
    title: "Knowledge Peak",
    description: "Comprehensive preparation building high analytical thinking, computer basics, scientific models, environmental studies, and general knowledge.",
    highlights: ["Elementary science models", "Introduction to calculators & keyboard", "Daily spelling drill games", "General knowledge (GK) quiz"],
    iconName: "Award"
  }
];

const PARENT_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    parentName: "रामदेव यादव",
    location: "पेषम गांव, गिरिडीह",
    relationship: "पिता: आदित्य (कक्षा 3)",
    quote: "ज्ञान भारती शिक्षा निकेतन ने हमारे बच्चों के भविष्य को पूरी तरह बदल दिया है। आदित्य अब घर पर भी शिष्टाचार और पढ़ाई की बातें करता है। आखिरकार हमारे ग्रामवासियों के लिए ही यहाँ उत्तम शिक्षा की सुविधा मिल गई है!"
  },
  {
    id: "test-2",
    parentName: "किरण देवी",
    location: "पेषम, गिरिडीह",
    relationship: "माता: प्रिया (कक्षा 1)",
    quote: "बच्चों की सुरक्षा मेरे लिए सबसे बड़ी चिंता थी, लेकिन यहाँ स्कूल का परिसर पूरी तरह सुरक्षित है, पीने का साफ पानी है और शिक्षक अत्यंत स्नेही और मार्गदर्शक हैं। प्रिया अब कभी भी स्कूल जाने को मना नहीं करती!"
  },
  {
    id: "test-3",
    parentName: "मनोज वर्मा",
    location: "पञ्चायत भवन के पास, पेषम, गिरिडीह",
    relationship: "पिता: रिया (नर्सरी) और अमित (कक्षा 4)",
    quote: "हमें अपने बच्चों को दूर के बड़े शहरों में भेजने की कोई ज़रूरत नहीं है। आधुनिक स्मार्ट क्लास और हर महीने होने वाली अभिभावक बैठक हमें बच्चों की प्रगति से जोड़े रखती है। यहाँ की मासिक फीस भी अत्यंत किफायती है!"
  }
];

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "What are the school hours for junior kids?",
    answer: "Our Nursery and Kindergarten programs run from 8:30 AM to 12:30 PM. Classes 1 to 5 run from 8:30 AM to 2:00 PM, allowing kids plenty of rest time in the afternoon.",
    questionHindi: "बच्चों के लिए स्कूल का समय क्या है?",
    answerHindi: "नर्सरी और के.जी. के लिए समय सुबह 8:30 से दोपहर 12:30 बजे तक है। कक्षा 1 से 5 के लिए समय सुबह 8:30 से दोपहर 2:00 बजे तक है।"
  },
  {
    id: 2,
    question: "Is the medium of instruction Hindi or English?",
    answer: "We support a rich bilingual approach. Core textbooks and scientific terms are introduced in English to prepare youth for high-school, with friendly regional instruction in Hindi to ensure concepts are deeply integrated.",
    questionHindi: "पढ़ाई का माध्यम हिंदी है या अंग्रेजी?",
    answerHindi: "हम दोनों भाषाओं का उपयोग करते हैं। अंग्रेजी भाषा पर विशेष ध्यान दिया जाता है, जबकि समझने के लिए सरल हिंदी का उपयोग किया जाता है।"
  },
  {
    id: 3,
    question: "Are books and uniforms provided locally?",
    answer: "Yes, uniforms, badges, notebooks, and state-board textbooks are facilitated directly at our administration block in Pesham at highly specialized subsidized rates for the farmers and villagers.",
    questionHindi: "क्या किताबें और ड्रेस स्कूल से मिलती हैं?",
    answerHindi: "हाँ, यूनिफॉर्म, बेल्ट, किताबें और कॉपियां पेषम स्थित स्कूल ऑफिस से उचित दर पर उपलब्ध कराई जाती हैं।"
  },
  {
    id: 4,
    question: "How do parents track weekly or monthly progress?",
    answer: "We hold an interactive Parent-Teacher Meeting (PTM) on the last Saturday of every month. Additionally, teachers send homework checklists directly back home and our coordinator keeps you updated by call.",
    questionHindi: "माता-पिता बच्चों की प्रगति कैसे देख सकते हैं?",
    answerHindi: "हर महीने के आखिरी शनिवार को 'अभिभावक-शिक्षक बैठक' (PTM) होती है जिसमें प्रगति पत्र दिया जाता है।"
  },
  {
    id: 5,
    question: "Do you offer admission for kids from surrounding villages?",
    answer: "Absolutely. Parents from all surrounding areas of Pesham, Giridih Panchayat are highly welcome. Secure group vehicle safety plans can be discussed directly at the counter.",
    questionHindi: "क्या आस-पास के गांवों के बच्चे भी दाखिला ले सकते हैं?",
    answerHindi: "हाँ, पेषम पंचायत और आस-पास के सभी गांवों के बच्चों का हार्दिक स्वागत है।"
  }
];

export default function App() {
  // Navigation states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Language helper states for rural audience
  const [useHindiHelps, setUseHindiHelps] = useState(false);

  // Form states
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  
  // Status feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Local active inquiries
  const [localInquiries, setLocalInquiries] = useState<Inquiry[]>([]);
  const [showInquiryPanel, setShowInquiryPanel] = useState(false);

  // FAQ collapse state tracker (stores dynamic index)
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // Initialize inquiries on load
  useEffect(() => {
    const historical = localStorage.getItem("gbsn_inquiries");
    if (historical) {
      try {
        setLocalInquiries(JSON.parse(historical));
      } catch (e) {
        console.error("Error reading local inquiries database", e);
      }
    }
  }, []);

  // Form submit handler
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage("");

    // Simple validations
    if (!parentName.trim()) {
      setErrorMessage(useHindiHelps ? "कृपया अभिवावक का नाम दर्ज करें।" : "Please enter the Parent's Name.");
      return;
    }
    if (!childName.trim()) {
      setErrorMessage(useHindiHelps ? "कृपया बच्चे का नाम दर्ज करें।" : "Please enter the Child's Name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage(useHindiHelps ? "कृपया मोबाइल नंबर आवश्यक दर्ज करें।" : "Mobile phone number is highly required.");
      return;
    }
    
    // Simple phone check
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage(useHindiHelps ? "कृपया 10 अंकों का सही मोबाइल नंबर भरें।" : "Please enter a valid 10-digit phone number.");
      return;
    }
    if (!selectedClass) {
      setErrorMessage(useHindiHelps ? "कृपया बच्चे की कक्षा चुनें।" : "Please select the target Admission school class.");
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable submitting to our local storage database system
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: "inq_" + Date.now(),
        parentName: parentName.trim(),
        childName: childName.trim(),
        phone: cleanPhone,
        className: selectedClass,
        submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        notes: customNotes.trim()
      };

      const updated = [newInquiry, ...localInquiries];
      localStorage.setItem("gbsn_inquiries", JSON.stringify(updated));
      setLocalInquiries(updated);

      // Reset fields
      setParentName("");
      setChildName("");
      setPhone("");
      setSelectedClass("");
      setCustomNotes("");
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Auto clear success panel after 8 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 9000);
    }, 1200);
  };

  const deleteInquiry = (id: string) => {
    const updated = localInquiries.filter(item => item.id !== id);
    localStorage.setItem("gbsn_inquiries", JSON.stringify(updated));
    setLocalInquiries(updated);
  };

  // Quick helper to scroll to target
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800" id="home">
      
      {/* Top Banner with Important admission announcement and Hindi translate assistance */}
      <div className="bg-amber-500 text-brand-blue-950 font-medium px-4 py-2.5 text-xs md:text-sm text-center flex flex-wrap items-center justify-between gap-2 border-b border-amber-600 shadow-sm relative z-50">
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 animate-ping"></span>
          <span>
            <strong>📢 Admission Open 2026-2027:</strong> Zero registration fees for LKG and Nursery today. Limited rural-quota seats left!
          </span>
        </div>
        <div className="mx-auto md:mx-0 flex items-center gap-2">
          <button
            onClick={() => setUseHindiHelps(!useHindiHelps)}
            className="flex items-center gap-1.5 bg-brand-blue-900 text-white hover:bg-brand-blue-950 transition-all text-xs font-semibold px-3 py-1 rounded-full shadow-md"
            id="lang-toggle"
          >
            <Globe className="h-3 w-3" />
            {useHindiHelps ? "✓ हिंदी विवरण चालू" : "हिंदी में मदद चाहिए? Click here"}
          </button>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Emblem */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
              <div className="relative w-16 h-16 transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                <img 
                  src="/images/Screenshot_20250923_143101_WhatsApp_032451.jpg" 
                  alt="Gyan Bharti Shiksha Niketan" 
                  className="w-full h-full object-contain z-10" 
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-base md:text-lg font-bold text-brand-blue-900 tracking-tight leading-tight uppercase font-display">
                  Gyan Bharti Shiksha Niketan
                </h1>
                <div className="flex flex-wrap items-center gap-1 md:gap-1.5 mt-0.5">
                  <span className="text-[9px] md:text-[10px] font-semibold tracking-wider text-amber-600 uppercase font-display">
                    Pesham, Giridih
                  </span>
                  <span className="text-slate-300 text-[10px] hidden md:inline">•</span>
                  <span className="text-[9px] text-slate-500 font-medium italic block md:inline">
                    तमसो मा ज्योतिर्गमय
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-sm">
              <button
                onClick={() => scrollToSection("home")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "home" ? "text-brand-blue-900 border-b-2 border-amber-500 font-bold" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                होम (Home)
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "about" ? "text-brand-blue-900 border-b-2 border-amber-500 font-bold" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                हमारे बारे में (About)
              </button>
              <button
                onClick={() => scrollToSection("academics")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "academics" ? "text-brand-blue-900 border-b-2 border-amber-500 font-bold" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                शिक्षा (Academics)
              </button>
              <button
                onClick={() => scrollToSection("school-life")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "school-life" ? "text-brand-blue-900 border-b-2 border-amber-500 font-bold" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                स्कूल की झलक (School Life)
              </button>
              <button
                onClick={() => scrollToSection("admissions")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "admissions" ? "text-brand-blue-900 border-b-2 border-amber-500 font-bold" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                दाखिला (Admissions)
              </button>
              <button
                onClick={() => scrollToSection("find-us")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "find-us" ? "text-brand-blue-900 border-b-2 border-amber-500 font-bold" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                नक्शा (Find Us)
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "faq" ? "text-brand-blue-900 border-b-2 border-amber-500 font-bold" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                सवाल-जवाब (FAQ)
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "contact" ? "text-brand-blue-900 border-b-2 border-amber-500 font-bold" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                संपर्क (Contact)
              </button>
            </nav>

            <nav className="hidden md:flex xl:hidden items-center gap-4 text-xs">
              <button
                onClick={() => scrollToSection("home")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "home" ? "text-brand-blue-900 border-b-2 border-amber-500" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "about" ? "text-brand-blue-900 border-b-2 border-amber-500" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("academics")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "academics" ? "text-brand-blue-900 border-b-2 border-amber-500" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                Academics
              </button>
              <button
                onClick={() => scrollToSection("school-life")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "school-life" ? "text-brand-blue-900 border-b-2 border-amber-500" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                School Life
              </button>
              <button
                onClick={() => scrollToSection("admissions")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "admissions" ? "text-brand-blue-900 border-b-2 border-amber-500" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                Admissions
              </button>
              <button
                onClick={() => scrollToSection("find-us")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "find-us" ? "text-brand-blue-900 border-b-2 border-amber-500" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                Find Us
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`font-semibold transition-colors cursor-pointer py-1.5 ${
                  activeTab === "contact" ? "text-brand-blue-900 border-b-2 border-amber-500" : "text-slate-600 hover:text-brand-blue-900"
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Desktop Enroll Call-To-Action Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://wa.me/918809169591?text=Hello,%20I%20am%20interested%20in%20admissions%20for%20Gyan%20Bharti%20Shiksha%20Niketan."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-200 text-green-700 hover:bg-green-50 font-bold px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer text-xs"
                title="Chat with us on WhatsApp"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.11 1.444 4.88 1.445 5.485 0 9.948-4.469 10.003-9.96.002-2.659-1.018-5.161-2.87-7.017C16.81 1.77 14.305.748 11.644.748c-5.467 0-9.927 4.453-9.953 9.953-.001 1.745.454 3.447 1.319 4.954L1.93 21.053l5.514-1.446l.203.119zm12.19-5.182c-.313-.156-1.847-.912-2.128-1.016-.282-.102-.487-.156-.69.156-.204.312-.788 1.016-.966 1.22-.178.203-.356.228-.669.072-.313-.156-1.32-.486-2.514-1.551-.93-.83-1.557-1.855-1.738-2.167-.182-.313-.02-.482.137-.638.14-.14.313-.365.47-.547.156-.182.208-.313.313-.521.104-.208.052-.391-.026-.547-.078-.156-.69-1.666-.945-2.278-.249-.599-.5-.517-.69-.527l-.588-.011c-.203 0-.533.076-.812.381-.279.305-1.066 1.042-1.066 2.54 0 1.498 1.09 2.946 1.242 3.149.152.203 2.146 3.278 5.2 4.595.725.313 1.291.5 1.734.64.729.232 1.391.199 1.914.12.583-.087 1.847-.756 2.109-1.447.262-.69.262-1.28.183-1.406-.078-.125-.282-.203-.594-.359z"/>
                </svg>
                <span>WhatsApp Desk</span>
              </a>
              <button
                onClick={() => scrollToSection("admissions")}
                className="bg-brand-gold-500 text-brand-blue-950 font-bold px-5 py-2.5 rounded-xl hover:bg-brand-gold-600 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 border border-amber-400 group cursor-pointer text-xs"
              >
                <span>Enroll Today</span>
                <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">➜</span>
              </button>
            </div>

            {/* Mobile Menu Toggle button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-brand-blue-900 hover:bg-slate-100 rounded-lg md:hidden transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-burger"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-b border-slate-100 shadow-inner px-4 pt-2 pb-6 flex flex-col gap-3.5"
            >
              <button
                onClick={() => scrollToSection("home")}
                className="text-left font-semibold text-base py-2 text-brand-blue-900 border-b border-slate-50"
              >
                होम (Home)
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left font-semibold text-base py-2 text-slate-600 hover:text-brand-blue-900 border-b border-slate-50"
              >
                हमारे बारे में (About)
              </button>
              <button
                onClick={() => scrollToSection("academics")}
                className="text-left font-semibold text-base py-2 text-slate-600 hover:text-brand-blue-900 border-b border-slate-50"
              >
                शिक्षा (Academics)
              </button>
              <button
                onClick={() => scrollToSection("school-life")}
                className="text-left font-semibold text-base py-2 text-slate-600 hover:text-brand-blue-900 border-b border-slate-50"
              >
                स्कूल की झलक (School Life)
              </button>
              <button
                onClick={() => scrollToSection("admissions")}
                className="text-left font-semibold text-base py-2 text-slate-600 hover:text-brand-blue-900 border-b border-slate-50"
              >
                दाखिला (Admissions)
              </button>
              <button
                onClick={() => scrollToSection("find-us")}
                className="text-left font-semibold text-base py-2 text-slate-600 hover:text-brand-blue-900 border-b border-slate-50"
              >
                नक्शा (Find Us)
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left font-semibold text-base py-2 text-slate-600 hover:text-brand-blue-900 border-b border-slate-50"
              >
                सवाल-जवाब (FAQ)
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left font-semibold text-base py-2 text-slate-600 hover:text-brand-blue-900 border-b border-slate-50"
              >
                संपर्क (Contact)
              </button>
              
              <div className="pt-3">
                <button
                  onClick={() => scrollToSection("admissions")}
                  className="w-full bg-brand-gold-500 text-brand-blue-950 font-bold py-3 px-4 rounded-xl text-center shadow-md hover:bg-brand-gold-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>अभी नामांकन फॉर्म भरें (Admissions Form)</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-950 via-brand-blue-900 to-slate-900 text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          {/* Subtle Decorative Background Spheres */}
          <div className="absolute -top-12 -right-12 w-96 h-96 bg-brand-gold-500 opacity-5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-20 w-96 h-96 bg-brand-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Hero Text Copy */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              {/* Admissions Status Tag */}
              <div className="inline-flex items-center justify-center lg:justify-start">
                <span className="bg-brand-gold-500/10 border border-brand-gold-400/40 text-brand-gold-400 text-xs md:text-sm font-bold tracking-wider px-3.5 py-1.5 rounded-full uppercase flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  Admissions Open 2026-2027
                </span>
              </div>

              {/* Principal Hindi Helper Banner */}
              {useHindiHelps && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-500/20 border-l-4 border-amber-500 text-amber-200 text-xs py-2 px-3 rounded-lg text-left"
                >
                  🏫 <strong>ग्रामीण गिरिडीह के बच्चों के लिए विशेष रूप से संकल्पित:</strong> उत्कृष्ट अंग्रेजी माध्यम का आधुनिक ज्ञान और नैतिक मूल्य अब आपके पास पेशम में। बच्चों की सुरक्षा हमारी प्रथम प्राथमिकता है।
                </motion.div>
              )}

              {/* Clear, Warm Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                Empowering Rural Giridih Kids with modern Education & Traditional Values.
              </h2>

              {/* Subtitle with core geographical resonance */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Gyan Bharti Shiksha Niketan brings international school quality to <span className="text-white font-bold decoration-amber-500 decoration-wavy underline underline-offset-4">Pesham, Giridih</span>. Give your children the perfect mix of basic computer skills, strong English foundation, safe playground activities, and character values.
              </p>

              {/* Dynamic Benefits Bullet Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto lg:mx-0 pt-2 text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                  <span>Classes Nursery to Class 5 (KG-aligned)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                  <span>Affordable Monthly Village Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                  <span>Modern Smart Screens & Computery Toys</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                  <span>Highly Protected Secure Safe Playground</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection("admissions")}
                  className="bg-brand-gold-500 text-brand-blue-950 font-extrabold px-8 py-4 rounded-xl hover:bg-brand-gold-600 hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand-gold-500/20 transition-all duration-200 text-base flex items-center justify-center gap-2 cursor-pointer border border-amber-400"
                  id="enroll-hero-btn"
                >
                  <span>Enroll Today (प्रवेश पायें 2026)</span>
                  <span className="text-lg">➜</span>
                </button>
                <a
                  href="https://wa.me/918809169591?text=Hello,%20I%20am%20interested%20in%20admissions%20for%20Gyan%20Bharti%20Shiksha%20Niketan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-4 rounded-xl hover:scale-[1.02] active:scale-95 shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.11 1.444 4.88 1.445 5.485 0 9.948-4.469 10.003-9.96.002-2.659-1.018-5.161-2.87-7.017C16.81 1.77 14.305.748 11.644.748c-5.467 0-9.927 4.453-9.953 9.953-.001 1.745.454 3.447 1.319 4.954L1.93 21.053l5.514-1.446l.203.119zm12.19-5.182c-.313-.156-1.847-.912-2.128-1.016-.282-.102-.487-.156-.69.156-.204.312-.788 1.016-.966 1.22-.178.203-.356.228-.669.072-.313-.156-1.32-.486-2.514-1.551-.93-.83-1.557-1.855-1.738-2.167-.182-.313-.02-.482.137-.638.14-.14.313-.365.47-.547.156-.182.208-.313.313-.521.104-.208.052-.391-.026-.547-.078-.156-.69-1.666-.945-2.278-.249-.599-.5-.517-.69-.527l-.588-.011c-.203 0-.533.076-.812.381-.279.305-1.066 1.042-1.066 2.54 0 1.498 1.09 2.946 1.242 3.149.152.203 2.146 3.278 5.2 4.595.725.313 1.291.5 1.734.64.729.232 1.391.199 1.914.12.583-.087 1.847-.756 2.109-1.447.262-.69.262-1.28.183-1.406-.078-.125-.282-.203-.594-.359z"/>
                  </svg>
                  <span>Chat on WhatsApp (व्हाट्सएप चैट)</span>
                </a>
              </div>
            </div>

            {/* School Hero Feature Big Logo */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-0"
              >
                <img 
                  src="/images/Screenshot_20250923_143101_WhatsApp_032451.jpg" 
                  alt="Gyan Bharti Shiksha Niketan Big Logo" 
                  className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-none h-auto object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.3)] hover:scale-[1.03] transition-all duration-300 select-none rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST BADGE BAR / RURAL RELEVANCE */}
        <section className="bg-slate-100 py-6 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 text-sm text-slate-600">
              <span className="font-bold text-brand-blue-900 text-xs tracking-wider uppercase flex items-center gap-1">✨ GBSN Belief & Trust:</span>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-blue-900 font-bold" />
                <span className="font-semibold text-brand-blue-950">Interactive Smart-Class Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-blue-900" />
                <span className="font-semibold text-brand-blue-950">100% Secure Playgrounds</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-blue-900" />
                <span className="font-semibold text-brand-blue-950">English-Medium Book Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-blue-900" />
                <span className="font-semibold text-brand-blue-950">Best Local Regular Fees</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section id="about" className="py-20 bg-white px-4 sm:px-6 lg:px-8 ScrollSpy-Section">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Text */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-blue-900 font-extrabold uppercase text-xs md:text-sm tracking-widest bg-brand-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-brand-blue-100">
                हमारे बारे में (About Us)
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                Emphasizing Absolute Safety and Modern Learner Foundations.
              </h2>
              {useHindiHelps && (
                <p className="text-sm font-semibold text-slate-500 mt-2 bg-amber-50 p-2 rounded border border-amber-200">
                  💡 <strong>सुरक्षा और सर्वोत्तम शिक्षा का वादा:</strong> हमारे स्कूल में बच्चों की सेहत, साफ पीने के पानी, खेलने की सुरक्षित जगह और आधुनिक पढ़ाई का पूरा ध्यान रखा जाता है।
                </p>
              )}
            </div>

            {/* Content Body Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Mission Details Cards */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <h3 className="text-xl md:text-2xl font-bold font-display text-brand-blue-900">
                  Our Mission & Pure Community Values
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Founded with a clear vision to bridge the educational gap in rural Giridih region, <strong>Gyan Bharti Shiksha Niketan</strong> operates on the basic tenant that school must be the safest place outside of home. We provide learning environments where children can ask questions proudly in both Hindi and English.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Rather than rote learning from old texts, we design modern educational visual models, creative storybooks, basic computing devices, and group collaboration tools suitable for ages 3 to 11.
                </p>

                {/* Sub features list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-brand-blue-100 transition-colors">
                    <div className="h-8 w-8 bg-brand-blue-900 text-white rounded-lg flex items-center justify-center p-1.5 shadow mb-2">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">CCTVs & Verified Entry</h4>
                    <p className="text-xs text-slate-500 mt-1">Peace of mind for every villager and parent.</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-brand-blue-100 transition-colors">
                    <div className="h-8 w-8 bg-amber-500 text-brand-blue-950 rounded-lg flex items-center justify-center p-1.5 shadow mb-2">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">Discipline & Attendance</h4>
                    <p className="text-xs text-slate-500 mt-1">Daily updates sent if students are absent.</p>
                  </div>
                </div>
              </div>

              {/* Side Visual Box showcasing school highlights */}
              <div className="lg:col-span-6">
                <div className="bg-gradient-to-br from-brand-blue-900 to-brand-blue-950 text-white p-8 rounded-3xl border border-brand-blue-900 shadow-xl relative overflow-hidden flex flex-col gap-6">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 h-24 w-24 bg-white/5 rounded-full pointer-events-none"></div>

                  <span className="text-xs text-amber-400 tracking-wider font-extrabold uppercase">
                    Why Gyan Bharti Stands Tall
                  </span>
                  
                  <div className="space-y-4">
                    {SCHOOL_FEATURES.map((feat) => (
                      <div key={feat.id} className="flex gap-4 border-b border-brand-blue-900/40 pb-4 last:border-0 last:pb-0">
                        <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-400 font-bold border border-white/10 mt-1 flex-shrink-0">
                          {feat.iconName === "ShieldCheck" && <ShieldCheck className="h-5 w-5" />}
                          {feat.iconName === "BookOpen" && <BookOpen className="h-5 w-5" />}
                          {feat.iconName === "Award" && <Award className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold font-display text-base text-white">{feat.title}</h4>
                          <p className="text-xs text-slate-300 mt-1">{feat.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlight text quoting the local Panchayat status */}
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mt-2 flex items-center justify-between text-xs text-slate-200">
                    <span>📍 <strong>Pesham Panchayat Location:</strong> Near Panchayat Bhawan, Pesham</span>
                    <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded inline-block">Easy Access</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ACADEMICS SECTION */}
        <section id="academics" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8 border-y border-slate-200 ScrollSpy-Section">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Text */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-blue-900 font-extrabold uppercase text-xs md:text-sm tracking-widest bg-brand-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-slate-200">
                शिक्षा प्रणाली (Academics)
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                Our 3 Academic Blocks Focused on Solid Foundations.
              </h2>
              <p className="text-sm sm:text-base text-slate-500 mt-2">
                We believe in step-by-step cognitive layout to grow confident boys and girls.
              </p>
            </div>

            {/* 3-Column Academics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ACADEMIC_PROGRAMS.map((program, idx) => (
                <div
                  key={program.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex flex-col gap-4">
                    {/* Program Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-amber-600 font-bold bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                        {program.gradeRange}
                      </span>
                      <span className="text-slate-300 font-display font-black text-2xl group-hover:text-amber-500 transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Emblem Icon and Title */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-brand-blue-900 text-amber-400 rounded-xl flex items-center justify-center p-2 border-2 border-amber-300 shadow">
                        {program.iconName === "Smile" && <Smile className="h-5 w-5" />}
                        {program.iconName === "BookOpen" && <BookOpen className="h-5 w-5" />}
                        {program.iconName === "Award" && <Award className="h-5 w-5" />}
                      </div>
                      <h3 className="font-extrabold font-display text-lg text-slate-900">
                        {program.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed pt-2">
                      {program.description}
                    </p>

                    {/* Highlights bullet checklist */}
                    <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Core Highlights</span>
                      {program.highlights.map((bullet, k) => (
                        <div key={k} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="h-3 w-3 text-amber-600 flex-shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enrollment action triggers */}
                  <div className="pt-6">
                    <button
                      onClick={() => scrollToSection("admissions")}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-brand-blue-900 text-brand-blue-900 hover:bg-brand-blue-900 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all duration-200 cursor-pointer text-center block"
                    >
                      Fill Inquiry Form (दाखिला पूछताछ)
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Hindi language alert details */}
            {useHindiHelps && (
              <div className="mt-8 bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                  ℹ️ <strong>कक्षा विवरण:</strong> हमारे स्कूल में Nursery, LKG, UKG, और कक्षा 1 से 5 तक की उच्च कोटि की शिक्षा दी जाती है। बच्चों का स्कूल में एडमिशन कराने से पहले आप हमारी पेषम स्थित शाखा आकर कक्षाओं की व्यवस्था और सुरक्षित खेल के मैदान को स्वयं देख सकते हैं।
                </p>
              </div>
            )}

            {/* Quick trust metrics banner */}
            <div className="mt-16 bg-brand-blue-900 text-white p-8 rounded-3xl border border-brand-blue-950 shadow-lg text-center flex flex-col md:flex-row items-center justify-around gap-6">
              <div>
                <span className="text-3xl font-extrabold text-amber-400 block font-display">100%</span>
                <span className="text-xs text-slate-300 block mt-1 uppercase font-bold">Safety Supervision Track</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block"></div>
              <div>
                <span className="text-3xl font-extrabold text-amber-400 block font-display">Zero</span>
                <span className="text-xs text-slate-300 block mt-1 uppercase font-bold">Hidden Registration Extras</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block"></div>
              <div>
                <span className="text-3xl font-extrabold text-amber-400 block font-display">100%</span>
                <span className="text-xs text-slate-300 block mt-1 uppercase font-bold">Parent-Teacher Trust Rating</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block"></div>
              <div>
                <span className="text-3xl font-extrabold text-amber-400 block font-display">Pesham</span>
                <span className="text-xs text-slate-300 block mt-1 uppercase font-bold">Local School Location</span>
              </div>
            </div>

          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Text */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-blue-900 font-extrabold uppercase text-xs md:text-sm tracking-widest bg-brand-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-brand-blue-100">
                स्थानीय अभिभावकों के अनुभव (Parent Reviews)
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                Loved by Trusted Parents of Rural Giridih Panchayat.
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Listen to real stories from local farmers, daily business owners, and local residents whose kids study here.
              </p>
            </div>

            {/* Feedback Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PARENT_TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative flex flex-col justify-between hover:scale-[1.01] transition-transform">
                  <div className="flex flex-col gap-4">
                    {/* Double quotes decorations */}
                    <span className="text-4xl text-amber-500 font-serif leading-none select-none absolute top-4 left-4 opacity-25">“</span>
                    
                    <p className="text-slate-600 italic text-sm relative z-10 leading-relaxed pl-2 pt-2">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Informational Author footer */}
                  <div className="border-t border-slate-200/60 pt-4 mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 bg-brand-blue-900 text-white rounded-full font-bold flex items-center justify-center font-display text-sm">
                      {t.parentName.split(" ")[0][0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm">{t.parentName}</h4>
                      <p className="text-[11px] text-slate-500">{t.relationship} • <span className="font-semibold text-brand-blue-900">{t.location}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SCHOOL LIFE SECTION */}
        <section id="school-life" className="py-20 bg-white px-4 sm:px-6 lg:px-8 ScrollSpy-Section border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            {/* Header Text */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-blue-900 font-extrabold uppercase text-xs md:text-sm tracking-widest bg-brand-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-brand-blue-100">
                स्कूल की झलक (School Life)
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                Our Campus Life & Daily Joy of Learning
              </h2>
              <p className="text-slate-500 text-sm mt-3">
                Experience the energetic class environments, student growth milestones, and moral value developments at Gyan Bharti Shiksha Niketan. Watch our video walkthrough below.
              </p>
            </div>

            {/* Video Player Card */}
            <div className="max-w-4xl mx-auto bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xl">
              <a
                href="https://youtube.com/@gyanbhartishikshaniketan?si=zjrPC-OcKlYrx_ss"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-blue-950 via-brand-blue-900 to-slate-900 border border-slate-200/80 flex flex-col justify-center items-center group cursor-pointer select-none"
              >
                {/* Background Artwork - Blur Overlay of the School Seal Logo */}
                <div className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-sm group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none" style={{ backgroundImage: "url('/images/Screenshot_20250923_143101_WhatsApp_032451.jpg')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-950 via-transparent to-transparent opacity-80"></div>
                
                {/* School Logo Floating Emblem in Preview */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg overflow-hidden bg-white p-0.5 flex items-center justify-center">
                    <img src="/images/Screenshot_20250923_143101_WhatsApp_032451.jpg" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-white tracking-wide font-display">Gyan Bharti Campus Tour</span>
                </div>

                <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full text-[9px] uppercase font-black text-white tracking-widest animate-pulse">
                  Official Video
                </div>

                {/* Pulsing Golden Play Button container */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-brand-gold-500 rounded-full filter blur-md w-16 h-16 sm:w-20 sm:h-20 opacity-30 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-brand-gold-500 rounded-full flex items-center justify-center text-brand-blue-950 shadow-2xl border-4 border-white group-hover:bg-amber-400 group-hover:scale-110 active:scale-95 transition-all duration-300 relative z-10">
                    <svg className="h-8 w-8 sm:h-10 sm:w-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <polygon points="8 5 19 12 8 19 8 5" />
                    </svg>
                  </div>
                </div>

                {/* Titles overlay in the video mockup */}
                <div className="absolute bottom-6 text-center px-4 w-full">
                  <h4 className="text-white text-base sm:text-xl font-bold font-display tracking-tight drop-shadow-md">
                    Click to Play School Tour Walkthrough
                  </h4>
                  <p className="text-amber-400 font-extrabold text-[10px] sm:text-xs mt-1 uppercase tracking-wider">
                    Official YouTube Channel • 1080p Ultra HD
                  </p>
                </div>
              </a>

              {/* Direct Youtube link helper in case of browser embedding restrictions */}
              <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-700 hidden sm:block">
                    <svg className="h-6 w-6 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25a29 29 0 0 0-.46-5.33z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-800 font-display">Watch Directly on YouTube Channel</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Explore our daily school updates, student moral programs, speeches, and general events!</p>
                  </div>
                </div>
                <a
                  href="https://youtube.com/@gyanbhartishikshaniketan?si=zjrPC-OcKlYrx_ss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-extrabold text-xs px-5 py-3 rounded-xl shadow transition-colors flex items-center gap-1.5 border border-amber-400 shrink-0 select-none cursor-pointer"
                >
                  <span>Open YouTube Channel</span>
                  <span>➜</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ADMISSIONS FORM SECTION */}
        <section id="admissions" className="py-20 bg-gradient-to-tr from-brand-blue-950 via-brand-blue-900 to-slate-900 text-white px-4 sm:px-6 lg:px-8 ScrollSpy-Section">
          <div className="max-w-4xl mx-auto">
            
            {/* Form Section Header banner */}
            <div className="text-center mb-12">
              <span className="bg-brand-gold-500 text-brand-blue-950 font-extrabold uppercase text-xs tracking-wider px-4 py-1.5 rounded-full inline-block mb-3">
                Admission Form 2026-2027
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display leading-tight">
                Secure Your Child’s Bright Future Today!
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-2xl mx-auto">
                Fill this simple local form. Our principal or lead counselor office in Pesham, Giridih will review and call you directly within 24 working hours to confirm interview.
              </p>
              
              {/* Optional Hindi Toggle Alert card inside form */}
              {useHindiHelps && (
                <div className="mt-4 bg-amber-500/20 text-amber-200 text-xs p-3 rounded-xl max-w-xl mx-auto border border-amber-500/30 text-left">
                  🌟 <strong>नामांकन निर्देश:</strong> कृपया नीचे दिए गए डिब्बों में अपना नाम, बच्चे का नाम, और सही मोबाइल नंबर भरें। कोई भी आवेदन शुल्क अभी नहीं लिया जायेगा। स्कूल का स्टाफ आपसे फोन पर तुरंत संपर्क करेगा।
                </div>
              )}
            </div>

            {/* Real admissions interactive submission panel */}
            <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 relative">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Error Banner */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs sm:text-sm rounded font-medium flex items-center gap-2"
                  >
                    <HelpCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Success Banner */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-green-50 border border-green-200 text-green-900 rounded-2xl text-xs sm:text-sm font-medium flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <strong className="text-green-800">Inquiry Received Successfully! (आवेदन प्राप्त हुआ)</strong>
                    </div>
                    <p className="text-slate-700 text-xs">
                      Thank you for trusting Gyan Bharti Shiksha Niketan. Your registration receipt ID is <code className="bg-green-100 font-mono px-2 py-0.5 rounded text-green-800 text-[11px] font-bold">GBSN-{Date.now().toString().slice(-6)}</code>. Our admission staff will call your phone soon. You can view your record in the "Local Inquiries Desk" panel below.
                    </p>
                  </motion.div>
                )}

                {/* 2-Column Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Parent Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="parentName" className="font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-between">
                      <span>Parent Name (अभिभावक का नाम) <span className="text-red-500">*</span></span>
                      {useHindiHelps && <span className="text-[10px] text-slate-500 font-normal">पिताजी या माताजी का पूरा नाम</span>}
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      placeholder="Enter Parent Name"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-900 focus:bg-white transition-colors"
                      required
                    />
                  </div>

                  {/* Child Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="childName" className="font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-between">
                      <span>Child Full Name (बच्चे का नाम) <span className="text-red-500">*</span></span>
                      {useHindiHelps && <span className="text-[10px] text-slate-500 font-normal">बच्चे का पूरा नाम दर्ज करें</span>}
                    </label>
                    <input
                      type="text"
                      id="childName"
                      placeholder="Enter Child Full Name"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-900 focus:bg-white transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Phone & Class Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Mobile Mobile Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-between">
                      <span>Phone Number (मोबाइल नंबर) <span className="text-red-500">*</span></span>
                      {useHindiHelps && <span className="text-[10px] text-slate-500 font-normal">10 अंकों का फोन नंबर</span>}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-xs text-slate-400 font-bold border-r border-slate-200 pr-2">
                        +91
                      </span>
                      <input
                        type="tel"
                        id="phone"
                        maxLength={10}
                        placeholder="Enter Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\s/g, ""))}
                        className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-900 focus:bg-white transition-colors font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Selecting target school class range */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="schoolClass" className="font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-between">
                      <span>Target School Class (कक्षा चुनें) <span className="text-red-500">*</span></span>
                      {useHindiHelps && <span className="text-[10px] text-slate-500 font-normal">प्रवेश हेतु कक्षा चुनें</span>}
                    </label>
                    <select
                      id="schoolClass"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-900 focus:bg-white transition-colors"
                      required
                    >
                      <option value="">-- Choose Class --</option>
                      <option value="Nursery">Nursery Class</option>
                      <option value="LKG">LKG (Lower Kindergarten)</option>
                      <option value="UKG">UKG (Upper Kindergarten)</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                    </select>
                  </div>
                </div>

                {/* Additional Information details */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="customNotes" className="font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-between">
                    <span>Village Address or Special Notes (गाँव का नाम या अन्य जानकारी)</span>
                    <span className="text-[11px] text-slate-400 font-normal">Optional</span>
                  </label>
                  <textarea
                    id="customNotes"
                    rows={2}
                    placeholder="Enter village address and notes here"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-900 focus:bg-white transition-colors"
                  ></textarea>
                </div>

                {/* Big Submit Button CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-gold-500 hover:bg-brand-gold-600 disabled:bg-slate-300 text-brand-blue-950 font-extrabold text-[15px] sm:text-base py-3.5 sm:py-4 px-6 rounded-2xl shadow-lg border border-amber-400 hover:scale-[1.01] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer mt-4"
                  id="submit-admissions-btn"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2 justify-center">
                      <span className="h-5 w-5 border-2 border-brand-blue-900 border-t-transparent animate-spin rounded-full"></span>
                      <span>Submitting Inquiry...</span>
                    </div>
                  ) : (
                    <>
                      <span>Submit Admission Inquiry (नामांकन फॉर्म जमा करें)</span>
                      <span>➜</span>
                    </>
                  )}
                </button>
              </form>

              {/* Local inquiries storage visual validation screen */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowInquiryPanel(!showInquiryPanel)}
                    className="text-xs font-bold text-slate-500 hover:text-brand-blue-900 flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>
                      {showInquiryPanel ? "Hide Local Inquiries Desk" : `Show Saved Local Inquiries (${localInquiries.length})`}
                    </span>
                    <ChevronDown className={`h-3 w-3 transform transition-transform ${showInquiryPanel ? "rotate-180" : ""}`} />
                  </button>
                  {localInquiries.length > 0 && showInquiryPanel && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Are you sure you want to clear your local demo inquiries history?")) {
                          localStorage.removeItem("gbsn_inquiries");
                          setLocalInquiries([]);
                        }
                      }}
                      className="text-[10px] uppercase tracking-wider font-extrabold text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Clear History</span>
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {showInquiryPanel && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4"
                    >
                      {localInquiries.length === 0 ? (
                        <div className="p-6 bg-slate-50 rounded-xl text-center border border-slate-100 text-xs text-slate-400">
                          No inquiries listed in local browser database yet. Fill out the form above to list one!
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                          {localInquiries.map((item) => (
                            <div
                              key={item.id}
                              className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center text-xs text-slate-700"
                            >
                              <div className="flex flex-col gap-1 pr-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900">{item.childName}</span>
                                  <span className="bg-brand-blue-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {item.className}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  Parent: <span className="font-semibold">{item.parentName}</span> | Phone:{" "}
                                  <span className="font-mono">{item.phone}</span>
                                </div>
                                {item.notes && (
                                  <div className="text-[10px] text-slate-400 italic mt-0.5">"Note: {item.notes}"</div>
                                )}
                                <div className="text-[9px] text-slate-400 font-mono mt-1">Submitted: {item.submittedAt}</div>
                              </div>
                              <button
                                onClick={() => deleteInquiry(item.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors flex-shrink-0"
                                title="Remove entry"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
        <section id="faq" className="py-20 bg-white px-4 sm:px-6 lg:px-8 ScrollSpy-Section">
          <div className="max-w-4xl mx-auto">
            
            {/* Header Text */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-blue-900 font-extrabold uppercase text-xs md:text-sm tracking-widest bg-brand-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-brand-blue-100">
                अक्सर पूछे जाने वाले सवाल (FAQ)
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                Clear Answers for Parents of Gyan Bharti.
              </h2>
              <p className="text-slate-500 text-sm mt-3">
                Still have questions? Read through our standard local parent replies or tap the Hindi Helper toggle at the top of the page.
              </p>
            </div>

            {/* Accordion Questions Stack */}
            <div className="space-y-4">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden transition-all duration-300"
                  >
                    {/* Header bar button toggle */}
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none transition-colors cursor-pointer hover:bg-slate-100/60"
                    >
                      <div className="flex flex-col gap-1 pr-2">
                        <span className="font-extrabold text-sm sm:text-base text-brand-blue-950 font-display">
                          {faq.question}
                        </span>
                        {useHindiHelps && faq.questionHindi && (
                          <span className="text-xs font-semibold text-amber-700">
                            {faq.questionHindi}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform flex-shrink-0 ${
                          isOpen ? "rotate-180 text-brand-blue-900" : ""
                        }`}
                      />
                    </button>

                    {/* Answer content block */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-white"
                        >
                          <div className="p-5 border-t border-slate-200/70 text-slate-600 leading-relaxed text-xs sm:text-sm space-y-3.5">
                            <p>{faq.answer}</p>
                            
                            {/* Hindi direct assist box */}
                            {faq.answerHindi && (
                              <div className="bg-amber-500/10 text-slate-800 p-3 rounded-lg text-xs leading-relaxed border-l-2 border-brand-gold-500">
                                <strong>हिंदी अनुवाद:</strong> {faq.answerHindi}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* CTA inside FAQ */}
            <div className="mt-12 bg-slate-100 border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h4 className="font-extrabold text-base text-slate-800">Have a different question not listed above?</h4>
                <p className="text-xs text-slate-500 mt-1">Talk to our lead coordinator of Gyan Bharti Shiksha Niketan.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href="tel:+918809169591"
                  className="bg-brand-blue-900 text-white hover:bg-brand-blue-950 font-bold text-xs px-5 py-3 rounded-xl shadow transition-colors flex items-center gap-1.5"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call +91 8809169591</span>
                </a>
                <a
                  href="https://wa.me/918809169591?text=Hello,%20I%20am%20interested%20in%20admissions%20for%20Gyan%20Bharti%20Shiksha%20Niketan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-gold-500 text-brand-blue-950 hover:bg-brand-gold-600 font-extrabold text-xs px-5 py-3 rounded-xl shadow transition-colors flex items-center gap-1.5 border border-amber-400"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.11 1.444 4.88 1.445 5.485 0 9.948-4.469 10.003-9.96.002-2.659-1.018-5.161-2.87-7.017C16.81 1.77 14.305.748 11.644.748c-5.467 0-9.927 4.453-9.953 9.953-.001 1.745.454 3.447 1.319 4.954L1.93 21.053l5.514-1.446l.203.119zm12.19-5.182c-.313-.156-1.847-.912-2.128-1.016-.282-.102-.487-.156-.69.156-.204.312-.788 1.016-.966 1.22-.178.203-.356.228-.669.072-.313-.156-1.32-.486-2.514-1.551-.93-.83-1.557-1.855-1.738-2.167-.182-.313-.02-.482.137-.638.14-.14.313-.365.47-.547.156-.182.208-.313.313-.521.104-.208.052-.391-.026-.547-.078-.156-.69-1.666-.945-2.278-.249-.599-.5-.517-.69-.527l-.588-.011c-.203 0-.533.076-.812.381-.279.305-1.066 1.042-1.066 2.54 0 1.498 1.09 2.946 1.242 3.149.152.203 2.146 3.278 5.2 4.595.725.313 1.291.5 1.734.64.729.232 1.391.199 1.914.12.583-.087 1.847-.756 2.109-1.447.262-.69.262-1.28.183-1.406-.078-.125-.282-.203-.594-.359z"/>
                  </svg>
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* FIND US SECTION */}
        <section id="find-us" className="py-20 bg-white px-4 sm:px-6 lg:px-8 ScrollSpy-Section border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            {/* Header Text */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-blue-900 font-extrabold uppercase text-xs md:text-sm tracking-widest bg-brand-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-brand-blue-100">
                हमारा स्थान (Find Us)
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                Locate Gyan Bharti Shiksha Niketan on Google Maps
              </h2>
              <p className="text-slate-500 text-sm mt-3">
                Visit our physical office for class registrations, direct counseling, and campus walkthroughs. We are located near the Panchayat Bhawan in Pesham, Giridih.
              </p>
            </div>

            {/* Google Map Player Card */}
            <div className="max-w-4xl mx-auto bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xl">
              
              {/* Custom Designed High-Fidelity Location Board */}
              <div className="relative h-[360px] sm:h-[420px] w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-brand-blue-950 to-slate-900 border border-slate-200/80 flex flex-col p-6 sm:p-8 justify-between">
                
                {/* Decorative Grid Overlay for technical roadmap look */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Top header bar */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                      <Map className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-white font-display">Campus Location Schematic</h4>
                      <p className="text-[11px] text-slate-400">📍 Pesham, Giridih District, Jharkhand, India</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-[10px] bg-green-500/20 text-green-300 font-extrabold px-2.5 py-1 rounded-full border border-green-500/30 uppercase tracking-wider">
                    Easy Road Access
                  </span>
                </div>

                {/* Schematic Visual Graph of Route */}
                <div className="relative z-10 my-auto py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative">
                    
                    {/* Step 1: Pesham Turning */}
                    <div className="bg-white/5 backdrop-blur px-4 py-3 rounded-2xl border border-white/10 text-center relative hover:border-white/20 transition-colors">
                      <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider block">Intersection</span>
                      <p className="text-white font-bold text-xs mt-1">Pesham Main Road</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Turn near market side</span>
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-amber-400 translate-x-1.5 z-20">➜</div>
                    </div>

                    {/* Step 2: Panchayat Bhawan Landmark */}
                    <div className="bg-white/5 backdrop-blur px-4 py-3 rounded-2xl border border-white/10 text-center relative hover:border-white/20 transition-colors">
                      <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider block">Guiding Landmark</span>
                      <p className="text-white font-bold text-xs mt-1">Panchayat Bhawan</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Under 50 meters away</span>
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-green-400 translate-x-1.5 z-20">➜</div>
                    </div>

                    {/* Step 3: School Gates Destination */}
                    <div className="bg-brand-gold-500/10 border-2 border-brand-gold-500 shadow-md shadow-brand-gold-500/10 px-4 py-4 rounded-2xl text-center relative transform hover:scale-[1.02] transition-transform">
                      <span className="text-[9px] text-brand-gold-400 font-extrabold uppercase tracking-widest block">Destination</span>
                      <p className="text-white font-black text-sm mt-1 font-display">Gyan Bharti Campus</p>
                      <span className="text-[10px] text-brand-gold-300 block mt-0.5 font-semibold">📍 GBSN Main Entrance</span>
                    </div>

                  </div>

                  {/* Regional Connectivity Grid highlights */}
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    <div className="px-2 py-1.5 bg-slate-900/50 rounded-xl border border-white/5">
                      <span className="text-[9px] text-slate-400 block">From Jamua</span>
                      <strong className="text-xs text-slate-200">~18 KM (30 Min)</strong>
                    </div>
                    <div className="px-2 py-1.5 bg-slate-900/50 rounded-xl border border-white/5">
                      <span className="text-[9px] text-slate-400 block">From Giridih</span>
                      <strong className="text-xs text-slate-200">~25 KM (45 Min)</strong>
                    </div>
                    <div className="px-2 py-1.5 bg-slate-900/50 rounded-xl border border-white/5">
                      <span className="text-[9px] text-slate-400 block">From Deori</span>
                      <strong className="text-xs text-slate-200">~22 KM (40 Min)</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick-Directions Prompt Area */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 bg-slate-950/20 rounded-xl p-3">
                  <div className="text-center sm:text-left">
                    <h5 className="font-bold text-xs text-white">Need Active Satellite Navigation?</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">Click map link below to redirect to official location coordinates on Google Maps app.</p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/ozunogT7dxVswZSk8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-1.5 border border-amber-400 shrink-0 select-none cursor-pointer"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    <span>Launch Google Maps Live</span>
                  </a>
                </div>

              </div>

              {/* Direct Maps App deep-link helper */}
              <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-blue-900/10 rounded-xl text-brand-blue-900 hidden sm:block">
                    <Map className="h-6 w-6" strokeWidth="2" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-800">Get Navigation Directions</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Open Google Maps app directly on your smartphone to get turn-by-turn driving routing.</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/ozunogT7dxVswZSk8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue-900 hover:bg-brand-blue-950 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0 select-none cursor-pointer"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* GEOLOCATION / VISIT US CTA INFO */}
        <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-8 ScrollSpy-Section">
          <div className="max-w-7xl mx-auto">
            
            {/* Split layout: Contact facts & Directions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Contact Credentials Column */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <span className="text-brand-blue-900 font-extrabold uppercase text-xs md:text-sm tracking-widest bg-brand-blue-50 px-3.5 py-1.5 rounded-full inline-block self-start border border-slate-200">
                  संपर्क सूत्र (Contact Office)
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-slate-900">
                  Visit Gyan Bharti Shiksha Niketan in Pesham, Giridih.
                </h2>
                
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Our main office is situated Near the <strong>Panchayat Bhawan, Pesham, Giridih</strong>. All physical copies of admission forms, receipts, uniforms, syllabi booklets, and class routines are resolved directly at the counter.
                </p>

                {/* Direct quick credentials nodes */}
                <div className="space-y-4 pt-3">
                  {/* Address */}
                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 bg-brand-blue-950 text-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">Our Location Address</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Near Panchayat Bhawan, Pesham, Giridih, Jharkhand</p>
                      {useHindiHelps && (
                        <p className="text-[10px] text-amber-700 italic font-semibold mt-0.5">
                          📍 पंचायत भवन के पास, पेषम, गिरिडीह
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Telephone Dialers */}
                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 bg-brand-blue-950 text-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">Official Mobile Helpline</h4>
                      <a href="tel:+918809169591" className="text-sm font-bold text-brand-blue-900 hover:underline hover:text-brand-blue-950 block mt-0.5">
                        +91 88091 69591
                      </a>
                      <p className="text-xs text-slate-400">Available from 8:00 AM to 6:00 PM (Monday - Saturday)</p>
                    </div>
                  </div>

                  {/* Campus Open timings */}
                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 bg-brand-blue-950 text-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">Office Working Hours</h4>
                      <p className="text-xs text-slate-500 mt-0.5">8:00 AM to 3:00 PM | Office open for walk-in inquiry inquiries</p>
                    </div>
                  </div>
                </div>

                {/* Secure trust stamp */}
                <div className="p-4 bg-brand-blue-50 rounded-2xl border border-brand-blue-100/70 flex gap-3 text-xs text-brand-blue-900">
                  <ShieldCheck className="h-5 w-5 text-brand-blue-900 flex-shrink-0" />
                  <div>
                    <strong>Direct Local Accountability</strong>
                    <span className="block text-slate-500 mt-0.5">No agency or commission. We are local people serving parents for child prosperity.</span>
                  </div>
                </div>

              </div>

              {/* Graphical Map Guidance Box */}
              <div className="lg:col-span-6">
                <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-brand-blue-900" />
                      <span className="font-bold text-xs sm:text-sm text-slate-800 font-display">School Route Instructions</span>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded uppercase">Pesham Main Road</span>
                  </div>

                  {/* High visual presentation box guiding parents */}
                  <div className="p-6 bg-slate-900 text-white rounded-2xl relative overflow-hidden flex flex-col gap-4">
                    {/* Background visual abstract path */}
                    <div className="absolute inset-0 bg-slate-950/20 opacity-40 pointer-events-none"></div>
                    
                    <span className="text-xs text-brand-gold-400 font-extrabold uppercase tracking-wider block">Visual Landmarks Guide</span>
                    
                    <ul className="space-y-4 text-xs text-slate-200 relative z-10">
                      <li className="flex gap-2.5 items-start">
                        <span className="h-5 w-5 rounded-full bg-brand-blue-900 text-amber-400 border border-amber-300 font-bold flex items-center justify-center text-[10px] flex-shrink-0">1</span>
                        <div>
                          <strong>Arrive at Pesham:</strong> Reach the Pesham Main Road intersection.
                        </div>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="h-5 w-5 rounded-full bg-brand-blue-900 text-amber-400 border border-amber-300 font-bold flex items-center justify-center text-[10px] flex-shrink-0">2</span>
                        <div>
                          <strong>Locate Panchayat Bhawan:</strong> Look for the prominent Pesham Panchayat Bhawan building on the left side of the road.
                        </div>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="h-5 w-5 rounded-full bg-brand-blue-900 text-amber-400 border border-amber-300 font-bold flex items-center justify-center text-[10px] flex-shrink-0">3</span>
                        <div>
                          <strong>Near Panchayat Bhawan:</strong> The grand school gates of <em>Gyan Bharti Shiksha Niketan</em> are situated near the courtyard.
                        </div>
                      </li>
                    </ul>

                    {/* Integrated Mini Google Map Guide Card */}
                    <div className="relative p-5 w-full rounded-xl overflow-hidden border border-white/10 shadow-inner mt-2 z-10 bg-slate-950 flex flex-col justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-brand-gold-400 animate-pulse" />
                        <span className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">Compass Navigation Guide</span>
                      </div>
                      
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        The school campus lies precisely <strong>50 meters North of the Panchayat Bhawan</strong> building in Pesham. Reach our main gate easily by regular motor vehicles.
                      </p>

                      <a
                        href="https://maps.app.goo.gl/ozunogT7dxVswZSk8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-[11px] py-2 px-3 rounded-lg text-center transition-colors border border-white/10 flex items-center justify-center gap-1.5"
                      >
                        <span>Open Directions on Google Maps</span>
                        <span>➜</span>
                      </a>
                    </div>

                    <div className="border-t border-white/10 pt-3 flex flex-wrap items-center justify-center gap-2">
                      <a
                        href="tel:+918809169591"
                        className="bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] sm:text-xs py-2 px-3.5 rounded-lg inline-flex items-center gap-1.5 transition-colors border border-white/10"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Call support</span>
                      </a>
                      <a
                        href="https://wa.me/918809169591?text=Hello,%20I%20am%20interested%20in%20admissions%20for%20Gyan%20Bharti%20Shiksha%20Niketan."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-950 font-extrabold text-[11px] sm:text-xs py-2 px-4 rounded-lg inline-flex items-center gap-1.5 transition-colors border border-amber-400"
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.11 1.444 4.88 1.445 5.485 0 9.948-4.469 10.003-9.96.002-2.659-1.018-5.161-2.87-7.017C16.81 1.77 14.305.748 11.644.748c-5.467 0-9.927 4.453-9.953 9.953-.001 1.745.454 3.447 1.319 4.954L1.93 21.053l5.514-1.446l.203.119zm12.19-5.182c-.313-.156-1.847-.912-2.128-1.016-.282-.102-.487-.156-.69.156-.204.312-.788 1.016-.966 1.22-.178.203-.356.228-.669.072-.313-.156-1.32-.486-2.514-1.551-.93-.83-1.557-1.855-1.738-2.167-.182-.313-.02-.482.137-.638.14-.14.313-.365.47-.547.156-.182.208-.313.313-.521.104-.208.052-.391-.026-.547-.078-.156-.69-1.666-.945-2.278-.249-.599-.5-.517-.69-.527l-.588-.011c-.203 0-.533.076-.812.381-.279.305-1.066 1.042-1.066 2.54 0 1.498 1.09 2.946 1.242 3.149.152.203 2.146 3.278 5.2 4.595.725.313 1.291.5 1.734.64.729.232 1.391.199 1.914.12.583-.087 1.847-.756 2.109-1.447.262-.69.262-1.28.183-1.406-.078-.125-.282-.203-.594-.359z"/>
                        </svg>
                        <span>WhatsApp Route Help</span>
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-50 text-slate-600 p-3.5 rounded-xl text-xs flex gap-2">
                    <MapPin className="h-4 w-4 text-brand-blue-900 flex-shrink-0 mt-0.5" />
                    <span>Serving students from <strong>Pesham village</strong> safely.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-brand-blue-950 text-white pt-12 pb-8 border-t border-brand-blue-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          {/* Main Footer Elements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-brand-blue-900 pb-8">
            
            {/* School identity brand footer pane */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <img 
                    src="/images/Screenshot_20250923_143101_WhatsApp_032451.jpg" 
                    alt="Gyan Bharti Shiksha Niketan" 
                    className="w-full h-full object-contain z-10" 
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />
                </div>
                <h3 className="text-base font-extrabold font-display tracking-tight text-white uppercase">
                  Gyan Bharti Shiksha Niketan
                </h3>
              </div>
              
              <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
                Empowering the rural community of Giridih by facilitating trustable bilingual English-medium education, safe playgrounds, and robust cultural moral values for primary school years.
              </p>

              <div className="text-[11px] text-slate-400 mt-1 italic flex flex-col gap-0.5">
                <span className="text-brand-gold-400 font-semibold text-xs not-italic">Education is Life • शिक्षा ही जीवन है</span>
                <span>तमसो मा ज्योतिर्गमय — From Darkness (Ignorance) lead us onto Light (Knowledge).</span>
              </div>
            </div>

            {/* Quick Link categories */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h4 className="font-bold text-xs text-brand-gold-400 uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <button onClick={() => scrollToSection("home")} className="hover:text-amber-400 cursor-pointer text-left">
                    Home (मुख्य पृष्ठ)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-amber-400 cursor-pointer text-left">
                    About Us (हमारे बारे में)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("academics")} className="hover:text-amber-400 cursor-pointer text-left">
                    Academics Program (शिक्षा प्रणाली)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("admissions")} className="hover:text-amber-400 cursor-pointer text-left">
                    Admission Form 2026 (दाखिला फॉर्म)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("faq")} className="hover:text-amber-400 cursor-pointer text-left">
                    Parents FAQ (पूछे जाने वाले सवाल)
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Details categorization */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <h4 className="font-bold text-xs text-brand-gold-400 uppercase tracking-widest">Office Credentials</h4>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex gap-2.5 items-start">
                  <MapPin className="h-4 w-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Near Panchayat Bhawan, Pesham, Giridih Block, Jharkhand, PIN-815301
                  </span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Phone className="h-4 w-4 text-brand-gold-400 flex-shrink-0" />
                  <a href="tel:+918809169591" className="hover:text-amber-400 hover:underline">
                    +91 88091 69591
                  </a>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">
                    Admission Desk Open Hour: 8:00 AM - 3:00 PM
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Sub copyright section */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
            <p>
              © {new Date().getFullYear()} Gyan Bharti Shiksha Niketan. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="bg-slate-800 px-2 py-1 rounded">Giridih, Jharkhand</span>
              <span className="bg-slate-800 px-2 py-1 rounded text-amber-400 font-bold font-mono">Academic Session: 2026-27</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Quick-Connect Badge */}
      <a
        href="https://wa.me/918809169591?text=Hello,%20I%20am%20interested%20in%20admissions%20for%20Gyan%20Bharti%20Shiksha%20Niketan."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white cursor-pointer group"
        aria-label="Direct Admissions Help on WhatsApp"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.11 1.444 4.88 1.445 5.485 0 9.948-4.469 10.003-9.96.002-2.659-1.018-5.161-2.87-7.017C16.81 1.77 14.305.748 11.644.748c-5.467 0-9.927 4.453-9.953 9.953-.001 1.745.454 3.447 1.319 4.954L1.93 21.053l5.514-1.446l.203.119zm12.19-5.182c-.313-.156-1.847-.912-2.128-1.016-.282-.102-.487-.156-.69.156-.204.312-.788 1.016-.966 1.22-.178.203-.356.228-.669.072-.313-.156-1.32-.486-2.514-1.551-.93-.83-1.557-1.855-1.738-2.167-.182-.313-.02-.482.137-.638.14-.14.313-.365.47-.547.156-.182.208-.313.313-.521.104-.208.052-.391-.026-.547-.078-.156-.69-1.666-.945-2.278-.249-.599-.5-.517-.69-.527l-.588-.011c-.203 0-.533.076-.812.381-.279.305-1.066 1.042-1.066 2.54 0 1.498 1.09 2.946 1.242 3.149.152.203 2.146 3.278 5.2 4.595.725.313 1.291.5 1.734.64.729.232 1.391.199 1.914.12.583-.087 1.847-.756 2.109-1.447.262-.69.262-1.28.183-1.406-.078-.125-.282-.203-.594-.359z"/>
        </svg>
        <span className="text-xs font-bold leading-none">WhatsApp Admissions Help</span>
      </a>

    </div>
  );
}
