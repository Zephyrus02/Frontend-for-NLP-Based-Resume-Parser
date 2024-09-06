import React, { useEffect, useState } from "react";

const Popup = ({ message, type, isVisible, onClose }) => {
	const [progress, setProgress] = useState(0);
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		if (isVisible) {
			setIsExiting(false);
			setProgress(0);
			const timer = setInterval(() => {
				setProgress((oldProgress) => {
					if (oldProgress === 100) {
						clearInterval(timer);
						setIsExiting(true);
						setTimeout(onClose, 300); // Wait for exit animation to complete
						return 100;
					}
					return oldProgress + 1;
				});
			}, 30); // 3000ms / 100 = 30ms per step

			return () => {
				clearInterval(timer);
			};
		}
	}, [isVisible, onClose]);

	if (!isVisible && !isExiting) return null;

	return (
		<div className={`popup ${type} ${isExiting ? "exiting" : ""}`}>
			<p>{message}</p>
			<div className="timer-line" style={{ width: `${progress}%` }}></div>
		</div>
	);
};

export default Popup;
