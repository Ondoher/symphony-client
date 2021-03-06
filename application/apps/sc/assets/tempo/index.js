/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'chevron': '&#xea0b;',
            'audio_bridge': '&#xea0c;',
            'border_color': '&#xea0a;',
            'filetype_AVI': '&#xea03;',
            'filetype_blank': '&#xea04;',
            'filetype_CDI': '&#xea05;',
            'filetype_M4V': '&#xea06;',
            'filetype_MPEG': '&#xea07;',
            'filetype_MPG': '&#xea08;',
            'filetype_WBMP': '&#xea09;',
            'filetype_ACC': '&#xe9e6;',
            'filetype_BMP': '&#xe9e7;',
            'filetype_CSV': '&#xe9e8;',
            'filetype_DOC': '&#xe9e9;',
            'filetype_DOCX': '&#xe9ea;',
            'filetype_GIF': '&#xe9eb;',
            'filetype_HTML': '&#xe9ec;',
            'filetype_JPG': '&#xe9ed;',
            'filetype_M4A': '&#xe9ee;',
            'filetype_MOV': '&#xe9ef;',
            'filetype_MP3': '&#xe9f0;',
            'filetype_MP4': '&#xe9f1;',
            'filetype_MSG': '&#xe9f2;',
            'filetype_ODM': '&#xe9f3;',
            'filetype_PDF': '&#xe9f4;',
            'filetype_PNG': '&#xe9f5;',
            'filetype_PPT': '&#xe9f6;',
            'filetype_PPTX': '&#xe9f7;',
            'filetype_RFT': '&#xe9f8;',
            'filetype_TIF': '&#xe9f9;',
            'filetype_TIFF': '&#xe9fa;',
            'filetype_TXT': '&#xe9fb;',
            'filetype_WAV': '&#xe9fc;',
            'filetype_XLS': '&#xe9fd;',
            'filetype_XLSX': '&#xe9fe;',
            'filetype_XML': '&#xe9ff;',
            'filetype_XSD': '&#xea00;',
            'filetype_XTIFF': '&#xea01;',
            'filetype_ZIp': '&#xea02;',
            'sort': '&#xe9e5;',
            'addressbook2': '&#xe9b8;',
            'check12': '&#xe9b9;',
            'check18': '&#xe9ba;',
            'circlealertoutline': '&#xe9bb;',
            'circlealertsolid': '&#xe9bc;',
            'circleinfooutline': '&#xe9bd;',
            'circleinfosolid': '&#xe9be;',
            'close18': '&#xe9bf;',
            'close24': '&#xe9c0;',
            'close32': '&#xe9c1;',
            'close36': '&#xe9c2;',
            'close48': '&#xe9c3;',
            'clouddownload': '&#xe9c4;',
            'cloudoutline': '&#xe9c5;',
            'cloudsolid': '&#xe9c6;',
            'dropdown': '&#xe9c7;',
            'email': '&#xe9c8;',
            'helpoutline': '&#xe9c9;',
            'helpsolid': '&#xe9ca;',
            'hourglassoutline': '&#xe9cb;',
            'hourglasssolid': '&#xe9cc;',
            'ic_apps': '&#xe9cd;',
            'ic_arrow': '&#xe9ce;',
            'ic_attach_file': '&#xe9cf;',
            'ic_chat_bubble': '&#xe9d0;',
            'ic_contacts': '&#xe9d1;',
            'ic_group_add': '&#xe9d2;',
            'ic_insert_chart': '&#xe9d3;',
            'ic_insert_comment': '&#xe9d4;',
            'ic_keyboard': '&#xe9d5;',
            'ic_label_outline': '&#xe9d6;',
            'ic_list': '&#xe9d7;',
            'ic_mic_none': '&#xe9d8;',
            'ic_mode_comment': '&#xe9d9;',
            'ic_notifications_none': '&#xe9da;',
            'ic_ondemand_video': '&#xe9db;',
            'ic_personal_video': '&#xe9dc;',
            'ic_view_quilt': '&#xe9dd;',
            'notavailableoutline': '&#xe9de;',
            'notavailablesolid': '&#xe9df;',
            'playoutline': '&#xe9e0;',
            'playsolid': '&#xe9e1;',
            'securelock': '&#xe9e2;',
            'singlequote': '&#xe9e3;',
            'starlike': '&#xe9e4;',
            'addressbook': '&#xe925;',
            'airplane': '&#xe926;',
            'alarmclock': '&#xe927;',
            'alert': '&#xe928;',
            'appsettings': '&#xe929;',
            'arrowdown': '&#xe92a;',
            'arrowleft': '&#xe92b;',
            'arrowright': '&#xe92c;',
            'arrowup': '&#xe92d;',
            'assetclass': '&#xe92e;',
            'blacklist': '&#xe92f;',
            'bot': '&#xe930;',
            'browserooms': '&#xe931;',
            'bulkjobhistory': '&#xe932;',
            'bulkmanageaccounts': '&#xe933;',
            'calendar': '&#xe934;',
            'camera': '&#xe935;',
            'carrotdown': '&#xe936;',
            'carrotleft': '&#xe937;',
            'carrotright': '&#xe938;',
            'carrotup': '&#xe939;',
            'cashtag': '&#xe93a;',
            'check': '&#xe93b;',
            'circlealert': '&#xe93c;',
            'circlecheck': '&#xe93d;',
            'circleinfo': '&#xe93e;',
            'clipboard': '&#xe93f;',
            'cloud': '&#xe940;',
            'cloudupload': '&#xe941;',
            'code': '&#xe942;',
            'collapse': '&#xe943;',
            'commentsmaller': '&#xe944;',
            'company': '&#xe945;',
            'configuresso': '&#xe946;',
            'connectionadd': '&#xe947;',
            'connectionfollowing': '&#xe948;',
            'connectionremove': '&#xe949;',
            'connections': '&#xe94a;',
            'copy': '&#xe94b;',
            'copydisabled': '&#xe94c;',
            'directionbackward': '&#xe94d;',
            'directionforward': '&#xe94e;',
            'distrobutionlist': '&#xe94f;',
            'division': '&#xe950;',
            'document': '&#xe951;',
            'documentcreate': '&#xe952;',
            'download': '&#xe953;',
            'entitlements': '&#xe954;',
            'equalsign': '&#xe955;',
            'error': '&#xe956;',
            'expand': '&#xe957;',
            'exportcontent': '&#xe958;',
            'expressionfilters': '&#xe959;',
            'filterfunnel': '&#xe95a;',
            'filters': '&#xe95b;',
            'fingerprint': '&#xe95c;',
            'flag': '&#xe95d;',
            'foldercreate': '&#xe95e;',
            'fullscreen': '&#xe95f;',
            'fullscreenexit': '&#xe960;',
            'globe': '&#xe961;',
            'gpspin': '&#xe962;',
            'graph': '&#xe963;',
            'hourglass': '&#xe964;',
            'image': '&#xe965;',
            'imagebroken': '&#xe966;',
            'informationbarriers': '&#xe967;',
            'layoutgrid': '&#xe968;',
            'layoutsingle': '&#xe969;',
            'lightbulb': '&#xe96a;',
            'lightningbolt': '&#xe96b;',
            'link': '&#xe96c;',
            'linkunlink': '&#xe96d;',
            'listnumbers': '&#xe96e;',
            'listtodo': '&#xe96f;',
            'logout': '&#xe970;',
            'mailopened': '&#xe971;',
            'mailunopened': '&#xe972;',
            'messagecheck': '&#xe973;',
            'messagenohistory': '&#xe974;',
            'messageplus': '&#xe975;',
            'messageviewhistory': '&#xe976;',
            'microphone': '&#xe977;',
            'microphoneoff': '&#xe978;',
            'minus': '&#xe979;',
            'mobiledevice': '&#xe97a;',
            'movie': '&#xe97b;',
            'mutualconnections': '&#xe97c;',
            'notavailable': '&#xe97d;',
            'paintpalette': '&#xe97e;',
            'passwordinvisible': '&#xe97f;',
            'passwordvisible': '&#xe980;',
            'peopleexternal': '&#xe981;',
            'peopleinternal': '&#xe982;',
            'peoplewhoshere': '&#xe983;',
            'person': '&#xe984;',
            'phone': '&#xe985;',
            'play': '&#xe986;',
            'plussmall': '&#xe987;',
            'print': '&#xe988;',
            'profile': '&#xe989;',
            'profilephoto': '&#xe98a;',
            'quicksearch12': '&#xe98b;',
            'quotedouble': '&#xe98c;',
            'quotesingle': '&#xe98d;',
            'read': '&#xe98e;',
            'refresh': '&#xe98f;',
            'room': '&#xe990;',
            'rtecenter': '&#xe991;',
            'rteindent': '&#xe992;',
            'rteindentremove': '&#xe993;',
            'rtejustified': '&#xe994;',
            'rteleft': '&#xe995;',
            'rteletter': '&#xe996;',
            'rteright': '&#xe997;',
            'rtestrikethrough': '&#xe998;',
            'rteunderline': '&#xe999;',
            'rules': '&#xe99a;',
            'screencapture1': '&#xe99b;',
            'screencapture2': '&#xe99c;',
            'screenshare_end': '&#xe99d;',
            'searchpeople': '&#xe99e;',
            'securekey': '&#xe99f;',
            'secureunlocked': '&#xe9a0;',
            'sent': '&#xe9a1;',
            'settingstools': '&#xe9a2;',
            'settingswrench': '&#xe9a3;',
            'share': '&#xe9a4;',
            'signalcreate': '&#xe9a5;',
            'skiptobottom': '&#xe9a6;',
            'skiptofirst': '&#xe9a7;',
            'skiptolast': '&#xe9a8;',
            'skiptotop': '&#xe9a9;',
            'star': '&#xe9aa;',
            'table': '&#xe9ab;',
            'tag': '&#xe9ac;',
            'team': '&#xe9ad;',
            'trashcan': '&#xe9ae;',
            'update': '&#xe9af;',
            'userstatistics': '&#xe9b0;',
            'verified': '&#xe9b1;',
            'video': '&#xe9b2;',
            'videohide': '&#xe9b3;',
            'volume': '&#xe9b4;',
            'volumemute': '&#xe9b5;',
            'warning': '&#xe9b6;',
            'webhooks': '&#xe9b7;',
            'smallsearch': '&#xe922;',
            'sortdown': '&#xe923;',
            'sortup': '&#xe924;',
            'settings': '&#xe921;',
            'popin': '&#xe91f;',
            'popout': '&#xe920;',
            'appstore': '&#xe900;',
            'attach': '&#xe901;',
            'bigsearch': '&#xe902;',
            'chime': '&#xe903;',
            'close': '&#xe904;',
            'closedfolder': '&#xe905;',
            'comment': '&#xe906;',
            'conversations': '&#xe907;',
            'disable': '&#xe908;',
            'grab': '&#xe909;',
            'help': '&#xe90a;',
            'inbox': '&#xe90b;',
            'mentions': '&#xe90c;',
            'messageblast': '&#xe90d;',
            'more': '&#xe90e;',
            'morevertical': '&#xe90f;',
            'multiplepeople': '&#xe910;',
            'openedfolder': '&#xe911;',
            'plussign': '&#xe912;',
            'post': '&#xe913;',
            'quicksearch': '&#xe914;',
            'rtepostmode': '&#xe915;',
            'screenshare': '&#xe916;',
            'securelocked': '&#xe917;',
            'signal': '&#xe918;',
            'smiley': '&#xe919;',
            'thumbtack': '&#xe91a;',
            'thumbtackpressed': '&#xe91b;',
            'type_bold': '&#xe91c;',
            'type_bulletedlist': '&#xe91d;',
            'type_italic': '&#xe91e;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/tempo-icon/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
