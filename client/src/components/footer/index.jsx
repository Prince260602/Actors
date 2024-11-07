import "./index.css";

const index = () => {
  return (
    <div className="footer">
      <div className="footersub1">
        <div className="footerleft">
          <div className="heading">TEN Actors</div>
        </div>
        <div className="footerright">
          <div className="footerrightplatform">
            <div className="footerrightplatformsub">
              <div className="subheading">PLATFORM</div>
              <a href="/Actors" className="links">
                Browse Actors
              </a>
              <a
                href="https://calendly.com/techten/book-a-demo-session"
                target="_blank"
                className="links"
              >
                Book a Session
              </a>
            </div>
          </div>
          <div className="footerrightcompany">
            <div className="footerrightcompanysub">
              <div className="subheading">CONTACT US</div>
              <a
                href="mailto:info@entrepreneurshipnetwork.net"
                className="links"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/company/the-entrepreneurship-network"
                target="_blank"
                className="links"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
{/*       <div className="footersub2">
        &copy; 2024 ActorSite. All Rights Reserved
      </div> */}
    </div>
  );
};

export default index;
