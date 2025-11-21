import React from "react";
import Button from "../Button";

const EntityDetail = ({
  title,
  onBack,
  onEdit,
  editLabel = "Update",
  children,
  headerContent = null,
}) => {
  return (
    <div className="w-full bg-gray-100 h-full">
      <div className="w-full flex items-center justify-between py-3 shadow-md px-6">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} title={"Back"} />
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          {headerContent}
          {onEdit && (
            <Button onClick={onEdit} title={editLabel} type={"button"} />
          )}
        </div>
      </div>
      <div className="bg-white p-8 w-full">{children}</div>
    </div>
  );
};

export default EntityDetail;


