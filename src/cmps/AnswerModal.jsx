

import { useEffect, useRef, useState } from "react"
import { eventBusService } from "../services/event-bus.service.js"

// import x from "../assets/img/x.png"
// import v from "../assets/img/v.png"
import x from "../assets/img/circle-x.png"
import v from "../assets/img/circle-v.png"

export function AnswerModal() {

    const [data, setData] = useState()
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-answer-msg', (data) => {
            setData(data)
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
        if (data.func) data.func()
        setData(null)
    }

    if (!data) return ''
    return (
        <section className={`answer-modal ${data.type}`}>
            <span className="sign">
                {data.type === 'success' && <img src={v} alt="" />}
                {data.type === 'error' && <img src={x} alt="" />}
            </span>
            <span className="txt">{data.txt}</span>
            <button className="next-btn" onClick={closeMsg}>
                continue
            </button>
        </section>
    )
}
