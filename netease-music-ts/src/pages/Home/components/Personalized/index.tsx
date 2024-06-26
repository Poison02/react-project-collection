import { getHotTag, getHighqualityPlaylistByTag } from "@/http/api";
import { chunk } from "@/utils";
import { Carousel, Typography, Skeleton } from "@douyinfe/semi-ui";
import { useState } from "react";
import classNames from "classnames";
import SongCard from "@/components/SongCard";
import { useQuery } from "@tanstack/react-query";

const { Title } = Typography;

const Personalized = () => {
	const [curTag, setCurTag] = useState<string>("全部");

	const { data: tagList = [] } = useQuery(["hotTag"], getHotTag, {
		select: (res) => {
			if (res.code === 200) {
				const newList = res.tags ? [{ id: -1, name: "全部" }, ...res.tags] : [];
				return newList?.slice(0, 5) || [];
			}
			return [];
		}
	});

	const { data: personalizedList = [], isLoading } = useQuery(
		["HighqualityPlaylist", curTag],
		() => getHighqualityPlaylistByTag({ limit: 20, cat: curTag }),
		{
			select: (res) => {
				if (res.code === 200) {
					return chunk(res.playlists || [], 5);
				}
				return [];
			}
		}
	);

	return (
		<>
			<Title
				heading={2}
				ellipsis={{ showTooltip: true }}
				className="flex items-center justify-center my-5"
			>
				热门推荐
			</Title>
			{tagList.length > 0 && (
				<div className="flex items-center justify-center my-4">
					{tagList.map((item) => {
						return (
							<div
								key={item.id}
								className={classNames(
									"tag-item mx-4 cursor-pointer hover:text-primary",
									{
										active: curTag === item.name
									}
								)}
								onClick={async () => {
									setCurTag(item.name || "全部");
								}}
							>
								{item.name}
							</div>
						);
					})}
				</div>
			)}

			<div key={curTag}>
				<Skeleton
					placeholder={
						<div className="px-32 flex items-center justify-between h-80">
							<Skeleton.Image className="w-56" />
							<Skeleton.Image className="w-56" />
							<Skeleton.Image className="w-56" />
							<Skeleton.Image className="w-56" />
							<Skeleton.Image className="w-56" />
						</div>
					}
					loading={isLoading}
					active
				>
					{personalizedList?.length > 0 && (
						<Carousel
							className="w-full h-80"
							speed={1000}
							animation="fade"
							theme="dark"
							showIndicator={false}
							autoPlay={false}
							arrowType="hover"
						>
							{personalizedList.map((item, index) => {
								return (
									<div
										key={`${curTag}${index}`}
										className="px-32 flex items-center justify-between"
									>
										{item.map((childItem) => {
											const { id, coverImgUrl, name } = childItem || {};
											return (
												<SongCard
													key={id}
													coverImgUrl={coverImgUrl}
													songName={name}
												/>
											);
										})}
									</div>
								);
							})}
						</Carousel>
					)}
				</Skeleton>
			</div>
		</>
	);
};

export default Personalized;
