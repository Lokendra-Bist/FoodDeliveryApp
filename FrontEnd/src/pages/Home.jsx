import AppDownload from "../components/layout/AppDownload";
import CategoryMenu from "./category/CategoryMenu";
import { Header } from "../components/layout/Header";
import { TopRatedRestaurants } from "./restaurant/TopRatedRestaurants";

export const Home = () => {
  return (
    <div>
      <Header />

      <CategoryMenu />

      <TopRatedRestaurants />

      <AppDownload />
    </div>
  );
};
