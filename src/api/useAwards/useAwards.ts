import {useEffect, useState} from "react";
import {Quries} from "@/api/quries.ts";

const useAwards = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                console.log("Запрос наград...");  // Лог перед запросом
                const response = await fetch(Quries.API.AWARDS.GET_ALL)
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                const data = await response.json();
                console.log("Полученные награды:", data);
                setAwards(data)
            } catch {
                setError('Erroeqr to load awards')
            }finally {
                setLoading(false)
            }
        }
        fetchAwards()
    }, []);


    return {awards, loading, error};
};

export default useAwards;
