import { Modal, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserProfile } from "../../api/userApi";

export const UserProfile = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      setProfile(data);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) fetchProfile();
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>My Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          profile && (
            <>
              <img
                src={`https://ui-avatars.com/api/?name=${profile.name}`}
                alt="profile"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #ffc107",
                }}
              />

              <h5 className="mt-3 mb-1">{profile.userName}</h5>
              <p className="text-muted mb-3">{profile.email}</p>

              <div className="text-start">
                <p className="mb-2">
                  <strong>Phone:</strong> {profile.phoneNumber || "N/A"}
                </p>

                <p className="mb-0">
                  <strong>Role:</strong> {profile.roles?.join(", ") || "USER"}
                </p>
              </div>
            </>
          )
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
