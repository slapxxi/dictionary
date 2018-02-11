// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { theme } from '../lib/constants';
import type { DictionaryEntry } from '../store/types';

type State = { index: number };

type Props = { words: Array<DictionaryEntry>, index?: number };

class WordList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { index = 0 } = props;
    this.state = { index };
  }

  componentWillMount() {
    if (this.isOutOfRange()) {
      const { words } = this.props;
      const { index } = this.state;
      throw new Error(
        `Words contain ${
          words.length
        } items but provided index ${index}`,
      );
    }
  }

  getEntry = () => {
    return this.props.words[this.state.index];
  };

  isOutOfRange = () => {
    if (this.isEmpty()) {
      return false;
    }
    const { index = 0 } = this.props;
    return index > this.props.words.length - 1;
  };

  isEmpty = () => {
    return this.props.words.length === 0;
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
    if (this.isEmpty()) {
      return null;
    }
    const entry = this.getEntry();
    return (
      <Container>
        <Word id="word" learnt={entry.learnt}>
          {entry.word}
        </Word>
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

export default WordList;
