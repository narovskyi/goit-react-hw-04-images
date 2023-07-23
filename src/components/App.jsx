import { useState } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import { ToastContainer } from "react-toastify";
import { Wrapper } from "./App.styled";

export default function App() {
  const [searchPhrase, setSearchPhrase] = useState('');

  return (
      <Wrapper>
        <Searchbar onSubmit={setSearchPhrase} />
        <ImageGallery searchPhrase={searchPhrase}/>
        <ToastContainer autoClose={3000}/>
      </Wrapper>
  );
};