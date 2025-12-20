import header_img from "../../assets/header_img.jpg";

export const Header = () => {
  return (
    <header
      className="container my-4 rounded-4 position-relative text-light"
      style={{
        backgroundImage: "url(" + header_img + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "34vw",
        minHeight: "320px",
      }}
    >
      <div
        className="position-absolute d-flex flex-column gap-3"
        style={{
          bottom: "10%",
          left: "6%",
          maxWidth: "50%",
        }}
      >
        <h2 className="fw-medium display-6 text-shadow">
          Order Your Favourite Food Here
        </h2>

        <p className="d-none d-md-block">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>

        <a href="#explore-menu">
          <button className="btn btn-light rounded-pill px-4 py-2 fw-medium">
            View Menu
          </button>
        </a>
      </div>
    </header>
  );
};
