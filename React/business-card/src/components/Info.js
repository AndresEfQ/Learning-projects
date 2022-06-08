import Profile from "../images/profilePic.jpeg";
import Mail from "../images/mail.png";
import Linkedin from "../images/linkedin.png";
import "./Info.css";

export default function Info() {
  return (
    <div className="info">
      <img src={Profile} className="info__pic" alt="picture" />
      <h1>Andres Quintero</h1>
      <p className="info__profession">Frontend Developer</p>
      <p className="info__website">andresquintero.website</p>
      <div className="info__links">
        <button>
          <img src={Mail} alt="" className="email-icon" height="16px" />
          Email
        </button>
        <button>
          <img src={Linkedin} alt="" className="linkedin-icon" width="20px" />
          Linkedln
        </button>
      </div>
    </div>
  )
}