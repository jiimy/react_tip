  componentDidMount() {
    if (window.location.href.includes('/account')) {
      this.setState({ clsssnaming: 'master-page' });
    }

    //js

    function setScreenSize() {
      //먼저 뷰포트 높이를 얻고 1%를 곱하여 vh 단위 값을 얻습니다.
      let vh = window.innerHeight * 0.01;
      //그런 다음 --vh 사용자 정의 속성의 값을 문서의 루트로 설정합니다.
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      // document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
    // function setMedia() {
    //   if (window.innerWidth >= 768) {
    //     console.log('모바일아님');
    //     document.documentElement.style.setProperty('--is-mobile', `${0}px`);
    //     return false;
    //   }
    //   else {
    //     console.log('모바일');
    //     document.documentElement.style.setProperty('--is-mobile', `${window.innerWidth}px`);
    //     return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    //   }
    // }
    setScreenSize();
    // setMedia();
    window.addEventListener('resize', () => setScreenSize());
    // window.addEventListener('resize', () => setMedia());
  }

// 배열에서 중복 제거
const dupArr = [1, 2, 3, 1, 2];

const uniqueArr = dupArr.filter((element, index) => {
    return dupArr.indexOf(element) === index;
});
