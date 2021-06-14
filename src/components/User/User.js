import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { addFriend } from "../../utils/backend";
import "./User.css";

function User({ name, email, friends, ...rest }) {
  const [selected, setSelected] = useState(false);
  const { getToken } = useAuth();

  const handleAddButtonClicked = async () => {
    let token = await getToken().catch((err) => {
      return console.error(err);
    });

    addFriend(token, email)
      .then(console.log("done"))
      .catch((err) => console.error(err));
    setSelected(!selected);
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      {!friends || !friends.map((f) => f.email).includes(email) ? (
        <>
          <div>{`${name} (${email})`}</div>
          <i
            className={`far fa-plus-square ${
              selected ? "AddUserButtonSelected" : "AddUserButton"
            }`}
            onClick={handleAddButtonClicked}
          />
        </>
      ) : null}
    </div>
  );
}

export default User;
