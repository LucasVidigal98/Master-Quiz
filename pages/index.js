import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';

import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizConatiner from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizLogo from '../src/components/QuizLogo';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizConatiner>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Ayrton Senna é do Brasil !!</h1>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`./quiz?name=${name}`);
            }}
            >
              <Input
                placeholder="Diz aí seu nome"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quiz sobre Ayrton Senna</h1>

            <p>Teste seus conhecimentos sobre essa lenda do automobilismo mundial</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizConatiner>
      <GitHubCorner />
    </QuizBackground>
  );
}
