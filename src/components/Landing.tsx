import "./styles/Landing.css";

const Landing = () => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              UNNATI
              <br />
              <span>PARMAR</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Python Dev</div>
              <div className="landing-h2-2">UI/UX Designer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">UI/UX Designer</div>
              <div className="landing-h2-info-1">Python Dev</div>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
