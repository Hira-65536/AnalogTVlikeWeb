
// ロード完了後
$(function()
{
    // inputタグの変更イベント
    $('.inputFile').on("change", function()
    {
        // 選択されたファイル情報
        file = this.files[0];
        // 対応ファイルフォーマットリスト
        permit_type = ["image/jpeg", "image/png", "image/gif"];
        // 対応ファイルではない場合
        if(file && permit_type.indexOf(file.type) == -1)
        {
            // アラートを表示
            alert("未対応のファイルです。");
            // ファイル名をクリアする
            $(this).val("");
            // 処理終了
            return ;
        }
        // ファイル読み込みオブジェクト
        reader = new FileReader();
        // ファイルのロードが完了した場合のコールバック
        reader.onload = function()
        {
            // 表示用画像に設定
            $('.showImage').attr("src", reader.result);
        };
        // ファイルのロード
        reader.readAsDataURL(file);
    });
});