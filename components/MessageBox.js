// @flow
import * as React from 'react';
import Rect from '@reach/rect';

import FixedCenter from '../components/FixedCenter';
import Text from '../components/Text';
import ViewBox from '../components/ViewBox';

type Props = {
  index: number,
  sid: string,
  body: string,
};

export default class MessageBox extends React.Component<Props> {
  render() {
    return (
      <Rect key={this.props.sid}>
        {({ ref, rect }) => {
          const offset =
            rect && Number(((rect.y * 2) / window.innerHeight).toFixed(1)) + 1;

          const opacity = offset
            ? window.innerHeight * this.props.index <=
              this.props.index * window.innerHeight + rect.y
              ? Math.abs(offset - 2)
              : offset
            : 0;
          return (
            <>
              <FixedCenter>
                <Text
                  tabIndex={1}
                  onFocus={e => {
                    // this is soooo flaky, haha
                    // but honestly, on this project, who cares?
                    // I'm having fun, it's the most important thing
                    // note: too lazy to refactor in its own component or what?
                    e.currentTarget.parentElement.nextElementSibling.scrollIntoView(
                      { behavior: 'smooth' }
                    );
                  }}
                  style={{
                    // prettier-ignore
                    opacity: Math.max(0, opacity > 1 || offset > 2 ? 0 : opacity),
                    transform: `scale(${Math.max(0, Math.min(offset, 2))})`,
                  }}
                >
                  {this.props.body}
                </Text>
              </FixedCenter>
        <ViewBox ref={ref} />
            </>
          );
        }}
      </Rect>
    );
  }
}
