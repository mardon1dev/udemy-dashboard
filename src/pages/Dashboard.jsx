import React from "react";
import {
  AddUserIcon,
  BankIcon,
  NotificationIcon,
  StudentIcon,
  SupportIcon,
} from "../assets/icons";
import Button from "../components/Button";

const Dashboard = () => {
  const dashboadrInfo = [
    {
      id: 1,
      title: "Add other admins ",
      description:
        "Create rich course content and coaching products for your students. When you give them a pricing plan, they’ll appear on your site!",
      icon: <AddUserIcon />,
    },
    {
      id: 2,
      title: "Add classes",
      description:
        "Create rich course content and coaching products for your students. When you give them a pricing plan, they’ll appear on your site!",
      icon: <BankIcon />,
    },
    {
      id: 3,
      title: "Add studemts",
      description:
        "Create rich course content and coaching products for your students. When you give them a pricing plan, they’ll appear on your site!",
      icon: <StudentIcon />,
    },
  ];
  return (
    <div className="w-full text-[#4F4F4F] relative">
      <div className="mt-[53px]">
        <h1 className="text-center text-3xl font-semibold">
          Welcome to your dashboard, Udemy school.
        </h1>
        <p className="text-2xl font-semibold leading-7 text-center mt-6">
          Uyo/school/@teachable.com
        </p>
        <div className="flex mt-[70px] flex-col w-[568px] mx-auto">
          {dashboadrInfo.map((item, index) => (
            <div key={index} className="flex items-center space-x-5 mt-6">
              <div className="max-w-[36px] h-[36px] w-full rounded-lg bg-[#EFF3FA] flex items-center justify-center text-black">
                {item.icon}
              </div>
              <div>
                <h2 className="text-2xl font-medium leading-7">{item.title}</h2>
                <p className="text-sm font-normal leading-4 mt-4">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="fixed bottom-[120px] right-[60px] px-6 py-[22px] bg-[#152259] hover:bg-[#152259]/70 text-white flex items-center justify-start space-x-2 rounded-[30px] w-[181px]">
        <span><SupportIcon /></span>
        <span>Support</span>
      </button>
    </div>
  );
};

export default Dashboard;
