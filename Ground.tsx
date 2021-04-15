			const array = response.data.results.recommendProducts.map(
				(a: { productCode: number }) => a.productCode
			);

// 부모로 함수 넘기기 ///////////////
// 1. 부모  - 함수 만들기
const pageNum = (pageNum : number ) => {
console.log(pageNum);
}

// - 자식으로 함수 넘기기
<컴포넌트 cli={pageNum}

<!-- 2. 자식 - 타입 받기 -->
type Type = {
  cli = (value: number) => void 
}

컴포넌트 = ({
  cli=(value:number) => 0,
}: Type) => {
}

// 3. 넘기기
onClick={()=> cli()}

// 토글 
const [listView, listViewSet] = useState(-1);
const Toggle = (i: number) => {
	listViewSet(i);
	listView == i ? listViewSet(-1) : listViewSet(i);
};
<div
	className={classnames(
		"view-title",
		listView == index ? "is-open" : ""
	)}
	onClick={() => Toggle(index)}
>
	<span className="icon">Q</span>
	<span className="view-title__text">
		{FaqData[index]["btitle"]}
	</span>
	<span
		className={classnames(
			"icon-close",
			listView == index ? "is-show" : ""
		)}
	></span>
</div>
