/// <reference path="C:/Users/RUI/OneDrive/lib/aftereffects.d.ts/ae.d.ts"/>
(function () {
  //#target estoolkit#dbg
  //@target estoolkit#dbg
  const _STRINGS = {
    JP: {
      LOAD: "ファイルを開く",
    },
    EN: {
      LOAD: "Load File",
    }
  };

  const LOAD_SUPPORT_EXTENTION: string[] = ["JavaScript files:*.jsx;*.js;*.jsxinc", "All files:*.*"];

  const getLocalizedText = function (str): string {
    if (app.isoLanguage == "ja_JP") {
      return str.jp;
    } else {
      return str.en;
    }
  }

  let folderPath: Folder = Folder.desktop;

  const fileName: string = decodeURIComponent(folderPath.fsName);
  const jsxFile: File = new File(fileName).openDlg(getLocalizedText({ jp: _STRINGS.JP.LOAD, en: _STRINGS.EN.LOAD }), LOAD_SUPPORT_EXTENTION);
  if (jsxFile == null) {
    return 0;
  }

  jsxFile.open("r");
  let jsxText: string = jsxFile.read();
  jsxFile.close();

  let jsxbinText: string = app.compile(jsxText);
  let jsxbinFile: File = new File(String(jsxFile.parent) + "/" + String(jsxFile.name.split(".")[0]) + ".jsxbin");
  jsxbinFile.open("w");
  jsxbinFile.write(jsxbinText);
  jsxbinFile.close();
}).call(this);
