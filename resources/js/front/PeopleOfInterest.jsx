import { useEffect, useState } from "react"
import PeopleList from "./PeopleList";
import Pagination from "./Pagination";
import './PeopleOfInterest.scss';

export default function PeopleOfInterest() {

    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState([]);
    const [total, setTotal] = useState(0);
    const [lastPageNr, setLastPageNr] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const loadPeople = async () => {
        let url = `/api/people?page=${page}`;

        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        setLoading(true);

        const response = await fetch(url);

        setLoading(false);

        const data = await response.json();

        setPeople(data.people);
        setTotal(data.total);
        setLastPageNr(data.last_page);
    }

    useEffect(() => {
        loadPeople();
    }, [page, search]);

    useEffect(() => {
        setPage(1);
    }, [search])

    return (
        <div className="people-of-interest">

            <h1>People of interest</h1>

            <div className="people-of-interest__search">
                <label htmlFor="">Search by name:</label>
                <input
                    type="text"
                    value={ search }
                    onChange={ (event) => setSearch(event.target.value) }
                />
            </div>

            <div className="people-of-interest__status">

                <div className="people-of-interest__total">
                    Results found: { total }
                </div>

                <Pagination
                    page={ page }
                    lastPage={ lastPageNr }
                    setPage={ setPage }
                />

            </div>

            {
                loading
                    ? <div className="loading">Loading...</div>
                    : (
                        <div className="people-of-interest__list">
                            <PeopleList people={ people } />
                        </div>
                    )

            }

        </div>
    )

}