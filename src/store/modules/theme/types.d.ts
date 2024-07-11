import type { GlobalThemeOverrides } from 'naive-ui';

export type ThemeState = {
    /** 是否深色主题 */
    darkTheme: boolean;
    /** 应用主题风格 */
    appTheme: GlobalThemeOverrides;
};