import { getCategoryList, getPlaylistByTag } from "@/http/api";
import React, { useEffect, useState, useRef } from "react";
import CategoryTagList from "./components/CategoryTagList";
import { Playlist } from "@/types/home";
import { IconClose } from "@douyinfe/semi-icons";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Skeleton } from "@douyinfe/semi-ui";
import PlayerList from "./components/PlayerList";

const initialCat = "全部";

function Category() {
	// const [categoryList, setCategoryList] = useState<CategoryMapList[]>([]);
	const [curCategory, setCurCategory] = useState<string>(initialCat);
	const [playList, setPlayList] = useState<Playlist[]>([]);
	// const [offset, setOffset] = useState<number>(0);
	// const [hasMore, setHasMore] = useState<boolean>(false);
	const offsetRef = useRef<number>(0);

	// 获取歌单列表
	const { data: categoryList = [], isLoading: categoryLoading } = useQuery(
		["categoryList"],
		getCategoryList,
		{
			select: (res) => {
				const { code, sub, categories = {} } = res || {};
				if (code === 200) {
					const tmpList = Object.entries(categories)?.map(([key, val]) => {
						const list = sub?.filter((item) => item.category === Number(key));
						return {
							code: key,
							name: val,
							list
						};
					});
					return tmpList;
				}
				return [];
			}
		}
	);

	const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
		["playlist", curCategory],
		async (obj) => {
			const res = await getPlaylistByTag({
				limit: 50,
				cat: curCategory,
				offset: obj.pageParam
			});
			return res;
		},
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.more) {
					return offsetRef.current * 50;
				}
				return;
			}
		}
	);

	useEffect(() => {
		if (data?.pages && data?.pages?.length > 0) {
			const list = data?.pages.reduce((t, c) => {
				return [...t, ...(c.playlists || [])];
			}, [] as Playlist[]);
			setPlayList(list);
		}
	}, [data?.pages]);

	return (
		<div className="category-wrapper">
			<Skeleton
				placeholder={
					<div className="px-32 my-3">
						<Skeleton.Paragraph rows={5} />
					</div>
				}
				loading={categoryLoading}
				active
			>
				<CategoryTagList
					categoryList={categoryList}
					onTagClick={(cat) => {
						setCurCategory(cat);
						offsetRef.current = 0;
					}}
					curCategory={curCategory}
				/>
			</Skeleton>
			<Skeleton
				placeholder={
					<div className="px-32 my-3">
						<Skeleton.Title className="w-32 h-8" />
					</div>
				}
				loading={categoryLoading}
				active
			>
				<h2 className="px-32 my-3 text-3xl flex">
					{curCategory}
					{curCategory !== initialCat && (
						<IconClose
							onClick={() => {
								setCurCategory(initialCat);
								offsetRef.current = 0;
							}}
							className="ml-2 cursor-pointer hover:text-primary"
						/>
					)}
				</h2>
			</Skeleton>
			<Skeleton
				placeholder={
					<div className="px-32 flex items-center justify-between flex-wrap">
						{Array.from({ length: 10 }, (v, i) => i).map((item) => (
							<Skeleton.Image key={item} className="w-56 h-72 mt-3" />
						))}
					</div>
				}
				loading={isLoading}
				active
			>
				<PlayerList
					playList={playList}
					hasMore={hasNextPage}
					onLoadMore={() => {
						offsetRef.current += 1;
						fetchNextPage();
					}}
				/>
			</Skeleton>
		</div>
	);
}

export default Category;
