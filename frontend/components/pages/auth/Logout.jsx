import {onMount, useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";

export default function Logout() {

    const ctxMain = useContext(ContextMain)

    onMount(() => {

        document.title = 'Logout'

        ctxMain.api.get('/system/auth/logout', false).then((res) => {
            if (res.ok) {
                ctxMain.clearSession()
                setTimeout(() => {
                    ctxMain.navigator('/login')
                }, 1)
            }
        }).then(() => {
            ctxMain.setToastBarMessage('Logged out')
        })
    })

    return (<p>logout</p>)
};
