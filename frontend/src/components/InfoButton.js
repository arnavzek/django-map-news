import styled, { keyframes } from "styled-components";
import { BsChevronRight } from "react-icons/bs";
import capitalizeFirstLetter from "../controllers/capitalizeFirstLetter";

const Container = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  padding: 25px 20px;
  border-bottom: 1px solid var(--translucent);
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border: none;
  gap: 5px;
  align-items: flex-start;
`;

const Icon = styled.div``;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 950;
`;

const Info = styled.div`
  opacity: 0.5;
`;
const Image = styled.img`
  height: 50px;
  object-fit: cover;
  width: 50px;
  border-radius: 500px;
`;

function InfoButton({ onClick, name, icon, info, image }) {
  return (
    <Container onClick={onClick}>
      <Left>
        {icon ? <Icon>{icon}</Icon> : null}
        <InfoContainer>
          <Name>{capitalizeFirstLetter(name)}</Name>
          <Info>{capitalizeFirstLetter(info ? info : "Click to change")}</Info>
        </InfoContainer>
      </Left>
      <Right>{image ? <Image src={image} /> : <BsChevronRight />}</Right>
    </Container>
  );
}

export default InfoButton;
