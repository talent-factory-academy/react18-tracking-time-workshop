import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '../testSetup';
import { HumanDate } from './HumanDate';

describe('HumanDate component', () => {
  it('render children', () => {
    render(<HumanDate value="2022-09-09T01:09" />);
    expect(screen.getByText('09 Sep')).toBeInTheDocument()
  });
})

