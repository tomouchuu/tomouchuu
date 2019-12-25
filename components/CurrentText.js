import styled from 'styled-components';

const CurrentText = styled.p`
    color: ${props => props.theme.colors.text};
    margin: ${props => props.theme.spacings[0]} 0;

    a {
        color: ${props => props.theme.colors.text};
    }
`;

export default CurrentText;