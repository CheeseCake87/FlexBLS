/* @refresh reload */
import {render} from 'solid-js/web'
import {Navigate, Route, Router, Routes} from '@solidjs/router'
import Login from './components/pages/auth/Login'
import {ClientsContextProvider} from "./contextManagers/ContextClients";
import Clients from "./components/pages/clients/Clients/Clients";
import {MainContextProvider} from "./contextManagers/ContextMain";
import {SystemContextProvider} from "./contextManagers/ContextSystem";
import {AccountContextProvider} from "./contextManagers/ContextAccount";
import Account from "./components/pages/account/Account";
import {ClientAddContextProvider} from "./contextManagers/ContextClientAdd";
import ClientAdd from "./components/pages/clients/ClientAdd/ClientAdd";
import Client from "./components/pages/clients/Client/Client";
import {ClientContextProvider} from "./contextManagers/ContextClient";
import Installer from "./components/pages/installer/Installer";
import SystemInformation from "./components/pages/system/SystemInformation";
import SystemUsers from "./components/pages/system/SystemUsers";
import SystemServices from "./components/pages/system/SystemServices";
import {RequireAuthContextProvider} from "./contextManagers/ContextRequireAuth";
import SystemLogs from "./components/pages/system/SystemLogs";
import {WebSocketContextProvider} from "./contextManagers/ContextWebSocket";
import {RejectAuthContextProvider} from "./contextManagers/ContextRejectAuth";
import {MetaProvider} from "@solidjs/meta";
import Logout from "./components/pages/auth/Logout";

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error('Root element not found. Did you forget ' +
        'to add it to your index.html? Or maybe the id attribute got misspelled?')
}


render(() => (
        <MetaProvider>
            <Router>
                <Routes>

                    <Route path="" component={MainContextProvider}>

                        <Route path="/install" component={Installer}/>

                        <Route path="" component={WebSocketContextProvider}>

                            <Route path="" component={RejectAuthContextProvider}>
                                <Route path="/login" component={Login}/>
                                <Route path={"/logout"} component={Logout}/>
                            </Route>

                            <Route path="" component={RequireAuthContextProvider}>

                                <Route path="/" component={() => <Navigate href={'/clients'}/>}/>

                                <Route path="" component={ClientsContextProvider}>
                                    <Route path="/clients">
                                        <Route path="/" component={Clients}/>
                                        <Route path="" component={ClientAddContextProvider}>
                                            <Route path="/add" component={ClientAdd}/>
                                        </Route>
                                        <Route path="" component={ClientContextProvider}>
                                            <Route path="/:client_id" component={Client}/>
                                        </Route>
                                    </Route>
                                </Route>

                                <Route path="/system" component={SystemContextProvider}>
                                    <Route path="/" component={() => <Navigate href={'/system/information'}/>}/>
                                    <Route path="/information" component={SystemInformation}/>
                                    <Route path="/users" component={SystemUsers}/>
                                    <Route path="/services" component={SystemServices}/>
                                    <Route path="/logs" component={SystemLogs}/>
                                </Route>

                                <Route path="" component={AccountContextProvider}>
                                    <Route path="/account" component={Account}/>
                                </Route>

                            </Route>

                        </Route>

                    </Route>

                    <Route path={"*"} element={
                        <div className={'flex justify-center align-middle w-full'}>
                            <div className={'text-center'}>
                                <h1>🤖</h1>
                                <h1>404</h1>
                                <p>Page not found.</p>
                            </div>
                        </div>
                    }/>

                </Routes>
            </Router>
        </MetaProvider>
    ),
    root
)
