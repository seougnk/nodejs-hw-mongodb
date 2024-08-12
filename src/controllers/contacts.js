import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const homeController = (req, res) => {
  res.json({
    message: 'Hello! You at Home Page! ',
  });
};

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successffuly found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successffuly found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { phoneNumber, name } = req.body;
  if (!phoneNumber || !name) {
    throw createHttpError(400, 'phoneNumber and name are required');
  }

  const contact = await createContact(req.body);
  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
// export const patchContactController = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await updateContact(contactId, req.body);
//   if (!result) {
//     throw createHttpError(404, 'Contact not found');
//   }
//   res.json({
//     status: 200,
//     message: `Successfully patched a contact!`,
//     data: result.student,
//   });
// };
export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactontroller = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};