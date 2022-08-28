import { useState } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import s from "./searchbar.module.css";

const initialState = {
    id: "",
    search: "",
}

const Searchbar = ({onSubmit}) => {
    const [state, setState] = useState({...initialState});
    
    const handleInputChange = event => {
        const { name, value } = event.currentTarget;
        let id = nanoid();
        setState(prevState => ({
            ...prevState,
            [name]: value,
            id: id,
        }))
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({...state});
        setState({...initialState})
    }

    const {id, search} = state;
    return (
    <header className={s.searchbar}>
        <form onSubmit={handleSubmit} className={s.form}>
            <button type="submit" className={s.button}>
            <FontAwesomeIcon className={s.icon} icon={faMagnifyingGlass}/>
            </button>

            <input
                id={id}
                name="search"
                className={s.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={search}
                onChange={handleInputChange}
            />
        </form>
    </header>
    )
}


export default Searchbar;

Searchbar.defaultProps = {
    onSubmit: () => {},
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}