import styled from 'styled-components';

export const HeaderWrap = styled.div`
    height: 80px;
    background-color: #fff;
`;

export const HeaderTop = styled.div`
    border-bottom: 1px solid #1da57a;
    height: 40px;
    text-align: right;
    line-height: 40px;
    padding-right: 20px;
    span{
        margin-right: 15px;
    }
`;

export const HeaderBottom = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
`;

export const HeaderBottomLeft = styled.div`
    font-size: 20px;
    position: relative;
    width: 25%;
    text-align: center;
    &::after {
        content: '';
        position: absolute;
        right: 50%;
        transform: translateX(50%);
        top: 100%;
        border-top: 30px solid white;
        border-right: 30px solid transparent;
        border-bottom: 30px solid transparent;
        border-left: 30px solid transparent;
    }
`;

export const HeaderBottomRight = styled.div`
    width: 75%;
    text-align: right;
    margin-right: 30px;
`;