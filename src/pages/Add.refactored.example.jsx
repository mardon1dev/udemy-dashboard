/**
 * EXAMPLE: Refactored Add Student Page
 * This demonstrates how to use the new design patterns
 * 
 * Patterns Used:
 * - Custom Hooks Pattern (useForm, useEntity)
 * - Service Layer Pattern (studentService)
 * - Template Method Pattern (EntityForm)
 * - Compound Component Pattern (FormField)
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useEntity } from '../hooks/useEntity';
import studentService from '../services/StudentService';
import EntityForm from '../components/forms/EntityForm';

const AddStudentRefactored = () => {
  const navigate = useNavigate();
  
  // Custom Hook Pattern - CRUD operations
  const { createItem, loading } = useEntity(studentService, 'Student');
  
  // Custom Hook Pattern - Form management
  const { handleSubmit, isSubmitting, errors } = useForm(
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      studentId: ''
    },
    async (values) => {
      // Service Layer Pattern - Business logic handled by service
      await createItem(values);
      setTimeout(() => {
        navigate('/students');
      }, 500);
    }
  );

  // Form field configuration
  const fields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'First Name',
      required: true
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Last Name',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter phone number',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true
    },
    {
      name: 'studentId',
      label: 'Student ID',
      type: 'number',
      placeholder: 'Enter your Student ID number',
      required: true
    }
  ];

  return (
    <EntityForm
      title="Add Student"
      fields={fields}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      submitLabel="Add Student"
      cancelLabel="Back"
      loading={isSubmitting || loading}
      errors={errors}
    />
  );
};

export default AddStudentRefactored;

