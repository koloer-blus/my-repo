import styled from "styled-components";
import { Menu } from '@arco-design/web-react'

export const CheckBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    min-width: 100px;
    box-shadow: 0px 1px 4px 1px #aaaaaa73;
    
`;


export const CustomMenu = styled(Menu)`
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0px 1px 4px 1px #aaaaaa73;
`