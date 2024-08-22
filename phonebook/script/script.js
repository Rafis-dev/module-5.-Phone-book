
{
  // создаем контейнер
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };
  // создаем header
  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
  };
  // создаем header со именем
  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };
  // создаем main и вставляем туда контейнер
  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };
  // создаем кнопки; в качестве параметра объект, где определены класс, тип, и текст кнопки
  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };
  // создаем таблицу с tbody и thead
  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
      <th class="delete">Удалить</th>
      <th class="name">Имя</th>
      <th class="surname">Фамилия</th>
      <th>Телефон</th>
      </tr>
      `);
    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };
  // создаем форму добавления контакта на страницу
  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" id="name" type="text" required>
      </div>
       <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" id="surname" type="text" required>
      </div>
       <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" id="phone" type="number" required>
      </div>
      `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };
  // создаем строчку в таблице контактов (в качестве параметра объект со значением атрибутов name из инпута)
  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    tdDel.append(buttonDel);
    buttonDel.classList.add('del-icon');
    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    const tdEdit = document.createElement('td');
    const btnEdit = document.createElement('button');
    btnEdit.setAttribute('type', 'button');
    btnEdit.textContent = 'Редактировать';
    tdEdit.append(btnEdit);
    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };
  /* добавляем строчки на страницу (elem - сюда вставляем строчки, data -
    отсюда функция createRow берет нужные данные для создания строчки,
    allRow - перебираем массив объектов с помощью метода map и
    из каждого делаем строчку) */
  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };
  // создаем футер
  const createFooter = title => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const p = document.createElement('p');
    p.textContent = `Все права защищены \u00A9 ${title}`;
    const footerContainer = createContainer();
    footerContainer.append(p);
    footer.append(footerContainer);

    return footer;
  };
  // отображаем данные на странице
  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
      table,
    };
  };
  // отображение номера телефона в заголовке
  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };
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
  /* получаем данные из localStorage. Если их там изначально нет,
   то возвращаем пустой массив */
  const getStorage = (key) => {
    const storageContacts = JSON.parse(localStorage.getItem(key)) || [];
    return storageContacts;
  };
  // Добавляем новые контакты в LocalStorage
  const setStorage = (key, value) => {
    const allValues = getStorage(key);
    allValues.push(value);
    localStorage.setItem(key, JSON.stringify(allValues));
  };
  // Удаляем данные из localStorage
  const removeStorage = (phone, row) => {
    phone = row.querySelector('a').textContent;

    const contacts = getStorage('contacts');
    const index = contacts.findIndex(contact => contact.phone === phone);
    if (index !== -1) {
      contacts.splice(index, 1);
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
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
        removeStorage('phone', row);
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

      setStorage('contacts', newContact);
      // addContactData(newContact);
      addContactPage(newContact, list);
      form.reset();
      closeModal();
    });
  };
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
};


