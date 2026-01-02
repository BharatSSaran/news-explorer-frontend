import { Link } from "react-router-dom";
import "./Footer.css";

function Footer({ onHomeClick }) {
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          &copy; 2025 News Explorer, Powered by News API
        </p>
        <nav className="footer__nav">
          <Link to="/" className="footer__link" onClick={handleHomeClick}>
            Home
          </Link>
          <a
            href="https://tripleten.com"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
          <div className="footer__social-links">
            <a
              href="https://github.com/bharatssaran"
              className="footer__link footer__link--icon"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <svg
                className="footer__icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.18 9.18 0 0 1 2.5-.34c.85 0 1.7.11 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/bharatsaran"
              className="footer__link footer__link--icon"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="footer__icon"
              >
                <path
                  d="M20.5576 2C21.3543 2.00002 22 2.64575 22 3.44238V20.5576C22 21.3543 21.3543 22 20.5576 22H3.44238C2.64575 22 2.00002 21.3543 2 20.5576V3.44238C2.00002 2.64575 2.64575 2.00002 3.44238 2H20.5576ZM6.6582 9.79004V17.1172H9.09375V9.79004H6.6582ZM15.0723 9.61816C13.7803 9.61816 13.2006 10.3279 12.877 10.8271V9.79004H10.4424C10.4743 10.4772 10.4424 17.1123 10.4424 17.1172H12.877V13.0254C12.877 12.8064 12.8926 12.5872 12.957 12.4307C13.1332 11.9933 13.5344 11.54 14.207 11.54C15.0881 11.5401 15.4404 12.2123 15.4404 13.1973V17.1172H17.876V12.916C17.876 10.6656 16.6745 9.61826 15.0723 9.61816ZM7.89258 6.25781C7.05964 6.25784 6.51485 6.80466 6.51465 7.52344C6.51465 8.22649 7.04323 8.78993 7.86035 8.79004H7.87695C8.72597 8.78982 9.25391 8.22643 9.25391 7.52344C9.23785 6.80464 8.72555 6.25781 7.89258 6.25781Z"
                  fill="#191717"
                />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
