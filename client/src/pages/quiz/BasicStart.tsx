import React from 'react';
import { useQuiz } from './quizHook';
import { Button, IconButton } from '@mui/material';

function BasicStart() {
  const { quiz, dispatch } = useQuiz();

  const handleClick = () => {
    dispatch({ isStart: true, orderQuestion: 1 });
  };

  return (
    <>
      {/* <IconButton onClick={handleOpenUserMenu}>
        <SettingOutlinedIcon />
      </IconButton> */}

      <h3 className="dark:text-white">
        Take the quiz of Vani Coins to get instantly {quiz?.selectedVersion?.reward} Coins
      </h3>
      <Button
        type="button"
        onClick={handleClick}
        className="max-w-[250px] w-full block mx-auto"
        variant={'contained'}
      >
        Start Quiz
      </Button>
      <IconButton></IconButton>
    </>
  );
}

export default BasicStart;
