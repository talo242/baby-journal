import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { H1 } from '../Typography/Typography';
import Colors from '../Colors';
import useQuery from '../../utils/useQuery';
import { FETCH_ALL_ROUTINES } from '../../graphql/queries';
import Loader from '../Loader/Loader';
import { RoutineResponse } from '../../types/Routine';

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
  const { data, error, loading } = useQuery<RoutineResponse>(
    FETCH_ALL_ROUTINES,
    token
  );

  if (loading) return <Loader />;
  if (error) return <div>Error returning all the routines</div>;

  return (
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
    </RoutineContainer>
  );
};

export default RoutineList;
