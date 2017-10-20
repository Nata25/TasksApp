import React from 'react';

import Filter from './Filter';
import {
  SHOW_ALL,
  COMPLETED,
  IN_PROGRESS,
} from '../helpers';

const Filters = () => (
  <div>
    Filter:
    <Filter filter={SHOW_ALL}>Show all</Filter>
    {' '}
    <Filter filter={COMPLETED}>Completed</Filter>
    {' '}
    <Filter filter={IN_PROGRESS}>In progress</Filter>
  </div>
);

export default Filters;
