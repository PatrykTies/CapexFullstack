import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import NextImage from 'next/image';
import { auth } from '../lib/mutations';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isSignup = mode === 'signup';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const optional = isSignup ? { firstName, lastName } : null;

    await auth(mode, { email, password, ...optional });
    setIsLoading(false);
    router.push('/');
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex justify="center" align="center" height="100px" borderBottom="white 1px solid">
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <Input
                  placeholder="firstName"
                  type="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  placeholder="lastName"
                  type="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
            <Input placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
