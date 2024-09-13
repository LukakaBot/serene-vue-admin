function useStorage(storageType: string, key: string) {
	const storageKey = key;
	let storage: Storage;

	switch (storageType) {
		case 'localStorage': {
			storage = localStorage;
			break;
		}
		case 'sessionStorage': {
			storage = sessionStorage;
			break;
		}
		default: {
			throw new Error('Invalid storage type');
		}
	}

	/** 获取存储的值 */
	function getCache() {
		return storage.getItem(storageKey);
	}

	/** 设置存储的值 */
	function setCache(value: unknown) {
		storage.setItem(storageKey, JSON.stringify(value));
	}

	/** 移除存储的值 */
	function removeCache() {
		storage.removeItem(storageKey);
	}

	return { getCache, setCache, removeCache };
}

export { useStorage };
