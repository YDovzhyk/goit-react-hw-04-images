import PropTypes from 'prop-types';
import s from "./imageGallery.module.css";

const ImageGallery = ({itemsData, onClick}) => {
    return (
    <ul className={s.gallery}>
        {itemsData.map(({id, previewURL, tags, largeImageURL}) => (
        <li key={id} onClick={() => onClick({id, largeImageURL, tags})} className={s.galleryItem}>
            <img src={previewURL} alt={tags} className={s.image} />
        </li>
        ))}
    </ul>
    )
};

export default ImageGallery;

ImageGallery.defaultProps = {
    itemsData: [],
}

ImageGallery.propTypes = {
    onClick: PropTypes.func,
    itemsData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        largeImageURL: PropTypes.string,
        previewURL: PropTypes.string,
        tags: PropTypes.string,
        })),
}