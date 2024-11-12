import render from './script/modules/render.js';
import control from './script/modules/control.js';
import {getStorage} from './script/modules/storage.js';
const {renderContacts, renderPhoneBook, hoverRow} = render;
const {modalControl, deleteControl, formControl} = control;

import './scss/index.scss';

// основная функция вызова приложения
const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const {
    list,
    logo,
    btnAdd,
    formOverlay,
    form,
    btnDel,
    table} = renderPhoneBook(app, title);
  const tHead = document.querySelector('thead');

  // Функционал
  const allRow = renderContacts(list, getStorage('contacts'));
  const {closeModal} = modalControl(btnAdd, formOverlay);

  hoverRow(allRow, logo);
  deleteControl(btnDel, list);
  formControl(form, list, closeModal);
  // сортировка по алфавиту
  let sortOrder = true; // true - по возрастанию, false - по убыванию
  // Убираем стрелки из заголовков
  const clearArrows = () => {
    const name = tHead.querySelector('.name');
    const surname = tHead.querySelector('.surname');

    name.textContent = 'Имя';
    surname.textContent = 'Фамилия';
  };
  // функция сортировки
  const sortRows = (cellIndex, arrow) => {
    const sortedRows = Array.from(table.rows)
      .slice(1)
      .sort((rowA, rowB) => {
        const cellA = rowA.cells[cellIndex].textContent;
        const cellB = rowB.cells[cellIndex].textContent;
        return sortOrder ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
      });
    list.append(...sortedRows);
    sortOrder = !sortOrder; // меняем порядок сортировки

    clearArrows(); // Очищаем все стрелки

    sortOrder ? arrow.insertAdjacentHTML('beforeend', '&darr;') :
      arrow.insertAdjacentHTML('beforeend', '&uarr;');
  };
  // применяем сортировку к столбцу имени и фамилии
  tHead.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('name')) {
      return sortRows(1, target);
    };
    if (target.classList.contains('surname')) {
      return sortRows(2, target);
    };
  });
};

window.phoneBookInit = init;

