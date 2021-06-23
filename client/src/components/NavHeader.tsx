import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import images from '../images';

const NavHeader = () => (
    <Box display="flex" flexDirection="row" justifyContent="center" px={6} py={4} bg="white">
        <Image src={images.fullBrandLogo} alt="RJ Logo" width="80px" />
    </Box>
);

export default NavHeader;
