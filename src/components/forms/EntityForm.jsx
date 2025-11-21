import React from 'react';
import Button from '../Button';
import FormField from './FormField';

/**
 * Template Method Pattern
 * Base form component that can be extended for different entities
 */
const EntityForm = ({
  title,
  fields,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Back',
  loading = false,
  errors = {}
}) => {
  const [values, setValues] = React.useState(initialValues || {});

  React.useEffect(() => {
    setValues(initialValues || {});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="w-full">
      <div className="mx-auto pt-6 w-[90%] bg-white">
        <div className="flex items-center justify-between mb-[20px]">
          <Button onClick={onCancel} title={cancelLabel} />
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-between">
            {fields.map((field) => (
              <div key={field.name} className={field.fullWidth ? 'w-full' : 'w-[407px]'}>
                <FormField
                  {...field}
                  value={values[field.name] || ''}
                  onChange={handleChange}
                  error={errors[field.name]}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end mt-5">
            <Button
              type="submit"
              title={loading ? 'Processing...' : submitLabel}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityForm;

