import {MODE} from "../../../globals";
import {useContext} from "solid-js";
import {ContextMain} from "../../../contextManagers/ContextMain";

export default function VerificationCode() {

    const ctxMain = useContext(ContextMain)

    return (
        <div className={'login-background'}>
            <div className={'login-outer'}>
                <div className={'login-inner'}>

                    <form className={'flex flex-col gap-2'}
                          onSubmit={(e) => {
                              e.preventDefault()
                          }}>
                        <div className={'login-form-group'}>
                            <label htmlFor={'verification_code'} className={'select-none'}>
                                Verification Code:
                            </label>
                            <input className={'mb-2'}
                                   id={'verification_code'}
                                   type="text"
                                   name="verification_code"/>
                        </div>
                        <div className={'flex flex-col gap-1'}>
                            <input type="submit"
                                   className={'btn-confirm'}
                                   value="Verify"
                                   onClick={() => {
                                   }}/>
                        </div>
                    </form>

                </div>
                <div className={'text-sm text-center text-gray-500 p-2'}>
                    <p>FlexBLS {ctxMain.systemVersion()}{MODE}</p>
                </div>
            </div>
        </div>
    )
};
