import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import Lanyard from "./components/Lanyard/Lanyard";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools, listProyek, listExperience, listCertificates, listEducation, listAwards, } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import ProjectModalExperience from "./components/ProjectModalExperience/ProjectModalExperience"; // <-- IMPORT MODAL
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoom";
import 'aos/dist/aos.css'; // You can also use <link> for styles
import ProjectModalCertificates from "./components/ProjectModalCertificates/ProjectModalCertificates";
import JulianImage from "/assets/Julian.jpeg";



// ..
AOS.init();

function App() {

  const roles = ["Web Developer", "Mobile Developer", "AI Enthusiast"];

const [text, setText] = useState("");
const [index, setIndex] = useState(0);
const [subIndex, setSubIndex] = useState(0);
const [deleting, setDeleting] = useState(false);

useEffect(() => {
  if (index === roles.length) return;

  if (subIndex === roles[index].length + 1 && !deleting) {
    setTimeout(() => setDeleting(true), 1000);
    return;
  }

  if (subIndex === 0 && deleting) {
    setDeleting(false);
    setIndex((prev) => (prev + 1) % roles.length);
    return;
  }

  const timeout = setTimeout(() => {
    setSubIndex((prev) => prev + (deleting ? -1 : 1));
  }, deleting ? 40 : 80);

  setText(roles[index].substring(0, subIndex));

  return () => clearTimeout(timeout);
}, [subIndex, index, deleting]);

  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup
  const [selectedExperience, setSelectedExperience] = useState(null); // null = modal tertutup
  const [selectedCertificate, setSelectedCertificate] = useState(null); // null = modal tertutup


  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleExperienceClick = (experience) => {
    setSelectedExperience(experience);
  };

   const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedExperience(null);
    setSelectedCertificate(null);
  };

  // -------------------------

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      // Ambil path tanpa hash
      const baseUrl = window.location.origin + "/portofolio/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
          <div className="animate__animated animate__fadeInUp animate__delay-3s">
            <div className="flex items-center gap-3 mb-6 bg bg-zinc-800 w-fit p-4 rounded-2xl">
              <img src="./assets/Julian.jpeg" className="w-10 rounded-md" />
              <q>I'm Curious, Ambitious and Never Stop learn new things </q>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <ShinyText text="Hi I'm Julian Dewanto" disabled={false} speed={3} className='custom-class' />
            </h1>

            <div className="typing-text">
              {text}
              <span className="cursor">|</span>
            </div>

            <BlurText
              text="A fresh graduate currently working in the BUMN sector as an IT Intern in the Risk Management Department at PT Petrokimia Gresik. I also participated in the Bangkit Program led by Google, Tokopedia, and Traveloka as a Mobile Developer. Previously, I completed an internship at the Department of Communication, Informatics, Statistics, and Cyber Security of Surakarta City as a Full-Stack Web Developer. I am a passionate application and web developer dedicated to creating modern, high-performance digital solutions and delivering innovative, user-friendly experiences that contribute to business and technological advancement."
              delay={150}
              animateBy="words"
              direction="top"
              className=" mb-6"
            />
            <div className="flex items-center sm:gap-4 gap-2">
              <a 
                href="./assets/CV.pdf" 
                download="Julian_Dewanto_CV.pdf" 
                className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a href="#project" className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors">
                <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
            <div className="hero-photo-wrap">
<img
  src={JulianImage}
  alt="Julian Dewanto"
  className="hero-photo"
/>
</div>
        </div>
        {/* tentang */}
        <div
  className="
    mt-15 mx-auto w-full max-w-[1600px] rounded-3xl
    border-[4px] border-emerald-400/40
    bg-gradient-to-br from-[#070f0a] via-[#0b1a12] to-[#0f2a1b]
    p-6
    shadow-[0_0_25px_rgba(52,211,153,0.35)]
    transition-all duration-500 ease-out
    hover:scale-[1.02]
    hover:border-emerald-400
    hover:shadow-[0_0_60px_rgba(52,211,153,0.9)]
  "
  id="about"
>
  <div
    className="
      flex flex-col md:flex-row items-center justify-between gap-10
      pt-0 px-8
      transition-all duration-500
    "
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-once="true"
  >
    <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-emerald-400/30">
      <div className="flex-1 text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-300 mb-5 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">
          About Me
        </h2>
                <BlurText
                  text="Julian Dewanto is an Informatics fresh graduate from Universitas Sebelas Maret (UNS) with a cum laude GPA and a Certified Programmer from the Badan Nasional Sertifikasi Profesi (BNSP). Currently enrolled in the Magang Generasi Bertalenta (MAGENTA) BUMN program as an Informatics Intern at Departement Risk Management PT Petrokimia Gresik, a six-month internship program and got recomendation extended from VP departement as IT intern at Departement Manajemen Risiko until present, focusing on developing and maintaining website sistem manajemen risiko utilize tech stack .ASP.NET Core, MSSQL and JavaScript.
Previously, I worked as a Full-Stack Developer Intern at the Department of Communication, Informatics, Statistics, and Encryption of Surakarta City, where I contributed to the development and maintenance of the Surakarta government web portal.

I was also selected for the Bangkit Academy program led by Google, Tokopedia, Gojek, and Traveloka as a Mobile Development cohort, where I contributed to developing Pandoe, a platform designed to support Indonesian entrepreneurs in their business journey.

In addition to software development, I have new knowledge in IT risk management, including ICoFR, KRI (Key Risk Indicator), RTM (Risk Treatment Matrix), and RCSA (Risk Control Self-Assessment) from my internship program at Risk Management. I am passionate about technology and continuous learning, and I aim to leverage my skills to build innovative digital solutions that create meaningful impact."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-base md:text-lg leading-relaxed mb-10 text-gray-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full">
  <div>
    <h1 className="text-3xl md:text-4xl mb-1 text-white">
      20
      <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]">
        +
      </span>
    </h1>
    <p className="text-gray-300">Project Finished</p>
  </div>

  <div>
    <h1 className="text-3xl md:text-4xl mb-1 text-white">
      3
      <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]">
        +
      </span>
    </h1>
    <p className="text-gray-300">Years of Experience</p>
  </div>

  <div
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-delay="600"
    data-aos-once="true"
  >
    <h1 className="text-3xl md:text-4xl mb-1 text-white">
      3.62
      <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]">
        /4.00
      </span>
    </h1>
    <p className="text-gray-300">GPA</p>
  </div>
</div>

                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-violet-400"
                />
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center ">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>

        </div>
        <div className="tools mt-32">
          <h1 className="text-4xl/snug font-bold mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" >Tools & Technologies</h1>
          <p className="w-2/5 text-base/loose opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">My Profesional Skills</p>
          <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">

            {listTools.map((tool) => (
              <div
                key={tool.id} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={tool.dad} data-aos-once="true"
                className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
              >
                <img
                  src={tool.gambar}
                  alt="Tools Image"
                  className="w-16 h-16 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* tentang */}

        <div className="education mt-32"
        id="education">
  <h1
    className="text-4xl/snug font-bold mb-4 text-center"
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-once="true"
  >
    Educations
  </h1>

  <p
    className="text-base/loose text-center opacity-50 mb-14"
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-delay="300"
    data-aos-once="true"
  >
    Formal education and awards that reflect my learning journey and achievements.
  </p>

  <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 items-start">
    {/* Kiri */}
    <div
      className="lg:pt-20"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      <h2 className="text-4xl font-bold leading-snug text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)]">
        Educations 🎓 <br /> & Awards 🏆
      </h2>
      <p className="text-zinc-400 mt-6 text-base/loose max-w-sm">
        There are some formal education and awards that I’ve reached below.
      </p>
    </div>

    {/* Kanan */}
    <div
  className="
  lg:col-span-2
  bg-gradient-to-br from-[#070f0a] via-[#0b1a12] to-[#0f2a1b]
  border border-emerald-400/40
  rounded-3xl
  p-8
  shadow-[0_0_30px_rgba(52,211,153,0.45)]
  backdrop-blur-xl
  transition-all duration-500
  hover:shadow-[0_0_70px_rgba(52,211,153,0.9)]
"
>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        {/* Education */}
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg mb-8">
            <span>🎓</span>
            <span>EDUCATIONS</span>
          </div>

          <div className="relative border-l-2 border-sky-500/80 pl-6 space-y-10">
            {listEducation.map((item) => (
                <div
                  key={item.id}
                  className="relative group transition-all duration-300 hover:translate-x-1"
                >
                  <span
                    className="
                      absolute -left-[31px] top-1 z-10
                      w-4 h-4 rounded-full
                      bg-emerald-400
                      border-4 border-[#0f2a1b]
                      shadow-[0_0_12px_rgba(52,211,153,0.9)]
                      transition-all duration-300 ease-out
                      group-hover:scale-150
                      group-hover:shadow-[0_0_25px_rgba(52,211,153,1)]
                      group-hover:bg-emerald-300
                      cursor-pointer
                    "
                  />

                  <h3 className="text-xl font-bold text-white">{item.school}</h3>
                  <p className="text-zinc-300 mt-1">
                    {item.major}
                    {item.detail ? `, ${item.detail}` : ""}
                  </p>
                  <p className="text-zinc-400 text-sm mt-2">{item.period}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg mb-8 shadow-[0_0_12px_rgba(52,211,153,0.8)]">
            <span>🏆</span>
            <span>AWARDS</span>
          </div>

          <div className="relative border-l-2 border-sky-500/80 pl-6 space-y-10">
            {listAwards.map((item) => (
  <div
    key={item.id}
    className="relative group transition-all duration-300 hover:translate-x-1"
  >
    <span
      className="
        absolute -left-[31px] top-1 z-10
        w-4 h-4 rounded-full
        bg-emerald-400
        border-4 border-[#0f2a1b]
        shadow-[0_0_12px_rgba(52,211,153,0.9)]
        transition-all duration-300 ease-out
        group-hover:scale-150
        group-hover:shadow-[0_0_25px_rgba(52,211,153,1)]
        group-hover:bg-emerald-300
        cursor-pointer
      "
    />

    <h3 className="text-xl font-bold text-white">{item.title}</h3>
    <p className="text-zinc-300 mt-2">{item.organizer}</p>
    <p className="text-zinc-400 text-sm mt-2">{item.period}</p>
  </div>
))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Proyek */}
        <div className="proyek mt-32 py-10" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div>
        <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Project</h1>
        <p className="text-base/loose text-center opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.</p>
        <div className="proyek-box mt-14" >

          <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true" >
            <ChromaGrid
              items={listProyek}
              onItemClick={handleProjectClick} // Kirim fungsi untuk handle klik
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
        {/* Proyek */}

        {/* Experience */}
        <div className="proyek mt-32 py-10" id="experience" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div>
        <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Experience</h1>
        <p className="text-base/loose text-center opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.</p>
        <div className="proyek-box mt-14" >

          <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true" >
            <ChromaGrid
              items={listExperience}
              onItemClick={handleExperienceClick} // Kirim fungsi untuk handle klik
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
        {/* Proyek */}

        {/* Certifications */}
        <div className="proyek mt-32 py-10" id="certifications" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div>
        <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Certifications</h1>
        <p className="text-base/loose text-center opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">During my journey of learning website . mobile and desktop development, I have earned several certificates. Each certificate represents a project Ive completed and the skills Ive acquired along the way. Below, I will explain each of these projects in detail.</p>
        <div className="proyek-box mt-14" >

          <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true" >
            <ChromaGrid
              items={listCertificates}
              onItemClick={handleCertificateClick} // Kirim fungsi untuk handle klik
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
        {/* Certifications */}

        {/* Certifications */}
        {/* <div className="proyek mt-32 py-10" id="certifications" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div>
        <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
          Certifications
        </h1>
        <p className="text-base/loose text-center opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
          During my journey of learning frontend website development, I have earned several certificates...
        </p>

        <div className="proyek-box mt-14">
          <div style={{ height: "auto", position: "relative" }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
            <ChromaGrid
              items={listCertificates}               // ✅ ganti ini
              onItemClick={handleCertificateClick}    // boleh pakai modal experience yang sama, atau bikin modal khusus certificate
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div> */}
        {/*Certifications*/}


        {/* Kontak */}
        <div className="kontak mt-32 sm:p-10 p-0" id="contact">
  <div className="rounded-[32px] border border-emerald-400/20 bg-gradient-to-br from-[#0b0f19]/95 via-[#10131f]/95 to-[#0b0f19]/95 shadow-[0_0_40px_rgba(16,185,129,0.12)] backdrop-blur-xl p-6 sm:p-8 md:p-10">
    <h1
      className="text-4xl md:text-5xl mb-3 font-bold text-center text-white drop-shadow-[0_0_14px_rgba(52,211,153,0.28)]"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      Contact & Chat
    </h1>

    <p
      className="text-base/loose text-center mb-12 text-zinc-300/80"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="300"
      data-aos-once="true"
    >
      Get in touch with me or chat in real-time
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Chat Room kiri */}
      <div
        className="rounded-[28px] border border-emerald-400/20 bg-gradient-to-br from-[#0f1220] via-[#111522] to-[#0c101a] p-4 sm:p-5 shadow-[0_0_30px_rgba(16,185,129,0.10)] backdrop-blur-md"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="400"
        data-aos-once="true"
      >
        <ChatRoom />
      </div>

      {/* Contact Form kanan */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="500"
        data-aos-once="true"
      >
        <form
          action="https://formsubmit.co/julian@gmail.com"
          method="POST"
          autoComplete="off"
          className="w-full rounded-[28px] border border-emerald-400/20 bg-gradient-to-br from-[#0f1220] via-[#111522] to-[#0c101a] p-8 sm:p-10 shadow-[0_0_30px_rgba(16,185,129,0.10)] backdrop-blur-md"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-zinc-200">Full Name</label>
              <input
                type="text"
                name="Name"
                placeholder="Input Name..."
                className="border border-emerald-400/20 bg-white/[0.04] p-3 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-zinc-200">Email</label>
              <input
                type="email"
                name="Email"
                placeholder="Input Email..."
                className="border border-emerald-400/20 bg-white/[0.04] p-3 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-semibold text-zinc-200">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                cols="45"
                rows="7"
                placeholder="Message..."
                className="border border-emerald-400/20 bg-white/[0.04] p-3 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40 transition-all duration-300"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
              type="submit"
              className="send-btn"
            >
              Send
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
        {/* Kontak */}
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      <ProjectModalExperience
        isOpen={!!selectedExperience}
        onClose={handleCloseModal}      
        experience={selectedExperience}
      />

      <ProjectModalCertificates
        isOpen={!!selectedCertificate}    
        onClose={handleCloseModal}
        certificates={selectedCertificate}
      />

    </>
  )
}


export default App

