import { useEffect } from "react"

export default function useScroll({
    lock = false
}) {
    useEffect(() => {
        lock ?
        lockScroll() :
        unlockScroll()
    }, [lock])

    const lockScroll = () => {
        document.body.style.overflow = 'hidden'
    }

    const unlockScroll = () => {
        document.body.style.overflow = 'unset'
    }

    return {
        lockScroll,
        unlockScroll
    }
}