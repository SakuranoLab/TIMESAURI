// 経過時間用
var PassSec;	// 秒数カウント用変数
var PassMin;	// 分
var PassHour;	// 時間

var PassSec2;	// 秒数カウント用変数（DINOSAURI用）
var PassYee;	// DINOSAURI何周分

var CurrentTime; // 現在時刻
var StartTime; // 開始時刻
var TimeDiff; // 時間の差分（ミリ秒）
var TimeDiffSec // 時間の差分（秒）

// 時間変換用
var OrigHour;  // 入力された時間
var OrigMin;   // 入力された分
var OrigSec;   // 入力された秒
var SumSec;    // 合計の秒
var DINOnized; // DINOSAURI変換 

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
    // 実際の時間経過と処理上の時間経過が誤っていた際の補正処理
    // 現在時刻を取得し、秒に変換する
    CurrentTime = Date.now();
    TimeDiff = CurrentTime - StartTime;
    TimeDiffSec = Math.floor(TimeDiff / 1000);
    // PassSec2と比較して違っていた場合（検討の余地あり）、TimeDiffSecを正とし再度時分秒を計算する
    if (TimeDiffSec != PassSec2) {
        PassSec2 = TimeDiffSec;
        PassHour = Math.floor(TimeDiffSec / 3600);
        PassMin = Math.floor(TimeDiffSec % 3600 / 60);
        PassSec = Math.floor(TimeDiffSec % 3600 % 60);
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
    // 補正のため開始時刻を取得
    StartTime = Date.now();
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

// 入力された時分秒のDINOへの変換
function DINOnize() {
    OrigHour = document.getElementById("hourinput").value;
    OrigMin = document.getElementById("minuteinput").value;
    OrigSec = document.getElementById("secinput").value;

    if (isNaN(OrigHour) || isNaN(OrigMin) || isNaN(OrigSec)) {
        document.getElementById("CalculateResult").innerHTML = "半角の数字を入力してください。";
        return;
    }

    SumSec = OrigHour * 3600 + OrigMin * 60 + OrigSec * 1;
    console.log(OrigHour + " " + OrigMin + " " + OrigSec);
    console.log(SumSec);
    DINOnize = (SumSec / 2612).toFixed(3);
    console.log(DINOnize);

    var msg = OrigHour + "時間" + OrigMin + "分" + OrigSec + "秒は、" + DINOnize + "DINOSAURIに相当します。"
    document.getElementById("CalculateResult").innerHTML = msg;   // 表示更新

}

function DINOnizeTweet() {
    msg = document.getElementById("CalculateResult").innerHTML;
    window.open("https://twitter.com/intent/tweet?text=" + msg + "&url=" + url + "&hashtags=" + hash, "_blank");
}
