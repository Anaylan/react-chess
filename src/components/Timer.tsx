import React, { FC, useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface TimerProps {
	currentPlayer: Player | null;
	restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
	const [blackTime, setBlackTime] = useState(300);
	const [whiteTime, setWhiteTime] = useState(300);
	const timer = useRef<null | ReturnType<typeof setInterval>>(null);

	useEffect(() => {
		startTimer();
	}, [currentPlayer]);

	function startTimer() {
		if (timer.current) {
			clearInterval(timer.current);
		}
		const callback =
			currentPlayer?.color === Colors.WHITE
				? decrementWhiteTimer
				: decrementBlackTimer;
		timer.current = setInterval(callback, 1000);
	}

	function decrementBlackTimer() {
		setBlackTime((prev) => prev - 1);
	}
	function decrementWhiteTimer() {
		setWhiteTime((prev) => prev - 1);
	}

	const handleRestart = () => {
		setWhiteTime(300);
		setBlackTime(300);
		restart();
	};

	return (
		<div className='me-4 border card shadow bg-light'>
			<div className='card-body'>
				<div className='pb-2'>
					<h2 className='title'>Черные - {blackTime}</h2>
					<h2 className='title'>Белые - {whiteTime}</h2>
				</div>
				<button className='btn btn-primary' onClick={handleRestart}>
					Перезапустить игру
				</button>
			</div>
		</div>
	);
};

export default Timer;
