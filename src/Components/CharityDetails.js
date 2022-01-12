import { Center, Flex, Heading, HStack, Img, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import React from 'react';


function CharityDetails() {
  const { id } = useParams();

  return (<>
    <VStack width={'100vw'} >
      <Flex py={12} marginTop={90}
        bg={useColorModeValue('darkgray', 'gray.700')}
        width={'100vw'} height={'50vh'}>
        <HStack justifySelf={'center'} justifyItems={'center'} alignItems={'center'}>
          <Img height={'50vh'} width={'45vw'} objectFit={'cover'} padding={'2vw'}
               src={'https://st.depositphotos.com/1364916/2565/v/950/depositphotos_25654255-stock-illustration-teamwork-hands-and-connections-logo.jpg'} />
        </HStack>
      </Flex>
      <VStack spacing={8}>
        <Center py={12} marginTop={90}>
          <SimpleGrid columns={4} spacing={10}>
            <Heading>
              {id}
            </Heading>
          </SimpleGrid>
        </Center>
      </VStack>
    </VStack>

  </>);
}

export default CharityDetails;
