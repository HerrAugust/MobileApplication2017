export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api/' : 'http://localhost:8080/mydogcare/api/';

export const URL = {
    USERS: {
        SIGNUP: "users/",
        LOGIN: "login/",
        LOGOUT: "logout/",
        UPDATE: "users/"
    },
    
    EVENTS: {
        TEST: "events/test",
        CREATE: "events/",
        GETALL: "events/",
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
    USER: "todolist_user"
}