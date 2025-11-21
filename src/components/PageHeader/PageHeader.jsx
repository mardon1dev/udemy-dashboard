import React, { useState } from "react";
import { NotificationIcon } from "../../assets/icons";
import Button from "../Button";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";

const PageHeader = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };
  const location = useLocation();
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        {location.pathname == "/" ? (
          <p>
            <span className="font-medium">Learn how to launch faster </span>
            <br /> watch our webinar for tips from our experts and get a limited
            time offer.
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center space-x-12">
        <span>
          <NotificationIcon />
        </span>
        <Button
          onClick={() => setOpenModal(true)}
          title={"Log out"}
          type={"button"}
        />
      </div>

      <Modal
        title="Log out"
        modalheader="Are you sure to log out?."
        setOpen={setOpenModal}
        open={openModal}
      >
        <div className="flex gap-2 items-center justify-end">
          <Button
            title="Close"
            addStyle={"bg-green-500"}
            onClick={() => setOpenModal(false)}
            type={"button"}
          />
          <Button
            title="Log Out"
            type={"button"}
            addStyle={"bg-red-500"}
            onClick={handleLogout}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PageHeader;
