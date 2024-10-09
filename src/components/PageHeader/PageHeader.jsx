import React from "react";
import { NotificationIcon } from "../../assets/icons";
import Button from "../Button";
import { useLocation, useNavigate } from "react-router-dom";

const PageHeader = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
    window.location.reload();
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
        <Button onClick={handleLogout} title={"Log out"} type={"button"} />
      </div>
    </div>
  );
};

export default PageHeader;
