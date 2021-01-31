/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/Screens/Quiz';

function OtherQuiz({ externalDB }) {
  return (
    <ThemeProvider theme={externalDB.theme}>
      <QuizScreen
        externalQuestions={externalDB.questions}
        externalBg={externalDB.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const externalDB = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Falha em pegar os dados');
    })
    .then((convertedResponse) => convertedResponse)
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      externalDB,
    },
  };
}

export default OtherQuiz;
