import Facebook from "../images/facebook.png"
import Twitter from "../images/twitter.png"
import Instagram from "../images/instagram.png"
import Github from "../images/github.png"
import "./Footer.css"

export default function Footer() {
  return (
    <div className="footer">
      <img src={Facebook} alt="Facebook" />
      <img src={Twitter} alt="Twitter" />
      <img src={Instagram} alt="Instagram" />
      <img src={Github} alt="Github" />
    </div>
  )
}