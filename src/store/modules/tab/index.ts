import type { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';
import type { TabState } from './types';
import { useRouteStore } from '@/store/modules/route';
import globalConfig from '@/config/app/index';
import router from '@/router';

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
			const { routeWhitelist } = globalConfig;

			if (routeWhitelist.includes(route.name as string)) return false;
			const isExists = this.tabList.some(
				(item) => item.fullPath == route.fullPath
			);
			if (!isExists) this.tabList.push(route);
			return true;
		},
		/** 关闭左侧标签 */
		closeLeftTab(route: RouteLocationNormalized) {
			const index = this.tabList.findIndex(
				(item) => item.fullPath == route.fullPath
			);
			this.tabList = this.tabList.filter(
				(item, i) => i >= index || (item?.meta?.affix ?? false)
			);
		},
		/** 关闭右侧标签 */
		closeRightTab(route: RouteLocationNormalized) {
			const index = this.tabList.findIndex(
				(item) => item.fullPath == route.fullPath
			);
			this.tabList = this.tabList.filter(
				(item, i) => i <= index || (item?.meta?.affix ?? false)
			);
		},
		/** 关闭当前标签 */
		closeCurrentTab(route: RouteLocationNormalized) {
			const routeStore = useRouteStore();
			const isCurrentRoute = routeStore.currentRoute.fullPath === route.fullPath;
			const index = this.tabList.findIndex(
				(item) => item.fullPath === route.fullPath
			);

			if (index !== -1) this.tabList.splice(index, 1);
			if (isCurrentRoute) {
				const redirect = index ? this.tabList[index - 1]!.fullPath : this.tabList[index]!.fullPath;
				redirect && router.push(redirect);
			}
		},
		/** 关闭其他标签 */
		closeOtherTab(route: RouteLocationNormalized) {
			const routeStore = useRouteStore();
			const isCurrentRoute = routeStore.currentRoute.fullPath === route.fullPath;
			!isCurrentRoute && router.push(route.fullPath);

			this.tabList = this.tabList.filter(
				(item) =>
					item.fullPath == route.fullPath || (item?.meta?.affix ?? false)
			);
		},
		/** 关闭全部标签 */
		closeAllTab(route: RouteLocationNormalized) {
			const routeStore = useRouteStore();
			const isCurrentRoute =
				routeStore.currentRoute.fullPath === route.fullPath;

			!isCurrentRoute && router.push(route.fullPath);

			this.tabList = this.tabList.filter((item) =>
				item?.meta?.affix || item.fullPath === route.fullPath ? true : false
			);
		},
	},
});
