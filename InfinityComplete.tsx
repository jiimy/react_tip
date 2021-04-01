import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import faker from "faker";
import HospitalContentList from "./HospitalContentList";
import classnames from "classnames";

const List = styled.div`
	height: 80vh;
	overflow: auto;
	li {
		position: relative;
		padding: 15px;
		border-bottom: 1px solid #c5c5c5;
		.title {
			display: flex;
			align-items: center;
			margin-top: 15px;
			margin-bottom: 10px;
			padding-left: 6px;
			font-size: 18px;
			color: #333;
			&.is-zone {
				&:after {
					display: inline-block;
					margin-left: 4px;
					width: 20px;
					height: 20px;
					background: transparent
						url("https://d10fvx8ndeqwvu.cloudfront.net/upfiles/icon/2832170025.png")
						right center no-repeat;
					background-size: 20px 20px;
					content: "";
				}
			}
		}
		.tags {
			margin: -3px 0 3px 0;
			span {
				display: inline-block;
				margin-right: 5px;
				padding: 0 8px;
				background: #e6e6e6;
				border: 1px solid #e6e6e6;
				color: #888;
				font-size: 11px;
				line-height: 21px;
				vertical-align: middle;
				font-weight: 200;
			}
		}
		.place,
		.review,
		.event {
			position: relative;
			display: inline-block;
			font-size: 12px;
			letter-spacing: -0.5px;
			color: #666;
			padding: 0 10px;
			line-height: 20px;
			+ span:before {
				position: absolute;
				left: 0;
				top: 50%;
				width: 1px;
				height: 12px;
				background: #eee;
				margin-top: -6px;
				content: "";
			}
		}
		.place {
			margin-left: 6px;
			padding-left: 15px;
			background: transparent url("https://yeoshin.co.kr/m/images/mini_map.png")
				left center no-repeat;
			background-size: auto 12px;
		}
		.review {
			padding-left: 28px;
			background: transparent
				url("https://yeoshin.co.kr/m/images/mini_good2.png") 9px 2px no-repeat;
			background-size: auto 12px;
			color: #9f1eab;
		}
	}
`;

const HospitalContents = () => {
	// 맨처음 보여주기 위한 값 저장
	const [state, setState] = useState([]);
	const messageListRef = React.createRef<HTMLDivElement>();
	const bottomRef = React.createRef<HTMLDivElement>();
	// 불러오면서 저장될 값
	const [newstate, newsetstate] = useState([]);
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [pageIndex, setPageIndex] = useState(0);

	useEffect(() => {
		// 맨처음에 한번 불러오고
		const list = axios(
			"https://dev-account-api.yeoshin.co.kr/latest/web/hospitals?pageNum=1&listMaxCount=10"
		);
		list.then(function (response) {
			console.log("병원 목록 처음 보여주기", response.data.results);
			setState(response.data.results);
		});
	}, []);

	useEffect(() => {
		// 인피니티 스크롤 기본 재료
		const scroll = new IntersectionObserver(scrollCallback, {
			root: messageListRef.current!,
			rootMargin: "50px",
		});
		scroll.observe(bottomRef.current!);
		return () => {
			scroll.disconnect();
		};
	}, [messageListRef, bottomRef]);

	const scrollCallback = (entries: IntersectionObserverEntry[]) => {
		if (entries[0].isIntersecting) {
			// 스크롤시에 이벤트
			console.log("스크롤", `${pageIndex} 회`);
			const list = axios(
				`https://dev-account-api.yeoshin.co.kr/latest/web/hospitals?pageNum=${
					pageIndex + 2
				}&listMaxCount=5`
			);
			list.then(function (response) {
				newsetstate(response.data.results);
				// 초기값을 안불러왔다면 다시한번더 불러와서 초기 상태에 저장
				if (state.length == 0) {
					console.log(state.length);
					axios(
						"https://dev-account-api.yeoshin.co.kr/latest/web/hospitals?pageNum=1&listMaxCount=10"
					).then(function (res) {
						setState(res.data.results);
					});
					// 초기값이 있다면 초기값 + 불러온 값
				} else {
					setState(prevstate => [...prevstate, ...newstate]);
				}
				// 로딩 상태로 바꿔서 딜레이 걸어주기
				setLoading(true);
				setTimeout(() => {
					list.then(function (res) {
						console.log(`병원 목록 : ${pageIndex}회`, res.data.results);
					});
					// 페이징 번호 + 1
					setPageIndex(pageIndex + 1);
					// 로딩상태 해제
					setLoading(false);
				}, 500);
			});
		}
	};

	return (
		<>
			{pageIndex}
			<List ref={messageListRef}>
				<ul className="">
					{state.map((item, index) => (
						<>
							<li
								key={index}
								className={classnames(
									"",
									state[index]["miPremiumUse"] == "Y" ? "" : "is-mini"
								)}
							>
								<div className="imgwrap">
									{state[index]["miPremiumUse"] == "Y" ? (
										<img
											src={`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/member/${state[index]["miPremiumThumbImg"]}`}
											alt={state[index]["cname"]}
										/>
									) : (
										<img
											src={`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/member/${state[index]["miThumbImg"]}`}
											alt={state[index]["cname"]}
										/>
									)}
								</div>

								<div className="textwrap">
									<div className="title">{state[index]["cname"]}</div>
									{state[index]["id"] == "disaplastic" && (
										<div className="tags">
											<span>여의사</span>
											<span>전문의</span>
										</div>
									)}
									<span className="place">{state[index]["miLoc"]}</span>
									<span className="review">
										후기 {state[index]["totalRvCnt"]}개
									</span>
									<span className="event">
										이벤트 {state[index]["totalEventCnt"]}개
									</span>
								</div>
							</li>
						</>
					))}
					<div ref={bottomRef} />
					{isLoading && <div>로딩중</div>}
				</ul>
			</List>
		</>
	);
};

export default HospitalContents;
