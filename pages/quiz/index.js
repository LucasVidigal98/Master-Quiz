/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import db from '../../db.json';

import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Widget.Buffering src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="Buffering" />
      </Widget.Content>
    </Widget>
  );
}

function ResultsWidget({ numberOfHits }) {
  const router = useRouter();
  return (
    <Widget>
      <Widget.Header>
        Resultados
      </Widget.Header>

      <Widget.Content>
        <p>
          {router.query.name}
          {' '}
          , você acertou
          {' '}
          { numberOfHits.reduce((count, res) => {
            const isCorrect = res === true;
            if (isCorrect) {
              return count + 1;
            }
            return count;
          }) }
          {' '}
          de questões
          {' '}
          {numberOfHits.length}
          , parabéns!
        </p>
        <ul>
          {numberOfHits.map((result, index) => (
            <li key={index}>
              <Widget.Result
                as="label"
                htmlFor={index}
                style={{ background: result ? '#4CAF50' : '#FF5722' }}
              >
                #
                {index + 1}
                {' '}
                Resultado:
                {result && ' Acertou!'}
                {!result && ' Errou!'}
              </Widget.Result>
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  questionAnswer,
  totalQuestions,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [confirmed, setConfirmed] = React.useState(false);
  const isCorrect = selectedAlternative === questionAnswer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setConfirmed(true);
            setTimeout(() => {
              setConfirmed(false);
              onSubmit(questionAnswer, selectedAlternative);
              setSelectedAlternative(undefined);
            }, 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const selectedAlternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={confirmed && selectedAlternativeStatus}
              >
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {(isCorrect && confirmed) && <p>Você acertou!</p>}
          {(!isCorrect && confirmed) && <p>Voceê errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const [numberOfHits, setnumberOfHits] = React.useState([]);

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz(questionAnswer, selectedAlternative) {
    if (questionAnswer === selectedAlternative) {
      setnumberOfHits([...numberOfHits, true]);
    } else {
      setnumberOfHits([...numberOfHits, false]);
    }

    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            questionAnswer={question.answer}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultsWidget numberOfHits={numberOfHits} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
