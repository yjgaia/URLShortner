URLShortner.LinkModel=OBJECT({preset:function(){"use strict";return URLShortner.MODEL},params:function(){"use strict";var t={url:{notEmpty:!0,size:{max:2e3}},count:{notEmpty:!0,integer:!0}};return{name:"Link",isNotUsingObjectId:!0,initData:{count:0},methodConfig:{create:{valid:VALID(t)},update:!1,remove:!1}}}});OVERRIDE(URLShortner.LinkModel,function(n){"use strict";URLShortner.LinkModel=OBJECT({preset:function(){return n},init:function(n,t,r){n.on("create",{before:function(n,r,i){var e=n.url,o=0,u=function(){var i;o<100&&(o+=1,i=RANDOM_STR(6),t.checkIsExists({filter:{id:i}},function(t){t===!0?u():(n.id=i,r())}))};return"http://"!==e.substring(0,7)&&"https://"!==e.substring(0,8)&&(n.url=e="http://"+e),t.get({filter:{url:e}},{success:function(n){i({savedData:n})},notExists:function(){e.substring(0,CONFIG.URLShortner.domain.length)!==CONFIG.URLShortner.domain&&u()}}),!1}})}})}),URLShortner.MAIN=METHOD({run:function(n){"use strict";n(function(n,t,r,i){var e=n.uri,o=n.method,u=n.params.url;return"POST"===o?(URLShortner.LinkModel.get({filter:{url:u}},{notExists:function(){URLShortner.LinkModel.create({url:u},function(n){t(CONFIG.URLShortner.domain+"/"+n.id)})},success:function(n){t(CONFIG.URLShortner.domain+"/"+n.id)}}),!1):(URLShortner.LinkModel.get(e,{notExists:function(){i()},success:function(n){URLShortner.LinkModel.update({id:n.id,$inc:{count:1}}),t({statusCode:302,headers:{Location:n.url}})}}),!1)})}});