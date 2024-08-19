import {Show, useContext} from "solid-js";
import {ClientIcon, HideMainMenu, LogoutIcon, SettingsIcon, ShowMainMenu, UserIcon} from "../globals/Icons";
import {ContextMain} from "../../contextManagers/ContextMain";
import {A} from "@solidjs/router";


export function MainMenu() {

    const ctxMain = useContext(ContextMain)

    return (
        <div className={'main-menu'} style={{
            width: ctxMain.showMainMenu()
                ? '250px' : `${ctxMain.iconSize() + 55}px`
        }}>
            <div>

                <A href='/clients'
                   activeClass="main-menu-icon-active" inactiveClass="main-menu-icon">
                    <ClientIcon size={ctxMain.iconSize()}/>
                    <Show when={ctxMain.showMainMenu()}>
                        <p>Clients</p>
                    </Show>
                </A>

            </div>

            <div>

                <A href='/account'
                   activeClass="main-menu-icon-active" inactiveClass="main-menu-icon">
                    <UserIcon size={ctxMain.iconSize()}/>
                    <Show when={ctxMain.showMainMenu()}>
                        <p>Account</p>
                    </Show>
                </A>

                <A href='/system'
                   activeClass="main-menu-icon-active" inactiveClass="main-menu-icon">
                    <SettingsIcon size={ctxMain.iconSize()}/>
                    <Show when={ctxMain.showMainMenu()}>
                        <p>System</p>
                    </Show>
                </A>

                <Show when={ctxMain.showMainMenu()} fallback={
                    <div className={'main-menu-icon'}
                         onClick={() => {
                             ctxMain.setShowMainMenu(true)
                         }}>
                        <ShowMainMenu size={ctxMain.iconSize()}/>
                    </div>
                }>
                    <div className={'main-menu-icon'}
                         onClick={() => {
                             ctxMain.setShowMainMenu(false)
                         }}>
                        <HideMainMenu size={ctxMain.iconSize()}/>
                        <p>Hide&nbsp;Menu</p>
                    </div>
                </Show>

                <div className={'main-menu-icon'}
                     onClick={() => ctxMain.logout()}>
                    <LogoutIcon size={ctxMain.iconSize()}/>
                    <Show when={ctxMain.showMainMenu()}>
                        <p>Logout</p>
                    </Show>
                </div>
            </div>
        </div>
    )
}
