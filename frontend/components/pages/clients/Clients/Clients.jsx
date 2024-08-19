import {onMount, useContext} from "solid-js";
import {ContextClients} from "../../../../contextManagers/ContextClients";
import ClientsHeader from "./ClientsHeader";
import ClientsNoClients from "./ClientsNoClients";
import ClientsLoading from "./ClientsLoading";
import ClientsFilterPills from "./ClientsFilterPills";
import ClientsCards from "./ClientsCards";
import {ContextMain} from "../../../../contextManagers/ContextMain";

export default function Clients() {

    const ctxClients = useContext(ContextClients)
    const ctxMain = useContext(ContextMain)

    let clientsScrollerRef;

    onMount(() => {

        document.title = `Clients`

        if (ctxMain.sessionLoggedIn() && ctxClients.clientsScrollPosition() === 0) {
            ctxClients.pageMountActions()
        }
        ctxClients.setupTickerScrollerEvent(clientsScrollerRef)

    })

    return (
        <div className={'main-content-stretch'}>

            <ClientsHeader/>

            <ClientsFilterPills/>

            <div className={'cards-bg-wrapper'}>

                <div className={'cards'} ref={clientsScrollerRef} id={'clients-scroller'}>

                    {
                        ctxClients.loadingClients()
                            ? <ClientsLoading/>
                            : ctxClients.clients.length > 0
                                ? <ClientsCards/>
                                : <ClientsNoClients/>
                    }

                </div>

            </div>

        </div>
    )
}