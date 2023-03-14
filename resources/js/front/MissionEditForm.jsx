import { useEffect, useState } from "react"
import axios from "axios";

export default function MissionEditForm({missionId, setMissionId}) {
    const [mission, setMission] = useState(null);

    const loadMission = async () => {
        try {
            let response = await axios.get(`api/missions/${missionId}`);
            setMission(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        loadMission()
    }, [])

    const handleChange = (e) => {
        setMission(previous_values => {
            return ({...previous_values, 
                [e.target.name]: e.target.value
            });
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post('api/missions/store', mission)
        } catch (error) {
            console.log(error)
        }
    }


    return mission ? <div>
            <button onClick={()=>setMissionId(null)}>&times;</button>
            <h1>Edit Mission #{mission.id}</h1>
            <form action='' method='post' onSubmit={handleSubmit}>
                <input name='name' type='text' value={mission.name} onChange={handleChange}/>
                <input name='year' type='number' value={mission.year} onChange={handleChange}/>
                <button>SAVE</button>
            </form>
        </div> : 'loading...'
}