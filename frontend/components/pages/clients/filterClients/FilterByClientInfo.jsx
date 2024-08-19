import {useContext} from "solid-js";
import {ContextMain} from "../../../../contextManagers/ContextMain";


export function FilterByClientInfo(props) {

    const ctxMain = useContext(ContextMain)

    return (

        <div className={'dialog-content-group'}>

            <div className={'section-filter-group'}>
                <div className={'inline-label flex-1'}>
                    <label>Client&nbsp;ID</label>
                    <input type="number"
                           value={
                               ctxMain.clientsWhere().client_id ? ctxMain.clientsWhere().client_id : ''
                           }
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.setClientsWhere({
                                       ...ctxMain.clientsWhere(),
                                       client_id: e.target.value !== '' ? parseInt(e.target.value) : ''
                                   })
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Business Name</label>
                    <input className={'flex-1'}
                           type="text"
                           value={
                               ctxMain.clientsWhere().business_name ? ctxMain.clientsWhere().business_name : ''
                           }
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.setClientsWhere({
                                       ...ctxMain.clientsWhere(),
                                       business_name: e.target.value
                                   })
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Name</label>
                    <input className={'flex-1'}
                           type="text"
                           value={
                               ctxMain.clientsWhere().any_name ? ctxMain.clientsWhere().any_name : ''
                           }
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.setClientsWhere({
                                       ...ctxMain.clientsWhere(),
                                       any_name: e.target.value
                                   })
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Email&nbsp;Address</label>
                    <input className={'flex-1'}
                           type="text"
                           value={
                               ctxMain.clientsWhere().email_address ? ctxMain.clientsWhere().email_address : ''
                           }
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.setClientsWhere({
                                       ...ctxMain.clientsWhere(),
                                       email_address: e.target.value
                                   })
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Phone&nbsp;Number</label>
                    <input className={'flex-1'}
                           type="text"
                           value={
                               ctxMain.clientsWhere().any_number ? ctxMain.clientsWhere().any_number : ''
                           }
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.setClientsWhere({
                                       ...ctxMain.clientsWhere(),
                                       any_number: e.target.value
                                   })
                               }
                           }}/>
                </div>

                <div className={'inline-label flex-1'}>
                    <label>Postcode</label>
                    <input className={'flex-1'}
                           type="text"
                           value={
                               ctxMain.clientsWhere().postcode ? ctxMain.clientsWhere().postcode : ''
                           }
                           onKeyUp={(e) => {
                               if (!props.keyDownHandler(e)) {
                                   ctxMain.setClientsWhere({
                                       ...ctxMain.clientsWhere(),
                                       postcode: e.target.value
                                   })
                               }
                           }}/>
                </div>
            </div>

        </div>

    )
}