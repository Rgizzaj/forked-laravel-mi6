import PeopleOfInterest from "./PeopleOfInterest"
import Missions from "./Missions"

export default function Main({content}) {

    let component = '';

    switch (content) {
        case '':
            component = 'Welcome to MI6';
            break;

        case 'people-of-interest':
            component = <PeopleOfInterest />
            break;
        
        case 'missions':
            component = <Missions />
            break;

        default:
            break;
    }

    return (
        <main className="main">

            <div className="main__content">

                {component}

            </div>

        </main>
    )
}