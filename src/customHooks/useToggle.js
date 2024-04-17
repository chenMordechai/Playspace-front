import { useState } from "react";

export function useToggle(initialVal = false) {
    const [isOn, setIsOn] = useState(initialVal)

    function onToggle(isOn) {
        if (typeof isOn === 'boolean') setIsOn(isOn)
        else setIsOn(prev => !prev)
    }

    return [isOn, onToggle]
} 