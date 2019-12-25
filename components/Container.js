import styled from 'styled-components';

const Container = styled.div`
    line-height: ${props => props.theme.lineHeights.body};
    margin: 0 auto;
    padding: ${props => props.theme.spacings[3]};
    width: ${props => props.theme.containerSize};
    z-index: 10;

    @media screen and (max-width: ${props => props.theme.breakpoints[0]}) {
        box-sizing: border-box;
        width: 100%;
    }
`;

export default Container;