import playstore from "../../assets/playstore.png";
import appstore from "../../assets/appstore.png";

const AppDownload = () => {
  return (
    <section id="app-download" className="container text-center my-5 py-5">
      <p className="fw-medium display-6 mb-4 text-dark">
        For Better Experience Download <br />
        FoodFusion App
      </p>

      <div className="d-flex justify-content-center gap-3 gap-md-4">
        <img
          src={playstore}
          alt="play_store"
          className="img-fluid app-store-img"
          style={{ maxWidth: "180px", cursor: "pointer" }}
        />

        <img
          src={appstore}
          alt="app_store"
          className="img-fluid app-store-img"
          style={{ maxWidth: "180px", cursor: "pointer" }}
        />
      </div>
    </section>
  );
};

export default AppDownload;
