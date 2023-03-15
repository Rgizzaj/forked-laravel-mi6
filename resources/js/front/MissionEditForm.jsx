import { useEffect, useState } from "react"
import axios from "axios";
import { useParams, Link } from "react-router-dom";


export default function MissionEditForm({missionId, setMissionId}) {
    const [mission, setMission] = useState(null);
    const [message, setMessage] = useState(null);

    // get all dynamic parts of the URL
    const { id } = useParams();

    const loadMission = async () => {
        try {
            let response = await axios.get(`/api/missions/${id}`);
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

    const handleCheckbox = (e) => {
        setMission(previous_values => {
            return ({...previous_values,
                [e.target.name]: e.target.checked
            });
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post('/api/missions/store', mission)
            setMessage(response.data['message'])
        } catch (error) {
            console.log(error)
        }
    }


    return mission ? <div>
            <Link to="/missions">
                <button>&times;</button>
            </Link>
            <h1>Edit Mission #{mission.id}</h1>
            {
                message ?? ''
            }
            <form action='' method='post' onSubmit={handleSubmit}>
                <input name='name' type='text' value={mission.name} onChange={handleChange}/>
                <input name='year' type='number' value={mission.year} onChange={handleChange}/>
                <input type="checkbox" name="outcome" checked={ mission.outcome ? true : false} onChange={handleCheckbox}/>
                <button>SAVE</button>
            </form>
        </div> : 'loading...'
}