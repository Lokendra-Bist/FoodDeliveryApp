import AppDownload from "../components/layout/AppDownload";
import CategoryMenu from "./category/CategoryMenu";
import { Header } from "../components/layout/Header";
import { Restaurant } from "./restaurant/Restaurant";

export const Home = () => {
  return (
    <div>
      <Header />
      <CategoryMenu />
      <Restaurant />
      <AppDownload />
    </div>
  );
};
