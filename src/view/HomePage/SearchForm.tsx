import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { searchLocations } from "../../redux/locationsSlice";

const Form = styled.form`
  display: flex;
  margin-top: 40px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputIcon = styled(SearchIcon)`
  width: 17px;
  height: 17px;
  fill: #616475;
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  color: #e7e7eb;
  border: 1px solid #e7e7eb;
  padding: 13px 10px 13px 50px;
  background-color: transparent;
  outline: none;
  &::placeholder {
    color: #616475;
    font-weight: 500;
  }
  &:focus {
    box-shadow: 0 0 15px 1px #464855;
  }
`;

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  background-color: #3c47e9;
  color: #e7e7eb;
  padding: 14px 16px;
  margin-left: 10px;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const SearchForm: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) dispatch(searchLocations(searchQuery));
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <InputWrapper>
        <InputIcon />
        <Input
          type="text"
          placeholder="search location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputWrapper>
      <Button>Search</Button>
    </Form>
  );
};
