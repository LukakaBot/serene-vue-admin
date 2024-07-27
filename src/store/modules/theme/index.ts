import { defineStore } from 'pinia';
import type { GlobalThemeOverrides } from 'naive-ui';
import type { ThemeState } from './types';
import { lighten } from '@/utils/tools';

const useThemeStore = defineStore({
    id: 'theme-store',
    state: (): ThemeState => {
        const appTheme = '#2d8cf0';
        const lightenStr = lighten(appTheme, 6);

        return {
            darkTheme: false,
            appTheme: {
                common: {
                    primaryColor: appTheme,
                    primaryColorHover: lightenStr,
                    primaryColorPressed: lightenStr,
                    primaryColorSuppl: appTheme,
                },
                LoadingBar: {
                    colorLoading: appTheme,
                },
            },
        }
    },
    actions: {
        /** 获取深色主题 */
        getDarkTheme(): boolean {
            return this.darkTheme;
        },
        /** 设置深色主题 */
        setDarkTheme(isDark: boolean) {
            this.darkTheme = isDark;
        },
        /** 获取应用主题 */
        getAppTheme(): GlobalThemeOverrides {
            return this.appTheme;
        }
    }
});

export default useThemeStore;