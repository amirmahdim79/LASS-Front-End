import { useState } from "react"

export const useModal = (onCloseCallback = () => {}) => {
    const [open, setOpen] = useState(false)

    const closeModal = () => {
        setOpen(false)
        onCloseCallback()
    }

    const show = () => {
        setOpen(true)
    }
    
    const close = () => {
        closeModal()
    }

    return [open, show, close]
}