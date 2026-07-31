import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          
          <div className="about-divider"></div>
        </div>

        <p className="about-bio">
          I am <span>Unnati Parmar</span>, a passionate BCA student with dual expertise in{" "}
          <strong>UI/UX Design</strong> and <strong>Python & AI Development</strong>. I bridge the gap{" "}
          between user-centered aesthetic interfaces and robust, intelligent backend systems. With hands-on{" "}
          experience building web applications, machine learning models, and automated Python tools, I craft{" "}
          scalable, practical solutions that solve real-world problems.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <div className="card-icon">🎓</div>
            <h4>Education</h4>
            <p>BCA in Computer Applications at AAKMS (Pursuing)</p>
          </div>
          <div className="about-card">
            <div className="card-icon">💼</div>
            <h4>Current Roles</h4>
            <p>Backend Developer at Uptoskills & UI/UX Designer at Athenura</p>
          </div>
          <div className="about-card">
            <div className="card-icon">📜</div>
            <h4>Certifications</h4>
            <p>AI Careers (Microsoft/Edunet), Web Dev with AI (Internshala), Deloitte Job Simulation</p>
          </div>
          <div className="about-card">
            <div className="card-icon">⚡</div>
            <h4>Technical Focus</h4>
            <p>Intuitive UI/UX Wireframing, Scalable Python Logic & ML Model Deployment</p>
          </div>
        </div>

        <div className="about-badges">
          <span className="about-badge">UI/UX Design</span>
          <span className="about-badge">Python Dev</span>
          <span className="about-badge">AI & Machine Learning</span>
          <span className="about-badge">Web Development</span>
          <span className="about-badge">Figma</span>
          <span className="about-badge">REST APIs</span>
        </div>
      </div>
    </div>
  );
};

export default About;
