// @flow
import * as React from 'react';
import Rect from '@reach/rect';

import FixedCenter from '../components/FixedCenter';
import Text from '../components/Text';
import ViewBox from '../components/ViewBox';

// parse markdown links
function linkdown(text: string): string {
  return text.replace(/\[(.+)\]\((.+)\)/, (_, link, url, offset, string) => {
    if (!url.match(/^https?:\/\//)) {
      return link;
    }
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" tabindex="1">${link}</a>`;
  });
}

type Props = {
  index: number,
  sid: string,
  body: string,
};

type State = {
  opacity: number,
  scale: number,
};

export default class MessageBox extends React.Component<Props, State> {
  state = {
    opacity: 0.0,
    scale: 1,
  };

  viewBox: { current: null | HTMLElement } = React.createRef();

  intersectionObserver: IntersectionObserver;

  componentDidMount() {
    this.intersectionObserver = new IntersectionObserver(
      entries =>
        entries.forEach(
          ({ isIntersecting, intersectionRatio, boundingClientRect }) => {
            if (!isIntersecting) {
              this.setState({
                opacity: 0,
                scale: 1,
              });
            } else {
              this.setState(state => {
                // prettier-ignore
                return {
                    opacity: intersectionRatio <= 0.1 ? 0 : intersectionRatio,
                    scale: boundingClientRect.y > 0 ? 2 - intersectionRatio : intersectionRatio,
                  };
              });
            }
          }
        ),
      {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({ length: 10 }, (_, index) => index * 0.1),
      }
    );

    if (this.viewBox.current) {
      this.intersectionObserver.observe(this.viewBox.current);
    }
  }

  componentWillUnmount() {
    if (this.viewBox.current) {
      this.intersectionObserver.unobserve(this.viewBox.current);
    }
  }

  render() {
    return (
      <>
        <FixedCenter>
          <Text
            tabIndex={1}
            onFocus={() => {
              if (this.viewBox.current) {
                this.viewBox.current.scrollIntoView({
                  behavior: 'smooth',
                });
              }
            }}
            style={{
              transition: 'opacity 0.1s linear, transform 0.1s linear',
              opacity: this.state.opacity,
              transform: `scale(${this.state.scale})`,
              pointerEvents: this.state.opacity >= 0.9 && 'initial',
            }}
            dangerouslySetInnerHTML={{ __html: linkdown(this.props.body) }}
          />
        </FixedCenter>
        <ViewBox ref={this.viewBox} />
      </>
    );
  }
}
