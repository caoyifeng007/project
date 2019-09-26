// 补0函数
function add_zero(a) {
    if (a < 10) {
        return a = "0" + a;
    }
    return a;
}

// 设置时间函数
function setSysTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = add_zero(date.getMonth() + 1);
    var day = add_zero(date.getDate());

    var hour = add_zero(date.getHours());
    var minute = add_zero(date.getMinutes());
    var second = add_zero(date.getSeconds());
    var str = year + "-" + month + "-" + day + "&nbsp&nbsp&nbsp&nbsp" +
        hour + ":" + minute + ":" + second;
    $("#topBar_times").html(str);
    setTimeout(setSysTime, 1000);
}

//注册页提交事件
function submitValue_reg() {

    var v1 = $("#pwd").val();
    var v2 = $("#pwdCheck").val();
    var acc = $("#name").val();
    if (v1 != v2) {
        alert("密码和确认密码不一致。");
        return false;
    } else {
        alert("密码和确认密码一致。");
        localStorage.account = acc;
        localStorage.pwd = v1;
        return true;
    }

}

//登录页提交事件       
function submitValue_login() {

    var acc = $("#name").val();
    var pass = $("#pwd").val();
    if (acc == localStorage.account && pass == localStorage.pwd) {
        //登录成功 flag置为true
        localStorage.setItem("login", "true");
        return true;
    } else {
        alert("账号密码不符");
        return false;
    }
}


$(document).ready(function() {

    //右上角系统时间设置
    setSysTime();

    //页面加载时，通过flag来判断是否已登录
    if (localStorage.login == "true") {
        $("#plz_login").children().text(localStorage.account + "已登录");
        $("#sign_out").show();
    }

    //注销点击事件
    $("#sign_out").click(function() {
        localStorage.setItem("login", "false");
        //注销时候重新加载一次页面
        window.location.href = "register.html";
        // location.reload();
    })


    //商家管理 鼠标进入事件
    $("#nav_father").hover(function() {
        $("#nav_down").hide(); // down隐藏        
        $("#nav_up").show(); //up显示
        $("#dropList").fadeIn(1000); //弹出二级菜单
    })

    //整个manage_bar的鼠标离开事件
    $("#manage_bar").mouseleave(function() {
        $("#nav_down").show(); // down显示      
        $("#nav_up").hide(); //up隐藏
        $("#dropList").fadeOut(1000); //收起二级菜单
    })

    // 选取id为manage_bar下除了nav_father的所有class为col-md-4的div
    $("#manage_bar .col-md-4:not(#nav_father)").mouseenter(function() {
        $("#nav_down").show(); // down显示      
        $("#nav_up").hide(); //up隐藏
        $("#dropList").fadeOut(1000); //收起二级菜单
    })
    $("#plz_login").mouseenter(function() {
        $("#nav_down").show(); // down显示      
        $("#nav_up").hide(); //up隐藏
        $("#dropList").fadeOut(1000); //收起二级菜单
    })

    //给弹出的二级菜单添加文字颜色、文字大小样式
    // $("#research").hover(function() {
    //     $(this).children("span").addClass("appending");
    // }, function() {
    //     $(this).children("span").removeClass("appending");
    // })
    // $("#dropList div:last-child").hover(function() {
    //     $(this).children("span").addClass("appending");
    // }, function() {
    //     $(this).children("span").removeClass("appending");
    // })

    // 全选/全取消radio的点击事件
    $("#select_all").click(function() {

        var x = $(".tbl").find("input[type=checkbox]");
        if ($(this)[0].checked) {
            for (i of x) {
                i.checked = true;
            }
        } else {
            for (i of x) {
                i.checked = false;
            }
        }

    })

    // 删除所选点击事件
    $("#del_selected").click(function() {
        var arry = [];
        var arry_id = [];
        var num = 0;
        // var x = $(".tbl").find("[type=checkbox]").not("#select_all");       
        // for (var i of x) {
        //     if (i.checked) {
        //         arry.push(i);
        //         arry_id.push($(i).parent().next().text());
        //         num++;
        //     }
        // }

        var x = $(".tobe_del:checked");
        num = x.length;
        for (var i of x) {         
          arry.push(i);
          arry_id.push($(i).parent().next().text());                          
        }


        alert(arry_id);
        var confrim = confirm("您确定要删除" + num + "条数据？");
        if (confrim) {
            for (var j of arry) {
                $(j).parent().parent().remove();
            }
        }
        var totals = parseInt($("#nums").text());
        totals -= num;
        $("#nums").text(totals);

        //删除之后取消全选
        if (totals == 0) {
            $("#select_all").prop({ checked: false });
            // console.log($("#select_all")[0].checked);
            console.log($("#select_all").prop("checked"));
        }
        // console.log(typeof totals);
    })

    // 检测消费事件
    $("#costs_person").blur(function() {
        var costs1 = $("#costs").val();
        var costs2 = $("#costs_person").val();
        if (costs1 >= costs2) {
            alert("请输入正确金额");
        }
    })

    // 点击查询、添加判断时候跳转
    $("#research").click(function() {
        if (localStorage.login == "true") {
            // console.log($(this).attr("href"));
            $(this).attr({ href: "search.html" })
        } else {
            $(this).attr({ href: "login.html" })
        }
    })
    $("#append").click(function() {
        if (localStorage.login == "true") {
            // console.log($(this).attr("href"));
            $(this).attr({ href: "add.html" })
        } else {
            $(this).attr({ href: "login.html" })
        }
    })



});