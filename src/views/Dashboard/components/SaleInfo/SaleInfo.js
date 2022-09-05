import React from 'react';
import { Box, Column, H1, Text, Row } from '../../../../components';
import './saleinfo.scss';
import linkIcon from '../../../../assets/saleinfo/link.svg';

const SaleInfo = () => {
    return ( <Box className='saleinfo'>
        <Row>
            <Column className='left-sale-info'>
            <H1 className='token-sale-title' text='Token Sale Information'/>
                <Text text='We ask contributors to read through the relevant documents seen here before investing in Northern Lights Token.' />
            </Column>


            <Column className='right-sale-info'>
                <a target="_blank" rel="noreferrer" href='https://ipfs.io/ipfs/QmPh1hyZFraHKE9RNfX7SEmPu4bWwGbzv3K7JeVEXVeefX' >
            <Row center>
                <img src={linkIcon} alt='link icon'/>
                <Text text='Whitepaper' />
            </Row>
                </a>
            <a target="_blank" rel="noreferrer" href='https://ipfs.io/ipfs/QmNq7BQCYYoq33P9ASWVNx6ceQUYFXsWnQQDBz5pfDkzmr' >
            <Row center>
                <img src={linkIcon} alt='link icon'/>
                <Text text='Tokenomics' />
            </Row>
            </a>
            <a target="_blank" rel="noreferrer" href='https://ipfs.io/ipfs/QmQ9gyNwn2WeHRXzXqKHTEM1LbddR11ZUNhRRRYB6Tv5zv' >
            <Row center>
                <img src={linkIcon} alt='link icon'/>
                <Text text='Terms & Conditions' />
            </Row>
            </a>
            </Column>
        </Row>
    </Box> );
}
 
export default SaleInfo;