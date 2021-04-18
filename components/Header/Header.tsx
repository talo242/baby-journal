import { useRouter } from 'next/router';
import useSWR from 'swr';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Button from '../Button';

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 8px 12px 24px rgba(84, 146, 228, 0.12);
  border-radius: 8px;
  height: 64px;
  align-items: center;
  padding: 0 16px;
`;

const Header = () => {
  const router = useRouter();
  const { mutate: mutateUser } = useSWR('/api/user');

  const handleLogout = async () => {
    const res = await fetch('/api/logout');
    if (res.ok) {
      await mutateUser(null);
      await router.push('/login');
    }
  };

  return (
    <HeaderContainer>
      <Link href="/">
          <Image src="/logo.svg" alt="babydo logo" width="97" height="23" />
      </Link>
      <Button variant="outlined" onClick={handleLogout}>Logout</Button>
    </HeaderContainer>
  );
};

export default Header;
