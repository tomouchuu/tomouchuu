import styled from 'styled-components';

export const Base = styled.div`
    background-color: #ff4136;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;

    @media screen and (max-width: 620px) {
        align-items: stretch;
        height: 100%;
        text-align: center;
    }
`;

export default Base;