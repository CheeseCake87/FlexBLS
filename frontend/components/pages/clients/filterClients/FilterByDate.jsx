import {useContext} from "solid-js";
import {ContextMain} from "../../../../contextManagers/ContextMain";


export function FilterByDate(props) {

    const ctxMain = useContext(ContextMain)

    return (
        <div className={'dialog-content-group'}>
            <div className={'section-filter-group'}>
                <small className={'font-bold'}>Specific</small>
                <div className={'pt-1 pb-2'}>
                    <div className={'inline-label flex-1'}>
                        <label>Date</label>
                        <div className={'inline-button w-full'}>
                            <input type="date"
                                   className={''}
                                   value={
                                       ctxMain.clientsWhere().date_on ? ctxMain.clientsWhere().date_on : ''
                                   }
                                   onChange={(e) => {
                                       if (!props.keyDownHandler(e)) {

                                           const temp = ctxMain.clientsWhere()

                                           if (temp.hasOwnProperty("date_from")) {
                                               delete temp.date_from
                                           }
                                           if (temp.hasOwnProperty("date_to")) {
                                               delete temp.date_to
                                           }

                                           ctxMain.setClientsWhere({
                                               ...temp,
                                               date_on: e.target.value
                                           })

                                       }
                                   }}/>
                            <button className={'btn'} onClick={(e) => {
                                e.preventDefault()
                                const temp = ctxMain.clientsWhere()
                                if (temp.hasOwnProperty("date_on")) {
                                    delete temp.date_on
                                    ctxMain.setClientsWhere(temp)
                                }
                            }}>
                                clear
                            </button>
                        </div>
                    </div>
                </div>
                <small className={'font-bold'}>Range</small>
                <div className={'flex flex-col gap-1 pt-1 pb-2'}>
                    <div className={'inline-label flex-1'}>
                        <label>From</label>
                        <div className={'inline-button w-full'}>
                            <input type="date"
                                   value={
                                       ctxMain.clientsWhere().date_from ? ctxMain.clientsWhere().date_from : ''
                                   }
                                   onChange={(e) => {
                                       if (!props.keyDownHandler(e)) {

                                           const temp = ctxMain.clientsWhere()

                                           if (temp.hasOwnProperty("date_on")) {
                                               delete temp.date_on
                                           }

                                           ctxMain.setClientsWhere({
                                               ...temp,
                                               date_from: e.target.value
                                           })

                                       }
                                   }}/>
                            <button className={'btn'} onClick={(e) => {
                                e.preventDefault()

                                const temp = ctxMain.clientsWhere()

                                if (temp.hasOwnProperty("date_from")) {
                                    delete temp.date_from
                                    ctxMain.setClientsWhere(temp)
                                }

                            }}>
                                clear
                            </button>
                        </div>
                    </div>
                    <div className={'inline-label flex-1'}>
                        <label>To</label>
                        <div className={'inline-button w-full'}>
                            <input type="date"
                                   value={
                                       ctxMain.clientsWhere().date_to ? ctxMain.clientsWhere().date_to : ''
                                   }
                                   onChange={(e) => {

                                       const temp = ctxMain.clientsWhere()

                                       if (temp.hasOwnProperty("date_on")) {
                                           delete temp.date_on
                                       }

                                       ctxMain.setClientsWhere({
                                           ...temp,
                                           date_to: e.target.value
                                       })

                                   }}/>
                            <button className={'btn'} onClick={(e) => {
                                e.preventDefault()

                                const temp = ctxMain.clientsWhere()

                                if (temp.hasOwnProperty("date_to")) {
                                    delete temp.date_to
                                    ctxMain.setClientsWhere(temp)
                                }

                            }}>
                                clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}