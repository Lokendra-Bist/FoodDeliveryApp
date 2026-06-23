import { useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { MenuCard } from "../../components/menu/MenuCard";
import { MenuFilters } from "../../components/menu/MenuFilter";
import { PaginationControl } from "../../components/common/PaginationControl";
import { useMenuItems } from "../../hooks/useMenuItems";
import { useSearchParams } from "react-router-dom";

export const MenuList = () => {
  const [page, setPage] = useState(0);
  const size = 9;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("ALL");

  const [sortBy, setSortBy] = useState("price");
  const [sortDir, setSortDir] = useState("asc");

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { menuItems, totalPages, loading } = useMenuItems({
    page,
    size,
    categoryId,
    search: searchQuery,
    foodType: selectedFoodType,
    sortBy,
    sortDir,
  });

  return (
    <Container fluid className="mt-4">
      <Row className="gx-4">
        <Col xs={12} md={3} lg={2}>
          <MenuFilters
            selectedFoodType={selectedFoodType}
            onFoodTypeChange={(type) => {
              setSelectedFoodType(type);
              setPage(0);
            }}
            searchQuery={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              if (val.trim()) {
                setSearchParams({});
              }
              setPage(0);
            }}
            sortBy={sortBy}
            sortDir={sortDir}
            setSortBy={setSortBy}
            setSortDir={setSortDir}
          />
        </Col>

        <Col xs={12} md={9} lg={10}>
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <Row xs={1} sm={2} lg={3} className="g-4">
                {menuItems.map((item) => (
                  <Col key={item.id}>
                    <MenuCard menuItem={item} />
                  </Col>
                ))}
              </Row>

              <PaginationControl
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
