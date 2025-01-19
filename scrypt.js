let game = document.querySelector("#game");
let dinosaur = document.querySelector("#dinosaur");
let cactus = document.querySelector("#cactus");
let my_point = document.querySelector("#my-point");
let my_level = document.querySelector("#my-level");
let my_chance = document.querySelector("#my-chance");
let gameover = document.querySelector("#gameover");
let cactus_flag = false;
let check_level = true;

let point = 0;
let chance_to_play = 3; // تنظیم تعداد جان‌ها
let collision_flag = false; // پرچم برخورد


function jump_dinosaur() {
    if (!dinosaur.classList.contains("jump")) {
        dinosaur.classList.add("jump");
        cactus_flag = true;
        setTimeout(() => {
            dinosaur.classList.remove("jump");
        }, 600);
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
        jump_dinosaur();
    }
    if (chance_to_play <= 0 && e.code == "Space") {
        window.location.reload();
    }
});




document.addEventListener("click", () => {
    jump_dinosaur();
    if (chance_to_play <= 0) {
        window.location.reload();
    }
});

setInterval(() => {
    if (point >= 400 && check_level) {
        cactus.style.animationDuration = "1s"; // افزایش سرعت سنگ
        my_level.innerHTML = "2";  // تغییر سطح
        check_level = false; // جلوگیری از تکرار
        
    } 
}, 100);


let check_live_game = setInterval(() => {
    let dinosaur_top = parseInt(
        window.getComputedStyle(dinosaur).getPropertyValue("top")
    );
    let cactus_left = parseInt(
        window.getComputedStyle(cactus).getPropertyValue("left")
    );


        // بررسی برخورد دایناسور با سنگ
    if (cactus_left > 170 && cactus_left < 200 && dinosaur_top > 300) {
        if(!collision_flag){ // جلوگیری از کاهش چندباره
             chance_to_play--; // کاهش فرصت بازی
        my_chance.innerHTML = chance_to_play; // نمایش تعداد فرصت باقی‌مانده
        collision_flag=true // فعال کردن پرچم برخورد
        }
       
    }


    // ریست پرچم برخورد وقتی سنگ از دایناسور عبور کرد
    if(cactus_left<170){
        collision_flag=false
    }


        // بررسی پایان بازی
    if (chance_to_play <= 0) {
        dinosaur.style.animationPlayState = "paused";
        cactus.style.animationPlayState = "paused";
        game.style.animationPlayState = "paused";
        gameover.style.display = "block";
        clearInterval(check_live_game); // توقف بررسی وضعیت بازی
    }

    // افزایش امتیاز
    if (cactus_left < 10 && cactus_flag) {
        point += 100;
        cactus_flag = false;
        my_point.innerHTML = point;
    }
}, 10);


