import * as storage from './storage';
import {createRow} from './createElements';
// открываем и закрываем модалку
const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay ||
      target.classList.contains('close')) {
      closeModal();
    };
  });
  return {
    closeModal,
  };
};
// удаляем данные со страницы и здес же вызываем removeStoragem
const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      const row = target.closest('.contact');
      row.remove();
      storage.removeStorage('phone', row);
    }
  });
};
// добавляем новый контакт на страницу
const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};
// работа с формой и добавляем контакты в localStorage
const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    storage.setStorage('contacts', newContact);
    // addContactData(newContact);
    addContactPage(newContact, list);
    form.reset();
    closeModal();
  });
};

export default {
  modalControl,
  deleteControl,
  addContactPage,
  formControl,
};
