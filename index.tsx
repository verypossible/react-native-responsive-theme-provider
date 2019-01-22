import * as React from 'react';
import { Dimensions, ScaledSize } from 'react-native';
const { ThemeProvider } = require('styled-components/native');

export interface ThemeDimensionProps {
  window: ScaledSize;
  screen: ScaledSize;
}

interface IProps<T = any> {
  theme: T;
  children: React.ReactNode;
}

interface IState {
  window: ScaledSize;
  screen: ScaledSize;
}

export default class ReactNativeThemeProvider<T> extends React.Component<
  IProps<T>,
  IState
> {
  state = {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  };

  onChange = ({
    window,
    screen,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) => {
    this.setState({
      screen,
      window,
    });
  };

  componentWillMount() {
    Dimensions.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }

  render() {
    const { children, theme } = this.props;
    const { window, screen } = this.state;
    const nativeTheme = {
      ...theme,
      window,
      screen,
    };

    return (
      <ThemeProvider theme={nativeTheme}>
        {React.Children.only(children)}
      </ThemeProvider>
    );
  }
}
