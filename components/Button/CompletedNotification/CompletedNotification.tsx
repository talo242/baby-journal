import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const NotificationContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 32px;
  right: 32px;
  background-color: white;
  padding: 16px 32px;
  border-radius: 8px;
  width: 100%;
  max-width: 360px;
  box-shadow: 8px 12px 24px rgba(84, 146, 228, 0.12);
`;

const NotificationP = styled.p`
  margin: 4px 0;
`;

const Scale = keyframes`
  0% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const AnimatedPath = styled.path`
  opacity: 1;
  transform-origin: center;
  animation: ${Scale} 1s ease-in-out ${({ delay }) => `${delay}ms`} infinite;
`;

const getDelay = () => Math.random() * (2500 - 600) + 600;

const CompletedNotification = () => {
  return (
    <NotificationContainer>
      <div>
        <NotificationP>
          <b>Congrats!</b>
        </NotificationP>
        <NotificationP>You completed all your tasks</NotificationP>
      </div>
      <svg
        width="54"
        height="42"
        viewBox="0 0 54 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <AnimatedPath
          delay={getDelay()}
          d="M26.6241 17.7474C28.2449 16.7536 28.7532 14.634 27.7594 13.0132C26.7657 11.3924 24.6461 10.8841 23.0253 11.8779C21.4045 12.8716 20.8962 14.9912 21.89 16.612C22.8837 18.2328 25.0033 18.7411 26.6241 17.7474Z"
          fill="#5492E4"
        />
        <AnimatedPath
          delay={getDelay()}
          d="M12.7555 28.8747C13.4631 28.4408 13.685 27.5155 13.2511 26.8079C12.8173 26.1003 11.8919 25.8783 11.1843 26.3122C10.4767 26.7461 10.2548 27.6714 10.6886 28.379C11.1225 29.0866 12.0479 29.3086 12.7555 28.8747Z"
          fill="#6B9FE3"
        />
        <AnimatedPath
          delay={getDelay()}
          d="M53.8115 34.4419C53.9156 33.6287 53.3409 32.8851 52.5278 32.781C51.7147 32.677 50.9712 33.2518 50.8671 34.065C50.763 34.8781 51.3377 35.6217 52.1508 35.7258C52.9639 35.8299 53.7074 35.2551 53.8115 34.4419Z"
          fill="#4A81C9"
        />
        <AnimatedPath
          delay={getDelay()}
          d="M43.5941 3.91988C43.6596 3.40887 43.2984 2.94158 42.7874 2.87617C42.2765 2.81075 41.8092 3.17198 41.7438 3.683C41.6784 4.19402 42.0396 4.6613 42.5505 4.72672C43.0615 4.79213 43.5287 4.4309 43.5941 3.91988Z"
          fill="#4A81C9"
        />
        <AnimatedPath
          delay={getDelay()}
          d="M46.4554 10.9614L48.0311 15.3919C48.0986 15.5815 48.2321 15.732 48.4008 15.8078L52.3372 17.5813C52.8934 17.8319 52.8934 18.7179 52.3372 18.9686L48.4008 20.7421C48.2323 20.8181 48.0988 20.9685 48.0311 21.1581L46.4554 25.5886C46.2328 26.2145 45.4456 26.2145 45.223 25.5886L43.6473 21.1581C43.5798 20.9685 43.4463 20.8179 43.2777 20.7421L39.3412 18.9686C38.785 18.7181 38.785 17.8321 39.3412 17.5813L43.2777 15.8078C43.4463 15.7318 43.5797 15.5815 43.6473 15.3919L45.223 10.9614C45.4456 10.3355 46.2328 10.3355 46.4554 10.9614V10.9614Z"
          fill="#88E0F1"
        />
        <AnimatedPath
          delay={getDelay()}
          d="M2.80006 19.986L3.3561 21.3751C3.3799 21.4346 3.42703 21.4818 3.48653 21.5055L4.8756 22.0616C5.07186 22.1401 5.07186 22.4179 4.8756 22.4965L3.48653 23.0525C3.4271 23.0764 3.37996 23.1235 3.3561 23.183L2.80006 24.572C2.72153 24.7683 2.44372 24.7683 2.36519 24.572L1.80916 23.183C1.78536 23.1235 1.73822 23.0763 1.67872 23.0525L0.28965 22.4965C0.0933915 22.418 0.0933915 22.1402 0.28965 22.0616L1.67872 21.5055C1.73822 21.4817 1.78529 21.4346 1.80916 21.3751L2.36519 19.986C2.44372 19.7898 2.72153 19.7898 2.80006 19.986V19.986Z"
          fill="#B2E7F1"
        />
        <AnimatedPath
          delay={getDelay()}
          d="M8.96827 3.85613L11.4596 2.98403C11.5662 2.9467 11.6511 2.87213 11.6942 2.77766L12.7009 0.57225C12.8432 0.260654 13.3405 0.263202 13.4796 0.576241L14.4638 2.79185C14.5059 2.88665 14.5899 2.96209 14.6962 3.00062L17.1785 3.89821C17.5291 4.02498 17.5269 4.46708 17.1749 4.59025L14.6835 5.46235C14.5769 5.49968 14.4921 5.57425 14.449 5.66872L13.4422 7.87413C13.3 8.18573 12.8027 8.18318 12.6635 7.87014L11.6794 5.65453C11.6372 5.55962 11.5532 5.48429 11.447 5.44576L8.96472 4.54817C8.61404 4.4214 8.61631 3.9793 8.96827 3.85613V3.85613Z"
          fill="#79E4F9"
        />
        <AnimatedPath
          delay={getDelay()}
          d="M26.4705 29.9479L27.6393 33.2344C27.6894 33.3752 27.7885 33.4867 27.9135 33.5429L30.8334 34.8583C31.2459 35.0443 31.2459 35.7015 30.8334 35.8874L27.9135 37.2029C27.7885 37.2593 27.6894 37.3707 27.6393 37.5113L26.4705 40.7979C26.3054 41.2622 25.7216 41.2622 25.5564 40.7979L24.3874 37.5113C24.3373 37.3707 24.2384 37.2591 24.1132 37.2029L21.1933 35.8874C20.7808 35.7015 20.7808 35.0443 21.1933 34.8583L24.1132 33.5429C24.2382 33.4865 24.3373 33.375 24.3874 33.2344L25.5564 29.9479C25.7216 29.4835 26.3055 29.4835 26.4705 29.9479V29.9479Z"
          fill="#B2E7F1"
        />
      </svg>
    </NotificationContainer>
  );
};

const NotificationWithTimeout = () => {
  const [active, setActive] = useState<boolean>(true);
  let timeout;
  useEffect(() => {
    timeout = setTimeout(() => {
      setActive(false);
    }, 4500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!active) return null;
  return <CompletedNotification />;
};

export default NotificationWithTimeout;
