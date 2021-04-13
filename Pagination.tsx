import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import classnames from "classnames";
import img from "assets/img/shop_pack.png";
import classNames from "classnames";

type PageProps = {
	allItem: number;
	selectPage?: number;
	viewPageCount?: number;
	click?: (value: number) => void;
};

const Paging = styled.div`
	padding: 20px 0;
	border-top: 1px solid #d8d8d8;
	text-align: center;
	background: #f0f0f0;
	li {
		position: relative;
		display: inline-block;
		margin: 0 1px;
		min-width: 40px;
		height: 35px;
		line-height: 35px;
		border: 1px solid #d1d1d1;
		font-size: 15px;
		background: #fff;
		vertical-align: middle;
		cursor: pointer;
		&.first,
		&.last {
			span {
				position: absolute;
				left: 50%;
				top: 50%;
				margin: -7px 0 0 -5px;
				width: 10px;
				height: 15px;
				background: transparent url(${img}) no-repeat;
				background-size: 320px;
			}
		}
		&.first {
			span {
				background-position: -120px -30px;
			}
		}
		&.last {
			span {
				background-position: -130px -30px;
			}
		}
		&.is-select {
			background: #4d5058;
			color: white;
			border: 1px solid #454951;
		}
	}
`;

// TODO: 받아올 값에 대한 고민..
// select 가 5n+1일 경우. ex) 6선택할 경우 1~4안보이게하기, 11일 경우 6~10 안보이게하기
const Pagination = ({
	allItem,
	selectPage = 0,
	viewPageCount = 20,
	click = (value: number) => 0,
}: PageProps) => {
	const calc = Math.ceil(allItem / viewPageCount);

	const Click = (idx: number) => {
		console.log(idx);
		if (idx != 0 && idx <= calc) {
			click(idx);
		}
	};

	const pagingCalc = (calc: number) => {
		const num = 5;
		const n = Math.ceil(calc / num);
		const temparray = [];
		for (let i = 1; i <= num; i++) {
			temparray.push(i);
		}
	};

	return (
		<>
			<Paging>
				<ul>
					<li className="first" onClick={() => Click(selectPage - 1)}>
						<span></span>
					</li>
					{pagingCalc(calc)}
					{Array.from(Array(calc).keys()).map((item, index) => {
						return (
							<>
								{/* FIXME : view에서 5단위로 끈어서 보여줘야 하는 부분에서 막혔어요 */}
								{/* {(index + 1) % 6 != 0 && ( */}
								<li
									key={index}
									className={classNames(
										"",
										selectPage == index + 1 ? "is-select" : ""
									)}
									onClick={() => Click(index + 1)}
								>
									{item + 1}
								</li>
								{/* )} */}
							</>
						);
					})}
					<li className="last" onClick={() => Click(selectPage + 1)}>
						<span></span>{" "}
					</li>
				</ul>
			</Paging>
		</>
	);
};

export default Pagination;
