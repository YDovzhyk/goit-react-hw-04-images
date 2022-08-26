import { Component } from "react";
import PropTypes from 'prop-types';
import Searchbar from "./Searchbar/Searchbar"
import ImageGallery from "./ImageGallery/ImageGallery"
import { getPhoto } from "../../src/shared/api/image";
import Modal from "./Modal/Modal"
import Loader from "./Loader/Loader";
import s from "./Searchbar/searchbar.module.css"

export class App extends Component {
    state = {
        items: [],
        loading: false,
        error: null,
        searchQuery: "",
        page: 1,
        modalOpen: false,
        modalContent: {
            id: "",
            largeImageURL: "",
            tags: "",
        }
    }

    componentDidUpdate(_, prevState) {
        const {page, searchQuery, idSearchQuery} = this.state;
        if((searchQuery && prevState.searchQuery !== searchQuery) || page > prevState.page || idSearchQuery !== prevState.idSearchQuery) {
            this.fetchPhoto();
        }
    }

        async fetchPhoto() {
            const {page, searchQuery} = this.state;
            this.setState({
                loading: true,
            });
        
            try {
                const data = await getPhoto(page, searchQuery);
                this.setState(({items}) => ({
                    items: [...items, ...data.hits]
                    
                }))
            } catch (error) {
                this.setState({
                    error,
                })
            }
            finally {
                this.setState({ loading: false })
            }
            }
        
        formSubmitHandler = data => {
            const searchValue = data.search;
            const idSearchValue = data.id;
            this.setState({ searchQuery: searchValue }) 
            this.setState({ idSearchQuery: idSearchValue })
            this.setState({ items: [] })
        };

        loadMore = () => {
            this.setState(({page}) => ({
                page: page + 1
            }))
        };

        openModal = (modalContent) => {
            this.setState({
                modalOpen: true,
                modalContent,
            })
        }
    
        closeModal = ()=> {
            this.setState({
                modalOpen: false,
                modalContent: {
                    id: "",
                    largeImageURL: "",
                    tags: "",
                }
            })
        }

    render(){
        const {formSubmitHandler, loadMore, openModal, closeModal} = this;
        const {items, loading, error, modalOpen, modalContent} = this.state;

        const isItemPresent = Boolean(items.length);
        const isItemAbsent = Boolean(items.length === 0 && this.state.searchQuery !== "" && loading === false);

        return (
        <div className={s.container}>
            {modalOpen && <Modal close={closeModal} content={modalContent} status={loading}/>} 
            <Searchbar onSubmit={formSubmitHandler}/>
            {isItemPresent && <ImageGallery itemsData={this.state.items} onClick={openModal}/>}
            {loading && <Loader/>}
            {isItemPresent && <button className={s.buttonLoad} onClick={loadMore}>load more</button>}
            {isItemAbsent && <p>Sorry, we didn't find any photos for your request.</p>}
            {error && <p>Failed to upload photos.</p>}
        </div>
        
        )
    }
}

export default App;

App.defaultProps = {
    data: {},
}

App.propTypes = {
    fetchPhoto: PropTypes.func,
    formSubmitHandler: PropTypes.func,
    data: PropTypes.shape({
        search: PropTypes.string,
        id: PropTypes.string,
    }),
}