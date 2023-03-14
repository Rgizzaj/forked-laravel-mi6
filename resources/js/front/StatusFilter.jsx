import { useEffect, useState } from "react"

export default function StatusFilter({ selectedStatus, setSelectedStatus}) {
    const [statuses, setStatuses] = useState([]);

    const loadStatuses = async () => {
        let response = await fetch('/api/statuses')
        let data = await response.json();

        console.log(data);
        setStatuses(data);
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