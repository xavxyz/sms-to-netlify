import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Rect from '@reach/rect';
import getConfig from 'next/config';

import AssetPrefetch from '../components/AssetPrefetch';
import Background from '../components/Background';
import FixedPositioner from '../components/FixedPositioner';
import Floater from '../components/Floater';
import Dot from '../components/Dot';
import FixedCenter from '../components/FixedCenter';
import Text from '../components/Text';
import ViewportBlock from '../components/ViewportBlock';
import Anchor from '../components/Anchor';

const {
  publicRuntimeConfig: { TWILIO_NUMBER },
} = getConfig();

export default () => (
  <>
    <AssetPrefetch src="static/cursor-pointer-clicked.png" />
    <Background />
    <Query
      query={gql`
        query getThoughts($to: String) {
          twilio {
            messages(to: $to) {
              edges {
                node {
                  sid
                  body
                }
              }
            }
          }
        }
      `}
      variables={{ to: TWILIO_NUMBER }}
    >
      {({ data }) => {
        return data.twilio.messages.edges
          .slice()
          .reverse()
          .map(({ node }, index) => (
            <Rect key={node.sid}>
              {({ ref, rect }) => {
                const offset =
                  rect &&
                  Number(((rect.y * 2) / window.innerHeight).toFixed(1)) + 1;

                const opacity = offset
                  ? window.innerHeight * index <=
                    index * window.innerHeight + rect.y
                    ? Math.abs(offset - 2)
                    : offset
                  : 0;
                return (
                  <>
                    <FixedCenter>
                      <Text
                        tabIndex={index + 1}
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
                          transform: `scale(${Math.max(
                            0,
                            Math.min(offset, 2)
                          )})`,
                        }}
                      >
                        {node.body}
                      </Text>
                    </FixedCenter>
                    <ViewportBlock ref={ref} />
                  </>
                );
              }}
            </Rect>
          ));
      }}
    </Query>
    <FixedPositioner top={8} left={12}>
      <Floater>
        <Anchor
          href="https://twitter.com/xavczen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Dot by={2}>
            <Dot invert />
          </Dot>
        </Anchor>
      </Floater>
    </FixedPositioner>
  </>
);
