import '../scss/footer.scss'
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
const footer = () => {
  return (
    <div className="footer">
        <div className="up">
          <div className="left">
            <h4>
              Contact
            </h4>
            <h5>
              You can find us on any of these platforms
            </h5>
            <div className="links">
              <button
                type="button"
                aria-label="Twitter Link"
              >
                <a href="https://www.twitter.com/jamal_twts"><FaTwitter className='icon' aria-label="Twitter Link" /></a>
              </button>
              <button                type="button"
                aria-label="Facebook Link"
              >
                <a href="https://www.facebook.com"> 
                <FaFacebook className='icon' aria-label="Facebook Link" /></a>
              </button>

              <button
                aria-label="Github Link"
                type="button"
              >
                <a href="http://www.github.com/jamal108">
                <FaGithub className='icon' aria-label="Github Link" />
                </a>
              </button>
            </div>
          </div>
          <div className="right">
              <div className="one">
                <h1>Useful Links</h1>
                <div className="item">
                      <a href="/about" className="link">About us</a>
                    <a 
                      className="link"
                      href="http://www.github.com/jamal108"
                    >
                      Github
                    </a>
                    </div>
              </div>
              <div className="two">
                <h1 className="efv">
                  Other Resources
                </h1>
                <div className="item">
                    <a 
                    className='link'
                    href="http://www.github.com/jamal108"
                    >
                      Contact Us
                    </a>
                    </div>
              </div>
            </div> 
        </div>
        <div className="line">

        </div>
        <div className="down">
            <div className="text">
              Copyright © {new Date().getFullYear()} VeriFace | Built using
              Reactjs and Tensorflow
            </div>
        </div>
      </div>
  )
}

export default footer