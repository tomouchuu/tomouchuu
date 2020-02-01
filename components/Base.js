import styled from 'styled-components';

export const Base = styled.div`
    background: linear-gradient(91deg, ${props => props.theme.colors.background}, ${props => props.theme.colors.altBackground}, ${props => props.theme.colors.background});
    background-size: 600% 600%;

    -webkit-animation: GradientTransition 13s ease infinite;
    -moz-animation: GradientTransition 13s ease infinite;
    animation: GradientTransition 13s ease infinite;

    @-webkit-keyframes GradientTransition {
        0%{background-position:0% 50%}
        50%{background-position:100% 51%}
        100%{background-position:0% 50%}
    }
    @-moz-keyframes GradientTransition {
        0%{background-position:0% 50%}
        50%{background-position:100% 51%}
        100%{background-position:0% 50%}
    }
    @keyframes GradientTransition {
        0%{background-position:0% 50%}
        50%{background-position:100% 51%}
        100%{background-position:0% 50%}
    }
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