const HttpCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUEST: 429,
    INTERNAL_SERVER_ERROR: 500,
};

const Operations = {
    REGISTERED: "Registrovan",
    LOGIN: "Přihlášen",
    LOGOUT: "Odhlášen",
};

const Processes = {
    GET: "Přijaté",
    PUT: "Aktualizováno",
    POST: "Vytvořeno",
    DELETE: "Smazáno",
};

const Messages = {
    AGAIN: "Zkus to znovu!",
    LOGIN_EMAIL_WRONG: "Uživatelské jméno nebo heslo je špatné!",
    LOGIN_EMAIL_USED: "Heslo nebo uživatelské jméno se již používá!",
    BAD_DATA_REQUEST: "Opakujte zadání!",
    NOT_FOUND_MESSAGE: "Nenalezeno!",
    CHANGE_PASS: "Heslo aktualizováno",
    CHANGE_USER_PROFILE: "Profil aktualizován",
    DELETE_PROFILE: "Profil smazán",
    STAFF_ID_USED: "Záznam pracovníka s tímto ID již existuje!",
};

const Statuses = {
    ERROR: "Chyba",
    SUCCESS: "Úspěch",
};

module.exports = { HttpCode, Operations, Processes, Messages, Statuses };
