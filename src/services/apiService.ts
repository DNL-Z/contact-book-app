import { TContact } from '@/types/contact.ts';

// JSON-Server API URL
const API_URL = 'http://localhost:3004/contacts';

const apiRequest = async (endpoint: string, method: string, body?: object) => {
  try {
    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ${method} ${endpoint}:`, error);
    throw error;
  }
};

export const contactService = {
  fetchContacts: () => apiRequest('', 'GET'),
  // fetchContactById: (id: number) => apiRequest(`/${id}`, 'GET'),
  createContact: (contact: TContact) => apiRequest('', 'POST', contact),
  updateContact: (id: string, contact: TContact) => apiRequest(`/${id}`, 'PUT', contact),
  deleteContact: (id: string) => apiRequest(`/${id}`, 'DELETE'),
};
