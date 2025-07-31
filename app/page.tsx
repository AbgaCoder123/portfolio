"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Star,
  Code,
  Palette,
  Smartphone,
  Globe,
  Database,
  Zap,
  Play,
  Award,
  Users,
  Coffee,
  Heart,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sun,
  Moon,
  GitPullRequestDraftIcon,
  Hand,
} from "lucide-react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const projectsPerPage = 6;
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Advanced parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const aboutY = useTransform(scrollYProgress, [0.2, 0.5], ["50px", "-50px"]);
  const skillsRotate = useTransform(scrollYProgress, [0.3, 0.7], [0, 5]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    {
      name: "Frontend Development",
      icon: Code,
      level: 95,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      level: 90,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Mobile Development",
      icon: Smartphone,
      level: 85,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Web Development",
      icon: Globe,
      level: 92,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Database Design",
      icon: Database,
      level: 88,
      color: "from-indigo-500 to-green-500",
    },
    {
      name: "Performance Optimization",
      icon: Zap,
      level: 87,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with modern UI, real-time inventory, and seamless payment integration.",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
      github: "https://github.com/johndoe/ecommerce-platform",
      live: "https://ecommerce-demo.vercel.app",
      category: "Web Development",
      featured: true,
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Advanced analytics platform with machine learning insights, real-time data visualization, and predictive analytics.",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["React", "Python", "TensorFlow", "D3.js", "FastAPI"],
      github: "https://github.com/johndoe/ai-dashboard",
      live: "https://ai-dashboard-demo.vercel.app",
      category: "AI/ML",
      featured: true,
    },
    {
      title: "Mobile Banking Application",
      description:
        "Secure mobile banking app with biometric authentication, real-time transactions, and advanced security features.",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["React Native", "Node.js", "MongoDB", "JWT", "Stripe"],
      github: "https://github.com/johndoe/mobile-banking",
      live: "https://banking-app-demo.vercel.app",
      category: "Mobile",
      featured: false,
    },
    {
      title: "Social Media Platform",
      description:
        "Modern social networking platform with real-time messaging, content sharing, and advanced privacy controls.",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["Vue.js", "Express.js", "Socket.io", "Redis", "AWS"],
      github: "https://github.com/johndoe/social-platform",
      live: "https://social-demo.vercel.app",
      category: "Web Development",
      featured: false,
    },
    {
      title: "IoT Smart Home System",
      description:
        "Comprehensive smart home automation system with voice control, energy monitoring, and security features.",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["React", "Node.js", "MQTT", "InfluxDB", "Raspberry Pi"],
      github: "https://github.com/johndoe/smart-home",
      live: "https://smarthome-demo.vercel.app",
      category: "IoT",
      featured: false,
    },
    {
      title: "Blockchain Voting System",
      description:
        "Secure and transparent voting platform built on blockchain technology with end-to-end encryption.",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
      github: "https://github.com/johndoe/blockchain-voting",
      live: "https://voting-demo.vercel.app",
      category: "Blockchain",
      featured: false,
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, team collaboration, and project tracking.",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
      github: "https://github.com/johndoe/task-manager",
      live: "https://taskmanager-demo.vercel.app",
      category: "Web Development",
      featured: false,
    },
    {
      title: "Weather Forecast App",
      description:
        "Beautiful weather application with detailed forecasts, interactive maps, and location-based alerts.",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["React Native", "OpenWeather API", "Redux", "Expo"],
      github: "https://github.com/johndoe/weather-app",
      live: "https://weather-demo.vercel.app",
      category: "Mobile",
      featured: false,
    },
    {
      title: "Portfolio Website Builder",
      description:
        "Drag-and-drop portfolio builder with customizable templates, SEO optimization, and analytics integration.",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Vercel"],
      github: "https://github.com/johndoe/portfolio-builder",
      live: "https://portfolio-builder-demo.vercel.app",
      category: "Web Development",
      featured: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "Exceptional work quality and attention to detail. The project exceeded all expectations and was delivered ahead of schedule. Truly professional!",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      company: "TechCorp",
    },
    {
      name: "Michael Chen",
      role: "CTO at StartupXYZ",
      content:
        "Outstanding technical skills and great communication. The solution provided was innovative and scalable. Highly recommended for complex projects!",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      company: "StartupXYZ",
    },
    {
      name: "Emily Davis",
      role: "Design Director at CreativeStudio",
      content:
        "Perfect blend of technical expertise and creative vision. The final product was both beautiful and functional. Amazing collaboration experience!",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      company: "CreativeStudio",
    },
    {
      name: "David Rodriguez",
      role: "Founder at InnovateLab",
      content:
        "Incredible problem-solving skills and innovative approach. Transformed our vision into reality with precision and creativity.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      company: "InnovateLab",
    },
    {
      name: "Lisa Wang",
      role: "VP Engineering at DataFlow",
      content:
        "Delivered a complex data visualization platform that exceeded our performance requirements. Excellent communication throughout the project.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      company: "DataFlow",
    },
    {
      name: "James Miller",
      role: "CEO at FinanceApp",
      content:
        "Built our entire mobile banking platform with top-notch security features. The attention to detail and code quality is outstanding.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      company: "FinanceApp",
    },
  ];

  const stats = [
    { label: "Projects Completed", value: "150+", icon: Award },
    { label: "Happy Clients", value: "80+", icon: Users },
    { label: "Years Experience", value: "5+", icon: Calendar },
    { label: "Cups of Coffee", value: "1000+", icon: Coffee },
  ];

  // Pagination logic
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToSection("projects");
  };

  // EmailJS form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.sendForm(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        formRef.current,
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
      );
      setSubmitStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Faster animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        duration: 0.2,
      },
    },
  };

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
    : "bg-gradient-to-br from-gray-50 via-white to-gray-100";

  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const textColorSecondary = isDarkMode ? "text-white/70" : "text-gray-600";
  const cardBg = isDarkMode
    ? "bg-white/5 border-white/10"
    : "bg-white/80 border-gray-200/50";
  const navBg = isDarkMode ? "bg-black/20" : "bg-white/20";

  return (
    <div
      className={`min-h-screen !font-[quicksand]  ${themeClasses} overflow-x-hidden transition-all duration-500`}
    >
      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl ${navBg} border-b ${
          isDarkMode ? "border-white/10" : "border-gray-200/20"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Bernard.Dev
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-150 hover:text-green-400 relative ${
                    activeSection === item.id
                      ? "text-green-400"
                      : isDarkMode
                      ? "text-white/80"
                      : "text-gray-700"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"
                      layoutId="activeTab"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    />
                  )}
                </motion.button>
              ))}

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkMode
                    ? "bg-white/10 hover:bg-white/20"
                    : "bg-gray-200/50 hover:bg-gray-200/80"
                } transition-all duration-200`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkMode
                    ? "bg-white/10 hover:bg-white/20"
                    : "bg-gray-200/50 hover:bg-gray-200/80"
                } transition-all duration-200`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                className={`${textColor} p-2`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={`md:hidden backdrop-blur-xl ${
                isDarkMode ? "bg-black/40" : "bg-white/40"
              } border-t ${
                isDarkMode ? "border-white/10" : "border-gray-200/20"
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left py-3 px-4 ${
                      isDarkMode
                        ? "text-white/80 hover:text-green-400 hover:bg-white/5"
                        : "text-gray-700 hover:text-green-600 hover:bg-gray-100/50"
                    } rounded-lg transition-all duration-150`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.15 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}

      <div
        className={`min-h-screen w-full max-sm:px-5 max-[400px]:pt-[72px] max-[400px]:pb-[72px] ${
          isDarkMode ? "bg-[#1f222a]" : "bg-[#f6f8fb]"
        } ${textColor} `}
      >
        <section className="w-full max-w-7xl mt-8 px-4 min-h-screen font-bold  max-md:flex-col flex items-center max-[360px]:gap-5  justify-center md:justify-between mx-auto md:overflow-hidden">
          <div
            className="flex gap-5 flex-col justify-center max-md:order-2 w-full md:w-[60%]"
            data-aos="fade-right"
          >
            <div className="space-y-1">
              <div className="text-lg  flex gap-3 items-center max-md:justify-center">
                Hello Mate
                <span
                  className="text-amber-500 text-2xl"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <Hand />
                </span>
              </div>
              <div className={`text-2xl md:text-6xl  max-md:text-center `}>
                I'm Bernard
              </div>
              <div className="text-2xl md:text-6xl max-md:text-center">
                a{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                  {" "}
                  Fullstack Developer
                </span>
              </div>
            </div>
            <div className=" w-full">
              <p
                className={`leading-6 text-sm max-md:text-center md:w-[600px] ${textColorSecondary}`}
              >
                Passionate and detail-oriented full-stack developer with a
                strong background in building modern, responsive web
                applications. Skilled in JavaScript, React, Node.js, and
                database design, with a focus on performance, clean code, and
                user experience. Always eager to learn and contribute to
                meaningful projects that make an impact.
              </p>
            </div>
            <div className="flex md:gap-5 max-md:flex-col md:w-[400px] gap-3">
              <motion.a
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size={"lg"}
                  className="h-[50px] font-bold w-full  bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
                >
                  Contact Me
                </Button>
              </motion.a>
              <motion.a
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size={"lg"}
                  variant="outline"
                  className={`h-[50px] w-full  font-bold ${
                    isDarkMode
                      ? "border-white/20 text-white hover:bg-white/10"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  } bg-transparent backdrop-blur-sm`}
                >
                  More About Me
                </Button>
              </motion.a>
            </div>
          </div>
          <div
            className="relative max-md:order-1 max-sm:mb-8"
            data-aos="fade-left"
          >
            <div
              className={`w-[50px] h-[50px] shadow-2xl dark:shadow-black flex items-center justify-center rounded-full absolute max-[360px]:top-60 top-72 md:-left-10 text-xl ${
                isDarkMode ? "bg-[#1f222a]" : "bg-[#f6f8fb]"
              }`}
            >
              <GitPullRequestDraftIcon className="text-blue-700" />
            </div>
            <div
              className={`w-[50px] h-[50px] shadow-2xl dark:shadow-black flex items-center scale-75 justify-center rounded-full absolute top-28 md:top-36 md:left-10 text-xl ${
                isDarkMode ? "bg-[#1f222a]" : "bg-[#f6f8fb]"
              }`}
            >
              <GitPullRequestDraftIcon className="text-amber-500" />
            </div>
            <div
              className={`w-[50px] h-[50px] shadow-2xl dark:shadow-black flex items-center justify-center rounded-full absolute -top-16 right-[45%] md:top-32 md:right-10 text-xl ${
                isDarkMode ? "bg-[#1f222a]" : "bg-[#f6f8fb]"
              }`}
            >
              <GitPullRequestDraftIcon className="text-red-700" />
            </div>
            <div className="w-[50px] h-[50px] shadow-2xl dark:shadow-black flex items-center justify-center rounded-full absolute top-5 md:top-10 scale-50 left-0 md:right-24 text-xl">
              <GitPullRequestDraftIcon className="text-purple-700" />
            </div>
            <div className="w-[50px] h-[50px] shadow-2xl dark:shadow-black flex items-center justify-center rounded-full scale-75 absolute top-0 md:top-5 right-0 text-xl">
              <GitPullRequestDraftIcon className="text-green-700" />
            </div>
            <img
              src="/me2.png"
              className="object-scale-down w-[500px] h-[calc(100vh-88px)] max-md:hidden -translate-x-16 scale-[1.45]"
              alt=""
            />
            <div className="w-[300px] h-[300px] max-[360px]:w-[250px] max-[360px]:h-[250px] rounded-full border-4 border-green-500 md:hidden overflow-clip">
              <img
                src="/me2.png"
                className="object-contain -translate-x-2"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-32 px-4 relative">
        <motion.div style={{ y: aboutY }} className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              className="inline-block px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full text-sm font-medium text-green-300 backdrop-blur-sm mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.span>
            <h2 className={`text-5xl md:text-6xl font-bold ${textColor} mb-6`}>
              Passionate About{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/me2.png"
                  alt="Professional workspace"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Floating Elements */}
                <motion.div
                  className={`absolute top-8 right-8 ${
                    isDarkMode ? "bg-white/10" : "bg-black/10"
                  } backdrop-blur-md rounded-2xl p-4 border ${
                    isDarkMode ? "border-white/20" : "border-black/20"
                  }`}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Code className="w-8 h-8 text-green-400" />
                </motion.div>

                <motion.div
                  className={`absolute bottom-8 left-8 ${
                    isDarkMode ? "bg-white/10" : "bg-black/10"
                  } backdrop-blur-md rounded-2xl p-4 border ${
                    isDarkMode ? "border-white/20" : "border-black/20"
                  }`}
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.75,
                  }}
                >
                  <Heart className="w-8 h-8 text-emerald-400" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <Card
                className={`backdrop-blur-xl ${cardBg} ${textColor} shadow-2xl`}
              >
                <CardContent className="p-10">
                  <h3
                    className={`text-3xl font-bold mb-6 bg-gradient-to-r ${
                      isDarkMode
                        ? "from-white to-green-200"
                        : "from-gray-900 to-green-600"
                    } bg-clip-text text-transparent`}
                  >
                    My Journey
                  </h3>

                  <div className="space-y-6 text-sm leading-relaxed">
                    <p className={textColorSecondary}>
                      I'm a passionate full-stack developer with over 5 years of
                      experience transforming ideas into digital realities. My
                      journey began with a simple curiosity about how websites
                      work, which evolved into a deep love for creating seamless
                      user experiences.
                    </p>

                    <p className={textColorSecondary}>
                      Specializing in modern web technologies, I've had the
                      privilege of working with startups and established
                      companies, helping them build scalable solutions that
                      drive real business value. Every project is an opportunity
                      to push boundaries and explore new possibilities.
                    </p>

                    <p className={textColorSecondary}>
                      When I'm not coding, you'll find me contributing to
                      open-source projects, mentoring aspiring developers, or
                      exploring the latest in AI and machine learning. I believe
                      technology should be accessible, beautiful, and
                      purposeful.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <motion.div
                      className="text-center p-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl border border-green-500/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Award className="w-8 h-8 mx-auto mb-2 text-green-400" />
                      <div className={`text-2xl font-bold ${textColor}`}>
                        150+
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        Projects
                      </div>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 bg-gradient-to-br from-emerald-600/20 to-green-600/20 rounded-2xl border border-emerald-500/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Users className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                      <div className={`text-2xl font-bold ${textColor}`}>
                        80+
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        Happy Clients
                      </div>
                    </motion.div>
                  </div>

                  <motion.div className="mt-8" whileHover={{ scale: 1.02 }}>
                    <Button className="w-full h-[50px] text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 py-4  font-medium">
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-32 px-4 relative">
        <motion.div
          style={{ rotateX: skillsRotate }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              className="inline-block px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full text-sm font-medium text-green-300 backdrop-blur-sm mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              viewport={{ once: true }}
            >
              Skills & Expertise
            </motion.span>
            <h2 className={`text-5xl md:text-6xl font-bold ${textColor} mb-6`}>
              Technical{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              className="inline-block px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full text-sm font-medium text-green-300 backdrop-blur-sm mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              viewport={{ once: true }}
            >
              Featured Work
            </motion.span>
            <h2 className={`text-5xl md:text-6xl font-bold ${textColor} mb-6`}>
              Recent{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${
                  isDarkMode
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                } bg-transparent backdrop-blur-sm disabled:opacity-50`}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0"
                        : isDarkMode
                        ? "border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent backdrop-blur-sm"
                    }
                  >
                    {page}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${
                  isDarkMode
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                } bg-transparent backdrop-blur-sm disabled:opacity-50`}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials Section with Multi-Column Vertical Marquee */}
      <section
        id="testimonials"
        className="py-32 px-4 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              className="inline-block px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full text-sm font-medium text-green-300 backdrop-blur-sm mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              viewport={{ once: true }}
            >
              Client Testimonials
            </motion.span>
            <h2 className={`text-5xl md:text-6xl font-bold ${textColor} mb-6`}>
              What Clients{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto"></div>
          </motion.div>

          {/* Multi-Column Vertical Marquee */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-[700px] overflow-hidden">
            {/* Top gradient shadow */}
            <div
              className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${
                isDarkMode
                  ? "from-gray-900 via-gray-900/80 to-transparent"
                  : "from-gray-50 via-gray-50/80 to-transparent"
              } z-10 pointer-events-none`}
            />

            {/* Bottom gradient shadow */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${
                isDarkMode
                  ? "from-gray-900 via-gray-900/80 to-transparent"
                  : "from-gray-50 via-gray-50/80 to-transparent"
              } z-10 pointer-events-none`}
            />

            {/* Column 1 - Continuous upward scroll */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex flex-col space-y-3"
                animate={{
                  y: [0, -100 * testimonials.length * 2],
                }}
                transition={{
                  duration: testimonials.length * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                {[
                  ...testimonials,
                  ...testimonials,
                  ...testimonials,
                  ...testimonials,
                ].map((testimonial, index) => (
                  <TestimonialCard
                    key={`col1-${testimonial.name}-${index}`}
                    testimonial={testimonial}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </motion.div>
            </div>

            {/* Column 2 - Continuous upward scroll with offset */}
            <div className="relative overflow-hidden hidden md:block">
              <motion.div
                className="flex flex-col space-y-3"
                animate={{
                  y: [
                    -50 * testimonials.length,
                    -150 * testimonials.length * 2,
                  ],
                }}
                transition={{
                  duration: testimonials.length * 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                {[
                  ...testimonials.slice(2),
                  ...testimonials,
                  ...testimonials,
                  ...testimonials,
                  ...testimonials.slice(0, 2),
                ].map((testimonial, index) => (
                  <TestimonialCard
                    key={`col2-${testimonial.name}-${index}`}
                    testimonial={testimonial}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </motion.div>
            </div>

            {/* Column 3 - Continuous upward scroll with different offset */}
            <div className="relative overflow-hidden hidden lg:block">
              <motion.div
                className="flex flex-col space-y-3"
                animate={{
                  y: [
                    -25 * testimonials.length,
                    -125 * testimonials.length * 2,
                  ],
                }}
                transition={{
                  duration: testimonials.length * 2.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                {[
                  ...testimonials.slice(4),
                  ...testimonials,
                  ...testimonials,
                  ...testimonials,
                  ...testimonials.slice(0, 4),
                ].map((testimonial, index) => (
                  <TestimonialCard
                    key={`col3-${testimonial.name}-${index}`}
                    testimonial={testimonial}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              className="inline-block px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full text-sm font-medium text-green-300 backdrop-blur-sm mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              viewport={{ once: true }}
            >
              Let's Connect
            </motion.span>
            <h2 className={`text-5xl md:text-6xl font-bold ${textColor} mb-6`}>
              Get In{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8"></div>
            <p className={`text-xl ${textColorSecondary} max-w-3xl mx-auto`}>
              Ready to bring your vision to life? Let's collaborate and create
              something extraordinary together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <ContactInfo isDarkMode={isDarkMode} />
            <ContactForm
              formRef={formRef}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-16 px-4 border-t ${
          isDarkMode
            ? "border-white/10 bg-black/20"
            : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                Bernard.Dev
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-white/60" : "text-gray-600"
                } mb-4`}
              >
                Creating digital experiences that inspire and innovate.
              </p>
              <div className="flex space-x-4">
                {[Github, Linkedin, Mail].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`w-10 h-10 ${
                      isDarkMode ? "bg-white/10" : "bg-gray-200/50"
                    } rounded-full flex items-center justify-center ${
                      isDarkMode
                        ? "text-white/60 hover:text-white hover:bg-green-600/20"
                        : "text-gray-600 hover:text-gray-900 hover:bg-green-100"
                    } transition-all duration-150`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`text-lg font-semibold ${textColor} mb-4`}>
                Quick Links
              </h4>
              <div className="space-y-2">
                {navItems.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block ${
                      isDarkMode
                        ? "text-white/60 hover:text-green-400"
                        : "text-gray-600 hover:text-green-600"
                    } transition-colors duration-150`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`text-lg font-semibold ${textColor} mb-4`}>
                Services
              </h4>
              <div
                className={`space-y-2 ${
                  isDarkMode ? "text-white/60" : "text-gray-600"
                }`}
              >
                <p>Web Development</p>
                <p>Mobile Apps</p>
                <p>UI/UX Design</p>
                <p>Consulting</p>
              </div>
            </div>
          </div>

          <div
            className={`border-t ${
              isDarkMode ? "border-white/10" : "border-gray-200"
            } pt-8 text-center`}
          >
            <p className={isDarkMode ? "text-white/40" : "text-gray-500"}>
              © {new Date().getFullYear()} John Doe. All rights reserved.
              Crafted with ❤️ using Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Skill Card Component
function SkillCard({
  skill,
  index,
  isDarkMode,
}: {
  skill: any;
  index: number;
  isDarkMode: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Card
        className={`backdrop-blur-xl ${
          isDarkMode
            ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
            : "bg-white/80 border-gray-200/50 text-gray-900 hover:bg-white/90"
        } transition-all duration-200 group h-full`}
      >
        <CardContent className="p-8">
          <div className="flex items-center mb-6">
            <div
              className={`p-3 rounded-2xl bg-gradient-to-r ${skill.color} mr-4 group-hover:scale-110 transition-transform duration-150`}
            >
              <skill.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">{skill.name}</h3>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-white/70" : "text-gray-600"
                }`}
              >
                Proficiency
              </span>
              <span className="text-sm font-semibold">{skill.level}%</span>
            </div>
            <div
              className={`w-full ${
                isDarkMode ? "bg-white/10" : "bg-gray-200"
              } rounded-full h-3 overflow-hidden`}
            >
              <motion.div
                className={`h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.03 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({
  project,
  index,
  isDarkMode,
}: {
  project: any;
  index: number;
  isDarkMode: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Card
        className={`backdrop-blur-xl ${
          isDarkMode
            ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
            : "bg-white/80 border-gray-200/50 text-gray-900 hover:bg-white/90"
        } transition-all duration-200 group overflow-hidden h-full`}
      >
        <div className="relative overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          {project.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
                Featured
              </Badge>
            </div>
          )}

          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-4">
            <Badge
              variant="secondary"
              className="bg-green-600/20 text-green-300 border-green-500/30"
            >
              {project.category}
            </Badge>
          </div>

          <h3 className="text-2xl font-semibold mb-4 group-hover:text-green-300 transition-colors">
            {project.title}
          </h3>

          <p
            className={`${
              isDarkMode ? "text-white/70" : "text-gray-600"
            } mb-6 leading-relaxed`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech: string) => (
              <Badge
                key={tech}
                variant="secondary"
                className={`${
                  isDarkMode
                    ? "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                } transition-colors`}
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className={`w-full ${
                  isDarkMode
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                } bg-transparent backdrop-blur-sm`}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-gradient-to-r  text-sm from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
            </motion.a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Testimonial Card Component - Updated for grid layout
function TestimonialCard({
  testimonial,
  isDarkMode,
}: {
  testimonial: any;
  isDarkMode: boolean;
}) {
  return (
    <Card
      className={`backdrop-blur-xl ${
        isDarkMode
          ? "bg-white/5 border-white/10 text-white"
          : "bg-white/80 border-gray-200/50 text-gray-900"
      } transition-all duration-200 h-auto min-h-[280px] flex-shrink-0`}
    >
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>

        <blockquote
          className={`text-base ${
            isDarkMode ? "text-white/90" : "text-gray-800"
          } mb-6 italic leading-relaxed line-clamp-4`}
        >
          "{testimonial.content}"
        </blockquote>

        <div className="flex items-center">
          <Image
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            width={50}
            height={50}
            className="rounded-full mr-3 border-2 border-green-500/30"
          />
          <div>
            <h4 className="font-semibold text-base">{testimonial.name}</h4>
            <p
              className={`text-sm ${
                isDarkMode ? "text-white/60" : "text-gray-600"
              }`}
            >
              {testimonial.role}
            </p>
            <p className="text-xs text-green-400">{testimonial.company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Contact Info Component
function ContactInfo({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Card
        className={`backdrop-blur-xl ${
          isDarkMode
            ? "bg-white/5 border-white/10 text-white"
            : "bg-white/80 border-gray-200/50 text-gray-900"
        } h-full`}
      >
        <CardContent className="p-10">
          <h3
            className={`text-3xl font-bold mb-8 bg-gradient-to-r ${
              isDarkMode
                ? "from-white to-green-200"
                : "from-gray-900 to-green-600"
            } bg-clip-text text-transparent`}
          >
            Let's Start a Conversation
          </h3>

          <div className="space-y-6 mb-10">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "john.doe@example.com",
                href: "mailto:john.doe@example.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+1 (555) 123-4567",
                href: "tel:+15551234567",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "San Francisco, CA",
                href: "#",
              },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className={`flex items-center p-4 ${
                  isDarkMode ? "bg-white/5" : "bg-gray-100/50"
                } rounded-2xl ${
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-200/50"
                } transition-all duration-150 group`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-150">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-white/60" : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-lg font-medium">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mb-10">
            <h4 className="text-xl font-semibold mb-6">Follow Me</h4>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`w-12 h-12 ${
                    isDarkMode ? "bg-white/10" : "bg-gray-200/50"
                  } rounded-2xl flex items-center justify-center ${
                    isDarkMode
                      ? "text-white/60 hover:text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600"
                      : "text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600"
                  } transition-all duration-150`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.03, duration: 0.2 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.2 }}
            viewport={{ once: true }}
          >
            <Button className="w-full bg-gradient-to-r h-[50px] text-sm from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 py-4  font-medium shadow-2xl shadow-green-500/25">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Contact Form Component
function ContactForm({
  formRef,
  handleSubmit,
  isSubmitting,
  submitStatus,
  isDarkMode,
}: {
  formRef: React.RefObject<HTMLFormElement>;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  isDarkMode: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Card
        className={`backdrop-blur-xl ${
          isDarkMode
            ? "bg-white/5 border-white/10 text-white"
            : "bg-white/80 border-gray-200/50 text-gray-900"
        } h-full`}
      >
        <CardContent className="p-10">
          <h3
            className={`text-3xl font-bold mb-8 bg-gradient-to-r ${
              isDarkMode
                ? "from-white to-green-200"
                : "from-gray-900 to-green-600"
            } bg-clip-text text-transparent`}
          >
            Send Me a Message
          </h3>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03, duration: 0.2 }}
                viewport={{ once: true }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  First Name
                </label>
                <Input
                  name="firstName"
                  required
                  className={` outline-none focus:outline-none focus:ring-green-500 ${
                    isDarkMode
                      ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-500"
                      : "bg-white/50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500"
                  } transition-colors h-12`}
                  placeholder="John"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.2 }}
                viewport={{ once: true }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  Last Name
                </label>
                <Input
                  name="lastName"
                  required
                  className={` outline-none focus:outline-none focus:ring-green-500 ${
                    isDarkMode
                      ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-500"
                      : "bg-white/50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500"
                  } transition-colors h-12`}
                  placeholder="Doe"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.09, duration: 0.2 }}
              viewport={{ once: true }}
            >
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-white/80" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <Input
                type="email"
                name="email"
                required
                className={`${
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-500"
                    : "bg-white/50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500"
                } transition-colors h-12`}
                placeholder="john.doe@example.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.2 }}
              viewport={{ once: true }}
            >
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-white/80" : "text-gray-700"
                }`}
              >
                Subject
              </label>
              <Input
                name="subject"
                required
                className={`${
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-500"
                    : "bg-white/50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500"
                } transition-colors h-12`}
                placeholder="Project Collaboration"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              viewport={{ once: true }}
            >
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-white/80" : "text-gray-700"
                }`}
              >
                Message
              </label>
              <Textarea
                name="message"
                required
                className={`${
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-500"
                    : "bg-white/50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500"
                } transition-colors min-h-[150px] resize-none`}
                placeholder="Tell me about your project, goals, and how I can help bring your vision to life..."
              />
            </motion.div>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-300 text-center"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-600/20 border border-red-500/30 rounded-lg text-red-300 text-center"
              >
                Failed to send message. Please try again or contact me directly.
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r h-[50px] text-sm from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 py-4  font-medium shadow-2xl shadow-green-500/25 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
