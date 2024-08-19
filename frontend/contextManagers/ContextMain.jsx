import {createContext, createEffect, createResource, createSignal} from 'solid-js'
import {Outlet, useLocation, useNavigate} from '@solidjs/router'
import {MainMenu} from "../components/menus/MainMenu";
import ToastBar from "../components/globals/ToastBar";
import {API_V1_URL, CATEGORY_CODES, STATUS_CODES} from "../globals";
import API from "../utilities/API";
import SavingToastBar from "../components/globals/SavingToastBar";
import Loading from "../components/pages/Loading";


export const ContextMain = createContext()

export function MainContextProvider(props) {

    const navigator = useNavigate()
    const location = useLocation()

    const [session] = createResource(
        async () => await fetch(
            `${API_V1_URL}/system/auth/session`, {
                method: 'GET',
                credentials: 'include',
            }
        ).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return {ok: false, message: 'Unauthorized', data: null}
            }
        })
    )

    const [sessionLoaded, setSessionLoaded] = createSignal(false)
    // SESSION VALUES
    const [sessionLoggedIn, setSessionLoggedIn] = createSignal(false)
    const [sessionUserId, setSessionUserId] = createSignal(0)
    const [sessionUserType, setSessionUserType] = createSignal(null)
    const [sessionDisplayName, setSessionDisplayName] = createSignal(null)
    const [sessionPrivateKey, setSessionPrivateKey] = createSignal(null)
    // END SESSION VALUES

    const [enabledServices, setEnabledServices] = createSignal([])
    const [systemVersion, setSystemVersion] = createSignal('')

    const api = new API(
        {
            navigator: navigator,
            location: location,
            apiUrl: API_V1_URL,
            sessionLoggedIn: sessionLoggedIn,
        }
    )

    // TOAST BAR
    const [toastBarType, setToastBarType] = createSignal('success')
    const [toastBarMessage, setToastBarMessage] = createSignal('')
    const [showSavingToastBar, setShowSavingToastBar] = createSignal('')

    // MAIN MENU
    const [iconSize, setIconSize] = createSignal(24)
    const [showMainMenu, setShowMainMenu] = createSignal(true)
    const [mainMenuLocation, setMainMenuLocation] = createSignal('workshop')

    // ACTIVE USERS
    const [activeUsers, setActiveUsers] = createSignal([])

    const [workshopScrollPos, setWorkshopScrollPos] = createSignal(0)

    // Where Values
    const [ticketsWhere, setTicketsWhere] = createSignal({})
    const [clientsWhere, setClientsWhere] = createSignal({})


    function clearSession() {
        setSessionLoggedIn(false)
        setSessionUserId(0)
        setSessionUserType(null)
        setSessionDisplayName(null)
        setSessionPrivateKey(null)
    }

    function setSession(session) {
        setSessionLoggedIn(session.logged_in)
        setSessionUserId(session.user_id)
        setSessionUserType(session.user_type)
        setSessionDisplayName(session.display_name)
        setSessionPrivateKey(session.private_key)
    }

    function statusCodeLookup(statusCode) {
        return STATUS_CODES[statusCode]
    }

    function categoryCodeLookup(categoryCode) {
        return CATEGORY_CODES[categoryCode]
    }

    function showSuccessToast(message) {
        setToastBarType('success')
        setToastBarMessage(message)
    }

    function showErrorToast(message) {
        setToastBarType('error')
        setToastBarMessage(message)
    }

    function login(username, password, setPassword) {
        api.post('/system/auth/login', {
            username: username(),
            password: password(),
        }, false).then((res) => {
            if (res.ok) {
                setSession(res.data.session)
            } else {
                setPassword('')
                showErrorToast(res.message)
            }
        })
    }

    function logout() {
        api.get('/system/auth/logout', false).then((res) => {
            if (res.ok) {
                clearSession()
                navigator('/logout')
            }
        })
    }

    function getAllActiveUsers() {
        api.get('/system/get/active/users').then((res) => {
            if (res.ok) {
                setActiveUsers(res.data)
            } else {
                showErrorToast('Error fetching users. ' + res.message)
            }
        })
    }

    createEffect(() => {
        if (!session.loading) {
            if (!session().ok) {
                clearSession()
                setSessionLoaded(true)
                return
            }
            if (!session().data.system_setup) {
                navigator('/install')
                return
            }
            setSession(session().data.session)
            setSystemVersion(session().data.system_version)
            setEnabledServices(session().data.system_services)
            setSessionLoaded(true)
        }
    })

    return (
        <ContextMain.Provider value={
            {
                api: api,
                session: session,

                systemVersion: systemVersion,

                showMainMenu: showMainMenu,
                setShowMainMenu: setShowMainMenu,

                navigator: navigator,
                location: location,
                enabledServices: enabledServices,
                setEnabledServices: setEnabledServices,
                iconSize: iconSize,
                setIconSize: setIconSize,

                // Session
                sessionLoaded: sessionLoaded,
                sessionLoggedIn: sessionLoggedIn,
                sessionUserId: sessionUserId,
                sessionUserType: sessionUserType,
                sessionDisplayName: sessionDisplayName,
                sessionPrivateKey: sessionPrivateKey,

                clearSession: clearSession,

                // Toast Bar
                showSavingToastBar: showSavingToastBar,
                setShowSavingToastBar: setShowSavingToastBar,
                toastBarType: toastBarType,
                setToastBarType: setToastBarType,
                toastBarMessage: toastBarMessage,
                setToastBarMessage: setToastBarMessage,

                mainMenuLocation: mainMenuLocation,
                setMainMenuLocation: setMainMenuLocation,

                activeUsers: activeUsers,

                // Where
                ticketsWhere: ticketsWhere,
                setTicketsWhere: setTicketsWhere,
                clientsWhere: clientsWhere,
                setClientsWhere: setClientsWhere,

                // Scrolling
                workshopScrollPos: workshopScrollPos,
                setWorkshopScrollPos: setWorkshopScrollPos,

                login: login,
                logout: logout,

                showSuccessToast: showSuccessToast,
                showErrorToast: showErrorToast,

                statusCodeLookup: statusCodeLookup,
                categoryCodeLookup: categoryCodeLookup,
                getAllActiveUsers: getAllActiveUsers,

            }
        }>{session.loading ?
            <div className={'main-container'}>
                <Loading/>
            </div> :
            sessionLoggedIn() ?
                <div className={'main-container'}>
                    <SavingToastBar/>
                    <ToastBar/>
                    <MainMenu/>
                    <Outlet/>
                </div>
                : <>
                    <ToastBar/>
                    <Outlet/>
                </>}
        </ContextMain.Provider>
    )
}
