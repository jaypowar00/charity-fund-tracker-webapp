import { createRef, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  VStack,
} from '@chakra-ui/react';
import {
  FaBirthdayCake,
  FaEdit,
  FaEnvelopeOpen,
  FaEye,
  FaEyeSlash,
  FaFile,
  FaLock,
  FaPhone,
  FaUserAlt,
  FaWallet,
} from 'react-icons/fa';
import ConnectingToWallet from './ConnectingToWallet';
import axios from 'axios';
import { FilePicker } from 'react-file-picker';
import { SampleDesc } from '../SampleText';
import { API_URL } from '../Constants';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const CharitySignup = props => {
  const handleShowClick = () => setShowPassword(!showPassword);
  const dateRef = createRef();
  const [showPassword, setShowPassword] = useState(false);

  const { walletAddress } = props;
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [certificate, setCertificate] = useState('');
  const [logo, setLogo] = useState('');
  const [dob, setDob] = useState('');
  const [desc, setDesc] = useState('');

  const submit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone1', phone);
    formData.append('email', email);
    formData.append('dob', dob);
    formData.append('username', userName);
    formData.append('password', password);
    formData.append('account_type', 'charity');
    formData.append('meta_wallet_address', walletAddress);
    formData.append('profile_photo', logo);
    formData.append('tax_cert', certificate);
    formData.append('description', desc ? desc : SampleDesc);

    axios
      .post(`${API_URL}/user/register`, formData)
      .then(response => {
        console.log(response);
        if (response.data.status && response.data.access_token) {
          const token = response.data.access_token;
          console.log('token', token);
          window.sessionStorage.setItem('access_token', token);
          window.location.href = '/charity';
        } else {
          const err = response.data.message;
          throw Error('Error: ' + err);
        }
      })
      .catch(err => {
        console.log(err);
        window.alert(err.message);
      });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="80vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: '90%', md: '469px' }}>
          <form
            onSubmit={e => {
              submit(e);
            }}
          >
            <Stack spacing={5} p="1rem" boxShadow="2xl">
              <VStack
                justifyContent={'center'}
                flexDirection={'column'}
                justifyItems={'center'}
              >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Charity Sign Up</Heading>
              </VStack>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.500" />}
                  />
                  <Input
                    isRequired={true}
                    _placeholder={{ color: 'gray.300' }}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Charity Name"
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.500" />}
                  />
                  <Input
                    isRequired={true}
                    _placeholder={{ color: 'gray.300' }}
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<FaEnvelopeOpen color="gray.500" />}
                  />
                  <Input
                    //   isRequired={true}
                    _placeholder={{ color: 'gray.300' }}
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<FaPhone color="gray.500" />}
                  />
                  <Input
                    isRequired={true}
                    _placeholder={{ color: 'gray.300' }}
                    type="number"
                    placeholder="Phone No"
                    name="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<FaBirthdayCake color="gray.500" />}
                  />
                  <Input
                    isRequired={true}
                    _placeholder={{ color: 'gray.300' }}
                    ref={dateRef}
                    type="text"
                    placeholder="mm/dd/yyyy"
                    onFocus={() => (dateRef.current.type = 'date')}
                    onBlur={() => (dateRef.current.type = 'text')}
                    value={dob}
                    onChange={e => {
                      console.log(e.target.value);
                      setDob(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<CFaLock color="gray.500" />}
                  />
                  <Input
                    _placeholder={{ color: 'gray.300' }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* File Uploading Start*/}

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<FaFile color="gray.500" />}
                  />
                  <Input
                    required="true"
                    _placeholder={{ color: 'gray.300' }}
                    type="text"
                    placeholder="80G Certificate Document"
                    name="certificate"
                    value={certificate.name}
                    onChange={e => setCertificate(e.target.value)}
                  />
                  <InputRightElement width="4.5rem" me={'2'}>
                    <FilePicker
                      extensions={['pdf', 'docx']}
                      onChange={file => {
                        setCertificate(file);
                      }}
                      onError={errMsg => console.log(errMsg)}
                    >
                      <Button h="1.75rem" size="sm">
                        Upload
                      </Button>
                    </FilePicker>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* File Uploading End*/}

              {/* Logo Uploading Start*/}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<FaFile color="gray.500" />}
                  />
                  <Input
                    required="true"
                    type="text"
                    name="logo"
                    _placeholder={{ color: 'gray.300' }}
                    placeholder="Your Logo"
                    value={logo.name}
                    onChange={e => setLogo(e.target.value)}
                  />
                  <InputRightElement width="4.5rem" me={'2'}>
                    <FilePicker
                      extensions={['png', 'jpg', 'jpeg', 'gif']}
                      onChange={file => {
                        setLogo(file);
                      }}
                      onError={errMsg => console.log(errMsg)}
                    >
                      <Button h="1.75rem" size="sm">
                        Upload
                      </Button>
                    </FilePicker>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* Logo Uploading End*/}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<FaEdit color="gray.500" />}
                  />
                  <Input
                    isRequired={true}
                    _placeholder={{ color: 'gray.300' }}
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    type="text"
                    placeholder="Description"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<FaWallet color="gray.500" />}
                  />
                  <Input
                    isRequired={true}
                    _placeholder={{ color: 'gray.300' }}
                    type="text"
                    value={walletAddress}
                    placeholder="Wallet Address"
                    required
                    disabled
                  />
                </InputGroup>
              </FormControl>

              <Button
                borderRadius={20}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Have Account?{' '}
        <Link color="teal.500" href={'/login'}>
          Sign In
        </Link>
      </Box>
      <Box>
        User Sign Up?{' '}
        <Link color="teal.500" href={'/Register'}>
          User SignUp
        </Link>
      </Box>
    </Flex>
  );
};

const NgoRegister = () => {
  const { ethereum } = window;
  const [isMetamaskInstalled] = useState(ethereum !== undefined);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const requestMetamaskLogin = async () => {
    await ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        setWalletAddress(accounts[0]);
        console.log('Wallet Address: ', walletAddress);
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  };

  useEffect(() => {
    if (walletAddress !== undefined || walletAddress !== '') {
      ethereum.on('accountsChanged', async accounts => {
        if (accounts.length === 0) {
          console.log('User wallet has disconnected');
          setWalletAddress(undefined);
          setIsDisconnected(true);
        }
      });
    }

    if (isMetamaskInstalled) {
      console.log('Metamask in installed');
      if (requestMetamaskLogin()) {
      } else {
        setWalletAddress(undefined);
      }
    } else {
      console.log('Metamask in not installed');
    }
    // eslint-disable-next-line
  }, [ethereum, isMetamaskInstalled, walletAddress]);

  return (
    <>
      <Flex
        width={'100vw'}
        justifyContent={'center'}
        justifyItems={'center'}
        pos={'fixed'}
        mt={'7rem'}
      >
        <VStack justifyContent={'center'}>
          {walletAddress && walletAddress !== '' ? (
            <>
              <CharitySignup walletAddress={walletAddress} />
            </>
          ) : (
            <>
              {!isDisconnected ? (
                <>
                  <ConnectingToWallet />
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setIsDisconnected(!requestMetamaskLogin());
                    }}
                  >
                    Retry
                  </Button>
                </>
              )}
            </>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default NgoRegister;
