import { Component } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'



import s from "./searchbar.module.css";

class Searchbar extends Component {
    static defaultProps = {
        onsubmit: () => {}
    }

    static propTypes = {
        onSubmit: PropTypes.func,
    }

    state = {
        search: "",
        id: "",
        }

    searchId = nanoid()
        
    handleChange = ({target}) => {
        const {value, name} = target;
        this.setState({
            [name]: value,
        })
        this.setState({id: nanoid()});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };
    
    reset = () => {
        this.setState({search: "", id: "",});
    };

render() {
    const {handleChange, handleSubmit, searchId} = this;
        const {search} = this.state;
    return (
    <header className={s.searchbar}>
        <form onSubmit={handleSubmit} className={s.form}>
            <button type="submit" className={s.button}>
            <FontAwesomeIcon className={s.icon} icon={faMagnifyingGlass}/>
            </button>

            <input
                id={searchId}
                name="search"
                className={s.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={search}
                onChange={handleChange}
            />
        </form>
    </header>
    )
}
}

export default Searchbar;
