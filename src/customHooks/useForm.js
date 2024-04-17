import {useState} from 'react'

export function useForm(initialVal){
    const [fields, setFields] = useState(initialVal)

    function handleChange(ev) {
        let { value, name:field } = ev.target
        setFields(prevFields => ({ ...prevFields, [field]: value }))
    }

    return [fields,setFields,handleChange]
}