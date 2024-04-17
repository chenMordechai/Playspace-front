import {useEffect} from 'react'

export function useEffectCloseModal(isScreenOpen,funcs){
    useEffect(() => {
        if (!isScreenOpen) {
            funcs.forEach(func => func(false))
        }
    }, [isScreenOpen])
}