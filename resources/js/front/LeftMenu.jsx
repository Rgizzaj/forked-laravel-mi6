import { useState } from "react"

export default function LeftMenu() {

    const [hidden, setHidden] = useState(false);

    return (
        <nav className={ `left-menu${hidden ? ' left-menu--hidden' : ''}` }>

            <div
                className="left-menu__visibility-toggle"
                onClick={ () => setHidden(!hidden) }
            >
                { hidden ? '>' : '<' }
            </div>

            <div className="left-menu__content">

                <div className="left-menu__header">
                    <img className="left-menu__seal" src="/img/mi6-seal.png" alt="MI6 seal" />
                </div>

                <div className="left-menu__links">
                    <a href="#">Home</a>
                    <a href="#">People of interest</a>
                </div>

            </div>

        </nav>
    )
}