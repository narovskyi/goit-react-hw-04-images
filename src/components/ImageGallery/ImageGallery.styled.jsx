import styled from "@emotion/styled";

export const Gallery = styled.ul`
    display: grid;
    max-width: calc(100vw - 48px);
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 16px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
`;

export const Heading = styled.h1`
    text-align: center;
    color: #757575;
`;

export const Image = styled.img`
    color: #ffffff;
`;