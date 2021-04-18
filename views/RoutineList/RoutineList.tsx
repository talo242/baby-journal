import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR from 'swr';
import { H1 } from '../../components/Typography/Typography';
import Colors from '../../components/Colors';
import { FETCH_ALL_ROUTINES } from '../../graphql/queries';
import Loader from '../../components/Loader/Loader';
import CreateRoutineModal from './CreateRoutineModal';
import { graphQLClient } from '../../utils/graphql-client';
import { CreateNewButton } from '../../components/Button/Button';

interface RoutineListProps {
  token: string;
}

const RoutineContainer = styled.div`
  flex: 0 1 35%;
  padding-right: 16px;
`;

const RoutineListElement = styled.li`
  padding: 5px 16px;
  list-style: none;
  border-bottom: 1px solid ${Colors.gray2};

  a {
    color: ${Colors.gray};
    text-decoration: none;
    display: block;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    color: white;
    background-color: ${Colors.primary};
    border-bottom: none;
    border-radius: 4px;
    
    a {
      color: white;
    }
  `}
`;

const RoutineList = (props: RoutineListProps) => {
  const { token } = props;
  const router = useRouter();
  const { rid } = router.query;
  const [createRoutine, setCreateRoutine] = useState<boolean>(false);
  const fetcher = async (query) => await graphQLClient(token).request(query);
  const { data, error, mutate: updateRoutines } = useSWR(
    FETCH_ALL_ROUTINES,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const toggleCreateRoutine = () => setCreateRoutine(!createRoutine);

  if (!data && !error) return <Loader />;
  if (error) return <div>Error returning all routines</div>;

  return (
    <>
      <RoutineContainer>
        <H1>Routines</H1>
        {data.allRoutines.data.map((routine) => (
          <RoutineListElement
            key={routine._id}
            isSelected={rid && rid === routine._id}
          >
            <Link href={`/routine/${routine._id}`}>{routine.title}</Link>
          </RoutineListElement>
        ))}
        <CreateNewButton onClick={toggleCreateRoutine}>
          + Create new routine
        </CreateNewButton>
      </RoutineContainer>
      {createRoutine && (
        <CreateRoutineModal
          token={token}
          onClose={toggleCreateRoutine}
          updateRoutines={updateRoutines}
        />
      )}
    </>
  );
};

export default RoutineList;
