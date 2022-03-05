import React from 'react';
import Head from 'next/head';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Home | Rémi LAK</title>
        <meta
          name='description'
          content='Remi LAK, front-end developer proficient with Reactjs, Typescript, and Redux. My informations and experiences about front-end software engineering until today.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      {children}
    </>
  );
};

export default Layout;
