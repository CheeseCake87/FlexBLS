import {onMount, useContext} from "solid-js";
import {ContextSystem} from "../../../contextManagers/ContextSystem";
import {ContextMain} from "../../../contextManagers/ContextMain";
import {Title} from "@solidjs/meta";

export default function SystemInformation() {

    const ctxMain = useContext(ContextMain)
    const ctxSystem = useContext(ContextSystem)

    onMount(() => {
        ctxMain.setMainMenuLocation('system')
        ctxSystem.setSystemSection('information')

        document.title = 'System Information'
    })

    return (
        <div>
            <h1 className={'m-0 pb-2'}>MorphBLS 🤖</h1>
            <p className={'font-bold'}>The Morph Business Logic System is designed to be a standardized
                template to use to build further business logic.</p>

            <p className={'pt-2'}>View the project on <a
                target={'_blank'}
                href="https://github.com/CheeseCake87/MorphBLS"
            >GitHub</a></p>
            <p className={'pt-2'}><small>Version: {ctxMain.systemVersion()}</small></p>
            <p><small>© 2024 David Carmichael, licensed under the MIT License.</small></p>
            <p><small>A copy of this license can be <a
                target={'_blank'}
                href="https://github.com/CheeseCake87/MorphBLS/blob/main/LICENSE"
            >found here</a></small></p>
        </div>
    )
}