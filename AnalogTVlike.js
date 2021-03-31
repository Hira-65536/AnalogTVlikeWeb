
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
    // 画像処理ボタンの押下イベント
    $('.execBtn').on("click", function()
    {
      img = new Image();
      // 画像データの読み込み完了後イベント
      img.onload = function()
      {
          // body内にCanvas追加
          $('body').append("<canvas width='" + img.width.toString() + "' height='" + img.height.toString() + "></canvas>");
          // そのままだと見えてしまうので見えないようにする
          $('canvas').css("display", "none");
          // 追加したCanvas
          cvs = $('canvas')[0];
          // CanvasからContext(実際に画像データを扱っているデータ)を取得
          ctx = cvs.getContext("2d");
          // Contextに読み込み画像データを設定
          ctx.drawImage(img, 0, 0, img.width, img.height);
      
          data = ctx.getImageData(0, 0, img.width, img.height);
          // 生データの取得に成功した場合
          if(data)
          {
              // 画素値を格納しているデータを取得
              raw = data.data;
          
              // 縦方向に走査
              for(y = 0; y < img.height; y++)
              {
                  // 横方向に走査
                  for(x = 0; x < img.width; x++)
                  {
                      // 該当データのインデックス
                      // * idx + 0 -> 赤成分
                      // * idx + 1 -> 緑成分
                      // * idx + 2 -> 青成分
                      // * idx + 3 -> 透明度成分
                      idx = x * 4 + y * img.width * 4;
                      // 緑成分と青成分を0にして赤成分のみを抽出する
                      raw[idx + 1] = raw[idx + 2] = 0;
                  }
              }
          
              // 変更をContextに反映
              ctx.putImageData(data, 0, 0);
              // 変更を表示画像に反映
              $('.showImage').attr("src", cvs.toDataURL());
          }
      }
      
      // 読み込み画像データに表示用画像データを渡す
      img.src = $('.showImage').attr("src");
    });
    
});