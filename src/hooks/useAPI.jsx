import { useState } from "react"

export default function useAPI({
    apiMethod,
    successCallback = () => null,
    failedCallback = () => null,
    initialLoading = false,
}) {
    const [loading, setLoading] = useState(initialLoading)

    const startCallback = () => setLoading(true)
    const endCallback = () => setLoading(false)

    const request = async (apiData, urlParams) => {
        startCallback()
        try {
            const data = await apiMethod(apiData, urlParams)
            successCallback(data)
            return data
        } catch (e) {
            failedCallback(e)
            throw new Error(e)
        } finally {
            endCallback()
        }
    }


    return {
        pending: loading,
        request,
    }
}