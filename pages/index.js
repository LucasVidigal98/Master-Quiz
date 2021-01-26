import styled from 'styled-components';
import db from '../db.json';

import { Widget } from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';

export const QuizConatiner = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizConatiner>
        <Widget>
          <Widget.Header>
              <h1>The legend of zelda</h1>
            </Widget.Header>
            
            <Widget.Content>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni praesentium a rem cum ducimus, sunt cumque optio.</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quiz da galera</h1>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia natus pariatur, aut sit temporibus dolorem ipsa? Asperiores dolore ducimus sunt iste tenetur? Neque, quibusdam. Architecto fugiat accusamus nobis labore sunt.</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizConatiner>
      <GitHubCorner />
    </QuizBackground>
  );
}
