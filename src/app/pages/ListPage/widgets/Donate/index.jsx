import { useEffect, useRef, useState } from "react";
import "./index.scss";
import widget from "@/common/utilities/widget";

import { Modal } from "@/app";

import { seperate } from "@/common/utilities/number";
import { countdown } from "@/common/utilities/date";

import credit_png from "@/common/assets/images/credit.png";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import API from "@/common/api";
import ModalCancelIcon from "@/common/assets/icons/ModalCancelIcon";

const LOCALE = {
	year: "년",
	month: "달",
	day: "일",
	hour: "시간",
	minute: "분",
	second: "초",
};

export default function Donate(
	props = {
		/* html */ id: null,
		class: [],
		style: {},
		children: null,
		/* props */ donation: {},
		onContribute: () => {},
	},
) {
	const [time, set_time] = useState(new Date());

	const self = useRef(null);

	useEffect(() => {
		let interval = null;

		// eslint-disable-next-line no-unused-vars
		const observer = new IntersectionObserver((entries, observer) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					set_time(new Date());

					setTimeout(() => {
						interval = setInterval(() => {
							set_time(new Date());
						}, 1000);
					}, 1000 - new Date().getMilliseconds());
				} else {
					interval = clearInterval(interval);
				}
			}
		});
		// big brother..!
		observer.observe(self.current);

		return () => {
			interval = clearInterval(interval);
			/* big brother is gone... */ observer.disconnect();
		};
	}, []);

	return (
		<section
			ref={self}
			{...widget("Donate", props)}
			data-is-loading={props.donation === null}
		>
			<div
				className="portrait"
				style={{
					backgroundImage: [
						"linear-gradient(180deg, rgba(0, 0, 0, 0) 58.9%, #000000 100%)",
						`url("${props.donation?.idol.profilePicture}")`,
					].join(","),
				}}
			>
				<div
					className="button skeleton"
					onClick={() =>
						new Modal(<Donate.Modal donation={props.donation} onContribute={props.onContribute}></Donate.Modal>, (modal) => modal.close()).open()
					}
				>
					후원하기
				</div>
			</div>
			<div className="info">
				<div className="title skeleton">{props.donation?.title ?? "..."}</div>
				<div className="subtitle skeleton">
					{props.donation?.subtitle ?? "..."}
				</div>
				<div className="milestone">
					<div className="wrapper">
						<div className="credit skeleton">
							<img className="icon" src={credit_png}></img>
							{props.donation ? seperate(props.donation.targetDonation) : "..."}
						</div>
						<div className="deadline skeleton">
							{props.donation
								? countdown(
										time,
										new Date(Date.parse(props.donation.deadline)),
										LOCALE,
									) +
									"\u0020" +
									"남음"
								: "..."}
						</div>
					</div>
					<div
						className="progress"
						style={{
							backgroundImage: `linear-gradient(to right, #F96D69 ${props.donation ? (props.donation.receivedDonations / props.donation.targetDonation) * 100 : 0}%, #FFFFFF ${props.donation ? (props.donation.receivedDonations / props.donation.targetDonation) * 100 : 0}%)`,
						}}
					></div>
				</div>
			</div>
		</section>
	);
}

Donate.Modal = function add(
	props = {
		/* html */ id: null,
		class: [],
		style: {},
		children: null,
		/* props */ donation: {},
		onContribute: () => {},
	},
) {
	const [credit, set_credit] = useLocalStorage("credit", 0);
	const [contribute, set_contribute] = useState(0);

	return (
		<section data-widget="Donate.Modal">
			<div className="heading">
				후원하기
				<ModalCancelIcon onClick={() => Modal.instance.close()}></ModalCancelIcon>
			</div>
			<div className="portrait" onClick={() => set_credit(credit + 100)}>
				<img src={props.donation.idol.profilePicture}></img>
				<div className="title">{props.donation.title}</div>
				<div className="subtitle">{props.donation.subtitle}</div>
			</div>
			<div className="payment">
				<input
					placeholder="크래딧 입력"
					type="number"
					onChange={(event) => {
						set_contribute(Number(event.target.value));
					}}
				/>
				<img className="icon" src={credit_png}></img>
			</div>
			<button
				className="confirm"
				disabled={!(0 < contribute && contribute <= credit)}
				data-contribute={contribute}
				//
				// events
				//
				onClick={() => {
					set_credit((credit) => credit - contribute);

					API["{teamName}/donations/{id}/contribute"]
						.PUT({ id: props.donation.id }, { amount: contribute })
						.then(() => {
							props.onContribute?.(contribute);
						});
					Modal.instance.close();
				}}
			>
				후원하기
			</button>
		</section>
	);
};
