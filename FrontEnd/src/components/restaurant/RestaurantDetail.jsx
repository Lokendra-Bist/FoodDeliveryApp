import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../../api/restaurantApi";
import { RestaurantMenu } from "./RestaurantMenu";
import openhotel from "../../assets/open.png";
import deliveryimg from "../../assets/fast-delivery.png";

export const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantData = await getRestaurantById(id);
        setRestaurant(restaurantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatTo12Hour = (time24) => {
    if (!time24) return "";

    const [hour, minute] = time24.split(":").map(Number);

    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return <p className="text-center mt-5">Restaurant not found</p>;
  }

  return (
    <div className="container mt-4">
      <div className="position-relative mb-4">
        <img
          src={`data:image/jpeg;base64,${restaurant.coverPhoto}`}
          alt={restaurant.name}
          className="w-100 rounded"
          style={{ height: "300px", objectFit: "cover" }}
        />

        <img
          src={`data:image/jpeg;base64,${restaurant.restaurantPhoto}`}
          alt={restaurant.name}
          className="rounded-circle border border-white position-absolute"
          style={{
            width: "120px",
            height: "120px",
            bottom: "-60px",
            left: "30px",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="mt-5 ms-3">
        <h2>{restaurant.name}</h2>
        <p>
          <strong>Location:</strong> {restaurant.address}
          <iframe
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&hl=es;z=14&output=embed`}
            allowFullScreen
          ></iframe>
        </p>
        <p>
          <img
            src={openhotel}
            alt="hotel open img"
            height={"30px"}
            width={"35px"}
          />
          {formatTo12Hour(restaurant.openTime)}-
          {formatTo12Hour(restaurant.closeTime)}
        </p>
        <p>
          <img
            src={deliveryimg}
            alt="delivery img"
            height={"30px"}
            width={"35px"}
          />
          {formatTo12Hour(restaurant.startTime)}-
          {formatTo12Hour(restaurant.endTime)}
        </p>
        <p>
          <strong>Description:</strong>
          {restaurant.description || "No description available."}
        </p>
      </div>

      <RestaurantMenu restaurantId={restaurant.id} />
    </div>
  );
};
