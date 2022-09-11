import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '../testSetup';
import { Tag } from './Tag';

describe('Tag', () => {
  it('render title bar', () => {
    render(<Tag>ciao</Tag>);
    expect(screen.getByText('ciao')).toBeInTheDocument()
  });
})

