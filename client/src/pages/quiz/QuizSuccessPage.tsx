import { IUserQuizRecord } from '@/types/servicesType';
import { Button, Stack } from '@mui/material';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

function QuizSuccessPage() {
  const data = useLoaderData() as IUserQuizRecord;

  return (
    <>
      <Stack
        className="max-w-[700px] w-full bg-light-Bg dark:bg-dark-Bg mx-auto mt-28"
        alignItems={'center'}
        gap={'1.25rem'}
        justifyContent={'center'}
      >
        <h2 className="text-[2.25rem] text-center font-[400] font-PlayfairDisplay dark:text-white">
          You solved all the quizzes correctly
        </h2>
        <p className={'text-center text-[1.125rem] font-normal mb-5 dark:text-white mt-2'}>
          {data.quizVersion.reward} Vani coins Coupon has arrived
        </p>
        <Button className="max-w-[250px]  w-full block mx-auto " variant={'contained'}>
          <Link to={'/profile'}> Check your Profile</Link>
        </Button>
      </Stack>
    </>
  );
}

export default QuizSuccessPage;
