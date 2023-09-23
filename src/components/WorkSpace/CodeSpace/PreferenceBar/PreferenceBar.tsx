import React, { useState, useEffect } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import { SettingsInterface } from '@/utils/types/settings';
import SettingsModal from '@/components/Modals/SettingsModal';


type PreferenceBarProps = {
	settings: SettingsInterface;
	setSettings: React.Dispatch<React.SetStateAction<SettingsInterface>>;
};

const PreferenceBar: React.FC<PreferenceBarProps> = ({ settings, setSettings }) => {

	const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

	const toggleFullScreen = () => {
		if (!isFullScreen) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	const toggleSettingsModal = () => {
		setSettings({
			...settings,
			settingsModalActive: !settings.settingsModalActive,
		});
	};

	useEffect(() => {

		const exitHandler = () => {
			if (document.fullscreenElement) {
				setIsFullScreen(true);
			} else {
				setIsFullScreen(false);
			}
		}
		// Event Listeners for fullscreen mode on different browsers
		document.addEventListener('fullscreenchange', exitHandler);
		document.addEventListener('webkitfullscreenchange', exitHandler);
		document.addEventListener('mozfullscreenchange', exitHandler);
		document.addEventListener('MSFullscreenChange', exitHandler);

	}, [isFullScreen]);

	return (
		<div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
			<div className='flex items-center text-white'>
				<button
					className='flex cursor-pointer items-center justify-center rounded-lg focus:outline-none bg-dark-fill-3 text-dark-label-2
								hover:bg-dark-fill-2 px-2 py-1.5 font-medium'
				>
					<div className='flex items-center px-1'>
						<div className='text-label-2 text-dark-label-2'>
							JavaScript
						</div>
					</div>
				</button>
			</div>

			<div className='flex items-center m-2'>
				<button className='preferenceButton group'>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						<AiOutlineSetting
							onClick={toggleSettingsModal}
						/>
					</div>
					<div className='preferenceTooltip group-hover:scale-100'>
						Settings
					</div>
				</button>

				<button
					className='preferenceButton group'
					onClick={toggleFullScreen}
				>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
					<div className='preferenceTooltip group-hover:scale-100'>
						Fullscreen
					</div>
				</button>
			</div>
			{settings.settingsModalActive ? (
				<SettingsModal
					settings={settings}
					setSettings={setSettings}
				/>
			) : null}
		</div>
	);
}
export default PreferenceBar;