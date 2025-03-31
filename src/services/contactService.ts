import { TContact } from '@/types/contact.ts';

import apiClient from './apiClient.ts';

const CONTACTS_ENDPOINT = '/contacts';

const contactService = {
  fetchContacts: () => apiClient(CONTACTS_ENDPOINT, 'GET'),
  // fetchContactById: (id: number) => apiClient(`/${id}`, 'GET'),
  addContact: (contact: TContact) => apiClient(CONTACTS_ENDPOINT, 'POST', contact),
  updateContact: (id: string, contact: TContact) => apiClient(`${CONTACTS_ENDPOINT}/${id}`, 'PUT', contact),
  deleteContact: (id: string) => apiClient(`${CONTACTS_ENDPOINT}/${id}`, 'DELETE'),
};

export default contactService;
