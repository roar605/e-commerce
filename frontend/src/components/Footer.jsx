import React from "react";
import "../Styles/componentStyles/Footer.css";
import {
  Phone,
  Mail,
  GitHub,
  LinkedIn,
  Instagram,
  YouTube,
} from "@mui/icons-material";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1 */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <Phone fontSize="small" />
            Phone : +91 9305640458
          </p>
          <p>
            <Mail fontSize="small" />
            Email : rksingh6050@gmail.com
          </p>
        </div>

        {/* Section 2 */}
        <div className="footer-section social">
          <h3>Follow me</h3>
          <div className="social-links">
            <a href="" target="_blank">
              <GitHub className="social-icon" />
            </a>
            <a href="" target="_blank">
              <LinkedIn className="social-icon" />
            </a>
            <a href="" target="_blank">
              <Instagram className="social-icon" />
            </a>
            <a href="" target="_blank">
              <YouTube className="social-icon" />
            </a>
          </div>
        </div>

        {/* Section 3 */}
        <div className="footer-section about">
          <h3>About</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
            quod facere voluptatem corrupti. Pariatur eligendi, nostrum
            perspiciatis eaque minus sed, voluptas tenetur dicta excepturi
            deserunt corrupti asperiores voluptate, temporibus ut.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 - All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
