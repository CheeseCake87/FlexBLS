import {createContext, createEffect, createSignal, onMount, useContext} from "solid-js";
import {Outlet, useParams} from "@solidjs/router";
import {ContextMain} from "./ContextMain";
import {ContextClients} from "./ContextClients";
import {createStore} from "solid-js/store";

export const ContextClient = createContext()

export function ClientContextProvider() {

    const ctxMain = useContext(ContextMain)
    const ctxClients = useContext(ContextClients)

    const params = useParams()

    const [savingClient, setSavingClient] = createSignal(false)
    const [showAddress, setShowAddress] = createSignal(false)
    const [client, setClient] = createSignal(
        {
            client_id: 0,
            first_name: '',
            last_name: '',
            business_name: '',
            phone: '',
            email_address: '',
            alt_phone: '',
            alt_email_address: '',
            phone_dnc: false,
            email_address_dnc: false,

            building_name: '',
            sub_building_name: '',
            building_number: '',
            sub_building_number: '',
            address_line_1: '',
            address_line_2: '',
            address_line_3: '',
            locality: '',
            town_or_city: '',
            county: '',
            district: '',
            postcode: '',
            country: '',

            __address: '',
            __added_by: '',
            __created: ''
        }
    )

    const [tickets, setTickets] = createStore([])
    const [totalTickets, setTotalTickets] = createSignal(0)
    const [totalPages, setTotalPages] = createSignal(0)
    const [page, setPage] = createSignal(1)

    const [pageCache, setPageCache] = createSignal(1)

    let deBounceGetPageTicketsTimer;
    let updateDebounceTimer;

    function pageTickets(page) {
        ctxMain.api.post('/workshop/paged', {
            page: page,
            limit: 5,
            where: {
                fk_client_id: params.client_id,
            }
        }).then((res) => {
            if (res.ok) {
                setTotalTickets(res.data.total_tickets)
                setTotalPages(res.data.total_pages)
                setTickets(res.data.tickets)
            } else {
                setTotalTickets(0)
                setTotalPages(0)
                setTickets([])
            }
        })
    }

    function deBounceGetPageTickets(delay, page) {
        clearTimeout(deBounceGetPageTicketsTimer)
        deBounceGetPageTicketsTimer = setTimeout(() => {
            pageTickets(page)
        }, delay)
    }

    function getClient() {
        ctxMain.api.get('/clients/get/' + params.client_id).then((res) => {
            if (res.ok) {
                setClient({
                    client_id: res.data.client_id,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    business_name: res.data.business_name,
                    phone: res.data.phone,
                    email_address: res.data.email_address,
                    alt_phone: res.data.alt_phone,
                    alt_email_address: res.data.alt_email_address,
                    phone_dnc: res.data.phone_dnc,
                    email_address_dnc: res.data.email_address_dnc,

                    building_name: res.data.building_name,
                    sub_building_name: res.data.sub_building_name,
                    building_number: res.data.building_number,
                    sub_building_number: res.data.sub_building_number,
                    address_line_1: res.data.address_line_1,
                    address_line_2: res.data.address_line_2,
                    address_line_3: res.data.address_line_3,
                    locality: res.data.locality,
                    town_or_city: res.data.town_or_city,
                    county: res.data.county,
                    district: res.data.district,
                    postcode: res.data.postcode,
                    country: res.data.country,

                    __address: res.data.__address,
                    __added_by: res.data.__added_by,
                    __created: res.data.__created
                })

                deBounceGetPageTickets(200, page())

            } else {
                ctxMain.showErrorToast('Client not found.')
                ctxMain.navigator('/clients')
            }
        })
    }

    function updateClient() {
        setSavingClient(true)
        if (updateDebounceTimer) {
            clearTimeout(updateDebounceTimer)
        }
        updateDebounceTimer = setTimeout(() => {
            ctxMain.api.post(
                '/clients/update/' + client().client_id,
                client()
            ).then((res) => {
                setSavingClient(false)
            })
        }, 500)
    }

    function deleteClient() {
        ctxMain.api.get('/clients/delete/' + params.client_id).then((res) => {
            if (res.ok) {
                ctxClients.deBounceGetPageClients(
                    200, ctxClients.page(), ctxClients.limit(), ctxClients.clientsWhere()
                )
                ctxMain.showSuccessToast('Client Deleted')
                ctxMain.navigator('/clients')
            }
        })
    }

    createEffect(() => {
        if (page() !== pageCache()) {
            setPageCache(page())
            deBounceGetPageTickets(200, page())
        }
    })

    onMount(() => {
        getClient()
    })

    return (
        <ContextClient.Provider value={{
            savingClient: savingClient,
            client: client,
            setClient: setClient,
            showAddress: showAddress,
            setShowAddress: setShowAddress,

            tickets: tickets,
            setTickets: setTickets,
            totalTickets: totalTickets,
            totalPages: totalPages,
            page: page,
            setPage: setPage,

            saveClient: updateClient,
            deleteClient: deleteClient,
            deBounceGetPageTickets: deBounceGetPageTickets
        }}>
            <Outlet/>
        </ContextClient.Provider>
    )
}