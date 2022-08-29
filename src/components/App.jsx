import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Searchbar from "./Searchbar/Searchbar"
import ImageGallery from "./ImageGallery/ImageGallery"
import { getPhoto } from "../../src/shared/api/image";
import Modal from "./Modal/Modal"
import Loader from "./Loader/Loader";
import s from "./Searchbar/searchbar.module.css"

const modalInitialState = {
    largeImageURL: "",
    tags: "",
}
export const App = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({...modalInitialState});

    useEffect(()=> {
        const fetchImage = async () =>  {        
            try {
                setLoading(true);
                const data = await getPhoto(page, searchQuery);
                setItems(prevItems => [...prevItems, ...data.hits])
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
            }
            if(searchQuery) {
                fetchImage()
            }    
    }, [searchQuery, page]);

    const formSubmitHandler = searchData => {
        setSearchQuery(searchData.search)
        setPage(1)
        if (searchData.search !== searchQuery) {
            setItems([])
        } 
        if (page > 1 && searchData.search === searchQuery) {
            setItems([])
        }
    };

    const loadMore = () => setPage(page + 1);

    const openModal = (modalContent) => {
        setModalOpen(true);
        setModalContent({...modalContent});
    }

    const closeModal = ()=> {
        setModalOpen(false);
        setModalContent({...modalInitialState});
    }

    const isImagePresent = Boolean(items.length);
    const isImageAbsent = Boolean(items.length === 0 && searchQuery !== "");

        return (
        <div className={s.container}>
            {modalOpen && <Modal close={closeModal} content={modalContent}/>} 
            <Searchbar onSubmit={formSubmitHandler}/>
            {isImagePresent && <ImageGallery itemsData={items} onClick={openModal}/>}
            {loading && <Loader/>}
            {isImagePresent && <button className={s.buttonLoad} onClick={loadMore}>load more</button>}
            {isImageAbsent && <p>Sorry, we didn't find any photos for your request.</p>}
            {error && <p>Failed to upload photos.</p>}
        </div>
        
        )
    }


export default App;

App.defaultProps = {
    data: {},
    fetchImage: () => {},
}

App.propTypes = {
    fetchImage: PropTypes.func,
    formSubmitHandler: PropTypes.func,
    data: PropTypes.shape({
        search: PropTypes.string,
        id: PropTypes.string,
    }),
}