/* получаем данные из localStorage. Если их там изначально нет,
   то возвращаем пустой массив */
export const getStorage = (key) => {
  const storageContacts = JSON.parse(localStorage.getItem(key)) || [];
  return storageContacts;
};
// Добавляем новые контакты в LocalStorage
export const setStorage = (key, value) => {
  const allValues = getStorage(key);
  allValues.push(value);
  localStorage.setItem(key, JSON.stringify(allValues));
};
// Удаляем данные из localStorage
export const removeStorage = (phone, row) => {
  phone = row.querySelector('a').textContent;

  const contacts = getStorage('contacts');
  const updatedContacts = contacts.filter(contact => contact.phone !== phone);
  localStorage.setItem('contacts', JSON.stringify(updatedContacts));
};


