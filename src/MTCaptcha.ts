import { defineComponent, h, type App, type Plugin } from 'vue';

declare const __MTCAPTCHA_SERVICE1_HOST__: string;
declare const __MTCAPTCHA_SERVICE2_HOST__: string;

declare global {
  interface Window {
    mtcaptchaConfig?: Record<string, unknown>;
    mtcaptcha?: {
      enableTestMode: (testKey?: string) => void;
      getConfiguration: () => unknown;
      getStatus: () => unknown;
      getVerifiedToken: () => string | undefined;
      resetUI: () => void;
      renderUI: () => void;
      remove: () => void;
      showMandatory: () => void;
    };
  }
}

export interface MTCaptchaState {
  element: HTMLElement | null;
  domID: string;
  statusCode: number;
  verifiedToken: string | null;
  isVerified: boolean;
  isVisible: boolean;
  statusDesc: string;
}

export type MTCaptchaCustomLangText = Record<string, Record<string, string>>;

export interface MTCaptchaInputBorderColor {
  byDefault?: string;
  hover?: string;
  active?: string;
}

export interface MTCaptchaButtonIconColor {
  refresh?: string;
  verify?: string;
  success?: string;
  fail?: string;
  audio?: string;
  audiofocus?: string;
}

export interface MTCaptchaCustomStyle {
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

export interface MTCaptchaOptions {
  siteKey: string;
  enableTestMode?: string;
  lang?: string;
  challengeType?: 'imageonly' | 'standard';
  customLangText?: MTCaptchaCustomLangText;
  customStyle?: MTCaptchaCustomStyle;
  theme?:
    | 'basic'
    | 'overcast'
    | 'neowhite'
    | 'goldbezel'
    | 'blackmoon'
    | 'darkruby'
    | 'touchoforange'
    | 'caribbean'
    | 'woodyallen'
    | 'chrome'
    | 'highcontrast';
  action?: string;
  widgetSize?: 'mini' | 'standard';
  miniFormWidth?: number;
  miniFormHeight?: number;
  loadAnimation?: boolean;
  lowFrictionInvisible?: 'force-visible' | 'force-invisible';
  jsloadedCallback?: (state: MTCaptchaState) => void;
  renderedCallback?: (state: MTCaptchaState) => void;
  verifiedCallback?: (state: MTCaptchaState) => void;
  verifyexpiredCallback?: (state: MTCaptchaState) => void;
  errorCallback?: (state: MTCaptchaState) => void;
  autoFormValidate?: boolean;
  autoFadeOuterText?: boolean;
}

export type MTCaptchaPlugin = Plugin & {
  install(app: App, options?: MTCaptchaOptions): void;
};

let scriptsLoaded = false;
const ACTION_REGEX = /^[a-zA-Z0-9\-_. ,]{1,30}$/;

function isValidAction(action?: string): boolean {
  if (action == null || action === '') return true;
  return ACTION_REGEX.test(action);
}

function isValidWidgetSize(size?: string): boolean {
  if (size == null || size === '') return true;
  return size === 'mini' || size === 'standard';
}

function isValidMiniFormWidth(width?: number): boolean {
  if (width == null) return true;
  return Number.isFinite(width) && width >= 265 && width <= 600;
}

function isValidMiniFormHeight(height?: number): boolean {
  if (height == null) return true;
  return Number.isFinite(height) && height >= 42 && height <= 55;
}

function isValidLowFrictionInvisible(value?: string): boolean {
  if (value == null || value === '') return true;
  return value === 'force-visible' || value === 'force-invisible';
}

function isValidChallengeType(value?: string): boolean {
  if (value == null || value === '') return true;
  return value === 'imageonly' || value === 'standard';
}

function isValidTheme(value?: string): boolean {
  if (value == null || value === '') return true;
  return [
    'basic',
    'overcast',
    'neowhite',
    'goldbezel',
    'blackmoon',
    'darkruby',
    'touchoforange',
    'caribbean',
    'woodyallen',
    'chrome',
    'highcontrast',
  ].includes(value);
}

function injectScripts() {
  if (scriptsLoaded) return;
  scriptsLoaded = true;

  const headOrBody =
    document.getElementsByTagName('head')[0] ||
    document.getElementsByTagName('body')[0];

  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = `https://${__MTCAPTCHA_SERVICE1_HOST__}/mtcv1/client/mtcaptcha.min.js`;
  headOrBody.appendChild(s1);

  const s2 = document.createElement('script');
  s2.async = true;
  s2.src = `https://${__MTCAPTCHA_SERVICE2_HOST__}/mtcv1/client/mtcaptcha2.min.js`;
  headOrBody.appendChild(s2);
}

const MTCaptchaPluginImpl: MTCaptchaPlugin = {
  install(_app: App, options?: MTCaptchaOptions) {
    if (!options?.siteKey) {
      throw new Error('MTCaptcha: "siteKey" is required');
    }
    if (!isValidAction(options.action)) {
      throw new Error(
        'MTCaptcha: "action" is invalid. Use 1-30 chars [a-zA-Z0-9-_. ,]'
      );
    }
    if (!isValidWidgetSize(options.widgetSize)) {
      throw new Error('MTCaptcha: "widgetSize" must be "mini" or "standard"');
    }
    if (!isValidMiniFormWidth(options.miniFormWidth)) {
      throw new Error('MTCaptcha: "miniFormWidth" must be between 265 and 600');
    }
    if (!isValidMiniFormHeight(options.miniFormHeight)) {
      throw new Error('MTCaptcha: "miniFormHeight" must be between 42 and 55');
    }
    if (!isValidLowFrictionInvisible(options.lowFrictionInvisible)) {
      throw new Error(
        'MTCaptcha: "lowFrictionInvisible" must be "force-visible" or "force-invisible"'
      );
    }
    if (!isValidChallengeType(options.challengeType)) {
      throw new Error(
        'MTCaptcha: "challengeType" must be "imageonly" or "standard"'
      );
    }
    if (!isValidTheme(options.theme)) {
      throw new Error(
        'MTCaptcha: "theme" must be one of basic, overcast, neowhite, goldbezel, blackmoon, darkruby, touchoforange, caribbean, woodyallen, chrome, highcontrast'
      );
    }

    if (options) {
      window.mtcaptchaConfig = {
        ...(window.mtcaptchaConfig ?? {}),
        sitekey: options.siteKey,
        render: 'explicit',
        enableTestMode:
          options.enableTestMode ?? (window.mtcaptchaConfig as any)?.enableTestMode,
        lang: options.lang ?? (window.mtcaptchaConfig as any)?.lang,
        customLangText:
          options.customLangText ?? (window.mtcaptchaConfig as any)?.customLangText,
        customStyle:
          options.customStyle ?? (window.mtcaptchaConfig as any)?.customStyle,
        theme: options.theme ?? (window.mtcaptchaConfig as any)?.theme ?? 'basic',
        action: options.action ?? (window.mtcaptchaConfig as any)?.action,
        widgetSize:
          options.widgetSize ?? (window.mtcaptchaConfig as any)?.widgetSize,
        miniFormWidth:
          options.miniFormWidth ?? (window.mtcaptchaConfig as any)?.miniFormWidth,
        miniFormHeight:
          options.miniFormHeight ??
          (window.mtcaptchaConfig as any)?.miniFormHeight,
        loadAnimation:
          options.loadAnimation ??
          (window.mtcaptchaConfig as any)?.loadAnimation ??
          true,
        lowFrictionInvisible:
          options.lowFrictionInvisible ??
          (window.mtcaptchaConfig as any)?.lowFrictionInvisible,
        challengeType:
          options.challengeType ?? (window.mtcaptchaConfig as any)?.challengeType,
        'jsloaded-callback': options.jsloadedCallback ??
          (window.mtcaptchaConfig as any)?.['jsloaded-callback'],
        'rendered-callback': options.renderedCallback ??
          (window.mtcaptchaConfig as any)?.['rendered-callback'],
        'verified-callback': options.verifiedCallback ??
          (window.mtcaptchaConfig as any)?.['verified-callback'],
        'verifyexpired-callback': options.verifyexpiredCallback ??
          (window.mtcaptchaConfig as any)?.['verifyexpired-callback'],
        'error-callback': options.errorCallback ??
          (window.mtcaptchaConfig as any)?.['error-callback'],
        autoFormValidate:
          options.autoFormValidate ??
          (window.mtcaptchaConfig as any)?.autoFormValidate,
        autoFadeOuterText:
          options.autoFadeOuterText ??
          (window.mtcaptchaConfig as any)?.autoFadeOuterText,
      };
    }

    injectScripts();
  },
};

export const MTCaptchaComponent = defineComponent({
  name: 'MTCaptcha',
  props: {
    sitekey: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: false,
      validator: (value: string) => isValidAction(value),
    },
    enableTestMode: {
      type: String,
      required: false,
    },
    lang: {
      type: String,
      required: false,
    },
    customLangText: {
      type: Object,
      required: false,
    },
    customStyle: {
      type: Object,
      required: false,
    },
    theme: {
      type: String,
      required: false,
      default: 'basic',
      validator: (value: string) => isValidTheme(value),
    },
    widgetSize: {
      type: String,
      required: false,
      validator: (value: string) => isValidWidgetSize(value),
    },
    miniFormWidth: {
      type: Number,
      required: false,
      validator: (value: number) => isValidMiniFormWidth(value),
    },
    miniFormHeight: {
      type: Number,
      required: false,
      validator: (value: number) => isValidMiniFormHeight(value),
    },
    loadAnimation: {
      type: Boolean,
      required: false,
      default: true,
    },
    lowFrictionInvisible: {
      type: String,
      required: false,
      validator: (value: string) => isValidLowFrictionInvisible(value),
    },
    challengeType: {
      type: String,
      required: false,
      validator: (value: string) => isValidChallengeType(value),
    },
    jsloadedCallback: Function,
    renderedCallback: Function,
    verifiedCallback: Function,
    verifyexpiredCallback: Function,
    errorCallback: Function,
    autoFormValidate: {
      type: Boolean,
      required: false,
    },
    autoFadeOuterText: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    setEnableTestMode(testKey?: string): void {
      window.mtcaptcha?.enableTestMode(testKey);
    },
    getConfiguration(): unknown {
      return window.mtcaptcha?.getConfiguration();
    },
    getStatus(): unknown {
      return window.mtcaptcha?.getStatus();
    },
    getVerifiedToken(): string | undefined {
      return window.mtcaptcha?.getVerifiedToken();
    },
    resetUI(): void {
      window.mtcaptcha?.resetUI();
    },
    renderUI(): void {
      window.mtcaptcha?.renderUI();
    },
    remove(): void {
      window.mtcaptcha?.remove();
    },
    showMandatory(): void {
      window.mtcaptcha?.showMandatory();
    },
  },
  mounted() {
    // Ensure mtcaptcha scripts are present even if plugin install wasn't used
    injectScripts();

    window.mtcaptchaConfig = {
      ...(window.mtcaptchaConfig ?? {}),
      sitekey: this.sitekey,
      enableTestMode:
        this.enableTestMode ?? (window.mtcaptchaConfig as any)?.enableTestMode,
      lang: this.lang ?? (window.mtcaptchaConfig as any)?.lang,
      customLangText:
        this.customLangText ?? (window.mtcaptchaConfig as any)?.customLangText,
      customStyle: this.customStyle ?? (window.mtcaptchaConfig as any)?.customStyle,
      theme: this.theme ?? (window.mtcaptchaConfig as any)?.theme ?? 'basic',
      action: this.action ?? (window.mtcaptchaConfig as any)?.action,
      widgetSize: this.widgetSize ?? (window.mtcaptchaConfig as any)?.widgetSize,
      miniFormWidth:
        this.miniFormWidth ?? (window.mtcaptchaConfig as any)?.miniFormWidth,
      miniFormHeight:
        this.miniFormHeight ?? (window.mtcaptchaConfig as any)?.miniFormHeight,
      loadAnimation:
        this.loadAnimation ??
        (window.mtcaptchaConfig as any)?.loadAnimation ??
        true,
      lowFrictionInvisible:
        this.lowFrictionInvisible ??
        (window.mtcaptchaConfig as any)?.lowFrictionInvisible,
      challengeType:
        this.challengeType ?? (window.mtcaptchaConfig as any)?.challengeType,
      'jsloaded-callback':
        this.jsloadedCallback ??
        (window.mtcaptchaConfig as any)?.['jsloaded-callback'],
      'rendered-callback':
        this.renderedCallback ??
        (window.mtcaptchaConfig as any)?.['rendered-callback'],
      'verified-callback':
        this.verifiedCallback ??
        (window.mtcaptchaConfig as any)?.['verified-callback'],
      'verifyexpired-callback':
        this.verifyexpiredCallback ??
        (window.mtcaptchaConfig as any)?.['verifyexpired-callback'],
      'error-callback':
        this.errorCallback ??
        (window.mtcaptchaConfig as any)?.['error-callback'],
      autoFormValidate:
        this.autoFormValidate ??
        (window.mtcaptchaConfig as any)?.autoFormValidate,
      autoFadeOuterText:
        this.autoFadeOuterText ??
        (window.mtcaptchaConfig as any)?.autoFadeOuterText,
    };
  },
  render() {
    return h('div', { class: 'mtcaptcha' });
  },
});

export default MTCaptchaPluginImpl;