

import { useEffect, useRef, useState } from "react"
import { eventBusService } from "../services/event-bus.service.js"

import x from "../assets/img/x.png"
import v from "../assets/img/v.png"

export function UserMsg() {

    const [txt, setTxt] = useState()
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (txt) => {
            setTxt(txt)
            // window.scrollTo({top: 0, behavior: 'smooth'});
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 2000)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        // if (txt.func) txt.func()
        setTxt(null)
    }

    if (!txt) return ''
    return (
        <section className="user-msg">
            <span className="txt">{txt}</span>
        </section>
    )
}
