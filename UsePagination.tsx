import React, { useEffect, useState } from "react";
import { PersonalTemplate } from "components/templates/PersonalTemplate";
import { Header, NoticeContents } from "components/organisms";
import Pagination from "components/atoms/pagination/Pagination";
import { useGetDataApi, usePagination } from "hooks";
import { observer } from "mobx-react-lite";

// 공지사항
const NoticePage = () => {
	const { setGetData } = useGetDataApi({});
	const [data, setdata] = useState([]);

	const [allItemCount, setallItemCount] = useState(0);
	const [currentPage, setcurrentPage] = useState(1);
	const viewCount = 20;

	useEffect(() => {
		setGetData({
			url: `https://account-api.yeoshin.co.kr/latest/web/board/notice?pageNum=${currentPage}&listMaxCount=${viewCount}`,
			success: res => {
				setdata(res.results);
				setallItemCount(res.totalCount);
			},
			fail: err => console.log(err),
		});
	}, [currentPage]);

	const pageNum = (pageNum: number) => {
		setcurrentPage(pageNum);
	};
	return (
		<>
			<PersonalTemplate
				header={<Header text="공지사항" subpage />}
				contents={<NoticeContents NoticeData={data} />}
				pagination={
					<Pagination
						allItem={allItemCount} // 총 아이템 갯수
						viewPageCount={viewCount} // 한페이지에 보여지는 아이템 갯수
						selectPage={currentPage} // 현재 보고 있는 페이지
						click={pageNum} // 클릭 이벤트
					/>
				}
			/>
		</>
	);
};

export default observer(NoticePage);
