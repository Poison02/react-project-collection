import { Typography } from "@douyinfe/semi-ui";
import { IconPulse } from "@douyinfe/semi-icons";

const { Title, Text } = Typography;

const MyFooter = () => {
	return (
		<div className="flex items-center justify-center flex-col h-32 px-32 shrink">
			<Title heading={3}>
				<IconPulse className="text-2xl" size="inherit" />
				CloudMusic
			</Title>
			<Text>基于React+Vite+SemiDesign的个人学习音乐网站</Text>
		</div>
	);
};

export default MyFooter;
