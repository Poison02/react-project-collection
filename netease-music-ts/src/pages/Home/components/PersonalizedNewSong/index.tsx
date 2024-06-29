import { getPersonalizedNewSong } from "@/http/api";
import { PersonalizedNewSongItem } from "@/types/home";
import { chunk } from "@/utils";
import { useEffect, useState } from "react";
import { Card, Carousel, Typography } from "@douyinfe/semi-ui";
import Image from "@/components/Image";

const { Title, Text } = Typography;

const PersonalizedNewSong = () => {
	const [personalizedList, setPersonalizedList] = useState<
		PersonalizedNewSongItem[][]
	>([]);

	useEffect(() => {
		const getList = async () => {
			const res = await getPersonalizedNewSong({ limit: 20 });
			if (res.code === 200) {
				const newList = chunk(res.result || [], 5);
				setPersonalizedList(newList);
			}
		};
		getList();
	}, []);
	return (
		<div>
			<Title
				heading={2}
				ellipsis={{ showTooltip: true }}
				className="flex items-center justify-center my-5"
			>
				新碟上架
			</Title>

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
										<Card
											key={id}
											className="w-56"
											cover={<Image src={picUrl} />}
											shadows="hover"
										>
											<Title heading={6} ellipsis={{ showTooltip: true }}>
												{name}
											</Title>
											{song?.artists && song?.artists?.length > 0 && (
												<Text>{song?.artists[0]?.name}</Text>
											)}
										</Card>
									);
								})}
							</div>
						);
					})}
				</Carousel>
			)}
		</div>
	);
};

export default PersonalizedNewSong;
