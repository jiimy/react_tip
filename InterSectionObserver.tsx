import React, { useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { EventListStyle } from "./EventListStyle";
import classnames from "classnames";
import { getIp } from "services";
import { getStorage, setStorage } from "services/utils/localStorage";
import { useGetDataApi } from "hooks";
export type props = {
	src?: string; // 썸네일
	key?: number; // 키 값
	wishIcon?: string; // 하트 유무
	displayName?: string; // 병원이름 (교대역 - 지젤의원)
	detailLinkUrl?: string; // 상품정보 페이지
	price?: number; // 가격
	name?: string; // 상품이름
	comment?: string; // 코멘트
	wishCount?: number; // 관심도
	reviewCount?: number; // 리뷰
	productCode?: string; // 상품코드 - 좋아요 표시에 사용
	rateScore?: number; // 별점
};

// 관심도, 리뷰
const calcCount = (count: number) => {
	const len = (count + "").length;
	if (count == 0) {
		return 0;
	}
	switch (len) {
		case 4:
			return Math.floor(count / 1000) + "천+";
		case 3:
			return Math.floor(count / 100) + "백+";
		case 2:
			return Math.floor(count / 10) + "0+";
		default:
			return count + "+";
	}
};

// 가격 변환
const calcPrice = (num: string) => {
	return (
		<>
			{num.length > 4 ? (
				<>
					{parseInt(num) / 10000}
					<span>만원</span>
				</>
			) : (
				<>
					{(parseInt(num) / 1000).toFixed(1)}
					<span>천원</span>
				</>
			)}
		</>
	);
};

const EventListItem = ({
	src,
	wishIcon,
	displayName,
	detailLinkUrl,
	price,
	name,
	comment,
	wishCount,
	reviewCount,
	rateScore,
	productCode,
	key,
}: props) => {
	const { setGetData } = useGetDataApi({});
	const [ref, inView, entry] = useInView();
	const [favoriteState, favoriteSetState] = useState("false");
	const [userid, usersetid] = useState("");

	useEffect(() => {
		setGetData({
			status: false,
			url: "https://account-api.yeoshin.co.kr/latest/web/member/cashdata",
			success: successCallback,
			fail: failCallback,
		});
	}, []);

	const failCallback = (err: { [key: string]: string }) => {
		favoriteSetState("false");
		usersetid("");
		console.log(err);
	};

	const successCallback = (res: {
		[key: string]: { [key: string]: { [key: string]: string } };
	}) => {
		const list = axios(
			"https://test.yeoshin.co.kr/latest/main/wish/create?memberId=aiden1&productCode=S0787147"
		);
		const listview = (value: string) => {
			// console.log("로그인 상태", value);
			console.log("저장됫나", res.results.memberInfo.id);
			usersetid(res.results.memberInfo.id);
		};
		list.then(value => listview(value.data.results));
	};

	// 상품 코드를 받으면 get 해주기.
	const Like = (code: string | undefined, type: string) => {
		console.log("상품코드", code);
		console.log("타입", type);
		favoriteSetState(type);

		if (type == "true") {
			const Addlike = axios(
				`https://test.yeoshin.co.kr/latest/main/wish/create?memberId=${userid}&productCode=${code}`
			);
			const Addlikeview = (value: string) => {
				console.log("value: ", value);
			};
			Addlike.then(value => Addlikeview(value.data.results));
		} else {
			const Removelike = axios(
				`https://test.yeoshin.co.kr/latest/main/wish/delete?memberId=${userid}&productCode=${code}`
			);
			const Removelikeview = (value: string) => {
				console.log("value: ", value);
			};
			Removelike.then(value => Removelikeview(value.data.results));
		}

		// type == "true" ? "" : "";
	};

	const Toggle = () => {
		if (userid != "") {
			favoriteState == "false"
				? Like(productCode, "true")
				: Like(productCode, "false");
		} else {
			alert("로그인 후 이용할 수 있습니다.");
		}
	};
	const calcRate = (review: number, rate: number) => {
		const a = (rate / (5 * review)) * 100 * 0.1;
		if (review == 0) {
			return 0;
		}
		return a.toFixed(1);
	};

	return (
		<>
			<li ref={ref} key={key}>
				{/* {`${inView}`} */}
				{inView && (
					<>
						<a href={`https://yeoshin.co.kr/${detailLinkUrl}`}>
							<div className="imgwrap">
								<img src={src} alt="" />
							</div>
							<div className="textwrap">
								<div className="place">{displayName}</div>
								<div className="event_name">{name}</div>
								<div className="tags">
									<span>{comment}</span>
								</div>
								<div className="price">{calcPrice(`${price}`)}</div>
							</div>
							<div className="logs">
								{<span className="reserve">모바일예약</span>}
								<ul>
									<li>
										관심도 <span>{calcCount(parseFloat(`${wishCount}`))}</span>
									</li>
									<li>
										리뷰 <span>{calcCount(parseFloat(`${reviewCount}`))}</span>
									</li>
									<li>
										★{" "}
										<span>
											{calcRate(
												parseFloat(`${reviewCount}`),
												parseFloat(`${rateScore}`)
											)}
										</span>
									</li>
								</ul>
							</div>
						</a>
						<div
							className={classnames(
								"favorite",
								favoriteState == "true" ? "is-chk" : ""
								// wishIcon == "on" ? "is-chk" : ""
							)}
							onClick={Toggle}
						>
							{/* {wishIcon == "on" ? <>one</> : <>two</>} */}
						</div>
					</>
				)}
			</li>
		</>
	);
};

export default EventListItem;
