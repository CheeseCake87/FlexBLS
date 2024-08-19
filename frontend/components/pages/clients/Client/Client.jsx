import {onMount, useContext} from "solid-js";
import {ContextClient} from "../../../../contextManagers/ContextClient";
import StatusPills from "./StatusPills";
import ClientData from "./ClientData";
import {A, useParams} from "@solidjs/router";
import {PrevPageIcon} from "../../../globals/Icons";


export default function Client() {

    const ctxClient = useContext(ContextClient)

    const params = useParams()

    let dialogDeleteClientsRef;

    const client_id = params.client_id

    onMount(() => {
        document.title = `Client: ${client_id}`
    })

    return (
        <div className={'main-content-slim gap-2'}>

            <A href={'/clients'}
               className={'flex items-center pb-1'}>
                <PrevPageIcon/>
                Back
            </A>

            <div className={'sectioned-content w-full'}>

                <ClientData/>
                <StatusPills/>

            </div>

            <div className={'sectioned-content w-full'}>
                <button className={'btn-danger'} onClick={() => {
                    dialogDeleteClientsRef.showModal()
                }}>
                    Delete Client
                </button>
            </div>

            <dialog className={'dialog'} ref={dialogDeleteClientsRef}>
                <div className={'dialog-content text-center'} style={{height: '100px'}}>
                    <p>Are you sure you would like to delete this client?</p>
                    <p>Please note that this action is irreversible.</p>
                </div>
                <div className={'dialog-footer'}>
                    <button className={'btn'} onClick={() => {
                        dialogDeleteClientsRef.close()
                    }}>
                        Cancel
                    </button>
                    <button className={'btn-danger'} onClick={() => {
                        ctxClient.deleteClient()
                    }}>
                        Confirm Delete
                    </button>
                </div>
            </dialog>

        </div>
    )
}