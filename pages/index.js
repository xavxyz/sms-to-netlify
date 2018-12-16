import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Rect from '@reach/rect';
import getConfig from 'next/config';

import Background from '../components/Background';
import AbsolutePositioner from '../components/AbsolutePositioner';
import Floater from '../components/Floater';
import Dot from '../components/Dot';
import FixedCenter from '../components/FixedCenter';
import Text from '../components/Text';
import ViewportBlock from '../components/ViewportBlock';

const {
  publicRuntimeConfig: { TWILIO_NUMBER },
} = getConfig();

export default () => (
  <>
    <Background>
      <AbsolutePositioner top={8} left={12}>
        <Floater>
          <Dot by={2}>
            <Dot invert />
          </Dot>
        </Floater>
      </AbsolutePositioner>
    </Background>
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
        if (data) {
          const messages = data.twilio.messages.edges.reverse();

          return messages.map(({ node }, index) => (
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
        }
      }}
    </Query>
  </>
);
