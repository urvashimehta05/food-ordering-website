import { useNavigate } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();
  const goToFaq = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("faq")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Fiesta</h3>
          <p>
            Fresh, delicious meals delivered fast.
            Your favourite food, just a click away.
          </p>
        </div>

     <div className="footer-section links-row">
  <h4>Explore</h4>
  <ul>
    <li onClick={() => navigate("/")}>Home</li>
    <li onClick={() => navigate("/orders")}>My Orders</li>
    <li onClick={goToFaq}>FAQs</li>
  </ul>
</div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Fiesta
      </div>
    </footer>
  );
};

export default Footer;
