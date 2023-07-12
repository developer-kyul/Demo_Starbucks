/**
 * 검색창 작동
 */

//검색창 요소 찾기
const searchEl = document.querySelector('.search');
const searchInputEl =searchEl.querySelector('input');

//검색창 요소 클릭시에 실행
searchEl.addEventListener('click', function(){
    searchInputEl.focus();
})

//검색창 요소 내부 실제 input 요소에 포커스되면 실행되는 것
searchInputEl.addEventListener('focus', function(){
    searchEl.classList.add('focused')
    searchInputEl.setAttribute('placeholder', '통합검색')
})

//검색창 요소에서 포커스 해제될 떄 실행되는 것
searchInputEl.addEventListener('blur', function(){
    searchEl.classList.remove('focused')
    searchInputEl.setAttribute('placeholder', '')
})

/**
 * header 옆에 광고 배너
 * 페이지 스크롤 시 하단에서 사라짐
 * 페이지 스크롤에 따른 요소 제어
 */

//페이지 스크롤에 영향을 받는 요소들 검색
// 상단 광고 배너
const badgeEl = document.querySelector('header .badges');
// 탑으로 이동하는 버튼
const toTopEl = document.querySelector('#to-top');

// 페이지에 스크롤 이벤트를 추가!
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
window.addEventListener('scroll', _.throttle(function () {
    //사용법 : _.throttle(함수, 시간)
    // 페이지 스크롤 위치가 500px이 넘으면.
    if (window.scrollY > 500) {
      // Badge 요소 숨기기!
      //사용법 : gsap,to (요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
        opacity: 0,
        display: 'none'
    })
    // 상단으로 스크롤 버튼 보이기!
        gsap.to(toTopEl, .2, {
        x: 0
    })

    // 페이지 스크롤 위치가 500px이 넘지 않으면.
    } else {
    // Badge 요소 보이기!
        gsap.to(badgeEl, .6, {
        opacity: 1,
        display: 'block'
    })
    // 상단으로 이동하는 스크롤 버튼 숨기기!
        gsap.to(toTopEl, .2, {
        x: 100
    })
    }
    }, 300))

    //상단으로 이동하는 버튼 이벤트 
    toTopEl.addEventListener('click', function(){
      gsap.to(window, .7, {
        scrollTo:0
      });
    });



    // visual에 위치
    // 순서대로 나타나는 기능

    // 나타날 요소들(.fade-in) 찾기.
    const fadeEls = document.querySelectorAll('.visual .fade-in')

    // 나타날 요소들을 하나씩 반복해서 처리!
    fadeEls.forEach(function (fadeEl, index) {
    //사용법 : gsap,to (요소, 지속시간, 옵션);
    // 각 요소들을 순서대로(delay) 보여지게 함!
        gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7,
        opacity: 1
        })
    })

    /**
     * 슬라이드
    */

    //노티드 부분
    new Swiper('.notice-line .swiper-container', {
        direction: 'vertical', // 수직 슬라이드
        autoplay: true, // 자동 재생 여부
        loop: true // 반복 재생 여부
    })
  
    new Swiper('.promotion .swiper-container', {
        // direction: 'horizontal', // 수평 슬라이드
        autoplay: { // 자동 재생 여부
        delay: 5000 // 5초마다 슬라이드 바뀜
        },
        loop: true, // 반복 재생 여부
        slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
        spaceBetween: 10, // 슬라이드 사이 여백
        centeredSlides: true, // 1번 슬라이드가 가운데 보이기
        pagination: { // 페이지 번호 사용 여부
        el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
        },
        navigation: { // 슬라이드 이전/다음 버튼 사용 여부
        prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
        nextEl: '.promotion .swiper-next' // 다음 버튼 선택자
        }
    })

    new Swiper('.awards .swiper-container', {
        autoplay: true,
        loop: true,
        spaceBetween:30,
        slidesPerView:5
    })
  
  
  
  /**
   * Promotion 슬라이드 토글 기능
   */
  // 슬라이드 영역 요소 검색!
  const promotionEl = document.querySelector('.promotion')
  // 슬라이드 영역를 토글하는 버튼 검색!
  const promotionToggleBtn = document.querySelector('.toggle-promotion')
  // 슬라이드 영역 숨김 여부 기본값!
  let isHidePromotion = false
  // 토글 버튼을 클릭하면,
  promotionToggleBtn.addEventListener('click', function () {
    // 슬라이드 영역 숨김 여부를 반댓값으로 할당!
    isHidePromotion = !isHidePromotion
    // 요소를 숨겨야 하면,
    if (isHidePromotion) {
      promotionEl.classList.add('hide')
    // 요소가 보여야 하면,
    } else {
      promotionEl.classList.remove('hide')
    }
  })



/**
 * 동영상 위에 둥둥 배너
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 '문자 데이터'를,
    // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }
  // 부유하는(떠 다니는) 요소를 만드는 함수
  function floatingObject(selector, delay, size) {
    gsap.to(
      selector, // 선택자
      random(1.5, 2.5), // 애니메이션 동작 시간
      {
        delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
        y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
        repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
        yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
        ease: Power1.easeInOut // Easing 함수 적용. 부드러운 재생 가능
      }
    )
  }
  floatingObject('.floating1', 1, 15)
  floatingObject('.floating2', .5, 15)
  floatingObject('.floating3', 1.5, 20)
  


  /**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
})


/**
 * 올해가 몇 년도인지 계산
 */
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()