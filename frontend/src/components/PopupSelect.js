import { useContext, useState } from "react";
import { styled } from "styled-components";
import MaterialInput from "./MaterialInput.js";
import Context from "../Context.js";

const Container = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
const Searchbox = styled.input`
  padding: 15px 15px;
  background: transparent;
  border: none;
  border: 1px solid var(--translucentHard);
  border-radius: 10px;
  outline: none;
  color: var(--color);
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Item = styled.div`
  padding: 15px;
  cursor: pointer;
  background: var(--translucent);
  border-radius: 10px;

  &:hover {
    background: var(--translucentHard);
  }

  ${({ isActive }) => {
    if (isActive)
      return `
        color: var(--bgColor);
        background: var(--color);

        &:hover {
          background: var(--color);
          color: var(--bgColorDark);
        }

    `;
  }}
`;

export default function PopupSelect({ value, options, onChange }) {
  const [query, setQuery] = useState("");
  const { setForm } = useContext(Context);

  return (
    <Container>
      <MaterialInput
        autoFocus={true}
        onChange={({ target }) => {
          setQuery(target.value);
        }}
        label="Type here to search"
      />
      <List>{renderList()}</List>
    </Container>
  );

  function renderList() {
    let items = [];

    for (let item of options) {
      if (query) {
        let toMatch = item.label.toLowerCase();
        if (toMatch.indexOf(query.toLowerCase()) === -1) {
          continue;
        }
      }
      items.push(
        <Item
          key={item.value}
          isActive={value == item.value}
          onClick={() => {
            setForm(null);
            onChange(item.value);
          }}
        >
          {item.label}
        </Item>
      );
    }

    return items;
  }
}
