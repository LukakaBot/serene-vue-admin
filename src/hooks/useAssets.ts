function useAssets() {
	/**
	 * 获取图片URL
	 * @param {string} name - 图片文件名
	 * @returns {string} 图片的完整URL
	 */
	const getImageUrl = (name: string) => {
		// 是否为SVG文件
		const isSvg = name.endsWith('.svg');
		// 根据文件类型选择目录
		const directory = isSvg ? 'svg' : 'image';
		// 构造并返回完整的资源URL
		return new URL(`/src/assets/${directory}/${name}`, import.meta.url).href;
	}

	return { getImageUrl };
}

export default useAssets;