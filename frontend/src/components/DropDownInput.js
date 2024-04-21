import { styled } from "styled-components";
import { useContext } from "react";
import { AiOutlineDown } from "react-icons/ai";
import PopupSelect from "./PopupSelect.js";
import Context from "../Context.js";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  /* width: 100%; */
  background-color: var(--translucent);
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: var(--borderRadius1);
`;

const Label = styled.div`
  width: 100%;
  opacity: 0.5;
  text-transform: capitalize;
`;

const Left = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const SelectInputText = styled.div`
  font-size: var(--fontSize1);
`;
const SelectInputButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export default function DropDownInput(props) {
  const { setForm } = useContext(Context);

  let { value, options, onChange, placeholder, title } = props;

  return (
    <Container
      onClick={() => {
        setForm({
          title: placeholder,
          component: (
            <PopupSelect options={options} value={value} onChange={onChange} />
          ),
        });
      }}
    >
      <Left>
        <Label>{title}</Label>
        <SelectInput value={parseValue(value)} placeholder={placeholder} />
      </Left>
      <SelectInputButton>
        <AiOutlineDown />
      </SelectInputButton>
    </Container>
  );

  function parseValue() {
    for (let item of options) {
      if (item.value == value) return item.label;
    }

    return "Invalid Value";
  }
}

function SelectInput({ value, placeholder }) {
  return <SelectInputText>{value ? value : placeholder}</SelectInputText>;
}
