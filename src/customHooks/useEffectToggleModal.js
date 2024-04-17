import {useEffect} from 'react'


export function useEffectToggleModal(onOpenScreen,onCloseScreen,dependencies){

    useEffect(() => {
        if (dependencies.some(d=>d)) {
        // if (openPreferenceModal || openChangeImgModal || openFollowingModal || openShowImgModal) {
            onOpenScreen()
        } else {
            onCloseScreen()
        }

        return () => {
            onCloseScreen()
        }

    }, dependencies)

}