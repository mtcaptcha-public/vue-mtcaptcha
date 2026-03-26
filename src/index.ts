import type { App } from 'vue';
import MTCaptchaPluginImpl, {
  type MTCaptchaOptions,
  MTCaptchaComponent,
} from './MTCaptcha';

export * from './MTCaptcha';

// Default export: component for <script setup> usage
export default MTCaptchaComponent;

// Plugin-style install helper
export function install(app: App, options?: MTCaptchaOptions): void {
  app.use(MTCaptchaPluginImpl, options);
}

// Named exports
export { MTCaptchaComponent as MTCaptcha, MTCaptchaPluginImpl as MTCaptchaPlugin };