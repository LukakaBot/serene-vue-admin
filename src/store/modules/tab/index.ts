import type { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';
import type { TabState } from './types';
import appConfig from '@/config/app/index';

export const useTabStore = defineStore({
	id: 'tab-store',
	state: (): TabState => ({
		tabList: [],
	}),
	actions: {
		/** 初始化标签页 */
		initTab(routes: RouteLocationNormalized[]) {
			this.tabList = routes;
		},
		/** 添加标签页 */
		addTab(route: RouteLocationNormalized) {
			const { routeWhitelist } = appConfig;

			if (routeWhitelist.includes(route.name as string)) return false;
			const isExists = this.tabList.some(
				(item) => item.fullPath == route.fullPath
			);
			if (!isExists) this.tabList.push(route);
			return true;
		},
		/** 关闭左侧 */
		closeLeftTab(route: RouteLocationNormalized) {
			const index = this.tabList.findIndex(
				(item) => item.fullPath == route.fullPath
			);
			this.tabList = this.tabList.filter(
				(item, i) => i >= index || (item?.meta?.affix ?? false)
			);
		},
		/** 关闭右侧标签页 */
		closeRightTab(route: RouteLocationNormalized) {
			const index = this.tabList.findIndex(
				(item) => item.fullPath == route.fullPath
			);
			this.tabList = this.tabList.filter(
				(item, i) => i <= index || (item?.meta?.affix ?? false)
			);
		},
		/** 关闭其他标签页 */
		closeOtherTab(route: RouteLocationNormalized) {
			this.tabList = this.tabList.filter(
				(item) =>
					item.fullPath == route.fullPath || (item?.meta?.affix ?? false)
			);
		},
		/** 关闭当前标签页 */
		closeCurrentTab(route: RouteLocationNormalized) {
			const index = this.tabList.findIndex(
				(item) => item.fullPath === route.fullPath
			);

			if (index !== -1) this.tabList.splice(index, 1);
		},
		/** 关闭全部标签页 */
		closeAllTab(route: RouteLocationNormalized) {
			this.tabList = this.tabList.filter((item) =>
				item?.meta?.affix || item.fullPath === route.fullPath ? true : false
			);
		},
	},
});
