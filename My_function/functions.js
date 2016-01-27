jQuery(document).ready(function() {
    var width = jQuery(window).width();
    jQuery("#parol_66").attr('type', 'password');
    jQuery(".first_bottom_butt").click(function() {
        location.href = "/postavshikam/";
        console.log("click");
    });
    jQuery(".second_bottom_butt").click(function() {
        location.href = "/kypit-zoloto/";
    });
    jQuery(".third_bottom_butt").click(function() {
        location.href = "/kypit-personaja/";
    });
    jQuery(".four_bottom_butt").click(function() {
        location.href = "/postavshikam/";
    });
    perfect_server = 0;
    jQuery(function() {
        jQuery(".gallery").jCarouselLite({
            btnNext: ".next",
            btnPrev: ".prev",
            vertical: true,
            scroll: 1,
            speed: 1000
        });
    });
    var old_path;
    var game_name;
    jQuery(".vertical_gal ul li a img").hover(function() {
        old_path = jQuery(this).attr('src');
        game_name = jQuery(this).attr('data-game');
        switch (game_name) {
            case 'Купить золото':
                jQuery(this).attr('src', '/wp-content/themes/twentythirteen/images/garant/by_gold.png');
                break;
            case 'Купить юани':
                jQuery(this).attr('src', '/wp-content/themes/twentythirteen/images/garant/by_gold1.png');
                break;
            case 'Купить кинары':
                jQuery(this).attr('src', '/wp-content/themes/twentythirteen/images/garant/by_gold2.png');
                break;
            case 'Купить адену':
                jQuery(this).attr('src', '/wp-content/themes/twentythirteen/images/garant/by_gold3.png');
                break;
        }
    }, function() {
        jQuery(this).attr('src', old_path);
    });
    var path = location.pathname;
    jQuery("#menu-bottom_menu li").append("<span class='separ'>|</span>");
    jQuery("#menu-bottom_menu li:last-child .separ, #recallbar").remove();
    if (path === '/garant/') {
        jQuery(".owl-wrapper").css({
            width: '179px'
        });
        jQuery("#carousel_slider123").css({
            background: 'url("/wp-content/themes/twentythirteen/images/garant/slider_background.png") no-repeat'
        });
        jQuery(".owl-wrapper").css({
            width: '226px'
        });
        jQuery(".owl-item").css({
            'width': 'auto',
            'margin-left': '-7px',
            'margin-top': '-7px'
        });
        jQuery(".owl-prev").css({});
        jQuery(".thirdPanel-wraper .title_h1").css({
            'margin-left': '-11px'
        });
        jQuery(".entry-content").css({
            'top': '-104px',
            'position': 'relative'
        });
        jQuery(".site-info.footBack").css({
            'position': 'relative',
            'top': '-100px'
        });
    } else if (path === '/' && width > 767) {
        jQuery(".entry-content").css({
            'margin-top': '-120px'
        });
        console.log(jQuery(window).width());
    } else if (path === '/postavshikam/') {
        jQuery(".site-main").css({
            'position': 'relative',
            'top': '-109px',
            'left': '-3px'
        });
        jQuery(".site-info.footBack").css({
            'position': 'relative',
            'top': '-100px'
        });
        jQuery(".thirdPanel-wraper .title_h1").css({
            'margin-left': '0'
        });
    } else if (path === '/oplata-dostavka/') {
        jQuery(".thirdPanel-wraper .title_h1").css({
            'margin-left': '-14px'
        });
        jQuery(".site-main").css({
            'top': '-105px'
        });
        jQuery(".entry-content").css({
            'margin-top': '-105px'
        });
    } else if (path === '/o-nas/') {
        jQuery(".site-main").css({
            'top': '-104px',
            'position': 'relative'
        });
        jQuery(".site-info.footBack").css({
            'position': 'relative',
            'top': '-100px'
        });
        jQuery(".thirdPanel-wraper .title_h1").css({
            'margin-left': '-11px'
        });
    } else if (path === '/news/') {
        jQuery(".site-info.footBack").css({
            'margin-top': '-60px'
        });
        jQuery(".entry-header").css({
            'margin-bottom': '0'
        });
        jQuery(".entry-thumbnail").css({
            'width': '160px',
            'float': 'left'
        });
        jQuery(".entry-title").css({
            'float': 'left',
            'clear': 'none'
        });
        jQuery(".entry-content").css({
            'clear': 'none',
            'font-size': '11px',
            'width': '709px',
            'margin-top': '16px'
        });
        jQuery(".entry-meta").css({
            'clear': 'none'
        });
        jQuery(".categories-links").css({
            'display': 'none'
        });
        jQuery(".entry-thumbnail img").css({
            'margin-left': '12px'
        });
        jQuery(".date time").css({
            'position': 'relative',
            'top': '5px',
            'left': '330px',
            'color': '#000'
        });
        jQuery(".date a:before").css({
            'display': 'none'
        });
        jQuery("#content article").css({
            'padding-top': '5px'
        });
        jQuery("#content article:first-child").css({
            'padding-top': '40px'
        });
    } else if (path === '/kypit-valuty/') {
        jQuery('.site-main').css({
            'margin-top': '-105px'
        });
        jQuery(".thirdPanel-wraper .title_h1").css({
            'margin-left': '-11px'
        });
    } else if (path === '/kypit-personaja/') {
        jQuery(".site-main").css({
            'top': '-104px'
        });
        jQuery(".thirdPanel-wraper .title_h1").css({
            'margin-left': '-11px'
        });
        jQuery(".table_calc").css({
            'height': 'auto',
            'margin-top': '34px'
        });
        jQuery(".entry-content").css({
            'margin-top': '-105px'
        });
    } else if (path === '/kypit-valuty/') {
        jQuery('.entry-content').css({
            'margin-top': '-60px'
        });
    } else if (path === '/account/') {
        jQuery(".entry-content").css({
            'width': '74%',
            'margin': '0 auto',
            'margin-top': '-105px'
        });
        jQuery(".thirdPanel-wraper").css({
            'position': 'relative',
            'right': '16px'
        });
        jQuery("table.form-table,#profile_block h3").remove();
        jQuery("#file-upload").append("Загрузить аватар");
    } else if (path === '/info/') {
        jQuery("body").css({
            'background-size': 'cover'
        });
    } else if (path === '/kypit-valuty/aion/' || path === '/kypit-valuty/arche-age/' || path === '/kypit-valuty/perfect-world/' || path === '/kypit-valuty/tera-online/' || path === '/kypit-valuty/lineage-2/') {
        jQuery(".site-main").css({
            'margin-top': '-105px'
        });
        jQuery(".title_h1").css({
            'margin-left': '-12px'
        });
    }
    jQuery(".games-select").change(function() {
        var game_sel = jQuery(".games-select").val()
        switch (game_sel) {
            case 'LineAge 2':
                jQuery(".sec_select .wrap_select").css({
                    "display": "none"
                });
                jQuery(".lineage2").css({
                    "display": "block"
                });
                break;
            case 'Terra online':
                jQuery(".sec_select .wrap_select").css({
                    "display": "none"
                });
                jQuery(".terra_online").css({
                    "display": "block"
                });
                break;
            case 'Perfect world':
                jQuery(".sec_select .wrap_select").css({
                    "display": "none"
                });
                jQuery(".perfect_world").css({
                    "display": "block"
                });
                console.log("...........Выбор сервера.................87 строка");
                jQuery(".perfect_world select").change(function() {
                    var server_perf = jQuery(".perfect_world select").val();
                    console.log(server_perf);
                    switch (server_perf) {
                        case 'Альтаир':
                            jQuery(".sel_server").empty().append("Альтаир");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 8.7930;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 8.5770;
                            } else {
                                perfect_server = 9.0000;
                            }
                            break;
                        case 'Андромеда':
                            jQuery(".sel_server").empty().append("Андромеда");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 9.2815;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 9.0535;
                            } else {
                                perfect_server = 9.5000;
                            }
                            break;
                        case 'Атлас':
                            jQuery(".sel_server").empty().append("Атлас");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 8.7930;
                                jQuery(".sel_server").empty().append("Атлас");
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 8.5770;
                            } else {
                                perfect_server = 9.0000;
                            }
                            break;
                        case 'Вега':
                            jQuery(".sel_server").empty().append("Вега");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 9.2815;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 9.0535;
                            } else {
                                perfect_server = 9.5000;
                            }
                            break;
                        case 'Гелиос':
                            jQuery(".sel_server").empty().append("Гелиос");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 8.7930;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 8.5770;
                            } else {
                                perfect_server = 9.0000;
                            }
                            break;
                        case 'Кассиопея':
                            jQuery(".sel_server").empty().append("Кассиопея");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 9.7700;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 9.5300;
                            } else {
                                perfect_server = 10.0000;
                            }
                            break;
                        case 'Лиридан':
                            jQuery(".sel_server").empty().append("Лиридан");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 9.3792;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 9.1488;
                            } else {
                                perfect_server = 9.6000;
                            }
                            break;
                        case 'Луна':
                            jQuery(".sel_server").empty().append("Луна");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 42.4995;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 41.4555;
                            } else {
                                perfect_server = 43.5000;
                            }
                            break;
                        case 'Мира':
                            jQuery(".sel_server").empty().append("Мира");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 8.7930;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 8.5770;
                            } else {
                                perfect_server = 9.0000;
                            }
                            break;
                        case 'Омега':
                            jQuery(".sel_server").empty().append("Омега");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 9.2815;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 9.0535;
                            } else {
                                perfect_server = 9.5000;
                            }
                            break;
                        case 'Орион':
                            jQuery(".sel_server").empty().append("Орион");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 8.4999;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 8.2911;
                            } else {
                                perfect_server = 8.7000;
                            }
                            break;
                        case 'Персей':
                            jQuery(".sel_server").empty().append("Персей");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 12.7010;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 12.3890;
                            } else {
                                perfect_server = 13.0000;
                            }
                            break;
                        case 'Сириус':
                            jQuery(".sel_server").empty().append("Сириус");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 9.6723;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 9.4347;
                            } else {
                                perfect_server = 9.9000;
                            }
                            break;
                        case 'Таразед':
                            jQuery(".sel_server").empty().append("Таразед");
                            if (jQuery("#summ").val() > 100 && jQuery("#summ").val() < 500) {
                                perfect_server = 9.2815;
                            } else if (jQuery("#summ").val() > 500) {
                                perfect_server = 9.0535;
                            } else {
                                perfect_server = 9.5000;
                            }
                            break;
                    }
                });
                break;
            case 'Arche Age':
                jQuery(".sec_select .wrap_select").css({
                    "display": "none"
                });
                jQuery(".arch_age").css({
                    "display": "block"
                });
                break;
            case 'Aion':
                jQuery(".sec_select .wrap_select").css({
                    "display": "none"
                });
                jQuery(".aion").css({
                    "display": "block"
                });
                break;
        }
    }).change();
    jQuery(".payment_method select").change(function() {
        var game = jQuery(".text_select").val();
        console.log(game);
        jQuery(".sel_game").empty().append(game);
        var mail = jQuery("#email").val();
        console.log(mail);
        jQuery(".sel_mail").empty().append(mail);
        var money = jQuery("#summ").val();
        console.log(money);
        var server = jQuery(".sec_select .text_select").val();
        console.log(server);
        jQuery(".sel_server").empty().append(server);
        var nick = jQuery("#nick").val();
        console.log(nick);
        jQuery(".sel_nick").empty().append(nick);
        var method_pay = jQuery(".third_select .text_select").val();
        console.log(method_pay);
        jQuery(".sel_method").empty().append(method_pay);
        user = {};
        if (mail !== '') {
            console.log('ваша скидка 5%');
            user.sale = '5';
        }
        switch (game) {
            case 'Arche Age':
                console.log(".........Arche Age.........");
                var result, result_money, result_percent;
                console.log("console - Arche Age" + " " + user.sale + "%");
                if (money >= 1250 && money <= 2500) {
                    console.log("........money > 1250 && money < 2500.......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 7.7;
                        console.log("if");
                    } else {
                        count_gold = 2.7;
                        console.log("else");
                    }
                    result_money = money * 0.3100;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else if (money > 2500) {
                    console.log("............money > 2500.........");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 10.7;
                        console.log("if");
                    } else {
                        count_gold = 5.7;
                        console.log("else");
                    }
                    result_money = money * 0.3100;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else {
                    console.log("........money < 1000......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 5;
                        console.log("if" + user.sale);
                    } else {
                        count_gold = 1;
                        console.log("else" + count_gold);
                    }
                    result_money = money * 0.3100;
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    var result = result_money.toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                }
                break;
            case 'LineAge 2':
                console.log(".........LineAge 2.........");
                var result, result_money, result_percent;
                console.log("console - LineAge 2" + " " + user.sale + "%");
                if (money >= 100 && money <= 200) {
                    console.log("........money >= 100 && money <= 200.......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 5;
                        console.log("скидка за авторизацию");
                    } else {
                        count_gold = 1;
                        console.log("без скидки за авторизацию");
                    }
                    console.log("test money:" + money);
                    result_money = money * 1.25;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else if (money >= 200 && money <= 500) {
                    console.log("...........money >= 100 && money <= 200.........");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 7.7;
                        console.log("скидка за авторизацию");
                    } else {
                        count_gold = 2.7;
                        console.log("else");
                    }
                    result_money = money * 1.25;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else if (money >= 500 && money <= 1000) {
                    console.log("..........money >= 500 && money <= 1000.........");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 10.7;
                        console.log("скидка за авторизацию");
                    } else {
                        count_gold = 5.7;
                        console.log("else");
                    }
                    result_money = money * 1.25;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else if (money >= 1000) {
                    console.log("........money > 1000......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 13.7;
                        console.log("скидка за авторизацию");
                    } else {
                        count_gold = 8.7;
                        console.log("скидка за авторизацию нет");
                    }
                    result_money = money * 1.25;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else {
                    console.log("все остальные варианты");
                }
                break;
            case 'Perfect world':
                console.log("console - Perfect world" + " " + user.sale);
                var result, result_money, result_percent;
                console.log("console - Perfect world" + " " + user.sale + "%");
                if (money >= 100 && money <= 500) {
                    console.log("........money > 100 && money < 500.......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 5.3;
                        console.log("if");
                    } else {
                        count_gold = 2.3;
                        console.log("else");
                    }
                    result_money = money * perfect_server;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else if (money >= 500) {
                    console.log("............money > 500.........");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 9.7;
                        console.log("if");
                    } else {
                        count_gold = 4.7;
                        console.log("else");
                    }
                    console.log("Ставка сервера: " + perfect_server);
                    result_money = (money * perfect_server).toFixed(2);
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else {
                    console.log("........money < 1000......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 5;
                        console.log("if" + user.sale);
                    } else {
                        count_gold = 1;
                        console.log("else" + count_gold);
                    }
                    result_money = (money * perfect_server).toFixed(2);
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = result_money;
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                }
                break;
            case 'Terra online':
                console.log(".........Terra Online.........");
                var result, result_money, result_percent;
                console.log("console - Terra Online" + " " + user.sale + "%");
                if (money >= 30000 && money <= 100000) {
                    console.log("........money >= 30000 && money <= 100000.......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 7.2;
                        console.log("скидка за авторизацию");
                    } else {
                        count_gold = 2.2;
                        console.log("без скидки за авторизацию");
                    }
                    console.log("test money:" + money);
                    result_money = money * 0.012;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else if (money > 100000) {
                    console.log("............money > 100000.........");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 9.8;
                        console.log("if");
                    } else {
                        count_gold = 4.8;
                        console.log("else");
                    }
                    result_money = money * 0.012;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else {
                    console.log("........money < 1000......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 5;
                        console.log("if" + user.sale);
                    } else {
                        count_gold = 1;
                        console.log("else" + count_gold);
                    }
                    result_money = money * 0.012;
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                }
                break;
            case 'Aion':
                console.log(".........Aion.........");
                var result, result_money, result_percent;
                console.log("console - Aion" + " " + user.sale + "%");
                if (money >= 1000 && money <= 2500) {
                    console.log("........money >= 1000 && money <= 2500.......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 7.2;
                        console.log("if");
                    } else {
                        count_gold = 2.2;
                        console.log("else");
                    }
                    result_money = money * 2, 05;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else if (money >= 2500) {
                    console.log("............money >= 2500.........");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 9.7;
                        console.log("if");
                    } else {
                        count_gold = 4.7;
                        console.log("else");
                    }
                    result_money = money * 2.05;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                } else {
                    console.log("........money < 1000......");
                    if (user.sale !== " " && typeof user.sale !== "undefined") {
                        count_gold = 5;
                        console.log("if" + user.sale);
                    } else {
                        count_gold = 1;
                        console.log("else" + count_gold);
                    }
                    result_money = money * 2.05;
                    console.log("result_money: " + result_money + " руб.");
                    result_persent = (result_money * count_gold / 100).toFixed(2);
                    console.log("result_persent: " + result_persent);
                    var result = (result_money - result_persent).toFixed(2);
                    jQuery(".sel_money").empty().append(result_money + " руб");
                    jQuery(".sel_cost").empty().append(result_persent + " руб");
                    console.log("Заплатить(кол-во рублей): " + result_persent);
                    jQuery(".digit_sum").empty().append(result + "<span style='font-size:14px'>руб</span>");
                }
                break;
        }
    }).change();
});
(function($) {
    var body = $('body'),
        _window = $(window),
        nav, button, menu;
    nav = $('#site-navigation');
    button = nav.find('.menu-toggle');
    menu = nav.find('.nav-menu');
    $(function() {
        if (body.is('.sidebar')) {
            var sidebar = $('#secondary .widget-area'),
                secondary = (0 === sidebar.length) ? -40 : sidebar.height(),
                margin = $('#tertiary .widget-area').height() - $('#content').height() - secondary;
            if (margin > 0 && _window.innerWidth() > 999) {
                $('#colophon').css('margin-top', margin + 'px');
            }
        }
    });
    (function() {
        if (!nav || !button) {
            return;
        }
        if (!menu || !menu.children().length) {
            button.hide();
            return;
        }
        button.on('click.twentythirteen', function() {
            nav.toggleClass('toggled-on');
            if (nav.hasClass('toggled-on')) {
                $(this).attr('aria-expanded', 'true');
                menu.attr('aria-expanded', 'true');
            } else {
                $(this).attr('aria-expanded', 'false');
                menu.attr('aria-expanded', 'false');
            }
        });
        if ('ontouchstart' in window) {
            menu.find('.menu-item-has-children > a, .page_item_has_children > a').on('touchstart.twentythirteen', function(e) {
                var el = $(this).parent('li');
                if (!el.hasClass('focus')) {
                    e.preventDefault();
                    el.toggleClass('focus');
                    el.siblings('.focus').removeClass('focus');
                }
            });
        }
        menu.find('a').on('focus.twentythirteen blur.twentythirteen', function() {
            $(this).parents('.menu-item, .page_item').toggleClass('focus');
        });
    })();

    function onResizeARIA() {
        if (643 > _window.width()) {
            button.attr('aria-expanded', 'false');
            menu.attr('aria-expanded', 'false');
            button.attr('aria-controls', 'primary-menu');
        } else {
            button.removeAttr('aria-expanded');
            menu.removeAttr('aria-expanded');
            button.removeAttr('aria-controls');
        }
    }
    _window.on('load.twentythirteen', onResizeARIA).on('resize.twentythirteen', function() {
        onResizeARIA();
    });
    _window.on('hashchange.twentythirteen', function() {
        var element = document.getElementById(location.hash.substring(1));
        if (element) {
            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                element.tabIndex = -1;
            }
            element.focus();
        }
    });
    if ($.isFunction($.fn.masonry)) {
        var columnWidth = body.is('.sidebar') ? 228 : 245;
        $('#secondary .widget-area').masonry({
            itemSelector: '.widget',
            columnWidth: columnWidth,
            gutterWidth: 20,
            isRTL: body.is('.rtl')
        });
    }
	//Сортировка select по играм соответствующие сервера и рассы.
	$('.wrap_select select').bind({
        change: function (e) {
            var gameName = $(e.currentTarget).val();

            $('.sec_select option').each( function (key, value) {
                if ( !$(this).attr('value') || $(this).attr('value') != gameName ) {
                    $(this).attr('disabled','disabled')
                } else {
                    $(this).removeAttr('disabled')
                }
            });
        }
    })
})(jQuery);