import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import getConfig from 'next/config';

import AssetPrefetch from '../components/AssetPrefetch';
import Background from '../components/Background';
import FixedPositioner from '../components/FixedPositioner';
import Floater from '../components/Floater';
import Dot from '../components/Dot';
import MessageBox from '../components/MessageBox';

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
            <MessageBox {...node} index={index} key={node.sid} />
          ));
      }}
    </Query>
    <FixedPositioner top={8} left={12}>
      <Floater>
        <a
          href="https://twitter.com/xavxyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Dot by={2}>
            <Dot invert />
          </Dot>
        </a>
      </Floater>
    </FixedPositioner>
  </>
);
