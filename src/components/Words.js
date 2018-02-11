import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import { parallel, css } from 'popmotion';
import { percent } from 'style-value-types';
import ArrowDown from 'react-icons/lib/fa/arrow-down';
import { pop, translate, slideIn, slideOut } from '../lib/animations';
import { learn } from '../store/actions';
import { theme } from '../lib/constants';

class Words extends Component {
  animations = [];

  state = {
    expanded: false,
    index: 0,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.styler = css(this.containerRef);
    this.slideStyler = css(this.slideRef);
    this.nextSlideStyler = css(this.nextSlideRef);
    this.prevSlideStyler = css(this.prevSlideRef);
    this.iconStyler = css(this.iconRef);
    this.wordStyler = css(this.wordRef);
    this.nextSlideButtonStyler = css(this.nextSlideButtonRef);
    this.prevSlideButtonStyler = css(this.prevSlideButtonRef);
  }

  componentDidUpdate() {
    this.animations = [];
    this.resetStyles();
  }

  handleKeyPress = ({ key }) => {
    const SPACE = ' ';
    if (key === 'ArrowDown' && !this.state.expanded) {
      this.startHidingAnimation();
    }
    if (key === 'ArrowUp' && this.state.expanded) {
      this.startShowingAnimation();
    }
    if (key === 'ArrowRight' && !this.state.expanded) {
      this.showNextSlide();
    }
    if (key === 'ArrowLeft' && !this.state.expanded) {
      this.showPrevSlide();
    }
    if (key === SPACE) {
      if (!this.state.expanded) {
        this.learnWord();
      }
    }
  };

  learnWord = () => {
    const word = this.wordStyler;
    const item = this.props.data[this.state.index];
    if (this.animations.length === 0) {
      pop({ styler: this.wordStyler, to: 1.5 }).start(word.set);
      this.props.learn(item.id);
    }
  };

  handleClick = () => {
    if (this.state.expanded) {
      this.startShowingAnimation();
    } else {
      this.startHidingAnimation();
    }
  };

  getSlides = () => {
    const { index } = this.state;
    const { data } = this.props;
    const slide = data[index];
    const prevSlide = data[index - 1] || {};
    const nextSlide = data[index + 1] || {};
    return { slide, nextSlide, prevSlide };
  };

  showNextSlide = () => {
    if (!this.isLastItem()) {
      if (this.animations.length === 0) {
        this.startNextSlideAnimation();
      }
    }
  };

  showPrevSlide = () => {
    if (!this.isFirstItem()) {
      if (this.animations.length === 0) {
        this.startPrevSlideAnimation();
      }
    }
  };

  getProps = (styler) => {
    return {
      translate: percent.parse(styler.get('x')),
      opacity: styler.get('opacity'),
    };
  };

  isFirstItem = () => {
    return this.state.index === 0;
  };

  isLastItem = () => {
    return this.state.index === this.props.data.length - 1;
  };

  update = (styler, { translate, opacity }) => {
    styler.set({
      opacity,
      x: percent.transform(translate),
    });
  };

  startNextSlideAnimation = () => {
    this.stopAnimations();
    const slide = this.slideStyler;
    const nextSlide = this.nextSlideStyler;
    const prevSlide = this.prevSlideStyler;
    const button = this.nextSlideButtonStyler;
    this.animations.push(
      parallel(
        slideOut({ styler: slide, to: -100 }),
        slideIn({ styler: nextSlide, to: -100 }),
        slideOut({ styler: prevSlide, to: -300 }),
      ).start({
        update: ([current, next, prev]) => {
          const n = next || this.getProps(nextSlide);
          const p = prev || this.getProps(prevSlide);
          this.update(slide, current);
          this.update(prevSlide, p);
          this.update(nextSlide, n);
        },
        complete: () => {
          this.setState((prevState) => {
            const index = this.isLastItem()
              ? prevState.index
              : prevState.index + 1;
            return { index };
          });
        },
      }),
    );
    pop({ styler: button }).start(button.set);
  };

  startPrevSlideAnimation = () => {
    this.stopAnimations();
    const slide = this.slideStyler;
    const prevSlide = this.prevSlideStyler;
    const nextSlide = this.nextSlideStyler;
    const button = this.prevSlideButtonStyler;
    this.animations.push(
      parallel(
        slideOut({ styler: slide, to: 100 }),
        slideIn({ styler: prevSlide, to: -200 }),
        slideOut({ styler: nextSlide, to: 0 }),
      ).start({
        update: ([current, prev, next]) => {
          const n = next || this.getProps(nextSlide);
          const p = prev || this.getProps(prevSlide);
          this.update(slide, current);
          this.update(prevSlide, p);
          this.update(nextSlide, n);
        },
        complete: () => {
          this.setState((prevState) => {
            const index = this.isFirstItem()
              ? 0
              : prevState.index - 1;
            return { index };
          });
        },
      }),
    );
    pop({ styler: button }).start(button.set);
  };

  startHidingAnimation = () => {
    const container = this.styler;
    const icon = this.iconStyler;
    translate({ styler: container, dimension: 'y', to: -90 }).start({
      update: ({ y }) => {
        icon.set('rotate')(y * 2);
        container.set('y')(percent.transform(y));
      },
      complete: () => this.setState({ expanded: true }),
    });
  };

  startShowingAnimation = () => {
    const container = this.styler;
    const icon = this.iconStyler;
    translate({ styler: container, dimension: 'y', to: 0 }).start({
      update: ({ y }) => {
        icon.set('rotate')(y * 2);
        container.set('y')(percent.transform(y));
      },
      complete: () => this.setState({ expanded: false }),
    });
  };

  resetStyles = () => {
    this.slideStyler.set({ x: 0, opacity: 1 });
    this.nextSlideStyler.set({ x: 0, opacity: 0 });
    this.prevSlideStyler.set({ x: -300, opacity: 0 });
  };

  stopAnimations = () => {
    this.animations.forEach((a) => a.stop());
    this.animations = [];
  };

  setRef = (ref) => {
    this.containerRef = ref;
  };

  setWordRef = (ref) => {
    this.wordRef = ref;
  };

  setSlideRef = (ref) => {
    this.slideRef = ref;
  };

  setNextSlideRef = (ref) => {
    this.nextSlideRef = ref;
  };

  setPrevSlideRef = (ref) => {
    this.prevSlideRef = ref;
  };

  setIconRef = (ref) => {
    this.iconRef = ref;
  };

  setNextSlideButtonRef = (ref) => {
    this.nextSlideButtonRef = ref;
  };

  setPrevSlideButtonRef = (ref) => {
    this.prevSlideButtonRef = ref;
  };

  renderExamples = (slides) => {
    return (
      <List>
        {slides.examples.map((example, index) => (
          <ListItem key={`${index}_word`}>
            &quot;{example}&quot;
          </ListItem>
        ))}
      </List>
    );
  };

  renderThesaurus = (slides) => {
    return <Thesaurus>{slides.thesaurus.join(', ')}</Thesaurus>;
  };

  render() {
    const { slide, prevSlide, nextSlide } = this.getSlides();
    return (
      <Container innerRef={this.setRef}>
        {/* <NextSlideButton innerRef={this.setNextSlideButtonRef}>
          {this.isLastItem() ? null : (
            <Icon
              size={24}
              css={{
                transform: 'rotate(-90deg)',
                ':hover': { transform: 'scale(1.1) rotate(-90deg)' },
              }}
            />
          )}
        </NextSlideButton>
        <PrevSlideButton innerRef={this.setPrevSlideButtonRef}>
          {this.isFirstItem() ? null : (
            <Icon
              size={24}
              css={{
                transform: 'rotate(90deg)',
                ':hover': { transform: 'scale(1.1) rotate(90deg)' },
              }}
            />
          )}
        </PrevSlideButton>
        <Slider>
          <Slide innerRef={this.setSlideRef}>
            <Transcription>/{slide.transcription}/</Transcription>
            <Word innerRef={this.setWordRef} learnt={slide.learnt}>
              {slide.word}
            </Word>
            <Definition>{slide.definition}</Definition>
          </Slide>
          <Slide innerRef={this.setNextSlideRef}>
            <Transcription>/{nextSlide.transcription}/</Transcription>
            <Word learnt={nextSlide.learnt}>{nextSlide.word}</Word>
            <Definition>{nextSlide.definition}</Definition>
          </Slide>
          <Slide innerRef={this.setPrevSlideRef}>
            <Transcription>/{prevSlide.transcription}/</Transcription>
            <Word learnt={prevSlide.learnt}>{prevSlide.word}</Word>
            <Definition>{prevSlide.definition}</Definition>
          </Slide>
        </Slider> */}
        <IconContainer innerRef={this.setIconRef}>
          <Icon size={24} onClick={this.handleClick} />
        </IconContainer>
        <Details>
          <Heading>Examples</Heading>
          {this.renderExamples(slide)}
          <Heading>Thesaurus</Heading>
          {this.renderThesaurus(slide)}
        </Details>
      </Container>
    );
  }
}

const Slider = glamorous.div({
  display: 'flex',
  flex: 1,
  flexBasis: '100%',
  alignSelf: 'stretch',
});

const Slide = glamorous.div({
  display: 'flex',
  flex: '1 0 100%',
  flexDirection: 'column',
  alignItems: 'center',
});

const NextSlideButton = glamorous.div({
  position: 'absolute',
  right: 20,
  marginTop: -24,
});

const PrevSlideButton = glamorous.div({
  position: 'absolute',
  left: 20,
  marginTop: -24,
});

const IconContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
});

const Icon = glamorous(ArrowDown)({
  flex: 1,
  transition: 'all 0.3s',
  ':hover': {
    color: theme.text,
    transform: 'scale(1.1)',
  },
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

const Heading = glamorous.h1({
  marginTop: 32,
  marginBottom: 32,
  fontWeight: 'lighter',
  fontFamily: 'serif',
  fontStyle: 'italic',
  color: theme.subtext,
});

const Container = glamorous.div({
  flex: 1,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
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

const Transcription = glamorous.div({
  flex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  fontWeight: 'lighter',
  color: theme.subtext,
});

const Word = glamorous.h1(({ learnt }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  wordBreak: 'break-all',
  fontSize: 64,
  fontWeight: 'normal',
  color: theme.text,
  textShadow: '3px 3px rgba(0,0,0,0.3)',
  textDecoration: learnt ? 'line-through' : null,
}));

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

const Thesaurus = glamorous.div({
  fontSize: 18,
});

const enhance = connect(
  ({ dictionary }) => ({
    mode: dictionary.mode,
    data: dictionary.entries,
  }),
  { learn },
);

export default enhance(Words);
