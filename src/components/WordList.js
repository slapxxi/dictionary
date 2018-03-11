// @flow
import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { tween } from 'popmotion';
import { Slider, Keyboard } from '.';
import { pop } from '../lib/animations';
import { theme } from '../lib/constants';
import type { DictionaryEntry } from '../store/types';

type Props = {
  words: Array<DictionaryEntry>,
  expand?: boolean,
  index?: number,
  onToggle: (index: number) => void,
  onShow?: (index: number) => void,
};

type State = {
  animatedContainer: number,
  animatedWord: number,
};

class WordList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { expand = false } = props;
    const animatedContainer = expand ? -100 : 0;
    this.state = {
      animatedWord: 1,
      animatedContainer,
    };
  }

  componentWillMount() {
    this.checkErrors(this.props);
  }

  componentWillReceiveProps(props: Props) {
    this.checkErrors(props);
    this.animate(props);
  }

  animate = ({ expand }: Props) => {
    const to = expand ? -100 : 0;
    tween({
      from: this.state.animatedContainer,
      to,
    }).start({
      update: (value) => {
        this.setState({ animatedContainer: value });
      },
    });
  };

  handlePress = ({ key }: KeyboardEvent) => {
    if (key === ' ') {
      this.handleClick();
    }
  };

  handleClick = () => {
    if (this.props.expand) {
      return;
    }
    pop({ to: 1.4 }).start({
      update: ({ scale }) => {
        this.setState({ animatedWord: scale });
      },
    });
    const { index = 0 } = this.props;
    this.props.onToggle(index);
  };

  handleTransitionEnd = (index: number) => {
    if (this.props.onShow) {
      this.props.onShow(index);
    }
  };

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

  render() {
    const { words, index = 0 } = this.props;
    if (isEmpty(words)) {
      return null;
    }
    const entry = this.getEntry();
    const wordStyle = {
      transform: `scale(${this.state.animatedWord})`,
    };
    const containerStyle = {
      transform: `translateY(${this.state.animatedContainer}%)`,
    };
    return (
      <Container style={containerStyle}>
        <Keyboard onPress={this.handlePress} />
        <Slider
          data={words}
          index={index}
          onTransitionEnd={this.handleTransitionEnd}
          renderSlide={({ item, style, index }) => (
            <Slide style={style}>
              <Transcription>/{item.transcription}/</Transcription>
              <Word
                id={`word_${index}`}
                learnt={item.learnt}
                viewCount={item.viewCount}
                onClick={this.handleClick}
                style={wordStyle}
              >
                {item.word}
              </Word>
              <Definition>{item.definition}</Definition>
            </Slide>
          )}
        />
        <Details>
          <DetailsSection>
            <Heading>Examples</Heading>
            {this.renderExamples(entry)}
          </DetailsSection>
          <DetailsSection>
            <Heading>Thesaurus</Heading>
            {this.renderThesaurus(entry)}
          </DetailsSection>
        </Details>
      </Container>
    );
  }

  renderExamples = (entry: DictionaryEntry) => {
    return (
      <List>
        {entry.examples.map((example) => (
          <ListItem key={example}>{example}</ListItem>
        ))}
      </List>
    );
  };

  renderThesaurus = (entry: DictionaryEntry) => {
    return (
      <List>
        {entry.thesaurus.map((example) => (
          <ListItem key={example}>{example}</ListItem>
        ))}
      </List>
    );
  };
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
  boxSizing: 'border-box',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-around',
  top: '100%',
  left: '10%',
  right: '10%',
  bottom: '-90%',
  paddingTop: 48,
  color: theme.text,
  overflow: 'scroll',
});

const DetailsSection = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '33%',
  maxWidth: '50%',
});

const Heading = glamorous.h1({
  marginBottom: 32,
  fontWeight: 'lighter',
  fontFamily: 'serif',
  fontStyle: 'italic',
  color: theme.text,
});

const List = glamorous.ul({
  margin: 0,
  padding: 0,
  listStyle: 'circle',
  listStylePosition: 'inside',
  color: theme.subtext,
});

const ListItem = glamorous.li({
  marginBottom: 18,
  fontSize: 18,
  fontStyle: 'italic',
});

const Slide = glamorous.div({
  display: 'flex',
  flex: '1 0 100%',
  flexDirection: 'column',
  alignItems: 'center',
});

const Word = glamorous.h1(
  ({ learnt }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontSize: 64,
    fontWeight: 'normal',
    color: theme.text,
    textShadow: '3px 3px rgba(0,0,0,0.3)',
    textDecoration: learnt ? 'line-through' : null,
    cursor: 'pointer',
  }),
  ({ viewCount }) =>
    viewCount === 0 && {
      ':after': {
        position: 'absolute',
        left: '100%',
        top: 0,
        display: 'block',
        content: ' ',
        backgroundColor: theme.badge,
        borderRadius: '50%',
        width: 12,
        height: 12,
        marginRight: -6,
        fontSize: 0,
        color: 'transparent',
      },
    },
);

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
