// 레시피 순서 정의
const requiredOrder = ["밀가루", "설탕", "달걀", "레몬", "버터"];
let currentIngredientIndex = 0; // 지금 넣어야 할 재료 순서

const ingredients = document.querySelectorAll('.ingredient');
const bowlZone = document.getElementById('mixing-bowl-zone');
const bowlList = document.getElementById('ingredients-in-bowl');

// --- 효과음 설정 플래이스홀더 ---
// const plopSound = new Audio('assets/audio/plop.mp3');
// const failSound = new Audio('assets/audio/fail.mp3');

// 1. 모든 재료 아이템에 드래그 이벤트 리스너 추가
ingredients.forEach(ing => {
    ing.addEventListener('dragstart', (e) => {
        // 드래그하는 재료의 ID를 저장
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.style.opacity = '0.5'; // 드래그 중임을 시각적으로 표시
    });

    ing.addEventListener('dragend', (e) => {
        e.target.style.opacity = '1'; // 드래그 끝나면 원상복구
    });
});

// 2. 믹싱 볼 영역 (드롭 존) 이벤트 설정
bowlZone.addEventListener('dragover', (e) => {
    e.preventDefault(); // 드롭을 허용하기 위해 기본 동작 방지
    bowlZone.classList.add('hover'); // 볼 영역 하이라이트
});

bowlZone.addEventListener('dragleave', () => {
    bowlZone.classList.remove('hover'); // 볼 영역 하이라이트 제거
});

bowlZone.addEventListener('drop', (e) => {
    e.preventDefault();
    bowlZone.classList.remove('hover');

    const ingredientId = e.dataTransfer.getData('text/plain');
    const droppedIngredient = document.getElementById(ingredientId);
    const ingredientName = droppedIngredient.getAttribute('data-ingredient');

    // --- 로직: 순서가 맞는지 확인 ---
    if (ingredientName === requiredOrder[currentIngredientIndex]) {
        // 맞춘 경우
        // plopSound.play(); // -> 나중에 유저님이 효과음 파일 넣으면 주석 해제

        // 볼 안에 재료 이름 추가
        const newIng = document.createElement('span');
        newIng.textContent = ingredientName;
        bowlList.appendChild(newIng);

        // 드래그한 아이템은 진열대에서 숨김 (볼에 들어갔으니까)
        droppedIngredient.style.visibility = 'hidden';

        currentIngredientIndex++; // 다음 순서로

        // 모든 재료를 다 넣었는지 확인
        if (currentIngredientIndex === requiredOrder.length) {
            alert("짝짝짝! 재료를 다 넣었습니다. 이제 섞어볼까요? (다음 단계로 로직 이동)");
            // 여기에 Step 2 (섞기)로 전환하는 함수를 넣으면 됩니다.
        }
    } else {
        // 틀린 경우
        // failSound.play(); // -> 주석 해제
        alert(`틀렸어요! 지금은 [${requiredOrder[currentIngredientIndex]}]를 넣을 차례입니다.`);
    }
});
