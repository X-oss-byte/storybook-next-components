import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native-web';
import { flush } from '@gluestack-style/react';

function Document() {
  return (
    <Html lang='en' className='gs gs-dark'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async ({ renderPage }: any) => {
  AppRegistry.registerComponent('Main', () => Main);
  const { getStyleElement } = AppRegistry.getApplication('Main');
  const page = await renderPage();
  const styles = [getStyleElement(), ...flush()];
  return { ...page, styles: React.Children.toArray(styles) };
};

export default Document;
