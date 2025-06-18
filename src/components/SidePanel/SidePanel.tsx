import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import UseSidePanel from '@/hooks/useSidePanel.tsx';
import useContactsStore from '@/stores/useContactsStore.ts';
import { TContact } from '@/types/contact';

const SidePanel: React.FC = () => {
  const { contact, isOpen, isNew, closePanel } = UseSidePanel();
  const { addContact, updateContact } = useContactsStore();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<TContact>();

  const onSubmit = handleSubmit((data) => {
    try {
      if (isNew && isValid) {
        addContact(data);
        toast.success('Contact created successfully!');
      } else if (!isNew && isValid && contact?.id) {
        updateContact(contact?.id, data);
        toast.success('Contact updated successfully!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred');
    }
  });

  useEffect(() => {
    if (!isNew && contact) {
      setValue('firstName', contact.firstName);
      setValue('lastName', contact.lastName);
      setValue('dateOfBirth', contact.dateOfBirth);
      setValue('email', contact.email);
      setValue('phone', contact.phone);
    }
  }, [contact, isNew, setValue]);

  return (
    isOpen && (
      <div className="fixed top-0 right-0 m-auto flex h-screen w-1/3 flex-col justify-center bg-gray-100 p-4 shadow-lg">
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-700">
            {isNew ? 'Create Contact' : 'Update Contact'}
          </h2>
          <input
            type="text"
            {...register('firstName', { required: 'First Name is required' })}
            placeholder="First Name"
            autoComplete="given-name"
          />
          {errors.firstName && <span className="text-red-900">{errors.firstName.message}</span>}
          <input
            type="text"
            {...register('lastName', { required: 'Last Name is required' })}
            placeholder="Last Name"
            autoComplete="family-name"
          />
          {errors.lastName && <span className="text-red-900">{errors.lastName.message}</span>}
          <input
            type="date"
            {...register('dateOfBirth', { required: 'Date of Birth is required' })}
            placeholder="Date Of Birth"
            autoComplete="bday"
          />
          {errors.dateOfBirth && <span className="text-red-900">{errors.dateOfBirth.message}</span>}
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
            autoComplete="email"
          />
          {errors.email && <span className="text-red-900">{errors.email.message}</span>}
          <input
            id="phone-number"
            type="tel"
            {...register('phone', { required: 'Phone is required' })}
            placeholder="Phone"
            autoComplete="tel"
          />
          {errors.phone && <span className="text-red-900">{errors.phone.message}</span>}

          <button
            type="submit"
            value="Submit"
            className="mx-auto mt-7 h-12 w-1/4 bg-gray-900 hover:bg-gray-950"
            disabled={isSubmitting}
          >
            {isNew ? 'Create' : 'Update'}
          </button>
          <button className="mx-auto h-12 w-1/4 bg-gray-600 hover:bg-gray-700" onClick={closePanel}>
            Close
          </button>
        </form>
      </div>
    )
  );
};

export default SidePanel;
