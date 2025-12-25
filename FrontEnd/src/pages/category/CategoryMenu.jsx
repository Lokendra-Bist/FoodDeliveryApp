import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/categoryApi";
import { Container } from "react-bootstrap";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Container className="my-5" id="explore-menu">
      <h2 className="text-center mb-3">Explore Our Menu</h2>
      <p className="text-center text-muted mb-4">
        Discover a variety of delicious categories to satisfy your cravings.
      </p>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        slidesPerGroup={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 6 },
        }}
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id} className="text-center">
            <img
              src={`data:image/jpeg;base64,${item.image}`}
              alt={item.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <p className="mt-2 fw-semibold">{item.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default CategoryMenu;
