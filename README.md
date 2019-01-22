# react-native-responsive-theme-provider

`Dimensions` aware styled-components theme provider for responsive theming in react-native

## Requirements

* react
* react-native
* styled-components

## Features

* Dimensions aware theme for styled-components
* Theme will update with new `screen` and `window` properties when orientation changes
* Typescript support

## Why?

When building react-native applications there are different orientations
and different screen sizes that need to be supported.  In order to detect
the resolution of the screen, we can use the react native `Dimensions` API.
Using styled-components, it would be easy to do something like this:

```js
import { Dimensions, Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

const theme = {
  bigColor: 'blue',
  color: 'red',
  screen: Dimensions.get('screen'),
  window: Dimensions.get('window'),
};

const ThemedText = styled(Text)`
  color: ${(props) => props.theme.screen.width > 800 ? props.theme.bigColor : props.theme.color}
`

const App = () => (
  <ThemeProvider theme={theme}>
    <ThemedText>Some text</ThemedText>
  </ThemeProvider>
);
```

This is great, but what happens when the user goes from portrait to landscape?
Using this code, the screen width will not update to the orientation change.

So the primary goal of this library to provide a theme that will update when
the screen orientation changes.

## How?

All end-developers need to do is install the library

```bash
yarn add @very/react-native-theme-provider
```

```js
import { Dimensions, Text } from 'react-native';
import ThemeProvider from 'react-native-responsive-theme-provider';

const theme = {
  bigColor: 'blue',
  color: 'red',
};

const ThemedText = styled(Text)`
  color: ${(props) => props.theme.screen.width > 800 ? props.theme.bigColor : props.theme.color}
`

const App = () => (
  <ThemeProvider theme={theme}>
    <ThemedText>Some text</ThemedText>
  </ThemeProvider>
);
```

Under the hood we are listening for `Dimensions` changes and updating the `theme` object
with new screen and width properties.

## Typescript

```js
import { Text } from 'react-native';
import { ThemedStyledComponentsModule } from 'styled-components';
import styledComponents from 'styled-components/native';
import ThemeProvider, { ThemeDimensionProps } from 'react-native-responsive-theme-provider';

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

// now we have typed support for props.theme
const ThemedText = styled(Text)`
  color: ${(props) => props.theme.screen.width > 800 ? props.theme.bigColor : props.theme.color}
`

const App = () => (
  <ThemeProvider theme={theme}>
    <ThemedText>Some text</ThemedText>
  </ThemeProvider>
);
```

## Selectors

### getScreen

alias for `props.theme.screen`

### getScreenWidth

alias for `props.theme.screen.width`

### getWindow

alias from `props.theme.window`

### getWindowWidth

alias from `props.theme.window.width`

```js
import { Dimensions, Text } from 'react-native';
import ThemeProvider, { getScreenWidth } from 'react-native-responsive-theme-provider';

const theme = {
  bigColor: 'blue',
  color: 'red',
};

const ThemedText = styled(Text)`
  color: ${(props) => getScreenWidth(props) > 800 ? props.theme.bigColor : props.theme.color}
`

const App = () => (
  <ThemeProvider theme={theme}>
    <ThemedText>Some text</ThemedText>
  </ThemeProvider>
);
```
