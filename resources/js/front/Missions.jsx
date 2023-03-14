import { useEffect, useState } from "react";
import axios from 'axios';
import MissionEditForm from "./MissionEditForm";

export default function Missions() {
    const [missions, setMissions] = useState([]);
    const [missionId, setMissionId] = useState(null);

    const loadMissions = async () => {
        try {
            let response = await axios.get('/api/missions');
            setMissions(response.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadMissions();
    }, [])

    return (
        <div className="missions-container">
            {
                missionId ?
                    <MissionEditForm missionId={missionId} setMissionId={setMissionId} />
                :
                    missions.map(mission => {
                        return  <div className="missions-container__mission">
                                    <p>Name: {mission.name}</p>
                                    <p>Year: {mission.year}</p>
                                    <p>Outcome: {mission.outcome !== null ? (mission.outcome == 1 ? 'Success' : 'Failure') : 'Unknown'}</p>
                                    <a href="#" onClick={()=>setMissionId(mission.id)}>EDIT</a>
                                    <hr/>
                                </div>
                    })
            }
        </div>
    );
}