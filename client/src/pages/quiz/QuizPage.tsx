import React from 'react';
import { QuizProvider } from './context/quizCtx';
import QuizForm from './QuizForm';
import { useLoaderData } from 'react-router-dom';

function QuizPage() {
  return (
    <div className="mt-28">
      <QuizProvider>
        <QuizForm />
      </QuizProvider>
    </div>
  );
}

export default QuizPage;
