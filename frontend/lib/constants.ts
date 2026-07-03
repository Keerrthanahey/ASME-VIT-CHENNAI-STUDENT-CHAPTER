export const SITE_CONFIG = {
  name: "ASME VIT Chennai",
  fullName: "ASME VIT Chennai Student Chapter",
  tagline: "Engineering Excellence Through Innovation",
  description:
    "Official digital platform of the ASME VIT Chennai Student Chapter — empowering mechanical engineering students through technical excellence, industry exposure, and innovation.",
  url: "https://asme-vit.vercel.app",
  email: "asme.vit@vit.ac.in",
  phone: "+91 44 2243 1000",
  address: "VIT Chennai, Kelambakkam - Vandalur Road, Chennai, Tamil Nadu 600127",
  social: {
    instagram: "https://instagram.com/asmevit",
    linkedin: "https://linkedin.com/company/asme-vit-chennai",
    youtube: "https://youtube.com/@asmevit",
    github: "https://github.com/asme-vit",
  },
  coordinates: { lat: 12.8406, lng: 80.1534 },
  asmeInternational: "https://www.asme.org",
  asmeIndia: "https://www.asme.org/about-asme/get-involved/student-resources",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/workshops", label: "Workshops" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/gallery", label: "Gallery" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
] as const;

export const STATISTICS = [
  { label: "Total Members", value: 450, suffix: "+", icon: "Users" },
  { label: "Events Conducted", value: 85, suffix: "+", icon: "Calendar" },
  { label: "Workshops", value: 42, suffix: "+", icon: "Wrench" },
  { label: "Technical Talks", value: 35, suffix: "+", icon: "Mic" },
  { label: "Industrial Visits", value: 18, suffix: "+", icon: "Factory" },
  { label: "Competitions", value: 25, suffix: "+", icon: "Trophy" },
  { label: "Alumni Network", value: 1200, suffix: "+", icon: "GraduationCap" },
  { label: "Years of Excellence", value: 12, suffix: "", icon: "Award" },
] as const;

export const ABOUT_CONTENT = {
  asmeInternational: {
    title: "About ASME International",
    content:
      "The American Society of Mechanical Engineers (ASME) is a not-for-profit professional organization that enables collaboration, knowledge sharing, and skill development across all engineering disciplines. Founded in 1880, ASME serves over 100,000 members in 150+ countries, setting codes and standards that protect public safety and promote engineering excellence worldwide.",
  },
  asmeIndia: {
    title: "About ASME India",
    content:
      "ASME India Section connects engineering professionals and students across the nation, fostering innovation in mechanical engineering. With numerous student sections at premier institutions, ASME India promotes technical education, research collaboration, and industry partnerships to advance the engineering profession in India.",
  },
  asmeVit: {
    title: "About ASME VIT Chennai",
    content:
      "The ASME VIT Chennai Student Chapter is one of the most active and prestigious student chapters in South India. Established with a vision to bridge academia and industry, we organize technical workshops, industrial visits, competitions, and guest lectures that empower mechanical engineering students with practical skills and professional networks.",
  },
  mission:
    "To foster technical excellence, innovation, and professional development among mechanical engineering students through industry-aligned programs, hands-on learning, and leadership opportunities.",
  vision:
    "To be the premier student chapter that transforms mechanical engineering students into industry-ready professionals and future leaders in engineering innovation.",
  objectives: [
    "Organize technical workshops and hands-on training sessions",
    "Facilitate industry exposure through visits and guest lectures",
    "Promote research and innovation in mechanical engineering",
    "Develop leadership and professional skills among members",
    "Participate in national and international ASME competitions",
    "Build a strong alumni network for mentorship and placements",
  ],
  coreValues: [
    { title: "Innovation", description: "Pushing boundaries in engineering design and technology" },
    { title: "Excellence", description: "Maintaining the highest standards in everything we do" },
    { title: "Integrity", description: "Ethical engineering practices and professional conduct" },
    { title: "Collaboration", description: "Teamwork across disciplines and institutions" },
    { title: "Leadership", description: "Empowering students to lead and inspire" },
    { title: "Impact", description: "Creating meaningful change in engineering education" },
  ],
} as const;

export const WHY_JOIN = [
  {
    title: "Industry Exposure",
    description: "Connect with leading companies through industrial visits, internships, and guest lectures from industry experts.",
    icon: "Building2",
  },
  {
    title: "Technical Workshops",
    description: "Hands-on training in CAD, FEA, CFD, and manufacturing processes with industry-standard software.",
    icon: "Cpu",
  },
  {
    title: "CAD Training",
    description: "Master SolidWorks, CATIA, Fusion 360, and ANSYS through structured certification programs.",
    icon: "Box",
  },
  {
    title: "Research Opportunities",
    description: "Collaborate on cutting-edge research projects with faculty and publish in reputed journals.",
    icon: "FlaskConical",
  },
  {
    title: "Industrial Visits",
    description: "Visit manufacturing plants, R&D centers, and aerospace facilities across India.",
    icon: "Factory",
  },
  {
    title: "Networking",
    description: "Build connections with peers, alumni, and professionals in the mechanical engineering domain.",
    icon: "Network",
  },
  {
    title: "Leadership",
    description: "Develop leadership skills by organizing events, managing teams, and representing ASME.",
    icon: "Crown",
  },
  {
    title: "Competitions",
    description: "Participate in HPVC, SDC, and other ASME competitions at national and international levels.",
    icon: "Trophy",
  },
  {
    title: "Certifications",
    description: "Earn recognized certifications in CAD, simulation, and manufacturing technologies.",
    icon: "BadgeCheck",
  },
] as const;

export const DOMAINS = [
  { title: "CAD & Design", icon: "PenTool", color: "from-blue-500 to-cyan-500" },
  { title: "Aerospace", icon: "Rocket", color: "from-indigo-500 to-purple-500" },
  { title: "Manufacturing", icon: "Factory", color: "from-orange-500 to-red-500" },
  { title: "Robotics", icon: "Bot", color: "from-green-500 to-emerald-500" },
  { title: "Thermal Engineering", icon: "Flame", color: "from-red-500 to-orange-500" },
  { title: "Materials Science", icon: "Layers", color: "from-purple-500 to-pink-500" },
  { title: "Mechatronics", icon: "CircuitBoard", color: "from-cyan-500 to-blue-500" },
  { title: "Automation", icon: "Cog", color: "from-yellow-500 to-amber-500" },
] as const;

export const FAQ_DATA = [
  {
    id: "1",
    question: "How do I join ASME VIT Chennai?",
    answer: "You can join by registering through our member portal using your VIT email. Membership is open to all mechanical engineering students. Click the 'Join ASME' button on our homepage to get started.",
    category: "membership",
  },
  {
    id: "2",
    question: "What are the membership benefits?",
    answer: "Members get access to workshops, industrial visits, technical resources, certificates, networking events, and priority registration for all chapter events.",
    category: "membership",
  },
  {
    id: "3",
    question: "Are workshops free for members?",
    answer: "Most workshops are free for ASME members. Some specialized certification programs may have a nominal fee to cover materials and software licenses.",
    category: "events",
  },
  {
    id: "4",
    question: "How can I volunteer for events?",
    answer: "Volunteer opportunities are posted on the member dashboard. You can sign up for event committees and earn volunteer hours that appear on your membership profile.",
    category: "volunteering",
  },
  {
    id: "5",
    question: "Does ASME help with placements?",
    answer: "Yes! Our alumni network and industry connections provide mentorship, internship referrals, and placement guidance. We also organize resume workshops and mock interviews.",
    category: "career",
  },
] as const;
