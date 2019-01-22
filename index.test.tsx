import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Dimensions, Text } from 'react-native';
const styledComponents = require('styled-components/native').default;
import { ThemedStyledComponentsModule } from 'styled-components';

import ThemeProvider, { ThemeDimensionProps } from './index';
jest.mock('Dimensions');

interface ThemeInterface {
  bigColor: string;
  color: string;
}

const { default: styled } = styledComponents as ThemedStyledComponentsModule<
  ThemeInterface & ThemeDimensionProps
>;

const theme: ThemeInterface = {
  bigColor: 'blue',
  color: 'red',
};

describe('ThemeProvider', () => {
  it('function form should allow access to theme', () => {
    const Comp = styled(Text).attrs((props) => ({
      'data-color': props.theme.color,
    }))`` as any;

    const wrapper = renderer.create(
      <ThemeProvider theme={theme}>
        <Comp>Something else</Comp>
      </ThemeProvider>,
    );
    const text = wrapper.root.findByType('Text' as any);

    expect(text.props).toMatchObject({
      children: 'Something else',
      'data-color': 'red',
      style: [{}],
    });
  });

  it('should have access to screen size inside theme', () => {
    const Comp = styled(Text).attrs((props) => ({
      'data-color':
        props.theme.screen.width > 50
          ? props.theme.bigColor
          : props.theme.color,
    }))`` as any;

    const wrapper = renderer.create(
      <ThemeProvider theme={theme}>
        <Comp>Something else</Comp>
      </ThemeProvider>,
    );
    const text = wrapper.root.findByType('Text' as any);

    expect(text.props).toMatchObject({
      children: 'Something else',
      'data-color': 'blue',
      style: [{}],
    });
  });

  it('should respond to screen change', () => {
    const Comp = styled(Text).attrs((props) => ({
      'data-color':
        props.theme.screen.width > 50
          ? props.theme.bigColor
          : props.theme.color,
    }))`` as any;

    const wrapper = renderer.create(
      <ThemeProvider theme={theme}>
        <Comp>Something else</Comp>
      </ThemeProvider>,
    );
    const text = wrapper.root.findByType('Text' as any);
    const dime: any = Dimensions;
    dime.emit({ screen: { width: 50, height: 50 }, window: {} });

    expect(text.props).toMatchObject({
      children: 'Something else',
      'data-color': 'red',
      style: [{}],
    });
  });
});
