import { useEffect, useRef } from 'react'
import vectorLeft from '../assets/img/vector-left.png'
import vectorRight from '../assets/img/vector-right.png'
import playspaceLogo from '../assets/img/playspace-logo.png'
import x from '../assets/img/x.png'
import companyLogo from '../assets/img/company-logo.png'


export function LoadingScreen({ useEffectFunc }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (sectionRef.current) {
                sectionRef.current.classList.add('fade')
                if (useEffectFunc) {
                    useEffectFunc()
                }
            }
        }, 2500)

    }, [])
    return (
        <section ref={sectionRef} className="loading-screen">
            <img className="vector vector1" src={vectorLeft} />
            <div className="content">
                <img className="playspace-logo" src={playspaceLogo} />
                <img className="x" src={x} />
                <img className="company-logo" src={companyLogo} />
            </div>
            <img className="vector vector2" src={vectorRight} />
        </section>
    )
}