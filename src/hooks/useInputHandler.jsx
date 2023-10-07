import { useEffect, useRef, useState } from "react"

export default function useInput( defaultValue = '' ) {
    const inputRef = useRef()

    const [value, setValue] = useState(defaultValue)

    const [target, setTarget] = useState(null)

    const handleChange = (e) => {
        setTarget(e?.target)
        setValue(e?.target?.value ?? e)
    }

    const clear = () => {
        setValue('')
        if (target) target.value = ''
    }
    const focus = () => inputRef.current?.focus()

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    return {
        clear,
        focus,
        value,
        setValue,
        ref: inputRef,
        onChange: handleChange
    }
}