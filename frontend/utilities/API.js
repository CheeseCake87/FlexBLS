import {API_V1_URL, MODE} from "../globals";

export default class API {

    constructor(
        {
            navigator = null,
            apiUrl = API_V1_URL,
            sessionLoggedIn = null,
        } = {}
    ) {
        this.navigator = navigator;
        this.apiUrl = apiUrl;
        this.sessionLoggedIn = sessionLoggedIn;
    }

    async get(url, checkAuth = true) {

        if (MODE === 'D' || MODE === 'S' || import.meta.env.DEV) {
            console.log("GET", url)
        }

        if (checkAuth) {

            if (this.#checkSession("get", url)) {
                return await this.#do_get(url)
            } else {
                return {ok: false, message: 'Unauthorized', data: null}
            }

        }

        return await this.#do_get(url)

    }

    async post(url, data, checkAuth = true) {

        if (MODE === 'D' || MODE === 'S' || import.meta.env.DEV) {
            console.log("POST", url)
        }

        if (checkAuth) {

            if (this.#checkSession("post", url)) {
                return await this.#do_post(url, data)
            } else {
                return {ok: false, message: 'Unauthorized', data: null}
            }

        }

        return await this.#do_post(url, data)

    }

    #checkSession(method, url) {
        if (typeof this.sessionLoggedIn !== 'function') {
            if (MODE === 'D' || MODE === 'S' || import.meta.env.DEV) {
                console.log("SKIPPED - session is not a function - ", method, url)
            }
            return false
        }

        if (!this.sessionLoggedIn()) {
            if (MODE === 'D' || MODE === 'S' || import.meta.env.DEV) {
                console.log("SKIPPED - not logged in - ", method, url)
            }
            return false
        }

        return true
    }

    async #do_get(url) {
        const req = await fetch(this.apiUrl + url, {
            method: 'GET',
            credentials: 'include',
        })
        if (req.ok) {
            const json = await req.json()

            if (MODE === 'D' || MODE === 'S' || import.meta.env.DEV) {
                console.log("DO GET ",url)
                console.log("DO GET JSON ", json)
            }

            if (json.navigate) {
                console.log("DO GET NAVIGATE ", json.navigate)
                this.navigator(json.navigate)
            }

            return await json
        } else {
            throw new Error('System error. Please try again later.')
        }
    }

    async #do_post(url, data) {

        const req = await fetch(this.apiUrl + url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (req.ok) {
            const json = await req.json()

            if (MODE === 'D' || MODE === 'S' || import.meta.env.DEV) {
                console.log("DO POST ", url)
                console.log("DO POST DATA ", data)
                console.log("DO POST JSON ", json)
            }

            if (json.navigate) {
                console.log("DO POST NAVIGATE ", json.navigate)
                this.navigator(json.navigate)
            }

            return await json
        } else {
            throw new Error('System error. Please try again later.')
        }
    }

}
