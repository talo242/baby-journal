import { useRouter } from 'next/router';
import useSWR from 'swr';

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
    <div>
      <h1>BabyDo</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
