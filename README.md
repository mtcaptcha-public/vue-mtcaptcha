# vue-mtcaptcha

Vue 3 MTCaptcha component library with TypeScript support. [MTCaptcha](https://www.mtcaptcha.com) is an efficient security solution to protect your Vue application against spam and automated abuse. It can be integrated with login, registration, forgot password, comments, contact forms, and any custom forms.

## Top Highlights of MTCaptcha

- GDPR compliance
- Enterprise friendly
- Accessibility compliance
- Adaptive risk engine
- High availability around the world

## Summary of Features

- Easy to configure custom skin for captcha that suits your app theme.
- Flexible localization support via built-in language options and `customLangText`.
- Supports explicit widget control through ref methods.

## Supported Languages

MTCaptcha supports localization for 60+ languages.

Use `lang` to select the active language code (for example: `en`, `fr`, `ta`).

Use `customLangText` to override labels for one or more language codes.

## Forms You Can Protect

- Login form protection
- Registration form protection
- Comments form protection
- Forgot password form protection
- Contact form protection
- Any custom form you want to secure

## Installation

### Prerequisites

- Vue 3.0.0 or higher
- MTCaptcha account and sitekey

Install with npm:

```bash
npm install vue-mtcaptcha
```

## Basic Usage (Vue 3)

Use the [MTCaptcha demo site](https://service-origin.mtc4ptch4.com/mtcv1/demo/) to build a custom configuration tailored to your specific needs

```vue
<template>
  <MTCaptcha
    ref="captchaRef"
    sitekey="YOUR_SITE_KEY"
    :verified-callback="onVerified"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MTCaptcha, { type MTCaptchaState } from 'vue-mtcaptcha';

const captchaRef = ref<InstanceType<typeof MTCaptcha> | null>(null);

function onVerified(state: MTCaptchaState) {
  console.log('Verified token:', state.verifiedToken);
}

function readToken() {
  const token = captchaRef.value?.getVerifiedToken();
  console.log('Token via ref:', token);
}
</script>
```

The component automatically injects the MTCaptcha client scripts and renders a `div.mtcaptcha`.

## Optional Plugin Usage

If you prefer plugin-style setup:

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { MTCaptchaPlugin } from 'vue-mtcaptcha';

const app = createApp(App);
app.use(MTCaptchaPlugin, {
  siteKey: 'YOUR_SITE_KEY',
  action: 'login.submit',
});
app.mount('#app');
```

## Props


| Name                           | Type                                                                                                                                                    | Required | Default      | Description                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `sitekey`                      | `string`                                                                                                                                                | Yes      | `-`          | Your MTCaptcha site key.                                                                                                                      |
| `enableTestMode`               | `string`                                                                                                                                                | No       | `-`          | Test key from MTCaptcha Admin Console (next to PrivateKey).                                                                                   |
| `lang`                         | `string`                                                                                                                                                | No       | `-`          | Active language code used by the widget (for example: `en`, `fr`, `ta`).                                                                      |
| `customLangText` | `MTCaptchaCustomLangText`                                                                                                                               | No       | `-`          | Custom language text JSON.                                                                                                                    |
| `customStyle`                  | `MTCaptchaCustomStyle`                                                                                                                                  | No       | `-`          | Custom style JSON for widget look-and-feel.                                                                                                   |
| `theme`                        | `'basic' \| 'overcast' \| 'neowhite' \| 'goldbezel' \| 'blackmoon' \| 'darkruby' \| 'touchoforange' \| 'caribbean' \| 'woodyallen' \| 'chrome' \| 'highcontrast'` | No       | `basic`      | Widget theme preset.                                                                                                                          |
| `challengeType`                | `'imageonly' \| 'standard'`                                                                                                                                | No       | `standard`   | Challenge mode. Use `imageonly` to force image-only challenges.                                                                               |
| `action`                       | `string`                                                                                                                                                | No       | `-`          | Action tag. Must match `^[a-zA-Z0-9\\-_. ,]{1,30}$`.                                                                                          |
| `widgetSize`                   | `'mini' \| 'standard'`                                                                                                                                   | No       | `standard`   | Widget size mode.                                                                                                                             |
| `miniFormWidth`                | `number`                                                                                                                                                | No       | `responsive` | Width for mini widget. Range: `265` to `600`.                                                                                                 |
| `miniFormHeight`               | `number`                                                                                                                                                | No       | `45`         | Height for mini widget. Range: `42` to `55`.                                                                                                  |
| `loadAnimation`                | `boolean`                                                                                                                                               | No       | `true`       | Set to `false` to disable loading animation.                                                                                                  |
| `lowFrictionInvisible`         | `'force-visible' \| 'force-invisible'`                                                                                                                   | No       | `-`          | Controls visibility behavior when low-friction invisible mode is enabled.                                                                     |
| `autoFormValidate`             | `boolean`                                                                                                                                               | No       | `-`          | Enables auto form validation behavior in MTCaptcha.                                                                                           |
| `jsloadedCallback`             | `(state: MTCaptchaState) => void`                                                                                                                       | No       | `-`          | Called when the MTCaptcha JavaScript library has loaded.                                                                                      |
| `renderedCallback`             | `(state: MTCaptchaState) => void`                                                                                                                       | No       | `-`          | Called when the widget is rendered (made visible). It may not fire if captcha remains invisible due to low-friction or IP whitelist settings. |
| `verifiedCallback`             | `(state: MTCaptchaState) => void`                                                                                                                       | No       | `-`          | Called when the user is verified. a `verifiedToken` is available on callback.                                                                 |
| `verifyexpiredCallback`        | `(state: MTCaptchaState) => void`                                                                                                                       | No       | `-`          | Called when the last `verifiedToken` has expired.                                                                                             |
| `errorCallback`                | `(state: MTCaptchaState) => void`                                                                                                                       | No       | `-`          | Called when an error occurs (for example bad sitekey or connection issues).                                                                   |

For complete documentation, please visit our official [docs site](https://docs.mtcaptcha.com/dev-guide-quickstart)

## Ref Methods

You can call these through a component ref:


| Method                        | Description                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `setEnableTestMode(testKey?)` | Enables automated test mode with a test key.                                                                  |
| `getConfiguration()`          | Returns a copy of the captcha configuration object for debugging; mutating the returned object has no effect. |
| `getStatus()`                 | Returns the current captcha state object.                                                                     |
| `getVerifiedToken()`          | Returns the current `verifiedToken` string, or `null` when not verified.                                      |
| `renderUI()`                  | Explicitly renders/re-renders the widget (useful for explicit or async-safe render flows).                    |
| `resetUI()`                   | Resets the widget and its state.                                                                              |
| `remove()`                    | Completely removes the widget from the DOM; it can be re-instantiated with `renderUI()`.                      |
| `showMandatory()`             | Forces mandatory validation styling/message, useful with custom form validation flows.                        |


## Callback State Type

```ts
interface MTCaptchaState {
  element: HTMLElement | null;
  domID: string;
  statusCode: number;
  verifiedToken: string | null;
  isVerified: boolean;
  isVisible: boolean;
  statusDesc: string;
}
```

## customLangText Interface

Use `customLangText` to override widget text by language code. Pair it with `lang` to choose which entry is used at runtime.

```ts
interface MTCaptchaCustomLangEntry {
  inputPrompt?: string;
  captchaRefresh?: string;
  loading?: string;
  reload?: string;
  verifying?: string;
  verifyFail?: string;
  verifySuccess?: string;
  captchaExpired?: string;
  verifyExpired?: string;
  emptyCaptcha?: string;
  incompleteCaptcha?: string;
  audioPlay?: string;
  audioPlaying?: string;
  continueAudio?: string;
  downloadAudio?: string;
  audioDownloading?: string;
  connectionError?: string;
}

type MTCaptchaCustomLangText = Record<string, MTCaptchaCustomLangEntry>;
```

Example:

```ts
const customLangText = {
  en: {
    inputPrompt: 'Enter captcha text',
    verifyFail: 'Verification failed',
    verifySuccess: 'Verified',
  },
  zh: {
    inputPrompt: '[input|☺|☺|<html>]',
    captchaRefresh:
      '!!this is a very very long <refresh> msg intended to be <silly> ☺ and no <script> ☺ to see how it would react to multiline message and if the widget adjusts height correctly!!',
    loading: '!!loading!!',
    reload: '!!reloading!!',
    verifying: '!!verifying...!!',
    verifyFail: '!!verification failed!!',
    verifySuccess: '!!✓success✓!!',
    captchaExpired: '!!token expired!!',
    verifyExpired: '!!captcha expired!!',
    emptyCaptcha: '!!please complete captcha!!',
    incompleteCaptcha: '!!please complete captcha!!',
    audioPlay: '!!play audio!!',
    audioPlaying: '!!audio playing...!!',
    continueAudio: '!!continue play!!',
    downloadAudio: '!!download audio!!',
    audioDownloading: '!!audio downloading!!',
    connectionError:
      '!!Failed to reach MTCaptcha Service <br>, Please check your internet connection and try again!!',
  },
};
```

Usage:

```vue
<MTCaptcha
  sitekey="YOUR_SITE_KEY"
  lang="zh"
  :custom-lang-text="customLangText"
/>
```

## customStyle Interface

Use `customStyle` to override widget colors, fonts, and borders.

```ts
interface MTCaptchaInputBorderColor {
  byDefault?: string;
  hover?: string;
  active?: string;
}

interface MTCaptchaButtonIconColor {
  refresh?: string;
  verify?: string;
  success?: string;
  fail?: string;
  audio?: string;
  audiofocus?: string;
}

interface MTCaptchaCustomStyle {
  cardColor?: string;
  cardShadowColor?: string;
  cardBorder?: string;
  placeHolderColor?: string;
  inputTextColor?: string;
  inputTextFont?: string;
  msgTextColor?: string;
  invalidMsgTextColor?: string;
  msgTextFont?: string;
  inputBackgroundColor?: string;
  inputBorderColor?: MTCaptchaInputBorderColor;
  buttonIconColor?: MTCaptchaButtonIconColor;
  loadAnimationDotColor?: string;
  loadAnimationBorderColor?: string;
}
```

Example:

```ts
const customStyle = {
  cardColor: '#32FF2F',
  cardShadowColor: 'rgba(197,255,73,1)',
  cardBorder: '10px #DEDEDE',
  placeHolderColor: '#46FFB9',
  inputTextColor: '#DAFFEC',
  inputTextFont: 'San serif',
  msgTextColor: '#63FF8B',
  invalidMsgTextColor: '#61FFCE',
  msgTextFont: 'Arial',
  inputBackgroundColor: '#2EF3FF',
  inputBorderColor: {
    byDefault: '#4AFF97',
    hover: '#60FF6E',
    active: '#70FFFE',
  },
  buttonIconColor: {
    refresh: '#DDFF80',
    verify: '#93FF66',
    success: '#AFE9FF',
    fail: '#3D84FF',
    audio: '#FF7E32',
    audiofocus: '#FF500F',
  },
  loadAnimationDotColor: '#F122FF',
  loadAnimationBorderColor: '#DFFF78',
};
```

## License

MIT License - see [LICENSE](https://github.com/mtcaptcha-public/vue-mtcaptcha/blob/main/LICENSE) file for details.

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/mtcaptcha-public/vue-mtcaptcha/issues).