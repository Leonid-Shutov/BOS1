import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #0a0a0a;
`;

export const List = styled.ul`
    padding: 20px 50px;
    background-color: transparent;
    color: green;
    font-size: 20px;
    border: 2px white solid;
    width: 500px;
    min-height: 500px;
    text-align: justify;

    @media (max-width: 700px) {
        width: 250px;
        padding: 20px 35px;
        font-size: 15px;
    }
`;

export const ListItem = styled.li`
    margin-top: 10px;
    color: green;
    cursor: pointer;
    &:hover {
        background-color: green;
        color: white;
    }
`;

export const ButtonContainer = styled.div`
    width: 604px;
    margin-bottom: 100px;

    @media (max-width: 700px) {
        width: 320px;
    }
`;

export const Back = styled.button`
    width: 60px;
    height: 30px;
    background-color: transparent;
    border: none;
    border-bottom: 2px white solid;
    color: green;
    font-size: 20px;
    &:hover {
        color: white;
    }
`;

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background-color: rgba(51, 51, 51, 0.7);
`;

export const ModalBox = styled.div`
    width: 500px;
    height: 200px;
    background-color: black;
    border: 2px solid white;
    position: absolute;
    top: calc(50% - 120px);
    left: calc(50% - 270px);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const Input = styled.input`
    width: 400px;
    height: 50px;
    font-size: 24px;
    color: white;
    background: black;
    border: 2px solid white;
    border-radius: 3px;
    margin-bottom: 20px;
`;

export const AuthText = styled.div`
    font-size: 24px;
    color: white;
    margin-bottom: 40px;
`;

export const SubmitButton = styled.button`
    width: 100px;
    height: 40px;
    font-size: 16px;
    background-color: black;
    border: 1px solid white;
    border-radius: 3px;
    color: white;

    &:active {
        background-color: white;
        color: black;
    }
`;

export const ErrorMessage = styled.div`
    font-size: 18px;
    color: red;
    margin-bottom: 20px;
`;
