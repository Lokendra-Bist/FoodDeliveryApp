import AppDownload from "../components/AppDownload.jsx/AppDownload";
import ExploreMenu from "../components/ExploreMenu/ExploreMenu";
import { Header } from "../components/layout/Header";

export const Home = () => {
  return (
    <div>
      <Header />
      <ExploreMenu />
      <AppDownload />
    </div>
  );
};
