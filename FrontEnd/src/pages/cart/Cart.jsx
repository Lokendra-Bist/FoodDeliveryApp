import { Container, Table, Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, totalAmount, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <Container className="mt-4">
      <h3>Your Cart</h3>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Restaurant Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.menuItemId}>
                  <td>{item.name}</td>

                  <td>{item.restaurantName}</td>

                  <td>
                    <img
                      src={`http://localhost:2058/FoodDeliveryApp${item.imageUrl}`}
                      alt={item.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>

                  <td>Rs. {item.price}</td>

                  <td>
                    <Button
                      size="sm"
                      onClick={() => removeFromCart(item.menuItemId)}
                    >
                      -
                    </Button>

                    <span className="mx-2">{item.quantity}</span>

                    <Button
                      size="sm"
                      onClick={() =>
                        addToCart({
                          id: item.menuItemId,
                          quantity: 1,
                        })
                      }
                    >
                      +
                    </Button>
                  </td>

                  <td>Rs. {item.price * item.quantity}</td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.menuItemId)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5>Total: Rs. {totalAmount}</h5>

          <Button variant="danger" onClick={clearCart}>
            Clear Cart
          </Button>

          <Link
            className="ms-3 btn btn-success"
            variant="success"
            to={"/checkout"}
          >
            Checkout
          </Link>
        </>
      )}
    </Container>
  );
};
