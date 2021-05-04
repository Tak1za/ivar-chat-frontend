import { Dropdown } from "react-bootstrap";
import React, { forwardRef, useState } from "react";
import AddFriends from "../AddFriends/AddFriends";

const MenuToggle = forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    ref={ref}
  />
));

function Menu() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Dropdown>
      <Dropdown.Toggle as={MenuToggle} id="dropdown-menu-components" />
      <Dropdown.Menu>
        <Dropdown.Item eventKey={1} onClick={() => setModalShow(true)}>
          Add Friends
        </Dropdown.Item>
        {modalShow && (
          <AddFriends show={modalShow} onHide={() => setModalShow(false)} />
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Menu;
