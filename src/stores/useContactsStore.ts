import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import contactService from '@/services/contactService.ts';
import { TContact } from '@/types/contact.ts';

interface ContactStore {
  contacts: TContact[];
  isLoading: boolean;
  getContacts: () => Promise<void>;
  addContact: (contact: TContact) => Promise<void>;
  updateContact: (id: string, contact: TContact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

const useContactsStore = create<ContactStore>()(
  devtools(
    persist(
      (set) => ({
        contacts: [],
        isLoading: true,

        getContacts: async () => {
          try {
            const data = await contactService.fetchContacts();
            set({ contacts: data, isLoading: false });
            // console.log('Data fetched successfully:', data);
          } catch (error) {
            set({ isLoading: false });
            console.error('Error fetching contacts:', error);
          }
        },

        addContact: async (contact) => {
          try {
            const newContact = await contactService.addContact(contact);
            set((state) => ({ contacts: [...state.contacts, newContact] }));
            // console.log('Contact created successfully:', newContact);
          } catch (error) {
            console.error('Error creating contact:', error);
          }
        },

        updateContact: async (id, contact) => {
          try {
            const updatedContact = await contactService.updateContact(id, contact);
            set((state) => ({
              contacts: state.contacts.map((contact) =>
                contact.id === id ? updatedContact : contact
              ),
            }));
            // console.log('Contact updated successfully:', updatedContact);
          } catch (error) {
            console.error('Error updating contact:', error);
          }
        },

        deleteContact: async (id) => {
          try {
            await contactService.deleteContact(id);
            set((state) => ({
              contacts: state.contacts.filter((contact) => contact.id !== id),
            }));
            // console.log('Contact deleted successfully:', id);
          } catch (error) {
            console.error('Error deleting contact:', error);
          }
        },
      }),
      {
        name: 'contacts-storage',
      }
    )
  )
);

export default useContactsStore;
