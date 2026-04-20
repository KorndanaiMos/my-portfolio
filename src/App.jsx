import React, { useState, useEffect, useRef } from 'react';
import { Bot, HeartPulse, Gamepad2, Award, ChevronDown, Cpu, Activity, Trophy, Star, ArrowRight, X, User, Code, GraduationCap, ZoomIn, Mail, MessageCircle } from 'lucide-react';

// --- Custom Hook (Scroll Reveal) ---
const useOnScreen = (options) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, options]);

  return [ref, visible];
};

// --- FadeIn Component ---
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const getDirectionClasses = () => {
    switch (direction) {
      case 'up': return 'translate-y-12';
      case 'down': return '-translate-y-12';
      case 'left': return 'translate-x-12';
      case 'right': return '-translate-x-12';
      default: return 'translate-y-12';
    }
  };
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0 blur-none' : `opacity-0 ${getDirectionClasses()} blur-sm`
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Image Component ---
const ProjectImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className={`bg-zinc-800 flex items-center justify-center text-center p-4 border border-zinc-700 ${className}`}>
        <p className="text-zinc-500 text-sm">{alt || src}</p>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)}
      className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${className}`}
    />
  );
};

// --- ข้อมูลรูปภาพสำหรับ Hero Collage (18 รูป) ---
const heroRow1 = ["1769281791131.jpg", "1769281809425.jpg", "1769282096705.jpg", "1769282175958.jpg", "1769282715192.jpg", "1769282780069.jpg"];
const heroRow2 = ["1769283449045.jpg", "1769283478106.jpg", "1769283616946.jpg", "1769283795747.jpg", "1769283991985.jpg", "1769284239459.jpg"];
const heroRow3 = ["1769284714745.jpg", "1769284735926.jpg", "1769284755539.jpg", "1769284772166.jpg", "1769285357869.jpg", "1769331585255.jpg"];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeDetail, setActiveDetail] = useState(null); 
  const [fullScreenImage, setFullScreenImage] = useState(null); // State สำหรับดูรูปขนาดเต็ม

  // --- ข้อมูลสำหรับ Modal รายละเอียด ---
  const projectDetails = {
    youth_award: {
      title: "เยาวชนดีเด่นที่นำชื่อเสียงมาสู่ประเทศชาติ",
      subtitle: "ประจำปี 2568 (กระทรวงศึกษาธิการ)",
      theme: "yellow",
      desc: "รับมอบเกียรติบัตรจากรัฐมนตรีว่าการกระทรวงศึกษาธิการ เนื่องในวันเด็กแห่งชาติ ประจำปี 2568 ณ หอประชุมคุรุสภา จากผลงานการเป็นตัวแทนประเทศไทยและคว้าเหรียญทองระดับโลก",
      images: [
        { src: "1769283795747.jpg", alt: "รับรางวัลบนเวทีวันเด็กแห่งชาติ" },
        { src: "1769283991985.jpg", alt: "ใบประกาศเกียรติคุณ เยาวชนดีเด่น" }
      ]
    },
    wrg: {
      title: "World Robot Games 2024",
      subtitle: "Gold & Copper Medalist / Thailand Champion",
      theme: "blue",
      desc: "คว้าแชมป์ประเทศไทย และเป็นตัวแทนแข่งขัน ณ ประเทศสิงคโปร์ ได้รับ 2 รางวัลใหญ่ ได้แก่ เหรียญทอง หมวด iBEAM Line Tracing Senior และเหรียญทองแดง หมวด Drop The Box โดยมีการออกแบบโครงสร้างด้วย 3D CAD (SolidWorks)",
      images: [
        { src: "1769331585255.jpg", alt: "การออกแบบโครงสร้างหุ่นยนต์ด้วย SolidWorks (CAD)" },
        { src: "1769283449045.jpg", alt: "รับรางวัลเหรียญทองบนเวที WRG" },
        { src: "1769284239459.jpg", alt: "รับรางวัลแชมป์ประเทศไทย WRG Thailand" },
        { src: "1769282780069.jpg", alt: "ใบประกาศเหรียญทอง iBEAM" },
        { src: "1769282715192.jpg", alt: "ใบประกาศเหรียญทองแดง Drop The Box" },
        { src: "1769283478106.jpg", alt: "ทีมชาติไทยที่สนามบิน" }
      ]
    },
    iyia: {
      title: "Indonesia Inventors Day 2024",
      subtitle: "Silver Medal (IYIA)",
      theme: "slate",
      desc: "คว้ารางวัลเหรียญเงินระดับนานาชาติ จากงานประกวดนวัตกรรม International Young Inventors Awards (IYIA) ณ บาหลี ประเทศอินโดนีเซีย จากผลงาน 'Heart Check' แอปพลิเคชัน AI สำหรับวินิจฉัยโรคหัวใจ",
      images: [
        { src: "1769283616946.jpg", alt: "รับเหรียญเงิน IYIA" },
        { src: "1769282175958.jpg", alt: "ใบประกาศเหรียญเงิน IYIA" },
        { src: "1769282096705.jpg", alt: "นำเสนอผลงานที่บูธประเทศอินโดนีเซีย" }
      ]
    },
    science_fair: {
      title: "มหกรรมวิทยาศาสตร์และเทคโนโลยีฯ แห่งชาติ 2567",
      subtitle: "Bronze Medal (Applied Science)",
      theme: "orange",
      desc: "ได้รับรางวัลเหรียญทองแดง โครงงานวิทยาศาสตร์ประยุกต์ ระดับมัธยมศึกษาตอนปลาย จัดโดยสมาคมวิทยาศาสตร์แห่งประเทศไทยฯ และองค์การพิพิธภัณฑ์วิทยาศาสตร์แห่งชาติ (อพวช.)",
      images: [
        { src: "1769285381781.jpeg", alt: "รับรางวัลบนเวที มหกรรมวิทยาศาสตร์ฯ" },
        { src: "1769285357869.jpg", alt: "ใบประกาศรางวัลเหรียญทองแดง" }
      ]
    },
    heartcheck: {
      title: "Heart Check AI Diagnostic",
      subtitle: "AI ตรวจจับโรคหัวใจด้วยเสียง",
      theme: "rose",
      desc: "พัฒนาระบบ AI คัดกรองโรคหัวใจ (เช่น เสียงฟู่, เสียงเต้นผิดจังหวะ) โดยใช้ข้อมูลเสียงหัวใจที่บันทึกจากสมาร์ทโฟน ทำงานผ่าน Fourier Transform และ CNN 12 layers",
      images: [
        { src: "1769281791131.jpg", alt: "หน้าจอแอปพลิเคชัน Heart Sound Recorder" },
        { src: "1769281809425.jpg", alt: "สถาปัตยกรรมระบบ AI Pipeline" }
      ]
    },
    game: {
      title: "Sphere The Shaman",
      subtitle: "Game Development (KMUTT)",
      theme: "purple",
      desc: "พัฒนาเกม 2D Dungeon Crawler ในเวลา 5 วันในงาน DDCT Innovative Camp 2023 รับผิดชอบในส่วน Core Gameplay Programming และ Game Testing โดยใช้ Unity Engine และ C#",
      images: [
        { src: "1769284735926.jpg", alt: "Game Key Visual Artwork" },
        { src: "1769284714745.jpg", alt: "ภาพบรรยากาศในเกม (Gameplay)" },
        { src: "1769284755539.jpg", alt: "นำเสนอผลงานร่วมกับทีมที่บูธ" },
        { src: "1769284772166.jpg", alt: "ใบประกาศเข้าร่วมโครงการ DDCT" }
      ]
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const wh = window.innerHeight;
      
      if (scrollY < wh * 0.8) setActiveSection('hero');
      else if (scrollY >= wh * 0.8 && scrollY < wh * 1.8) setActiveSection('about');
      else if (scrollY >= wh * 1.8 && scrollY < wh * 2.8) setActiveSection('awards');
      else if (scrollY >= wh * 2.8 && scrollY < wh * 3.8) setActiveSection('robot');
      else if (scrollY >= wh * 3.8 && scrollY < wh * 4.8) setActiveSection('medical');
      else if (scrollY >= wh * 4.8 && scrollY < wh * 5.8) setActiveSection('game');
      else setActiveSection('contact');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // เคลียร์รูปขนาดเต็มออกหากผู้ใช้ปิดหน้า Modal หรือเปลี่ยนหน้า
  useEffect(() => {
    if (!activeDetail) setFullScreenImage(null);
  }, [activeDetail]);

  useEffect(() => {
    if (activeDetail || fullScreenImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [activeDetail, fullScreenImage]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Background Effect ---
  const BackgroundEffect = () => {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black transition-colors duration-1000">
        <div className={`absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] opacity-40 transition-all duration-1000 ease-in-out transform
          ${activeSection === 'hero' ? 'bg-zinc-800 scale-100 translate-x-0' : 
            activeSection === 'about' ? 'bg-emerald-800 scale-110 translate-x-10' :
            activeSection === 'awards' ? 'bg-amber-600 scale-110 translate-x-10' :
            activeSection === 'robot' ? 'bg-blue-600 scale-125 -translate-x-20' : 
            activeSection === 'medical' ? 'bg-rose-600 scale-100 translate-x-20' : 
            activeSection === 'game' ? 'bg-purple-600 scale-150 translate-y-20' :
            'bg-sky-600 scale-125 -translate-y-10'}`} 
        />
        <div className={`absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30 transition-all duration-1000 ease-in-out transform
          ${activeSection === 'hero' ? 'bg-slate-800' : 
            activeSection === 'about' ? 'bg-teal-500' :
            activeSection === 'awards' ? 'bg-yellow-500' :
            activeSection === 'robot' ? 'bg-cyan-500' : 
            activeSection === 'medical' ? 'bg-red-500' : 
            activeSection === 'game' ? 'bg-fuchsia-500' :
            'bg-blue-600'}`} 
        />
        
        {/* Thematic Abstract Icons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none transition-opacity duration-1000">
          {activeSection === 'about' && <User size={800} className="text-teal-200" />}
          {activeSection === 'awards' && <Trophy size={800} className="text-yellow-200" />}
          {activeSection === 'robot' && <Cpu size={800} className="text-blue-200 animate-pulse" />}
          {activeSection === 'medical' && <Activity size={800} className="text-rose-200" style={{ animation: 'bounce 4s infinite' }} />}
          {activeSection === 'game' && <Gamepad2 size={800} className="text-purple-200" />}
          {activeSection === 'contact' && <Mail size={800} className="text-sky-200" />}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
    );
  };

  // --- Detail Modal Component ---
  const DetailModal = () => {
    if (!activeDetail) return null;
    const data = projectDetails[activeDetail];
    
    // กำหนดสีตาม Theme
    const getThemeColor = (theme) => {
      switch(theme) {
        case 'blue': return 'text-blue-400';
        case 'rose': return 'text-rose-400';
        case 'yellow': return 'text-yellow-400';
        case 'orange': return 'text-orange-400';
        case 'purple': return 'text-purple-400';
        default: return 'text-slate-300';
      }
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setActiveDetail(null)}></div>
        
        <div className="relative bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col transform transition-all animate-in zoom-in-95 duration-300">
          
          <button 
            onClick={() => setActiveDetail(null)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-8 md:p-12 border-b border-white/5">
             <h2 className="text-3xl md:text-5xl font-bold mb-2">{data.title}</h2>
             <p className={`text-xl font-medium mb-6 ${getThemeColor(data.theme)}`}>{data.subtitle}</p>
             <p className="text-gray-300 text-lg leading-relaxed">{data.desc}</p>
          </div>

          <div className="p-8 md:p-12 bg-black/30">
            <h3 className="text-xl font-bold mb-6">แกลเลอรีรูปภาพ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl overflow-hidden bg-zinc-800 aspect-video border border-white/5 relative group cursor-pointer"
                  onClick={() => setFullScreenImage(img)}
                >
                  <ProjectImage src={img.src} alt={img.alt} />
                  
                  {/* Overlay Hover Effect แว่นขยาย */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                     <div className="opacity-0 group-hover:opacity-100 bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-all transform scale-90 group-hover:scale-100">
                        <ZoomIn size={24} />
                     </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm text-white font-medium">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <BackgroundEffect />
      <DetailModal />
      
      {/* --- Fullscreen Image Viewer --- */}
      {fullScreenImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setFullScreenImage(null)}></div>
          
          <button 
            onClick={() => setFullScreenImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 text-white"
          >
            <X size={24} />
          </button>
          
          <img 
            src={fullScreenImage.src} 
            alt={fullScreenImage.alt} 
            className="relative z-10 max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] transform animate-in zoom-in-95 duration-300"
          />
          
          <div className="absolute bottom-8 z-10 text-white bg-black/60 px-6 py-3 rounded-full backdrop-blur-md text-sm md:text-base border border-white/10 shadow-lg pointer-events-none">
            {fullScreenImage.alt}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-sm font-semibold tracking-widest uppercase cursor-pointer" onClick={() => scrollTo('hero')}>
            K. Likitpattanakul
          </div>
          <div className="hidden md:flex gap-6 text-xs font-medium tracking-wider text-gray-400">
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">ABOUT</button>
            <button onClick={() => scrollTo('awards')} className="hover:text-white transition-colors">AWARDS</button>
            <button onClick={() => scrollTo('robot')} className="hover:text-white transition-colors">ROBOTICS</button>
            <button onClick={() => scrollTo('medical')} className="hover:text-white transition-colors">HEART CHECK AI</button>
            <button onClick={() => scrollTo('game')} className="hover:text-white transition-colors">GAME DEV</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">CONTACT</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center">
        
        {/* --- 1. HERO --- */}
        <section id="hero" className="w-full min-h-screen relative flex flex-col items-center justify-center overflow-hidden pt-20">
          
          {/* Scrolling Image Grid Background */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-lighten pointer-events-none flex flex-col justify-center py-4 transform scale-[1.15] rotate-[-3deg]">
            {/* Row 1 (Scroll Left) */}
            <div className="flex w-max animate-scroll-left mb-4">
              {[...heroRow1, ...heroRow1].map((img, idx) => (
                <div key={idx} className="w-64 h-40 md:w-80 md:h-56 mx-2 rounded-xl overflow-hidden shrink-0 shadow-lg border border-white/10">
                  <img src={img} className="w-full h-full object-cover filter blur-[2px] transition-all duration-700 hover:blur-none" alt="hero collage" onError={(e) => e.target.style.display='none'} />
                </div>
              ))}
            </div>
            {/* Row 2 (Scroll Right) */}
            <div className="flex w-max animate-scroll-right mb-4">
              {[...heroRow2, ...heroRow2].map((img, idx) => (
                <div key={idx} className="w-64 h-40 md:w-80 md:h-56 mx-2 rounded-xl overflow-hidden shrink-0 shadow-lg border border-white/10">
                  <img src={img} className="w-full h-full object-cover filter blur-[2px] transition-all duration-700 hover:blur-none" alt="hero collage" onError={(e) => e.target.style.display='none'} />
                </div>
              ))}
            </div>
            {/* Row 3 (Scroll Left) */}
            <div className="flex w-max animate-scroll-left">
              {[...heroRow3, ...heroRow3].map((img, idx) => (
                <div key={idx} className="w-64 h-40 md:w-80 md:h-56 mx-2 rounded-xl overflow-hidden shrink-0 shadow-lg border border-white/10">
                  <img src={img} className="w-full h-full object-cover filter blur-[2px] transition-all duration-700 hover:blur-none" alt="hero collage" onError={(e) => e.target.style.display='none'} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Overlay to blend with site theme */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/70 to-black pointer-events-none"></div>

          <FadeIn className="relative z-20 text-center max-w-4xl bg-black/60 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] mx-6 w-[90%] md:w-auto">
            <p className="text-gray-400 tracking-[0.3em] text-sm md:text-base mb-6 font-medium uppercase">Portfolio</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
              Korndanai Likitpattanakul
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-gray-300 mb-12">
              Innovator. Roboticist. AI Developer.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => scrollTo('about')} className="px-8 py-4 bg-white text-black rounded-full font-semibold tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                เริ่มทำความรู้จัก
              </button>
            </div>
          </FadeIn>
          
          <div className="absolute bottom-10 z-20 animate-bounce cursor-pointer text-gray-500 hover:text-white transition-colors" onClick={() => scrollTo('about')}>
            <ChevronDown size={32} />
          </div>
        </section>

        {/* --- 2. ABOUT --- */}
        <section id="about" className="w-full min-h-screen flex flex-col justify-center px-6 py-24 max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <User size={32} className="text-teal-400" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Profile & Skills</h2>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn delay={100}>
              <h3 className="text-2xl font-bold mb-6 text-gray-200 border-b border-white/10 pb-4">Education</h3>
              <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 flex gap-6 items-start">
                <div className="p-4 bg-teal-500/20 rounded-2xl text-teal-400 shrink-0">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</h4>
                  <p className="text-gray-400 mt-2 leading-relaxed">
                    มีความสนใจอย่างลึกซึ้งในด้านเทคโนโลยี, วิศวกรรมหุ่นยนต์ และปัญญาประดิษฐ์ (AI) มุ่งมั่นที่จะสร้างสรรค์นวัตกรรมที่สามารถแก้ปัญหาจริงและสร้างชื่อเสียงให้กับประเทศ
                  </p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <h3 className="text-2xl font-bold mb-6 text-gray-200 border-b border-white/10 pb-4">Core Competencies</h3>
              <div className="space-y-4">
                <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                  <Code className="text-blue-400" />
                  <div>
                    <h4 className="font-semibold">Programming & AI</h4>
                    <p className="text-sm text-gray-400">Python, C#, Unity, Machine Learning (CNN), Flask, Streamlit</p>
                  </div>
                </div>
                <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                  <Bot className="text-amber-400" />
                  <div>
                    <h4 className="font-semibold">Robotics & Hardware</h4>
                    <p className="text-sm text-gray-400">SolidWorks (CAD), 3D Printing, Microcontrollers, Autonomous Logic</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- 3. AWARDS --- */}
        <section id="awards" className="w-full min-h-screen flex flex-col justify-center px-6 py-24 max-w-6xl mx-auto">
          <FadeIn>
             <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-center">Awards & Honors</h2>
             <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">ผลงานที่ได้รับการยอมรับระดับชาติและนานาชาติ (คลิกเพื่อดูรูปภาพและรายละเอียด)</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Youth Award Card */}
            <FadeIn delay={100} className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="group relative rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl border border-white/10"
                   onClick={() => setActiveDetail('youth_award')}>
                
                {/* Background Image */}
                <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                  <ProjectImage src="1769283795747.jpg" alt="Youth Award Bg" className="object-cover object-top" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-zinc-900/60"></div>
                
                {/* Content */}
                <div className="relative p-8 md:p-12 h-full flex flex-col md:flex-row items-center gap-8 z-10">
                  <div className="w-24 h-24 rounded-full bg-yellow-500/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 border border-yellow-400/30 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    <Star size={48} className="text-yellow-400" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                       <span className="text-xs font-bold px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">ระดับชาติ</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white">เยาวชนดีเด่นที่นำชื่อเสียงมาสู่ประเทศชาติ ปี 2568</h3>
                    <p className="text-gray-300 text-lg">รับมอบเกียรติบัตรจากรัฐมนตรีว่าการกระทรวงศึกษาธิการ จากผลงานการคว้าเหรียญทองระดับโลก</p>
                    <p className="text-sm text-yellow-400 mt-3 font-semibold group-hover:translate-x-2 transition-transform flex items-center gap-2 justify-center md:justify-start">
                      คลิกเพื่อดูภาพบรรยากาศรับรางวัล <ArrowRight size={16} />
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* WRG Card */}
            <FadeIn delay={200}>
              <div className="relative rounded-3xl border border-white/10 h-full transition-all duration-300 group cursor-pointer hover:border-blue-500/50 overflow-hidden shadow-xl"
                   onClick={() => setActiveDetail('wrg')}>
                
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <ProjectImage src="1769283449045.jpg" alt="WRG Bg" className="object-cover object-center" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-zinc-900/70"></div>
                
                {/* Content */}
                <div className="relative p-8 z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-blue-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30 group-hover:scale-110 transition-transform">
                       <Trophy className="text-blue-400" size={32} />
                     </div>
                     <ArrowRight className="text-gray-500 group-hover:text-blue-400 transition-colors" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Gold & Copper Medalist</h3>
                  <p className="text-gray-300 mb-2 flex-grow">World Robot Games 2024</p>
                  <p className="text-sm font-medium text-blue-400 mt-4 border-t border-white/10 pt-4 flex items-center gap-2">
                    <ZoomIn size={14}/> ดูรูปรับรางวัลและใบประกาศ
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* IYIA Card */}
            <FadeIn delay={300}>
              <div className="relative rounded-3xl border border-white/10 h-full transition-all duration-300 group cursor-pointer hover:border-slate-300/50 overflow-hidden shadow-xl"
                   onClick={() => setActiveDetail('iyia')}>
                
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <ProjectImage src="1769283616946.jpg" alt="IYIA Bg" className="object-cover object-center" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-zinc-900/70"></div>
                
                {/* Content */}
                <div className="relative p-8 z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-slate-500/20 rounded-2xl backdrop-blur-sm border border-slate-500/30 group-hover:scale-110 transition-transform">
                       <Award className="text-slate-300" size={32} />
                     </div>
                     <ArrowRight className="text-gray-500 group-hover:text-slate-300 transition-colors" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Silver Medal (IYIA)</h3>
                  <p className="text-gray-300 mb-2 flex-grow">Indonesia Inventors Day 2024</p>
                  <p className="text-sm font-medium text-slate-300 mt-4 border-t border-white/10 pt-4 flex items-center gap-2">
                    <ZoomIn size={14}/> ดูภาพบรรยากาศที่อินโดนีเซีย
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Science Fair Card */}
            <FadeIn delay={400}>
              <div className="relative rounded-3xl border border-white/10 h-full transition-all duration-300 group cursor-pointer hover:border-orange-500/50 overflow-hidden shadow-xl"
                   onClick={() => setActiveDetail('science_fair')}>
                
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <ProjectImage src="1769285381781.jpeg" alt="Science Fair Bg" className="object-cover object-center" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-zinc-900/70"></div>
                
                {/* Content */}
                <div className="relative p-8 z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-orange-500/20 rounded-2xl backdrop-blur-sm border border-orange-500/30 group-hover:scale-110 transition-transform">
                       <Trophy className="text-orange-400" size={32} />
                     </div>
                     <ArrowRight className="text-gray-500 group-hover:text-orange-400 transition-colors" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Bronze Medal</h3>
                  <p className="text-gray-300 mb-2 flex-grow">มหกรรมวิทยาศาสตร์ฯ แห่งชาติ 2567</p>
                  <p className="text-sm font-medium text-orange-400 mt-4 border-t border-white/10 pt-4 flex items-center gap-2">
                    <ZoomIn size={14}/> ดูใบประกาศนียบัตร
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- 4. ROBOTICS --- */}
        <section id="robot" className="w-full min-h-screen flex flex-col justify-center px-6 py-24 max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" className="order-2 md:order-1">
              <div 
                className="relative aspect-square rounded-3xl overflow-hidden border border-blue-500/30 bg-blue-900/10 backdrop-blur-sm flex items-center justify-center group cursor-pointer shadow-[0_0_50px_rgba(59,130,246,0.15)]"
                onClick={() => setActiveDetail('wrg')}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                
                {/* ดึงรูป CAD 3D มาโชว์เป็น Background หุ่นยนต์ */}
                <div className="absolute inset-0 transition-all duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100">
                    <ProjectImage src="1769331585255.jpg" alt="CAD SolidWorks Robot Model" className="object-cover" />
                </div>

                {/* Layer ดำบังเพื่อให้ตัวหนังสือเด่น */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-0"></div>
                
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <p className="text-white bg-blue-600/80 backdrop-blur px-4 py-3 rounded-xl text-sm font-semibold text-center border border-blue-400/50 flex items-center justify-center gap-2 transform group-hover:-translate-y-2 transition-transform shadow-lg">
                     <Award size={18} /> คลิกเพื่อดูผลงานและรูปแข่งขัน WRG ทั้งหมด
                  </p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
                  <Bot size={28} />
                </div>
                <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase">Hardware & Control</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
                Autonomous Competition Robots
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                ออกแบบ โครงสร้างวิศวกรรมและเขียนโปรแกรมควบคุมหุ่นยนต์อัตโนมัติ เพื่อเป็นตัวแทนประเทศไทยในการแข่งขัน World Robot Games 2024 นำไปสู่การคว้าแชมป์ประเทศไทยและเหรียญทองระดับโลก
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                  <div>
                    <h4 className="text-white font-semibold text-lg flex items-center gap-2">Mechanical Design (CAD) <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">SolidWorks</span></h4>
                    <p className="text-gray-500 mt-1">ออกแบบโครงสร้าง 3D ก่อนผลิตจริงด้วยเทคโนโลยี 3D Printing และ Laser Cutting เพื่อลดน้ำหนักและเพิ่มความแม่นยำ</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Programming & Logic</h4>
                    <p className="text-gray-500 mt-1">พัฒนาระบบอัลกอริทึมความเร็วสูงสำหรับการเดินตามเส้น (iBEAM) และภารกิจจัดการวัตถุ ภายใต้ข้อจำกัดด้านเวลา</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- 5. MEDICAL AI --- */}
        <section id="medical" className="w-full min-h-screen flex flex-col justify-center px-6 py-24 max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-400">
                  <HeartPulse size={28} />
                </div>
                <h2 className="text-sm font-bold tracking-widest text-rose-400 uppercase">Artificial Intelligence</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
                Heart Check AI Diagnostic
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                นวัตกรรมปัญญาประดิษฐ์สำหรับคัดกรองและวินิจฉัยโรคหัวใจ ผ่านการบันทึกเสียงจากสมาร์ทโฟน ผลงานได้รับรางวัลเหรียญเงินจากอินโดนีเซีย (IYIA)
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2.5"></div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Fourier Transform</h4>
                    <p className="text-gray-500">แปลงคลื่นเสียงดิบ (WAV) ให้กลายเป็นภาพ Spectrogram เพื่อให้ AI สามารถมองเห็นแพทเทิร์นของเสียงหัวใจได้ชัดเจน</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2.5"></div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Convolutional Neural Network (CNN)</h4>
                    <p className="text-gray-500">สร้างโมเดล Deep Learning แบบ 12-layer ร่วมกับ Python, Streamlit และ Flask เพื่อการจำแนกประเภทโรคหัวใจ</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveDetail('heartcheck')}
                className="mt-10 px-6 py-3 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/50 rounded-full font-medium transition-all flex items-center gap-2"
              >
                ดูรายละเอียดระบบ AI <ArrowRight size={18}/>
              </button>
            </FadeIn>

            <FadeIn direction="left">
              <div 
                className="relative aspect-square rounded-3xl overflow-hidden border border-rose-500/30 bg-rose-900/10 backdrop-blur-sm flex items-center justify-center group p-8 cursor-pointer"
                onClick={() => setActiveDetail('heartcheck')}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                
                 {/* ใชัรูปหน้าจอแอปเป็นพื้นหลังบางๆ */}
                <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                    <ProjectImage src="1769281791131.jpg" alt="Heartcheck UI" className="object-cover object-top" />
                </div>
                
                <div className="absolute inset-0 bg-black/50 transition-colors duration-500 z-0"></div>

                <div className="w-full flex flex-col gap-6 relative z-10 bg-black/60 p-8 rounded-2xl border border-white/10 backdrop-blur-md transform group-hover:scale-105 transition-transform shadow-2xl">
                  <div className="flex justify-between items-end border-b border-rose-500/30 pb-4">
                    <span className="text-rose-400 font-mono text-sm">Status: Normal</span>
                    <span className="text-white font-medium text-2xl">98% Match</span>
                  </div>
                  <div className="h-24 w-full flex items-end gap-1 opacity-80">
                    {[...Array(30)].map((_, i) => {
                      const h = Math.abs(Math.sin(i * 0.6) * 100) + Math.random() * 20;
                      return (
                        <div key={i} className="w-full bg-rose-500/60 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      )
                    })}
                  </div>
                  <p className="text-center text-rose-300/80 font-mono text-sm mt-2 flex items-center justify-center gap-2">
                     <Activity size={16}/> คลิกเพื่อดูหน้าจอ UI จริง
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- 6. GAME DEV --- */}
        <section id="game" className="w-full min-h-screen flex flex-col justify-center px-6 py-24 max-w-6xl mx-auto relative">
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <FadeIn className="p-12 md:p-16 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400">
                    <Gamepad2 size={28} />
                  </div>
                  <h2 className="text-sm font-bold tracking-widest text-purple-400 uppercase">Game Development</h2>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
                  Sphere The Shaman
                </h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  เกมแนว 2D Dungeon Crawler ที่พัฒนาขึ้นภายในเวลา 5 วันในงาน Hackathon: DDCT Innovative Camp 2023 (KMUTT)
                </p>
                <div className="space-y-4 mb-10">
                   <div className="flex items-center gap-3 text-gray-300"><ChevronRightIcon className="text-purple-500"/> รับผิดชอบ Core Gameplay Programming</div>
                   <div className="flex items-center gap-3 text-gray-300"><ChevronRightIcon className="text-purple-500"/> พัฒนาด้วย Unity Engine และภาษา C#</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://fuaynoly.itch.io/sphere-the-shaman" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-medium transition-colors"
                  >
                    Download Game <ArrowRight size={18} />
                  </a>
                  <button 
                    onClick={() => setActiveDetail('game')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 rounded-full font-medium transition-colors"
                  >
                    ดูภาพตัวอย่างเกม
                  </button>
                </div>
              </FadeIn>
              
              <FadeIn delay={200} className="relative h-64 lg:h-auto bg-zinc-950 border-b lg:border-b-0 lg:border-l border-white/10 flex items-center justify-center overflow-hidden group cursor-pointer order-1 lg:order-2" onClick={() => setActiveDetail('game')}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2)_0,transparent_70%)] z-10"></div>
                
                {/* ดึงรูป Key Visual ของเกมมาแสดงแทน CSS */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <ProjectImage src="1769284735926.jpg" alt="Sphere The Shaman Key Visual" className="object-cover" />
                </div>
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                
                <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black/80 backdrop-blur text-white text-xs px-3 py-2 rounded-lg border border-white/10">คลิกเพื่อดูแกลเลอรีเกม</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- 7. CONTACT ME --- */}
        <section id="contact" className="w-full flex flex-col justify-center px-6 py-24 max-w-5xl mx-auto relative mb-10">
          <FadeIn>
            <div className="flex flex-col items-center justify-center gap-4 mb-16 text-center">
              <Mail size={40} className="text-sky-400 mb-2" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Contact Me</h2>
              <p className="text-gray-400 mt-2">ช่องทางการติดต่อสำหรับพูดคุยและสอบถามเพิ่มเติม</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Gmail (Recommended) */}
            <FadeIn delay={100} className="col-span-1 md:col-span-2 lg:col-span-1">
              <a href="mailto:korndanai.likit@gmail.com" className="bg-zinc-900/60 hover:bg-zinc-800/80 p-8 rounded-3xl border border-white/10 hover:border-rose-500/50 transition-all duration-300 group flex flex-col items-center text-center h-full relative overflow-hidden">
                 <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <Mail className="text-rose-400 mb-6 group-hover:scale-110 transition-transform duration-300" size={48} />
                 <h3 className="text-xl font-bold mb-2">Email</h3>
                 <p className="text-gray-300 text-sm">korndanai.likit@gmail.com</p>
                 <div className="mt-auto pt-6">
                    <span className="text-xs font-bold px-4 py-1.5 bg-rose-500/20 text-rose-400 rounded-full border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                      Recommended
                    </span>
                 </div>
              </a>
            </FadeIn>

            {/* LinkedIn */}
            <FadeIn delay={200}>
              <a href="https://www.linkedin.com/in/korndanai-likitpattanakul-9022b9235/" target="_blank" rel="noreferrer" className="bg-zinc-900/60 hover:bg-zinc-800/80 p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 group flex flex-col items-center text-center h-full relative overflow-hidden">
                 <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 {/* <Linkedin className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300" size={48} /> */}
                 <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
                 <p className="text-gray-300 text-sm break-words px-2">Korndanai Likitpattanakul</p>
                 <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 text-sm flex items-center gap-1">
                   คลิกเพื่อไปยังโปรไฟล์ <ArrowRight size={14}/>
                 </div>
              </a>
            </FadeIn>

            {/* GitHub */}
            <FadeIn delay={300}>
              <a href="https://github.com/KorndanaiMos" target="_blank" rel="noreferrer" className="bg-zinc-900/60 hover:bg-zinc-800/80 p-8 rounded-3xl border border-white/10 hover:border-slate-400/50 transition-all duration-300 group flex flex-col items-center text-center h-full relative overflow-hidden">
                 <div className="absolute inset-0 bg-slate-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 {/* <Github className="text-white mb-6 group-hover:scale-110 transition-transform duration-300" size={48} /> */}
                 <h3 className="text-xl font-bold mb-2">GitHub</h3>
                 <p className="text-gray-300 text-sm font-mono">KorndanaiMos</p>
                 <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 text-sm flex items-center gap-1">
                   คลิกเพื่อไปยังโปรไฟล์ <ArrowRight size={14}/>
                 </div>
              </a>
            </FadeIn>

            {/* Line & IG Wrapper for alignment */}
            <FadeIn delay={400} className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {/* Line */}
              <div className="bg-zinc-900/60 hover:bg-zinc-800/80 p-6 md:p-8 rounded-3xl border border-white/10 hover:border-green-500/50 transition-all duration-300 group flex items-center justify-center gap-6 relative overflow-hidden">
                 <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <MessageCircle className="text-green-500 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" size={42} />
                 <div className="text-left">
                   <h3 className="text-lg font-bold mb-1">Line ID</h3>
                   <p className="text-gray-300 font-mono bg-black/40 px-3 py-1 rounded-lg text-sm border border-white/5 selection:bg-green-500 selection:text-white">korndanai.mos</p>
                 </div>
              </div>

              {/* Instagram */}
              <div className="bg-zinc-900/60 hover:bg-zinc-800/80 p-6 md:p-8 rounded-3xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 group flex items-center justify-center gap-6 relative overflow-hidden">
                 <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 {/* <Instagram className="text-pink-500 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" size={42} /> */}
                 <div className="text-left">
                   <h3 className="text-lg font-bold mb-1">Instagram</h3>
                   <p className="text-gray-300 font-mono bg-black/40 px-3 py-1 rounded-lg text-sm border border-white/5 selection:bg-pink-500 selection:text-white">@m.mossk</p>
                 </div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="w-full py-10 border-t border-white/10 text-center text-gray-500 text-sm">
          <FadeIn>
            <p>นายกรดนัย ลิขิตพัฒนะกุล (Korndanai Likitpattanakul)</p>
            <p className="mt-2">Portfolio Information</p>
          </FadeIn>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @keyframes scaleX { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left { animation: scroll-left 50s linear infinite; }
        .animate-scroll-right { animation: scroll-right 50s linear infinite; }
      `}} />
    </div>
  );
}

const ChevronRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);