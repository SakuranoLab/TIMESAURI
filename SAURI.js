var PassSec;	// 秒数カウント用変数
var PassMin;	// 分
var PassHour;	// 時間

var PassSec2;	// 秒数カウント用変数（DINOSAURI用）
var PassYee;	// DINOSAURI何周分

//Twitter投稿用
// var url = "0724.tokyo/TIMESAURI/";
var url = "https://sakuranolab.github.io/TIMESAURI/"
var hash = "DINOSAURI何周分か換算するサイト";

// 繰り返し処理の中身
function showPassage() {
    PassSec++;
    PassSec2++;
    // 通常の時間換算処理
    if (PassSec > 59) {
        PassSec = 0;
        PassMin++;
    }
    if (PassMin > 59) {
        PassMin = 0;
        PassHour++;
    }
    // DINOSAURIを1単位だと思っている人の時間換算処理
    PassYee = (PassSec2 / 2612).toFixed(3);
    var msg = "ボタンを押してから" + PassHour + "時間" + PassMin + "分" + PassSec + "秒が経過しました。これはDINOSAURI" + PassYee + "周分に相当します。";   // 表示文作成
    document.getElementById("PassageArea").innerHTML = msg;   // 表示更新
}

// 繰り返し処理の開始
function startShowing() {
    // カウンタのリセット
    PassSec = 0;
    PassMin = 0;
    PassHour = 0;
    PassSec2 = 0;
    PassYee = 0;
    PassageID = setInterval('showPassage()', 1000);   // タイマーをセット(1000ms間隔)
    document.getElementById("startcount").disabled = true;   // 開始ボタンの無効化
}

// 繰り返し処理の中止・Twitter投稿
function stopShowing() {
    msg = document.getElementById("PassageArea").innerHTML;
    window.open("https://twitter.com/intent/tweet?text=" + msg + "&url=" + url + "&hashtags=" + hash, "_blank");
    clearInterval(PassageID);   // タイマーのクリア
    document.getElementById("startcount").disabled = false;   // 開始ボタンの有効化
}
