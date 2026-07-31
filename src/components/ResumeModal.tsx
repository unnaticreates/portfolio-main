import React from "react";
import { MdClose, MdDownload, MdEmail, MdPhone, MdLocationOn, MdWork, MdSchool, MdWorkspacePremium, MdCode } from "react-icons/md";
import "./styles/ResumeModal.css";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const downloadResumePDF = () => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>UNNATI PARMAR - RESUME</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.5; }
        h1 { margin-bottom: 4px; color: #2d3436; text-transform: uppercase; font-size: 28px; }
        .subtitle { color: #636e72; margin-bottom: 20px; font-weight: 500; font-size: 14px; }
        .section-title { text-transform: uppercase; border-bottom: 2px solid #6c5ce7; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; color: #6c5ce7; font-size: 16px; letter-spacing: 1px; }
        .item { margin-bottom: 14px; }
        .item-header { display: flex; justify-content: space-between; font-weight: bold; }
        .item-sub { color: #555; font-style: italic; font-size: 14px; margin-bottom: 6px; }
        ul { margin: 6px 0; padding-left: 20px; }
        li { margin-bottom: 4px; }
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <h1>UNNATI PARMAR</h1>
      <div class="subtitle">AHMEDABAD, India 382340 | +91 9924445701 | unnatiparmar0156@gmail.com</div>
      
      <div class="section-title">SUMMARY</div>
      <p>Innovative professional with internship experience in UI/UX design and Python development. Skilled in Python and user interface design, excelling in teamwork to enhance software capabilities. Strong problem-solving skills lead to effective data processing improvements. Dedicated to achieving project milestones and delivering impactful results.</p>
      
      <div class="section-title">EXPERIENCE</div>
      <div class="item">
        <div class="item-header"><span>Backend Developer</span> <span>06/2026 - Current</span></div>
        <div class="item-sub">Uptoskills — AHMEDABAD, India</div>
        <ul>
          <li>Developed RESTful APIs to enhance backend functionality for web applications.</li>
          <li>Collaborated with frontend developers to integrate user-facing elements with server-side logic.</li>
          <li>Assisted in troubleshooting and debugging issues within the application codebase.</li>
        </ul>
      </div>
      <div class="item">
        <div class="item-header"><span>UI/UX Designer</span> <span>06/2026 - Current</span></div>
        <div class="item-sub">Athenura — AHMEDABAD, India</div>
        <ul>
          <li>Designed user interfaces for web and mobile applications at Athenura.</li>
          <li>Conducted user research to gather insights on design preferences and behavior.</li>
          <li>Collaborated with developers to ensure design feasibility and implementation accuracy.</li>
        </ul>
      </div>

      <div class="section-title">EDUCATION</div>
      <div class="item">
        <div class="item-header"><span>BCA: Computer Applications</span> <span>07/2026 (Pursuing)</span></div>
        <div class="item-sub">AAKMS — Gujarat, India</div>
      </div>

      <div class="section-title">SKILLS</div>
      <div class="skills-grid">
        <div>• Python, JavaScript, HTML5, CSS3</div>
        <div>• User Interface Design & Prototyping</div>
        <div>• Git, GitHub, VS Code</div>
        <div>• MySQL & Database Management</div>
        <div>• Data Visualization & Analysis</div>
      </div>

      <div class="section-title">CERTIFICATIONS</div>
      <ul>
        <li>AI Careers for Women Certificate of Completion — Edunet Foundation</li>
        <li>Web Development with AI — Internshala</li>
        <li>Python Programming Internship Completion — Codeveda Technologies</li>
        <li>Data Analytics Job Simulation — Deloitte Australia</li>
        <li>Python Programming Internship Completion — Decodable</li>
      </ul>

      <div class="section-title">PROJECTS</div>
      <div class="item">
        <strong>Jarvis AI Assistant</strong>
        <p>Developed a voice-controlled virtual assistant using Python. Implemented speech recognition and text-to-speech functionality. Automated user interaction through voice commands.</p>
      </div>
      <div class="item">
        <strong>Dine Ease — Restaurant Management Web Application</strong>
        <p>Built a full-stack restaurant management application using HTML, CSS, JavaScript, Python, Streamlit. Implemented user authentication and menu management features.</p>
      </div>
      
      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <h2>Unnati Parmar <span>Resume</span></h2>
          <div className="resume-modal-actions">
            <button className="resume-btn primary" onClick={downloadResumePDF}>
              <MdDownload /> Download / Print PDF
            </button>
            <button className="resume-close-btn" onClick={onClose}>
              <MdClose />
            </button>
          </div>
        </div>

        <div className="resume-modal-body">
          {/* Contact Bar */}
          <div className="resume-contact-bar">
            <span><MdLocationOn /> Ahmedabad, India 382340</span>
            <span><MdPhone /> +91 9924445701</span>
            <span><MdEmail /> unnatiparmar0156@gmail.com</span>
          </div>

          {/* Summary */}
          <div className="resume-section-box">
            <h3>Summary</h3>
            <p>
              Innovative professional with internship experience in UI/UX design and Python development. Skilled in Python and user interface design, excelling in teamwork to enhance software capabilities. Strong problem-solving skills lead to effective data processing improvements. Dedicated to achieving project milestones and delivering impactful results.
            </p>
          </div>

          {/* Experience */}
          <div className="resume-section-box">
            <h3><MdWork /> Experience</h3>
            <div className="resume-item">
              <div className="resume-item-top">
                <h4>Backend Developer — Uptoskills</h4>
                <span className="badge">06/2026 - Current</span>
              </div>
              <p className="location">Ahmedabad, India</p>
              <ul>
                <li>Developed RESTful APIs to enhance backend functionality for web applications.</li>
                <li>Collaborated with frontend developers to integrate user-facing elements with server-side logic.</li>
                <li>Assisted in troubleshooting and debugging issues within the application codebase.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="resume-item-top">
                <h4>UI/UX Designer — Athenura</h4>
                <span className="badge">06/2026 - Current</span>
              </div>
              <p className="location">Ahmedabad, India</p>
              <ul>
                <li>Designed user interfaces for web and mobile applications at Athenura.</li>
                <li>Conducted user research to gather insights on design preferences and behavior.</li>
                <li>Collaborated with developers to ensure design feasibility and implementation accuracy.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="resume-section-box">
            <h3><MdSchool /> Education</h3>
            <div className="resume-item">
              <div className="resume-item-top">
                <h4>BCA: Computer Applications</h4>
                <span className="badge">07/2026 (Pursuing)</span>
              </div>
              <p className="location">AAKMS — Gujarat, India</p>
            </div>
          </div>

          {/* Skills */}
          <div className="resume-section-box">
            <h3><MdCode /> Skills</h3>
            <div className="resume-skills-tags">
              <span>Python</span>
              <span>JavaScript</span>
              <span>HTML5</span>
              <span>CSS3</span>
              <span>UI/UX Design</span>
              <span>Git & GitHub</span>
              <span>VS Code</span>
              <span>MySQL</span>
              <span>Database Management</span>
              <span>Data Visualization</span>
              <span>Data Analysis</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="resume-section-box">
            <h3><MdWorkspacePremium /> Certifications</h3>
            <ul className="resume-cert-list">
              <li><strong>AI Careers for Women Certificate</strong> — Edunet Foundation</li>
              <li><strong>Web Development with AI</strong> — Internshala</li>
              <li><strong>Python Programming Internship</strong> — Codeveda Technologies</li>
              <li><strong>Data Analytics Job Simulation</strong> — Deloitte Australia</li>
              <li><strong>Python Programming Internship</strong> — Decodable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
