import React, { useEffect, useState, useRef } from 'react';
import bcrypt from 'bcryptjs';
import IDEA from '../helpers/idea';
import generateKey from '../helpers/keyGenerator';
import requestApi from '../helpers/requestApi';
import '../css/browser.css';
import {
    Wrapper,
    List,
    ListItem,
    Back,
    ButtonContainer,
    ModalBackground,
    ModalBox,
    AuthText,
    Input,
    SubmitButton,
    ErrorMessage,
} from './styles';

const HomePage = () => {
    const [listOfFiles, setListOfFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [privateKey, setKey] = useState(null);
    const [isFormOpen, setForm] = useState(false);
    const [error, setError] = useState(null);

    const inputValue = useRef(null);

    useEffect(() => {
        const key = generateKey();
        setKey(key.privateKey);
        requestApi({
            slug: '/session',
            method: 'POST',
            body: { publicKey: key.publicKey },
        });
        requestApi({
            slug: '/list',
        }).then(res => setListOfFiles(res.map(item => item.name)));
    }, []);

    const handleFileClick = async fileName => {
        const { cipher, key, error } = await requestApi({
            slug: `/file?name=${fileName}`,
        });
        if (error) {
            setForm(true);
            return;
        }
        if (privateKey) {
            const sessionKey = privateKey.decrypt(key);
            const idea = new IDEA(sessionKey);
            setFile(idea.decrypt(cipher).toString());
        }
    };

    return (
        <>
            <Wrapper>
                <List>
                    {file ||
                        listOfFiles.map(file => (
                            <ListItem onClick={() => handleFileClick(file)}>
                                {file}
                            </ListItem>
                        ))}
                </List>
                <ButtonContainer>
                    {file && <Back onClick={() => setFile(null)}>back</Back>}
                </ButtonContainer>
            </Wrapper>
            {isFormOpen && (
                <>
                    <ModalBox>
                        <AuthText>Password</AuthText>
                        <Input ref={inputValue} placeholder="1111" />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <SubmitButton
                            onClick={async () => {
                                const resp = await requestApi({
                                    slug: '/auth',
                                    method: 'POST',
                                    body: {
                                        password: bcrypt.hashSync(
                                            inputValue.current.value,
                                            '$2a$10$PHk7.ndcOJC3ZsxTR9s3zO',
                                        ),
                                    },
                                });
                                if (resp.error) {
                                    setError(resp.error);
                                } else {
                                    setError(null);
                                    setForm(false);
                                }
                            }}
                        >
                            Submit
                        </SubmitButton>
                    </ModalBox>
                    <ModalBackground onClick={() => setForm(false)} />
                </>
            )}
        </>
    );
};

export default HomePage;
