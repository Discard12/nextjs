import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { Fragment } from 'react';
import Head from 'next/head';
function Layout(props) {
  return (
    <Fragment>
    <Head>
    <title>React</title>
    <meta
    name="description"
    content="Lists"
    />
</Head>
    <div>
      
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
    </Fragment>
  );
}

export default Layout;
