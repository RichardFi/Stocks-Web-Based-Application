import React from 'react';
import { HeaderWrap, HeaderTop, HeaderBottom, HeaderBottomLeft, HeaderBottomRight } from './style';

export default function Header() {
    return (
        <HeaderWrap>
            <HeaderTop>
                <span></span>
            </HeaderTop>
            <HeaderBottom>
                <HeaderBottomLeft>
                    
                </HeaderBottomLeft>
                <HeaderBottomRight>
                    <span></span>
                </HeaderBottomRight>
            </HeaderBottom>
        </HeaderWrap>
    )
}

