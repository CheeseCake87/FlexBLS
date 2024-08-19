import {SpinnerSmall} from "../globals/Spinner";
import {Title} from "@solidjs/meta";
import {onMount} from "solid-js";


export default function Loading() {

    onMount(() => {
        document.title = 'Loading...'
    })

    return (
        <div className={'h-full w-full flex flex-col justify-center items-center'}>

            <h1>🤖</h1>
            <small><SpinnerSmall/> Loading...</small>
        </div>
    )
}