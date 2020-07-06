import styled from 'styled-components';

const CurrentText = styled.p`
    color: ${props => props.theme.colors.text};
    margin: ${props => props.theme.spacings[0]} auto;
    width: 520px;

    a {
        color: ${props => props.theme.colors.text};
    }

    @media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
        width: 90%;
    }
`;

export default CurrentText;