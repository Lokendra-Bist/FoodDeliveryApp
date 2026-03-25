import { useState, useEffect } from "react";
import { getMenuItem } from "../api/menuApi";

export const useMenuItems = ({
  page,
  size,
  search,
  foodType,
  sortBy,
  sortDir,
}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        const data = await getMenuItem({
          page,
          size,
          search,
          foodType,
          sortBy,
          sortDir,
        });

        setMenuItems(data.content);
        setTotalPages(data.page.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [page, size, search, foodType, sortBy, sortDir]);

  return { menuItems, totalPages, loading };
};
