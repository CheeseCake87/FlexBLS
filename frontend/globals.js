const MODE_LOOKUP = {
    'development': {
        'API_V1_URL': 'http://127.0.0.1:7070/api/v1',
        'API_WS_URL': 'ws://127.0.0.1:7072/',
        'mode': 'D'
    },
    // \/ Match the docker-compose file.
    'docker-staging': {
        'API_V1_URL': 'http://127.0.0.1:4020/api/v1',
        'API_WS_URL': 'ws://127.0.0.1:6020/',
        'mode': 'DS'
    },
    'docker-production': {
        // Used in Frontend fetch calls
        'API_V1_URL': `https://${import.meta.env.VITE_DOMAIN}/api/v1`,
        // Used in Frontend Websockets
        'API_WS_URL': `wss://${import.meta.env.VITE_DOMAIN}/--ws--`,
        'mode': ''
    }
}

export const API_V1_URL = MODE_LOOKUP[import.meta.env.MODE].API_V1_URL
export const API_WS_URL = MODE_LOOKUP[import.meta.env.MODE].API_WS_URL
export const MODE = MODE_LOOKUP[import.meta.env.MODE].mode

export const DEVICE_TYPES = [
    'All-in-One',
    'Desktop',
    'Laptop',
    'Tablet',
    'Phone',
    'Other'
]

export const STATUS_CODES = {
    1: {
        'name': 'Open',
        'style': {'background-color': '#114a06', 'color': '#ffffff'}
    },
    2: {
        'name': 'In Progress',
        'style': {'background-color': '#413ab8', 'color': '#ffffff'},
    },
    3: {
        'name': 'Waiting for Part(s)',
        'style': {'background-color': '#985408', 'color': '#ffffff'},
    },
    4: {
        'name': 'Waiting for Client',
        'style': {'background-color': '#741b78', 'color': '#ffffff'},
    },
    5: {
        'name': 'Ready for Pickup',
        'style': {'background-color': '#b1d3bf', 'color': '#232323'},
    },
    6: {
        'name': 'Completed',
        'style': {'background-color': '#ecc146', 'color': '#232323'},
    },
    7: {
        'name': 'Cancelled',
        'style': {'background-color': '#e44756', 'color': '#232323'},
    }
}

export const STATUS_CODES_ARRAY = Object.entries(STATUS_CODES).map(
    ([key, value]) => {
        return {code: parseInt(key), label: value.name};
    });

export const CATEGORY_CODES = {
    1: 'Drop-in',
    2: 'Remote',
    3: 'Callout',
    4: 'Multiple',
}

export const CATEGORY_CODES_ARRAY = Object.entries(CATEGORY_CODES).map(
    ([key, value]) => {
        return {code: parseInt(key), label: value};
    });