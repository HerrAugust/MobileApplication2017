export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api/' : 'http://localhost/mydogcare/api/';

export const URL = {
    USERS: {
        SIGNUP: "users/",
        LOGIN: "login/",
        LOGOUT: "logout/",
        UPDATE: "users/"
    },
    DOGS: {
        ALL: "dogs/all/",
        DOGREGISTRATION: "dogs/registration/",
    },
    EVENTS: {
        TEST: "events/test",
        CREATE: "events/",
        GETALL: "events/",
        GETALL_BYDOG: "events/dog/",
        GETALL_BYDATE: "events/date/",
        GET: "events/",
        EDIT: "events/",
        DELETE: "events/",
        TOGGLESTAR: "events/starred/"
    },

    DISEASES: {
        GETALL: "diseases/"
    },

    TASKS: {
        TEST: "events/test",
        CREATE: "events/",
        GETALL: "events/",
        GET: "events/",
        EDIT: "events/",
        DELETE: "events/",
        ORDER: "events/starred/"
    }
}

export const STORAGE_KEYS = {
    USER: "mydogcare_user"
}
