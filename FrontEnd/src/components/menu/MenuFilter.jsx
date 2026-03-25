import { Form, Button } from "react-bootstrap";

export const MenuFilters = ({
  selectedFoodType,
  onFoodTypeChange,
  searchQuery,
  onSearchChange,
  sortBy,
  sortDir,
  setSortBy,
  setSortDir,
}) => {
  return (
    <div
      className="p-3 border rounded bg-light position-sticky"
      style={{ top: "20px" }}
    >
      <h6 className="fw-bold mb-3">Filters</h6>

      <Form.Group className="mb-4">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Food Type</Form.Label>
        {["ALL", "VEG", "NON_VEG"].map((type) => (
          <Form.Check
            key={type}
            type="radio"
            label={type}
            checked={selectedFoodType === type}
            onChange={() => onFoodTypeChange(type)}
          />
        ))}
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Sort By</Form.Label>
        <Form.Select
          value={`${sortBy}-${sortDir}`}
          onChange={(e) => {
            const [field, dir] = e.target.value.split("-");
            setSortBy(field);
            setSortDir(dir);
          }}
        >
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </Form.Select>
      </Form.Group>

      <Button
        size="sm"
        variant="outline-secondary"
        onClick={() => {
          onFoodTypeChange("ALL");
          onSearchChange("");
          setSortBy("price");
          setSortDir("asc");
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
};
