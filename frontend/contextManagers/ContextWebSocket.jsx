import {createContext, createEffect, createSignal, onCleanup, useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import {API_WS_URL} from "../globals";
import {ContextMain} from "./ContextMain";

export const ContextWebSocket = createContext()

export function WebSocketContextProvider() {

    const ctxMain = useContext(ContextMain)
    const [ws, setWs] = createSignal()

    function connectWebSocket() {
        const websocket = new WebSocket(API_WS_URL)

        websocket.addEventListener('open', (event) => {
            console.log("Connected to the ws server")
            console.log(ctxMain.sessionLoggedIn())
            if (ctxMain.sessionLoggedIn()) {
                authenticateWs(websocket)
            }
        });

        websocket.addEventListener('message', (event) => {
            console.log('Message from server ', event.data);
            let data = {};
            try {
                data = JSON.parse(event.data)
            } catch (e) {
                console.log(e)
            }

            if (data.action === 'alert') {
                ctxMain.showSuccessToast(data.data.message)
            }

            if (data.action === 'disconnect') {
                ctxMain.logout()
                websocket.close()
            }
        })

        websocket.addEventListener('close', (event) => {
            console.log('Connection closed ', event.code);

            console.log("Attempting to reconnect in 1 sec")

            setTimeout(() => {
                if (ctxMain.sessionLoggedIn()) {
                    // connectWebSocket()
                }
            }, 1000)

        })

        return websocket
    }

    function authenticateWs(websocket) {

        try {
            websocket.send(JSON.stringify({
                action: 'authenticate',
                token: ctxMain.sessionPrivateKey(),
                data: {
                    "wsid": ctxMain.sessionUserId(),
                }
            }))
        } catch (e) {
            console.log(e)
        }

    }

    onCleanup(() => {
        if (ws()) {
            ws().close()
        }
    })

    // close the websocket connection when the user logs out
    createEffect(() => {

        if (ctxMain.sessionLoggedIn()) {
            if (!ws()) {
                // setWs(connectWebSocket())
            }
        }

        if (!ctxMain.sessionLoggedIn()) {
            if (ctxMain.location.pathname !== '/login') {
                if (ws()) {
                    try {
                        ws().close()
                    } catch (e) {
                        // ignore
                    }
                }
            }
        }

    })

    return (
        <ContextWebSocket.Provider value={{
            ws: ws,
        }}>
            <Outlet/>
        </ContextWebSocket.Provider>
    )
}