import { useLanguage } from '../hooks/useLanguage';
import '../styles/Footer.css';

const Footer = () => {
  const { data } = useLanguage();

  return (
    <footer id="contact" className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-content">
          <h2 className="footer-title">{data.footer.title}</h2>
          <div className="footer-links">
            <a
              href={`mailto:${data.footer.email}`}
              className="footer-email"
              aria-label={`Send email to ${data.footer.email}`}
            >
              {data.footer.email}
            </a>
            <div className="social-links">
              <a
                href="#"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
              >
                {data.footer.links.github}
              </a>
              <a
                href="#"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
              >
                {data.footer.links.linkedin}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;