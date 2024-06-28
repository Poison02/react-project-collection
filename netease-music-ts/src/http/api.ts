import { BannerRes, PersonalizedItem } from "@/types/home";
import { http } from "./request";

// 获取PC轮播图
export const getBanner = async () => {
	return await http.get<BannerRes>("/banner", {
		params: { type: 0 }
	});
};

// 获取推荐歌单
export const getPersonalized = async (params: { limit?: number }) => {
	return await http.get<PersonalizedItem>("/personalized", {
		params
	});
};

// 获取推荐新歌单
export const getPersonalizedNewSong = async (params: { limit?: number }) => {
	return await http.get<PersonalizedItem>("personalized/newsong", {
		params
	});
};