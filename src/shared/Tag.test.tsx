import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '../testSetup';
import { Tag } from './Tag';

describe('Tag component', () => {
  it('should render children', () => {
    render(<Tag>Hello</Tag>);
    expect(screen.getByText('Hello')).toBeInTheDocument()
  });
})

