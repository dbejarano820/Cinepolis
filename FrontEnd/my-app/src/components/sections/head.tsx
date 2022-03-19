import React from "react";
import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, VStack, Heading, Spacer } from "@chakra-ui/layout";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode(); 
    const isDark = colorMode === "dark";
    return (
        <div className="ui fixed header">
            <div className="ui container center">
            <VStack>

            <Flex w="100%">
            <Heading ml="2" size="md" fontWeight='extrabold' 
            color='blue.500' >Cinepolis</Heading>
            <Spacer></Spacer>
            <IconButton ml={9} icon={isDark ? <FaSun /> : <FaMoon />}
                        isRound={true} onClick={toggleColorMode} aria-label={""}></IconButton>
            
            </Flex>
            </VStack>
            </div>
        </div>
    )


};

export default Header;