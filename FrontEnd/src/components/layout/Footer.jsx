import { AiFillTikTok } from "react-icons/ai";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import foodfusion from "../../assets/foodfusion.webp";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-light mt-5 pt-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-6 col-lg-4">
            <img
              src={foodfusion}
              height={"50px"}
              width={"50px"}
              alt="logo"
              className="mb-3"
            />
            <p className="text-justify">
              FoodFusion is your go-to destination for delicious meals delivered
              straight to your door. We partner with top local restaurants to
              bring you a diverse menu that caters to all tastes and
              preferences. Whether you are craving comfort food, healthy
              options, or international cuisine, FoodFusion has got you covered.
            </p>

            <div className="d-flex gap-3 mt-3">
              <a href="https://www.facebook.com">
                <FaFacebookSquare />
              </a>
              <a href="https://www.tiktok.com">
                <AiFillTikTok />
              </a>
              <a href="https://www.instagram.com">
                <FaInstagramSquare />
              </a>
            </div>
          </div>

          <div className="col-md-3 col-lg-2">
            <h5 className="text-warning">Quick Links</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2 cursor-pointer" onClick={() => navigate("/")}>
                Home
              </li>
              <li className="mb-2">About Us</li>
              <li className="mb-2">Delivery</li>
              <li className="mb-2">Privacy Policy</li>
            </ul>
          </div>

          <div className="col-md-3 col-lg-3">
            <h5 className="text-warning">Contact Us</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">+977 9812345678</li>
              <li>contact@foodfusion.com</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <p className="text-center text-warning mb-3">
          Copyright {new Date().getFullYear()} © FoodFusion.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
