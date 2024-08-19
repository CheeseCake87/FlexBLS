import {createContext, createEffect, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {ContextMain} from "./ContextMain";

export const ContextRejectAuth = createContext()

export function RejectAuthContextProvider() {

    const ctxMain = useContext(ContextMain)

    createEffect(() => {
        if (ctxMain.sessionLoggedIn()) {
            if (ctxMain.sessionLoaded()) {
                ctxMain.navigator('/')
            }
        }
    })

    return (
        <ContextRejectAuth.Provider value={{}}>
            <Outlet/>
        </ContextRejectAuth.Provider>
    )
}