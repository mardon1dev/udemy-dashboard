import React, { useMemo } from "react";
import EntityForm from "../forms/EntityForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEntity } from "../../hooks/useEntity";

const EntityFormPage = ({ config, mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === "edit";
  const { getItemById, createItem, updateItem, loading } = useEntity(
    config.service,
    config.name
  );

  const existingEntity = useMemo(
    () => (isEdit ? getItemById(id) : null),
    [isEdit, id, getItemById]
  );

  const initialValues = useMemo(() => {
    if (existingEntity) return existingEntity;
    return config.formFields.reduce((acc, field) => {
      acc[field.name] = field.type === "select" ? "" : "";
      return acc;
    }, {});
  }, [existingEntity, config.formFields]);

  const handleSubmit = async (values) => {
    if (isEdit) {
      await updateItem(id, values);
    } else {
      await createItem(values);
    }
    navigate(config.basePath);
  };

  return (
    <EntityForm
      title={`${isEdit ? "Update" : "Add"} ${config.name}`}
      fields={config.formFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      submitLabel={`${isEdit ? "Update" : "Add"} ${config.name}`}
      loading={loading}
    />
  );
};

export default EntityFormPage;


