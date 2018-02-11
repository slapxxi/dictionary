// @flow
import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { Slider } from '.';
import { theme } from '../lib/constants';
import type { DictionaryEntry } from '../store/types';

type Props = { words: Array<DictionaryEntry>, index?: number };

class WordList extends Component<Props> {
  componentWillMount() {
    this.checkErrors(this.props);
  }

  componentWillReceiveProps(props: Props) {
    this.checkErrors(props);
  }

  checkErrors = (props: Props) => {
    const { index = 0 } = props;
    if (this.isOutOfRange(props)) {
      throw new Error(
        `Words contain ${
          props.words.length
        } items but provided index ${index}`,
      );
    }
  };

  getEntry = () => {
    const { index = 0 } = this.props;
    return this.props.words[index];
  };

  isOutOfRange = (props: Props) => {
    if (isEmpty(props.words)) {
      return false;
    }
    const { index = 0 } = props;
    return index > props.words.length - 1 || index < 0;
  };

  renderExamples = (entry: DictionaryEntry) => {
    return (
      <List>
        {entry.examples.map((example) => (
          <ListItem key={example}>&quot;{example}&quot;</ListItem>
        ))}
      </List>
    );
  };

  renderThesaurus = (entry: DictionaryEntry) => {
    return <Thesaurus>{entry.thesaurus.join(', ')}</Thesaurus>;
  };

  render() {
    const { words, index } = this.props;
    if (isEmpty(words)) {
      return null;
    }
    const entry = this.getEntry();
    return (
      <Container>
        <Slider
          data={words}
          index={index}
          renderSlide={({ item }) => (
            <Slide>
              <Transcription>/{item.transcription}/</Transcription>
              <Word id="word" learnt={item.learnt}>
                {item.word}
              </Word>
              <Definition>{item.definition}</Definition>
            </Slide>
          )}
        />
        <Details>
          <Heading>Examples</Heading>
          {this.renderExamples(entry)}
          <Heading>Thesaurus</Heading>
          {this.renderThesaurus(entry)}
        </Details>
      </Container>
    );
  }
}

const Container = glamorous.div({
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Details = glamorous.div({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  top: '100%',
  left: 0,
  right: 0,
  color: theme.text,
});

const Heading = glamorous.h1({
  marginTop: 32,
  marginBottom: 32,
  fontWeight: 'lighter',
  fontFamily: 'serif',
  fontStyle: 'italic',
  color: theme.subtext,
});

const List = glamorous.ul({
  marginTop: 20,
  listStyle: 'circle',
});

const ListItem = glamorous.li({
  padding: 10,
  fontSize: 18,
  fontStyle: 'italic',
});

const Thesaurus = glamorous.div({
  fontSize: 18,
});

const Slide = glamorous.div({
  display: 'flex',
  flex: '1 0 100%',
  flexDirection: 'column',
  alignItems: 'center',
});

const Word = glamorous.h1(({ learnt }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  fontSize: 64,
  fontWeight: 'normal',
  color: theme.text,
  textShadow: '3px 3px rgba(0,0,0,0.3)',
  textDecoration: learnt ? 'line-through' : null,
}));

const Transcription = glamorous.div({
  flex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  fontWeight: 'lighter',
  color: theme.subtext,
});

const Definition = glamorous.div({
  maxWidth: '80%',
  flex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  textAlign: 'center',
  color: theme.subtext,
});

export default WordList;
