

import { useEffect, useRef, useState } from "react"
import { eventBusService } from "../services/event-bus.service.js"

import x from "../assets/img/x.png"
import v from "../assets/img/v.png"

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
            // timeoutIdRef.current = setTimeout(closeMsg, 1500)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return ''
    return (
        <section className={`user-msg ${msg.type}`}>
            <span className="sign">
                {msg.type === 'success' && <img src={v} alt="" />}
                {msg.type === 'error' && <img src={x} alt="" />}
            </span>
            <span className="txt">{msg.txt}</span>
            <button className="next-btn" onClick={closeMsg}>
                continue
            </button>
        </section>
    )
}
