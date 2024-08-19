import {createContext, createEffect, createSignal, onCleanup, onMount, useContext} from 'solid-js'
import {Outlet} from '@solidjs/router'
import {createStore} from "solid-js/store";
import {ContextMain} from "./ContextMain";

export const ContextClients = createContext()

export function ClientsContextProvider() {

    let dialogFilterClientsRef;
    let deBounceGetPageClientsTimer;
    let _clientsScrollerRef;

    const ctxMain = useContext(ContextMain)

    const [loadingClients, setLoadingClients] = createSignal(true)
    const [smallLoadingClients, setSmallLoadingClients] = createSignal(false)

    const [clients, setClients] = createStore([])
    const [clientsScrollPosition, setClientsScrollPosition] = createSignal(0)

    const [totalClients, setTotalClients] = createSignal(0)
    const [totalPages, setTotalPages] = createSignal(0)
    const [page, setPage] = createSignal(1)
    const [limit, setLimit] = createSignal(25)
    const [preventEffect, setPreventEffect] = createSignal(false)

    const [windowHeight, setWindowHeight] = createSignal()
    const [clientsInnerTableHeight, setClientsInnerTableHeight] = createSignal(200)

    const [pageCache, setPageCache] = createSignal(1)
    const [limitCache, setLimitCache] = createSignal(25)

    const [clientsWhere, setClientsWhere] = createSignal({})
    const [clientsWherePills, setClientsWherePills] = createSignal({})

    function fieldFilterKeyLookup(key) {
        let filterKey = {
            'client_id': 'Client ID',
            'business_name': 'Business Name',
            'any_name': 'Name',
            'any_email_address': 'Email Address',
            'any_number': 'Phone Number',
            'postcode': 'Postcode',
            'date_from': 'Date From',
            'date_to': 'Date To',
            'date_on': 'Date On'
        }
        return filterKey[key]
    }

    function buildWherePills() {

        const tempFieldNames = {}

        for (let [key, value] of Object.entries(ctxMain.clientsWhere())) {
            tempFieldNames[fieldFilterKeyLookup(key)] = value
        }

        setClientsWherePills(tempFieldNames)

    }

    function setFilter(args = {}) {

        if (args) {
            if (args.hasOwnProperty('clear')) {
                if (args.clear) {
                    setPage(1)
                    ctxMain.setClientsWhere({})
                }
            }

            if (args.hasOwnProperty('resetPage')) {
                if (args.resetPage) {
                    setPage(1)
                }
            }
        }

        buildWherePills()
        deBounceGetPageClients(200, page(), limit(), ctxMain.clientsWhere())

    }

    function changeLimit(value) {
        setPage(1)
        setLimit(value)
        setFilter()
    }

    function scrollToTop() {
        const el = document.getElementById('clients-scroller')
        if (el) {
            el.scrollTop = 0
        }
    }

    function deBounceGetPageClients(delay, page, limit, where) {
        setSmallLoadingClients(true)

        clearTimeout(deBounceGetPageClientsTimer)
        deBounceGetPageClientsTimer = setTimeout(() => {

            ctxMain.api.post('/clients/paged', {
                page: page,
                limit: limit,
                where: where
            }).then((res) => {
                if (res.ok) {
                    setTotalClients(res.data.total_clients)
                    setTotalPages(res.data.total_pages)
                    setClients(res.data.clients)
                    setSmallLoadingClients(false)
                    scrollToTop()
                    if (loadingClients()) {
                        setLoadingClients(false)
                    }
                } else {
                    setTotalClients(0)
                    setTotalPages(0)
                    setClients([])
                    setSmallLoadingClients(false)
                    if (loadingClients()) {
                        setLoadingClients(false)
                    }
                }
            })

        }, delay)
    }

    const windowResizeHandler = (_) => {
        setWindowHeight(window.innerHeight)
    };

    const clientsScrollerHandler = (e) => {
        setClientsScrollPosition(e.target.scrollTop)
    }

    function pageMountActions() {
        window.addEventListener('resize', windowResizeHandler);
        setWindowHeight(window.innerHeight)
        setClientsInnerTableHeight(windowHeight() - 150)

        deBounceGetPageClients(200, page(), limit(), ctxMain.clientsWhere())
        buildWherePills()
    }

    function setupTickerScrollerEvent(clientsScrollerRef) {
        _clientsScrollerRef = clientsScrollerRef
        if (clientsScrollPosition()) {
            _clientsScrollerRef.scrollTo(0, clientsScrollPosition())
        }
        _clientsScrollerRef.addEventListener('scroll', clientsScrollerHandler)
    }

    // DISPLAY WHERE HEIGHT
    createEffect(() => {
        setClientsInnerTableHeight(
            windowHeight() - 150 - (Object.keys(clientsWherePills()).length > 0 ? 45 : 0))
    })

    onCleanup(() => {
        window.removeEventListener('resize', windowResizeHandler);
        if (_clientsScrollerRef) {
            _clientsScrollerRef.removeEventListener('scroll', clientsScrollerHandler)
        }
    })

    return (
        <ContextClients.Provider value={
            {
                loadingClients: loadingClients,
                setLoadingClients: setLoadingClients,
                smallLoadingClients: smallLoadingClients,
                setSmallLoadingClients: setSmallLoadingClients,

                clients: clients,
                setClients: setClients,

                totalClients: totalClients,
                setTotalClients: setTotalClients,
                totalPages: totalPages,
                setTotalPages: setTotalPages,
                page: page,
                setPage: setPage,
                limit: limit,
                setLimit: setLimit,

                // Client Filtering
                clientsWhere: clientsWhere,
                setClientsWhere: setClientsWhere,

                clientsWherePills: clientsWherePills,
                setClientsWherePills: setClientsWherePills,

                windowHeight: windowHeight,
                setWindowHeight: setWindowHeight,
                clientsInnerTableHeight: clientsInnerTableHeight,
                setClientsInnerTableHeight: setClientsInnerTableHeight,
                setupTickerScrollerEvent: setupTickerScrollerEvent,
                clientsScrollPosition: clientsScrollPosition,

                setFilter: setFilter,
                deBounceGetPageClients: deBounceGetPageClients,
                changeLimit: changeLimit,
                pageMountActions: pageMountActions,

                dialogFilterClientsRef: dialogFilterClientsRef,
            }
        }><Outlet/>
        </ContextClients.Provider>
    )
}
