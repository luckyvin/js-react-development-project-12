export default {
  translation: {
    navbar: {
      title: 'Hexlet Chat',
      logout: 'Выйти',
    },
    channels: {
      title: 'Каналы',
      actions: {
        trigger: 'Управление каналом',
        delete: 'Удалить',
        rename: 'Переименовать',
      },
      modals: {
        addTitle: 'Добавить канал',
        addLabel: 'Имя канала',
        deleteTitle: 'Удалить канал',
        deleteBody: 'Уверены?',
        renameTitle: 'Переименовать канал',
        renameLabel: 'Имя канала',
        buttons: {
          cancel: 'Отменить',
          send: 'Отправить',
          delete: 'Удалить',
        }
      },
      alerts: {
        added: 'Канал создан',
        deleted: 'Канал удалён',
        renamed: 'Канал переименован',
      }
    },
    messages: {
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      ariaLabel: 'Новое сообщение',
      placeholder: 'Введите сообщение...'
    },
    pages: {
      errorPage: {
        notFound: 'Страница не найдена',
        butYouCanGo: 'Но вы можете перейти ',
        toMainPage: 'на главную страницу',
      },
      loginPage: {
        login: 'Войти',
        yourNick: 'Ваш ник',
        password: 'Пароль',
        noAccount: 'Нет аккаунта? ',
        registration: 'Регистрация',
      },
      signupPage: {
        registration: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        passwordConfirmation: 'Подтвердите пароль',
        register: 'Зарегистрироваться',
      },
    },
    errors: {
      nameLengthError: 'От 3 до 20 символов',
      nameUniqueError: 'Должно быть уникальным',
      requiredError: 'Обязательное поле',
      passwordLengthError: 'Не менее 6 символов',
      passwordConfirmationError: 'Пароли должны совпадать',
      userUniqueError: 'Такой пользователь уже существует',
      authorizationError: 'Неверные имя пользователя или пароль',
      unauthorizedError: 'Этот пользователь не авторизован',
      dataLoadingError: 'Ошибка загрузки данных',
      connectionError: 'Ошибка соединения',
    },
  },
}
