import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { getMyFriends, getUsers } from "../../utils/backend";
import User from "../User/User";

function AddFriends(props) {
  const [people, setPeople] = useState([]);
  const [friends, setFriends] = useState([]);
  const { currentUser, getToken } = useAuth();
  useEffect(() => {
    async function fetchUsers() {
      let token = await getToken().catch((err) => {
        return console.error(err);
      });

      await getUsers(token)
        .then((res) => {
          setPeople(res.data.data.filter((p) => p.email !== currentUser.email));
        })
        .catch((err) => console.error(err));

      await getMyFriends(token)
        .then((res) => {
          setFriends(res.data.data);
        })
        .catch((err) => console.error(err));
    }

    fetchUsers();
  }, [getToken, currentUser]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Someone
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {people.map((p) => {
          return (
            <User
              name={p.name}
              email={p.email}
              key={p.email}
              friends={friends}
            />
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default AddFriends;
