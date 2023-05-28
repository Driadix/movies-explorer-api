const URL_REGEX = /^https?:\/\/(w{3}.)?[\w\-._~:/?#[\]@!$&'()*+,;=]*.[\w\-._~:/?#[\]@!$&'()*+,;=]*[$#]?/i;

const errorsMessages = {
  EmailExists: 'Данный Email уже существует',
  InvalidCredentials: 'Неправильные почта или пароль',
  NoAuth: 'Необходимо авторизоваться',
  NoPermission: 'Нет разрешения на совершение действия',
  NoUser: 'Пользователь не найден',
  NoMovie: 'Фильм не найден',
  NotFound: 'Страница не найдена',
  DefaultError: 'Произошла серверная ошибка',
};

module.exports = { URL_REGEX, errorsMessages };
