import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const hendleSaveSearch = evt => {
    setSearchValue(evt.currentTarget.value);
  };

  const hendelSubmit = evt => {
    evt.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Oopps, enter at least something');
      return;
    }
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={hendelSubmit}>
        <SearchFormButton type="submit">
          <ImSearch />
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={hendleSaveSearch}
        />
      </SearchForm>
    </SearchbarContainer>
  );
};
