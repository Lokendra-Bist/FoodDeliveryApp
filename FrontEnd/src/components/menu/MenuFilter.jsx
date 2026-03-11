import { Form, Button } from "react-bootstrap";

export const MenuFilters = ({
  foodTypes,
  selectedFoodType,
  onFoodTypeChange,
  searchQuery,
  onSearchChange,
  itemSearch,
  onItemSearchChange,
}) => {
  return (
    <div
      className="menu-filter-sidebar p-3 border rounded bg-light position-sticky"
      style={{ top: "20px" }}
    >
      <h6 className="fw-bold mb-3">Filters</h6>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Food Item</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search food item..."
          value={itemSearch}
          onChange={(e) => onItemSearchChange(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Restaurant / Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search restaurant or type..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Food Type</Form.Label>
        {foodTypes.map((type) => (
          <Form.Check
            key={type}
            type="radio"
            name="foodType"
            label={type}
            checked={selectedFoodType === type}
            onChange={() => onFoodTypeChange(type)}
            className="mb-2"
          />
        ))}
      </Form.Group>

      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          onFoodTypeChange("ALL");
          onSearchChange("");
          onItemSearchChange("");
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
};
