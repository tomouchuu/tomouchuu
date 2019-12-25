import styled from 'styled-components';

export const Base = styled.div`
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;

    @media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
        align-items: stretch;
        height: 100%;
        text-align: center;
    }
`;

export default Base;