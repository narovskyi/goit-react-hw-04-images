import { useState } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import { ToastContainer } from "react-toastify";
import { Wrapper } from "./App.styled";

export default function App() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchSubmit = (query) => {
    setPage(1);
    setSearchPhrase(query);
  }

  return (
      <Wrapper>
        <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery searchPhrase={searchPhrase} page={page} setPageNumber={setPage} />
        <ToastContainer autoClose={3000}/>
      </Wrapper>
  );
};