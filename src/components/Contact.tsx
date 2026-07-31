import { useState } from "react";
import { MdArrowOutward, MdCopyright, MdDownload, MdDescription } from "react-icons/md";
import ResumeModal, { downloadResumePDF } from "./ResumeModal";
import "./styles/Contact.css";

const Contact = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <div className="contact-section section-container" id="contact">
        <div className="contact-container">
          <h3>Contact & Resume</h3>
          <div className="contact-flex">
            <div className="contact-box">
              <h4>Email</h4>
              <p>
                <a href="mailto:unnatiparmar0156@gmail.com" data-cursor="disable">
                  unnatiparmar0156@gmail.com
                </a>
              </p>
              <h4>Phone</h4>
              <p>
                <a href="tel:+919924445701" data-cursor="disable">
                  +91 99244 45701
                </a>
              </p>
            </div>

            <div className="contact-box">
              <h4>Resume / CV</h4>
              <div className="resume-contact-buttons">
                <button
                  className="contact-resume-btn primary"
                  onClick={downloadResumePDF}
                  data-cursor="disable"
                >
                  <MdDownload /> Download Resume
                </button>
                <button
                  className="contact-resume-btn secondary"
                  onClick={() => setIsResumeOpen(true)}
                  data-cursor="disable"
                >
                  <MdDescription /> View Resume
                </button>
              </div>
            </div>

            <div className="contact-box">
              <h4>Social</h4>
              <a
                href="https://github.com/unnaticreates"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Github <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/unnati-parmar"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Linkedin <MdArrowOutward />
              </a>
            </div>

            <div className="contact-box">
              <h2>
                Designed and Developed <br /> by <span>Unnati Parmar</span>
              </h2>
              <h5>
                <MdCopyright /> 2026
              </h5>
            </div>
          </div>
        </div>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};

export default Contact;

