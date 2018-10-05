import React from 'react'
import { Route } from 'react-router-dom'

import Home from './components/Home'
import AppMobile from "./AppMobile";
import AppDesktop from './AppDesktop';

const BaseRouter = () => {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/manifesto' component={AppMobile} />
      <Route exact path='/thewarp' component={AppDesktop} />
    </div>
  )
}

export default BaseRouter

