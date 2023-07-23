import { useState } from "react";
import { SearchHeader, SearchForm, FormButton, ButtonLabel, SearchInput } from "./Searchbar.styled";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
    const [searchPhrase, setSearchPhrase] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (searchPhrase.trim() === '') {
            toast.warn('Enter something to search!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            setSearchPhrase('');
            return;
        }

        onSubmit(searchPhrase.trim());
        setSearchPhrase('');
    }
    
    const handleInputChange = (e) => {
        setSearchPhrase(e.target.value);
    }

    return (
        <SearchHeader>
            <SearchForm onSubmit={handleSubmit}>
                <FormButton type="submit">
                    <ButtonLabel>Search</ButtonLabel>
                </FormButton>

                <SearchInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchPhrase}
                    onChange={handleInputChange}
                />
            </SearchForm>
        </SearchHeader>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
};