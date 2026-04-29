import { Container, Table, Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const increaseQty = (item) => {
    addToCart(item);
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity: -1 });
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

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
                <th>Image</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </td>
                  <td>Rs. {item.price}</td>

                  <td>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => decreaseQty(item)}
                    >
                      -
                    </Button>

                    <span className="mx-2">{item.quantity}</span>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => increaseQty(item)}
                    >
                      +
                    </Button>
                  </td>

                  <td>Rs. {item.price * item.quantity}</td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5>Total: Rs. {totalPrice}</h5>

          <Button variant="danger" onClick={clearCart}>
            Clear Cart
          </Button>

          <Button className="ms-3" variant="success">
            Checkout
          </Button>
        </>
      )}
    </Container>
  );
};
