import {createEffect, createSignal, Show, useContext} from "solid-js";
import {ContextMain} from "../../contextManagers/ContextMain";
import {SpinnerSmall} from "./Spinner";
import {ConfirmedIcon} from "./Icons";

export default function SavingToastBar(props) {
    const ctxMain = useContext(ContextMain)

    const [showToastBar, setShowToastBar] = createSignal(false)
    const [savingToastBarFadeIn, setSavingToastBarFadeIn] = createSignal(false)

    const [saving, setSaving] = createSignal(false)
    const [saved, setSaved] = createSignal(false)

    let savingToastBarTimeout = null
    let savingToastBarTimeoutFadeOut = null

    createEffect(() => {
        if (ctxMain.showSavingToastBar() !== '') {
            setShowToastBar(true)
            setSavingToastBarFadeIn(true)

            if (ctxMain.showSavingToastBar() === 'saving') {
                // This will keep showing the saving message
                // until showSavingToastBar() is set to 'saved'
                setSaving(true)
                setSaved(false)
            }

            if (ctxMain.showSavingToastBar() === 'saved') {
                setSaving(false)
                setSaved(true)

                clearTimeout(savingToastBarTimeoutFadeOut)
                savingToastBarTimeoutFadeOut = setTimeout(() => {

                    // Run this after timeoutVal() has passed

                    // This sets the element to fade out
                    setSavingToastBarFadeIn(false)
                    clearTimeout(savingToastBarTimeout)
                    savingToastBarTimeout = setTimeout(() => {
                        ctxMain.setShowSavingToastBar('')
                    }, 200) // This time matches the fade-out time in the CSS

                }, 500)
            }

        } else {
            setShowToastBar(false)
            clearTimeout(savingToastBarTimeoutFadeOut)
        }
    })

    return (
        <>
            <Show when={showToastBar()}>
                <div className={savingToastBarFadeIn() ? 'toast-bar-fade-in' : 'toast-bar-fade-out'}
                     onClick={
                         () => {
                             clearTimeout(savingToastBarTimeoutFadeOut)
                             setShowToastBar(false)
                         }
                     }>
                    <div className={'flex gap-2'}>
                        <div className={'flex flex-row gap-2 items-center px-4'}>
                            <Show when={saving()}>
                                <SpinnerSmall/> Saving...
                            </Show>
                            <Show when={saved()}>
                                <ConfirmedIcon/> Saved
                            </Show>
                        </div>
                    </div>
                </div>
            </Show>
        </>
    )
}