import { useEffect, useState } from "react"
import axios from 'axios';

export default function StatusFilter({ selectedStatus, setSelectedStatus}) {
    const [statuses, setStatuses] = useState([]);

    const loadStatuses = async () => {
        try {
            let response = await axios.get('/api/statuses');
            setStatuses(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadStatuses()
    }, [])
    
    return (<div className="status-filter">
             {
                statuses.map(status => {
                    return <div
                                className={ 'status-filter__status' + (status.id == selectedStatus ? ' status-filter__status--selected' : '') }
                            >
                                <button onClick={()=>setSelectedStatus(status.id)}>
                                    { status.name }
                                </button>
                            </div>
                })
             }
            </div>)
}