import React from "react";
import Button from "../Button";

const EntityTable = ({
  title,
  entityName,
  columns,
  items,
  onAdd,
  onSearch,
  searchTerm,
  actions,
  emptyState,
}) => {
  return (
    <div className="w-full p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <Button onClick={onAdd} title={`Add ${entityName}`} />
      </div>

      <form className="w-full mb-6">
        <div className="relative">
          {onSearch && (
            <>
              <input
                className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                type="text"
                placeholder={`Search for a ${entityName.toLowerCase()}`}
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
              />
            </>
          )}
        </div>
      </form>

      {items.length > 0 ? (
        <table className="w-full bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                N
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="p-3 text-left text-sm font-semibold text-gray-700"
                >
                  {column.label}
                </th>
              ))}
              <th className="p-3 text-left text-sm font-semibold text-gray-700 w-[120px]"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id || index} className="bg-white">
                <td className="py-4 px-3">{index + 1}</td>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="py-4 px-3 text-md font-normal leading-4 text-left"
                  >
                    {item[column.key]}
                  </td>
                ))}
                <td className="py-4 px-3 relative">
                  <div className="flex items-center gap-3">
                    {actions?.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => action.onClick(item)}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        emptyState
      )}
    </div>
  );
};

export default EntityTable;


