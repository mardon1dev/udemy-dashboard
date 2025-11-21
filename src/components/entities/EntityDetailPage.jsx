import React from "react";
import EntityDetail from "../EntityDetail/EntityDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useEntity } from "../../hooks/useEntity";

const EntityDetailPage = ({ config }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById } = useEntity(config.service, config.name);
  const entity = getItemById(id);

  if (!entity) {
    return (
      <div className="text-red-600 text-center mt-10 text-xl">
        {config.name} not found
      </div>
    );
  }

  return (
    <EntityDetail
      title={entity.fullName || `${entity.firstName} ${entity.lastName}`}
      onBack={() => navigate(-1)}
      onEdit={() => navigate(`${config.basePath}/${entity.id}/update`)}
      editLabel={`Update ${config.name} info`}
      headerContent={
        entity.image || config.avatarPlaceholder ? (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            {entity.image ? (
              <img
                src={entity.image}
                alt={entity.fullName || entity.firstName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              config.avatarPlaceholder(entity)
            )}
          </div>
        ) : null
      }
    >
      <div className="space-y-6">
        {config.detailSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <span className="text-sm text-gray-500">{field.label}</span>
                  <p className="text-base font-medium text-gray-800">
                    {entity[field.key] || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </EntityDetail>
  );
};

export default EntityDetailPage;


