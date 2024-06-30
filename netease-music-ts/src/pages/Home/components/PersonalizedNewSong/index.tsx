import { getPersonalizedNewSong } from "@/http/api";
import { chunk } from "@/utils";
import { Carousel, Typography, Skeleton } from "@douyinfe/semi-ui";
import { useQuery } from "@tanstack/react-query";
import SongCard from "@/components/SongCard";

const { Title } = Typography;

const PersonalizedNewSong = () => {
	const { data: personalizedList = [], isLoading } = useQuery(
		["PersonalizedNewSong"],
		() => getPersonalizedNewSong({ limit: 20 }),
		{
			select: (res) => {
				if (res.code === 200) {
					return chunk(res.result || [], 5);
				}
				return [];
			}
		}
	);
	return (
		<div>
			<Title
				heading={2}
				ellipsis={{ showTooltip: true }}
				className="flex items-center justify-center my-5"
			>
				新碟上架
			</Title>
			<Skeleton
				placeholder={
					<div className="px-32 flex items-center justify-between h-88">
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
									key={index}
									className="px-32 flex items-center justify-between"
								>
									{item.map((childItem) => {
										const {
											id,
											picUrl,
											name,
											song = { artists: [] }
										} = childItem || {};
										return (
											<SongCard
												key={id}
												coverImgUrl={picUrl}
												songName={name}
												artistsName={song?.artists && song?.artists[0]?.name}
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
	);
};

export default PersonalizedNewSong;
