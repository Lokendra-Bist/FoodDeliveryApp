import { useState } from "react";
import { Modal } from "react-bootstrap";
import { SignIn } from "../../pages/auth/SignIn";
import { SignUp } from "../../pages/auth/SignUp";

export const AuthModal = ({ show, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        {isLogin ? (
          <>
            <SignIn onSwitch={() => setIsLogin(false)} onClose={handleClose} />
          </>
        ) : (
          <>
            <SignUp onSwitch={() => setIsLogin(true)} onClose={handleClose} />
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};
