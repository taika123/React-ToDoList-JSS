import styled from "styled-components";

export const Button = styled.button`
    apperance: none;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.color};
    border: ${props => props.theme.borderButton};
    padding: .25em .5em;
    transition: all .5s;
    font-size: 17px;
    &:hover {
        color: ${props => props.theme.hoverTextBtn};
        background-color: ${props => props.theme.hoverBgBtn};
        border: ${props => props.theme.borderButton}
    }
    &:disabled{
        cursor: no-drop;
    }
`