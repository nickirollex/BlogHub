import {useEffect,useState} from 'react'
import axios from 'axios'

function useFetch(url) {
    const [Data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
     const fetchData = async ()=>{
        try {
            const res = await axios.get(url)
            setData(res.data)
            setLoading(false)
            setError(null)
        } catch (err) {
            setError(err.message)
            setLoading(false)
            setData(null)
        }
     }
     fetchData()
       
    },[url])

    return {Data,loading,error,setData}
}

export default useFetch
