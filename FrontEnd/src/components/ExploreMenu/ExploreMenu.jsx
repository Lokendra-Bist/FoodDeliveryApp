import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/categoryApi";
import { Carousel, Container } from "react-bootstrap";

const ExploreMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container className="my-5" id="explore-menu">
      <h1 className="text-center mb-3">Explore Our Menu</h1>
      <p className="text-center text-muted mb-4">
        Discover a variety of delicious dishes and cuisines to satisfy your
        cravings. Place your order now and enjoy!
      </p>

      {categories.length > 0 && (
        <Carousel indicators={false} interval={3000} controls={false}>
          {categories.map((item) => (
            <Carousel.Item key={item.id}>
              <div className="d-flex justify-content-center">
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.name}
                  className="rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <Carousel.Caption>
                <p className="text-dark">{item.name}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Container>
  );
};

export default ExploreMenu;
