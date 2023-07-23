import { useState, useEffect } from "react";
import { Gallery, Heading, Image } from "./ImageGallery.styled";
import ImageGalleryItem from "components/ImgaeGalleryItem/";
import Loader from "components/Loader/";
import LoadMoreButton from "components/LoadMoreButton";
import Modal from "components/Modal";
import api from 'services/api'
import PropTypes from 'prop-types';

const status = {
    IDLE: 'idle',
    PENDING: 'pending',
    NOTHING_FOUND: 'nothing found',
    LAST_PAGE: 'last page',
    RESOLVED: 'resolved',
    ERROR: 'error'
}

export default function ImageGallery({ searchPhrase }) {
    const [galleryItems, setGalleryItems] = useState([]);
    const [statusState, setStatusState] = useState(status.IDLE);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [imageInModal, setImageInModal] = useState({ imageUrl: '', altImageText: '' });
    
    useEffect(() => {
        if (!searchPhrase) {
            return;
        }
        setStatusState(status.PENDING);
        api.fetchPhoto(1, searchPhrase)
            .then(photos => {
                if (photos.length === 0) {
                    setStatusState(status.NOTHING_FOUND);
                } else if (photos.length < 12 && photos.length > 0) {
                    setGalleryItems([...photos]);
                    setStatusState(status.LAST_PAGE);
                } else {
                    setGalleryItems([...photos]);
                    setStatusState(status.RESOLVED);
                    setPage(1);
                }
            })
            .catch(error => {
                setGalleryItems([]);
                setStatusState(status.ERROR);
            });
    }, [searchPhrase]);

    useEffect(() => {
        if (page === 1) {
            return;
        }
        api.fetchPhoto(page, searchPhrase)
            .then(photos => {
                if (photos.length < 12 && photos.length >= 0) {
                    setGalleryItems([...galleryItems, ...photos]);
                    setStatusState(status.LAST_PAGE);
                } else {
                    setGalleryItems([...galleryItems, ...photos]);
                    setStatusState(status.RESOLVED);
                }
            })
            .catch(error => {
                setGalleryItems([]);
                setStatusState(status.ERROR);
            });
    }, [page]);

    const handleButtonClick = () => {
        setPage(page + 1);
    }

    const closeModal = () => {
        setShowModal(false);
        setImageInModal({});
    }

    const handleImageClick = (e) => {
        setShowModal(true);
        setImageInModal({
            imageUrl: e.target.dataset.image,
            altImageText: e.target.dataset.alt
        });
    }
    
    if (statusState === status.IDLE) {
        return (
            <Heading>You haven't searched yet...</Heading>
        );
    }

    if (statusState === status.PENDING) {
        return (
            <Loader />
        );
    }

    if (statusState === status.RESOLVED) {
        return (
        <>
            <Gallery>
                {galleryItems.map(({id, largeImageURL, webformatURL, tags }) => {
                    return <ImageGalleryItem key={id} largeImage={largeImageURL} smallImage={webformatURL} altText={tags} onClick={handleImageClick} />
                })}
            </Gallery>
                {showModal && <Modal onClose={closeModal}>
                    <Image src={imageInModal.imageUrl} alt={imageInModal.altImageText} />
                </Modal>}
            <LoadMoreButton onClick={handleButtonClick} />
        </>
        );
    }

    if (statusState === status.LAST_PAGE) {
        return (
        <>
            <Gallery>
                {galleryItems.map(({id, largeImageURL, webformatURL, tags }) => {
                    return <ImageGalleryItem key={id} largeImage={largeImageURL} smallImage={webformatURL} altText={tags} onClick={handleImageClick} />
                })}
            </Gallery>
                {showModal && <Modal onClose={closeModal}>
                    <Image src={imageInModal.imageUrl} alt={imageInModal.altImageText} />
                </Modal>}
            <Heading>That's all we found for your request.</Heading>
        </>
        );
    }

    if (statusState === status.NOTHING_FOUND) {
        return (
            <Heading>Sorry, we couldn't find any matches...</Heading>
        );
    }

    if (statusState === status.ERROR) {
        return (
            <Heading>Sorry, something went wrong...</Heading>
        );
    }
}

ImageGallery.propTypes = {
    searchPhrase: PropTypes.string.isRequired
};