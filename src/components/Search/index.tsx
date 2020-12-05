import React, { FC, InputHTMLAttributes, RefObject, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faSearch } from "@fortawesome/free-solid-svg-icons";

interface ContainerProps {
    height?: string;
}

export interface Props extends ContainerProps { 
    inputProps?: InputHTMLAttributes<HTMLInputElement>; 
    onSearch: (searchTerm: string) => void;
}

const SearchContainer = styled.div<ContainerProps>`
    display: flex;
    height: calc(${props => props.height || "1rem"} + 1rem);
    border: 2px solid #dadada;
    border-radius: 7px;
    width: 500px;
    
    &:hover,:focus-within { 
        outline: none;
        border-color: #9ecaed;
        box-shadow: 0 0 10px #9ecaed;
    }

    input { 
        outline: none; 
        border: none;
        font-size: ${props => props.height || "1rem"}; 
    }

    button { 
        background-color: transparent; 
        outline: none; 
        border-style: none none none solid; 
        border-color: #dadada;
        :hover { 
            cursor: pointer;
        }
    }
`;

const StyledInput = styled.input`
    flex: 1;
    padding-left: 5px;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    padding: 0 5px;
`;

export const Search: FC<Props> = ({ inputProps, height, onSearch }) => {
    const input = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>; 
    
    useEffect(() => { 
        input.current?.addEventListener('keydown', (ev: KeyboardEvent) => { if(ev.code === 'Enter' && input.current){ onSearch(input.current.value); }});
    }, [input])

    return (
    <SearchContainer height={height}>
        <StyledInput ref={input} {...inputProps} />
        <button onClick={() => { if(input.current) { onSearch(input.current.value); }}}><StyledFontAwesomeIcon icon={faSearch} /></button>
    </SearchContainer>
    )
}