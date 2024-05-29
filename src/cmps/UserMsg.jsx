

import { useEffect, useRef, useState } from "react"
import { eventBusService } from "../services/event-bus.service.js"

import x from "../assets/img/x.png"

export function UserMsg() {

    const [msg, setMsg] = useState()
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            // window.scrollTo({top: 0, behavior: 'smooth'});
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 1500)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return ''
    return (
        <section className={`user-msg ${msg.type}`}>
            <button onClick={closeMsg}>
                <img src={x} alt="" />
            </button>
            <span>{msg.txt}</span>
        </section>
    )
}
