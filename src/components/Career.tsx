import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Current Experience - Backend Developer */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Backend Developer</h4>
                <h5>Uptoskills — Ahmedabad, India</h5>
              </div>
              <h3>06/2026 - CURRENT</h3>
            </div>
            <p>
              Developing RESTful APIs to enhance backend functionality for web applications. Collaborating with frontend developers to integrate user-facing elements with server-side logic and debugging codebase issues.
            </p>
          </div>

          {/* Current Experience - UI/UX Designer */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>UI/UX Designer</h4>
                <h5>Athenura — Ahmedabad, India</h5>
              </div>
              <h3>06/2026 - CURRENT</h3>
            </div>
            <p>
              Designing intuitive user interfaces for web and mobile applications. Conducting user research to gather insights on design preferences and collaborating with developers to ensure design feasibility.
            </p>
          </div>

          {/* Education */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BCA: Computer Applications</h4>
                <h5>AAKMS — Gujarat, India</h5>
              </div>
              <h3>PURSUING</h3>
            </div>
            <p>
              Pursuing Bachelor of Computer Applications with strong focus on software engineering, web development, data structures, and intelligent automation.
            </p>
          </div>

          {/* Python Internship */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Python Programming Intern</h4>
                <h5>Codeveda Technologies & Decodable</h5>
              </div>
              <h3>INTERNSHIP</h3>
            </div>
            <p>
              Completed Python Programming Internships. Built automated scripts, optimized algorithms, and developed backend logic for data processing applications.
            </p>
          </div>

          {/* Certifications */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Certifications & Specializations</h4>
                <h5>Edunet Foundation, Deloitte, Internshala</h5>
              </div>
              <h3>CERTIFIED</h3>
            </div>
            <p>
              • <strong>AI Careers for Women</strong> (Edunet Foundation / Microsoft)<br />
              • <strong>Web Development with AI</strong> (Internshala)<br />
              • <strong>Data Analytics Job Simulation</strong> (Deloitte Australia)
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;

