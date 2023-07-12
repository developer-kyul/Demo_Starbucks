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
 * 올해가 몇 년도인지 계산 footer
 */
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()