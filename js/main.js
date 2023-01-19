// 设置后台地址
var apiAddress = "";

// 拉到底部
function contentScroll(){
    document.getElementById('contentarea').scrollTop = document.getElementById('contentarea').scrollHeight;
}

// 对话拉到顶
function putTop(id){
    $("#"+id+"-inlist").parent().prepend($("#"+id+"-inlist"));
}

// 对话未读
function unread(id){
    $("#"+id+"_chatting").addClass("unread");
}

// 对话已读
function haveRead(id){
    $("#"+id+"_chatting").removeClass("unread");
}

// 对话打开中
function chatOpened(id){
    $("#"+id+"-inlist").addClass("mdui-list-item-active");
}

// 对话未打开
function chatClosed(id){
    $("#"+id+"-inlist").removeClass("mdui-list-item-active");
}

// 设置cookie
function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

// 获取cookie
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}

// 删除cookie
function delCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

// 查空
function empty(e) {
  switch (e) {
    case "":
    case 0:
    case "0":
    case null:
    case false:
    case undefined:
      return true;
    default:
      return false;
  }
}

// 检查元素存在性
function exist(id) {
    var s = document.getElementById(id);
    if (s) {
        return true
    } else {
        return false
    }
}

// 检查变量是否存在
function isset(a) {
    if (typeof(a) == "undefined" || typeof(a) == null) {
        return false;
    } else {
        return true;
    }
}

// 回车检测
function keyup_submit(e){ 
 var evt = window.event || e; 
  if (evt.keyCode == 13){
    var message = $("#inputmessage").val();
    sendMessage(message);
  }
}

var sending = false;

// 发送消息
function sendMessage(message){
    if (sending) {
        return;
    }
    if (message == "") {
        return;
    }
    sending = true;
    if (chattingType == "friend"){
        $.ajax({
            type: 'post',
            url: apiAddress + "/chat/friend/send_msg",
            data: {username: getCookie("username"), token: getCookie("token") ,friend_username: chatting,msg: message},
            dataType: 'text',
            success: function(data){
                obj = JSON.parse(data);
                if (obj.status == "ok"){
                    document.getElementById(chatting+"_chatting").innerHTML = message;
                    im = msg[chatting];
                    im += '<div class="username">' + getCookie("username") + '</div><div class="bubble"><span>' + message + '</span></div>';
                    msg[chatting] = im;
                    document.getElementById("content").innerHTML = msg[chatting];
                    document.getElementById("inputmessage").value = "";
                    contentScroll();
                    sending = false;
                    putTop(chatting);
                }else{
                    mdui.snackbar({message:obj.status + obj.message});
                    sending = false;
                }
            }
        });
    }else if(chattingType == "group"){
        $.ajax({
            type: 'post',
            url: apiAddress + "/chat/group/send_msg",
            data: {username: getCookie("username"), token: getCookie("token") ,group_id: chatting,msg: message},
            dataType: 'text',
            success: function(data){
                obj = JSON.parse(data);
                if (obj.status == "ok"){
                    document.getElementById(chatting+"_chatting").innerHTML = getCookie("username") + ': ' + message;
                    im = msg[chatting];
                    im += '<div class="username">' + getCookie("username") + '</div><div class="bubble"><span>' + message + '</span></div>';
                    msg[chatting] = im;
                    document.getElementById("content").innerHTML = msg[chatting];
                    document.getElementById("inputmessage").value = "";
                    contentScroll();
                    sending = false;
                    putTop(chatting);
                }else{
                    mdui.snackbar({message:obj.status + ': ' + obj.message});
                    sending = false;
                }
            }
        });
    } else{
        mdui.snackbar({message:"error"});
        sending = false;
    }
}

// 新增消息
function addMessage(chatname,username,message){
    im = document.getElementById("content").innerHTML;
    im += '<div class="username">' + username + '</div><div class="bubble"><span>' + message + '</span></div>';
    document.getElementById("content").innerHTML = im;
    contentScroll();
}

// 新增系统通知
function systemNotification(message){
    // 不在会话列表先创建
    if(!exist("系统通知_chatting")){
        addChattinglist("系统通知","system");
    }
    // 会话列表最新消息修改
    document.getElementById("系统通知_chatting").innerHTML = message;
    // 更新信息到数组
    if(msg["系统通知"]){
        im = msg["系统通知"];
    }else{
        im = "";
    }
    im += '<div class="username">系统通知</div><div class="bubble"><span>' + message + '</span></div>';
    msg["系统通知"] = im;
    // 对话拉到顶
    putTop("系统通知");
    // 如果正在显示就输出，否则不输出并标记未读
    if(chatting=="系统通知"){
        document.getElementById("content").innerHTML = msg["系统通知"];
        contentScroll();
    } else {
        unread("系统通知");
    }
    // 如果没关注窗口就提示音
    if(bubbleNotification == "on"){
        document.getElementById("bubble").play();
    }
}

// 将昵称查询并输出
function getDisplayName(username,where){
    $.ajax({
        type: 'get',
        url: apiAddress + "/auth/get_display_name/" + username,
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                document.getElementById(where).innerHTML = obj.display_name;
            }else if(obj.status == "null"){
                document.getElementById(where).innerHTML = "NULL";
            }else{
                document.getElementById(where).innerHTML = "error";
            }
        }
    });
}

// 改名字
function changeName(){
    mdui.prompt('请输入您的新昵称', '更改昵称',
      function (value) {
        $.ajax({
            type: 'post',
            url: apiAddress + "/auth/rename",
            data: {username: getCookie("username"), token: getCookie("token") ,display_name: value},
            dataType: 'text',
            success: function(data){
                obj = JSON.parse(data);
                if (obj.status == "ok"){
                    mdui.snackbar({message:'成功' + obj.message});
                    getDisplayName(getCookie("username"),"myname");
                }else if(obj.status == "error"){
                    mdui.snackbar({message:'失败：' + obj.message});
                }else if(obj.status == "null"){
                    mdui.snackbar({message:'账号不存在'});
                }else{
                    mdui.snackbar({message:'未知错误'});
                }
            }
        });
      },
      function (value) {
        
      }
);
}

// 改密码
function changePassword(){
    mdui.prompt('请输入您的旧密码', '更改密码',
      function (oldpwd) {
        mdui.prompt('请输入您的新密码', '更改密码',
          function (newpwd) {
            $.ajax({
                type: 'post',
                url: apiAddress + "/auth/change_password",
                data: {username: getCookie("username"), token: getCookie("token") ,password: oldpwd, new_password: newpwd},
                dataType: 'text',
                success: function(data){
                    obj = JSON.parse(data);
                    if (obj.status == "ok"){
                        mdui.snackbar({message:'成功' + obj.message});
                    }else if(obj.status == "error"){
                        mdui.snackbar({message:'失败：' + obj.message});
                    }else if(obj.status == "null"){
                        mdui.snackbar({message:'账号不存在'});
                    }else{
                        mdui.snackbar({message:'未知错误'});
                    }
                }
            });
          },
          function (value) {
            
          }
        );
      },
      function (value) {
        
      }
    );
}

// 退出登录
function logout(){
    $.ajax({
        type: 'post',
        url: apiAddress + "/auth/logout",
        data: {username: getCookie("username"), token: getCookie("token")},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'退出成功'});
                delCookie("username");
                delCookie("token");
                window.location = "login.html";
            }else if(obj.status == "error"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else if(obj.status == "null"){
                mdui.snackbar({message:'账号不存在'});
            }else{
                mdui.snackbar({message:'未知错误'});
            }
        }
    });
}

// 获取todolist
function getTodolist(){
    $.ajax({
        type: 'post',
        url: apiAddress + "/auth/get_todo_list",
        data: {username: getCookie("username"), token: getCookie("token")},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            list = obj.data;
            if (obj.status == "ok"){
                var i;
                for(i = 0; i < list.length; i++) {
                    if (list[i].type == "friend_request"){
                        // 好友申请
                        var out = document.getElementById("inner-friend-request").innerHTML;
                        out += '<li class="mdui-list-item mdui-ripple" id="' + list[i].rid + '"><i class="mdui-list-item-avatar mdui-icon material-icons">person</i><div class="mdui-list-item-content">' + list[i].username + '</div><a href="javascript:agreeFriend(&quot;' + list[i].rid + '&quot;)"><i class="mdui-list-item-icon mdui-icon material-icons">playlist_add_check</i></a></li>';
                        document.getElementById("inner-friend-request").innerHTML=out;
                        systemNotification('您有来自'+list[i].username+'的好友申请：'+list[i].additional_information);
                    }else if(list[i].type == "group_join_request"){
                        // 群组申请
                        var out = document.getElementById("inner-group-request").innerHTML;
                        out += '<li class="mdui-list-item mdui-ripple" id="' + list[i].rid + '"><i class="mdui-list-item-avatar mdui-icon material-icons">person</i><div class="mdui-list-item-content">' + list[i].username + '</div><a href="javascript:agreeGroup(&quot;' + list[i].rid + '&quot;)"><i class="mdui-list-item-icon mdui-icon material-icons">playlist_add_check</i></a></li>';
                        document.getElementById("inner-group-request").innerHTML=out;
                        systemNotification('您有来自'+list[i].username+'的加入'+list[i].group_id+'的申请：'+list[i].additional_information);
                    }
                    else if(list[i].type == "friend_msg"){
                        // 不在会话列表先创建
                        if(!exist(list[i].username+"_chatting")){
                            addChattinglist(list[i].username,"friend");
                        }
                        // 会话列表最新消息修改
                        document.getElementById(list[i].username+"_chatting").innerHTML = list[i].msg;
                        // 更新信息到数组
                        if(msg[list[i].username]){
                            im = msg[list[i].username];
                        }else{
                            im = "";
                        }
                        im += '<div class="username">' + list[i].username + '</div><div class="bubble"><span>' + list[i].msg + '</span></div>';
                        msg[list[i].username] = im;
                        // 对话拉到顶
                        putTop(list[i].username);
                        // 如果正在显示就输出，否则不输出并标记未读
                        if(chatting==list[i].username){
                                document.getElementById("content").innerHTML = msg[chatting];
                                contentScroll();
                        } else {
                            unread(list[i].username);
                        }
                        // 如果没关注窗口就提示音
                        if(bubbleNotification == "on"){
                            document.getElementById("bubble").play();
                        }
                    }else if(list[i].type == "group_msg"){
                        // 不在会话列表先创建
                        if(!exist(list[i].group_id+"_chatting")){
                            addChattinglist(list[i].group_id,"group");
                        }
                        // 会话列表最新消息修改
                        document.getElementById(list[i].group_id+"_chatting").innerHTML = list[i].username + ': ' + list[i].msg;
                        // 更新信息到数组
                        if(msg[list[i].group_id]){
                            im = msg[list[i].group_id];
                        }else{
                            im = "";
                        }
                        im += '<div class="username">' + list[i].username + '</div><div class="bubble"><span>' + list[i].msg + '</span></div>';
                        msg[list[i].group_id] = im;
                        // 对话拉到顶
                        putTop(list[i].group_id);
                        // 如果正在显示就输出，否则不输出并标记未读
                        if(chatting==list[i].group_id){
                            document.getElementById("content").innerHTML = msg[chatting];
                            contentScroll();
                        } else {
                            unread(list[i].group_id);
                        }
                        // 如果没关注窗口就提示音
                        if(bubbleNotification == "on"){
                            document.getElementById("bubble").play();
                        }
                    }else if(list[i].type == "friend_agree"){
                        systemNotification(list[i].username+' 通过了您的好友请求');
                        refreshFriendlist();
                    }else if(list[i].type == "friend_deleted"){
                        systemNotification(list[i].username+' 删除了您');
                        refreshFriendlist();
                    }else if(list[i].type == "group_agree"){
                        systemNotification('您成功加入了'+list[i].group_id);
                        refreshFriendlist();
                    }else if(list[i].type == "group_deleted"){
                        systemNotification('您被移出了'+list[i].group_id);
                        refreshGrouplist();
                    }else if(list[i].type == "group_rename"){
                        systemNotification(list[i].group_id+'更改了他们的群名：'+list[i].old_name+'→'+list[i].new_name);
                    }else if(list[i].type == "banned"){
                        systemNotification('群'+list[i].group_id+'的管理员将您禁言了'+list[i].ban_time+'秒');
                    }else if(list[i].type == "admin_removed"){
                        systemNotification('您被'+list[i].group_id+'的群主撤销了管理员资格');
                    }else if(list[i].type == "admin_add"){
                        systemNotification('您被'+list[i].group_id+'的群主任命为管理员');
                    }else if(list[i].type == "owner_replaced"){
                        systemNotification('群'+list[i].group_id+'的群主由'+list[i].old_owner+'变更为了'+list[i].new_name);
                    }else if(list[i].type == "question"){
                        var param_name = list[i].param_name;
                        var rid = list[i].rid;
                        mdui.prompt(list[i].text, list[i].title,
                          function (value) {
                            $.ajax({
                                type: 'post',
                                url: apiAddress + list[i].path,
                                data: JSON.parse('{username:' + getCookie("username") + ', token:' + getCookie("token") + ' ,' + param_name + ':' + value + ',rid:' + rid + "}"),
                                dataType: 'text',
                                success: function(data){
                                    obj = JSON.parse(data);
                                    if (obj.status == "ok"){
                                        mdui.snackbar({message:'应答成功'});
                                    }else if(obj.status == "error"){
                                        mdui.snackbar({message:'失败：' + obj.message});
                                    }else if(obj.status == "null"){
                                        mdui.snackbar({message:'失败：' + obj.message});
                                    }else{
                                        mdui.snackbar({message:'未知错误'});
                                    }
                                }
                            });
                          },
                          function (value) {
                            $.ajax({
                                type: 'post',
                                url: apiAddress + list[i].path,
                                data: {username: getCookie("username"), token: getCookie("token") ,param_name: "",rid: rid},
                                dataType: 'text',
                                success: function(data){
                                    obj = JSON.parse(data);
                                    if (obj.status == "ok"){
                                        mdui.snackbar({message:'已取消'});
                                    }else if(obj.status == "error"){
                                        mdui.snackbar({message:'失败：' + obj.message});
                                    }else if(obj.status == "null"){
                                        mdui.snackbar({message:'失败：' + obj.message});
                                    }else{
                                        mdui.snackbar({message:'未知错误'});
                                    }
                                }
                            });
                          },
                              {
                                modal: true
                              }
                        );
                    }else{
                        
                    }
                }
                
            }else if(obj.status == "error"){
                mdui.snackbar({message:'失败：' + obj.message});
                authenticateToken();
            }else if(obj.status == "null"){
                mdui.snackbar({message:'NULL'});
                authenticateToken();
            }else{
                mdui.snackbar({message:'未知错误'});
                authenticateToken();
            }
        }
    });
}

// 新增会话
function addChattinglist(name,type){
    if(!exist(name+"_chatting")){
        if(type == "friend"){
            var out = document.getElementById("chattinglist").innerHTML;
            out += '<li class="mdui-list-item mdui-ripple" onclick="openChatting(&quot;'+name+'&quot;,&quot;friend&quot;)" id="'+name+'-inlist"><i class="mdui-list-item-avatar mdui-icon material-icons">person</i><div class="mdui-list-item-content"><div class="mdui-list-item-title" id="'+name+'-list">'+name+'</div><div class="mdui-list-item-text mdui-list-item-one-line"><span id="'+name+'_chatting" class="">无信息</span></div></div></li>';
            document.getElementById("chattinglist").innerHTML = out;
        }else if(type == "group"){
            var out = document.getElementById("chattinglist").innerHTML;
            out += '<li class="mdui-list-item mdui-ripple" onclick="openChatting(&quot;'+name+'&quot;,&quot;group&quot;)" id="'+name+'-inlist"><i class="mdui-list-item-avatar mdui-icon material-icons">group</i><div class="mdui-list-item-content"><div class="mdui-list-item-title" id="'+name+'-list">'+name+'</div><div class="mdui-list-item-text mdui-list-item-one-line"><span id="'+name+'_chatting" class="">无信息</span></div></div></li>';
            document.getElementById("chattinglist").innerHTML = out;
            getGroupname(name,name+'-list');
        }else if(type == "system"){
            var out = document.getElementById("chattinglist").innerHTML;
            out += '<li class="mdui-list-item mdui-ripple" onclick="openChatting(&quot;'+name+'&quot;,&quot;system&quot;)" id="'+name+'-inlist"><i class="mdui-list-item-avatar mdui-icon material-icons">notifications</i><div class="mdui-list-item-content"><div class="mdui-list-item-title" id="'+name+'-list">'+name+'</div><div class="mdui-list-item-text mdui-list-item-one-line"><span id="'+name+'_chatting" class="">无信息</span></div></div></li>';
            document.getElementById("chattinglist").innerHTML = out;
        }else{
            
        }
    }
}

// 打开会话
function openChatting(name,type){
    chatClosed(chatting);
    haveRead(name);
    if (empty(msg[name])) {
        msg[name] = "";
    }
    chatting = name;
    chattingType = type;
    chatOpened(chatting);
    if(type == "friend"){
        document.getElementById("chatting-title").innerHTML = name + '<span class="mdui-float-right" id="' + name + '-status"></span>';
        document.getElementById("content").innerHTML = msg[name];
        getStatus(name,name + "-status");
        contentScroll();
    }else if(type == "group"){
        var permission =  getGroupPermission(name);
        var other = '';
        if (permission == 'owner' || permission == 'admin') {
            other = '<a href="javascript:manageGroup(&quot;' + name + '&quot;);"><i class="mdui-icon material-icons">settings</i></a>';
        }
        document.getElementById("chatting-title").innerHTML = '<span id="' + name + '-group-name"></span><span class="mdui-float-right">'+other+'<a href="javascript:getGroupInfo(&quot;' + name + '&quot;,&quot;'+permission+'&quot;);"><i class="mdui-icon material-icons">more_horiz</i></a></span>';
        document.getElementById("content").innerHTML = msg[name];
        contentScroll();
        getGroupname(name,name+'-group-name');
        getGroupname(name,name+'-list');
    }else if(type == "system"){
        document.getElementById("chatting-title").innerHTML = name;
        document.getElementById("content").innerHTML = msg[name];
        contentScroll();
    }else{
        mdui.snackbar({message:"error"});
    }

}

// 查询状态并输出
function getStatus(username,where){
    $.ajax({
        type: 'get',
        url: apiAddress + "/auth/status/" + username,
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if(obj.status=="ok"){
                if(obj.user_status=="online"){
                    document.getElementById(where).innerHTML = "在线";
                }else{
                    document.getElementById(where).innerHTML = "离线";
                }
            }else{
                document.getElementById(where).innerHTML = obj.status;
            }
        }
    });
}

// 关闭当前会话
function closeChatting(){
    $("#"+chatting+"-inlist").remove();
    document.getElementById("content").innerHTML = '';
    document.getElementById("chatting-title").innerHTML = "";
    chatting = null;
}

// 清屏
function clearComment(){
    if(chatting){
        msg[chatting] = "";
        document.getElementById("content").innerHTML = "";
        document.getElementById(chatting+"_chatting").innerHTML = "无信息";
    }
}

// 设置背景
function setBackground(){
    mdui.prompt('请输入背景地址', '自定义背景',
      function (value) {
        localStorage.setItem(getCookie("username")+"-background", value);
        $('body').css("background-image","url(" + value + ")");
      },
      function (value) {
        resetBackground();
      },
      {
          confirmText: '设置',
          cancelText: '恢复默认'
      }
    );
}

// 重置背景
function resetBackground(){
    localStorage.removeItem(getCookie("username")+"-background");
    $('body').css("background-image","url(https://api.kdcc.cn/)");
}

var outputtedStorage;

// 存入缓存
function inputStorage(){
    if(outputtedStorage=="ok"){
        localStorage.setItem(getCookie("username")+"-msg", JSON.stringify(msg));
        localStorage.setItem(getCookie("username")+"-chattinglist", document.getElementById("chattinglist").innerHTML);
        localStorage.setItem(getCookie("username")+"-storage", "ok");
    }
}

// 读取缓存
function outputStorage(){
    if (localStorage.getItem(getCookie("username")+"-storage") == "ok") {
        msg = JSON.parse(localStorage.getItem(getCookie("username")+"-msg"));
        document.getElementById("chattinglist").innerHTML = localStorage.getItem(getCookie("username")+"-chattinglist");
    }
    if (localStorage.getItem(getCookie("username")+"-background") !== null) {
        $('body').css("background-image","url(" + localStorage.getItem(getCookie("username")+"-background") + ")");
    }
    outputtedStorage = "ok";
}

// 清除缓存
function deleteStorage(){
    mdui.confirm('您真的要清空缓存吗？这将导致您的缓存消息记录与正在进行的会话被清空！此过程不可逆。', '警告',
      function(){
        localStorage.removeItem(getCookie("username")+"-msg");
        localStorage.removeItem(getCookie("username")+"-chattinglist");
        closeChatting();
        document.getElementById("chattinglist").innerHTML = "";
      },
      function(){
        mdui.snackbar({message:'已取消'});
      }
    );
}

// 调试模式
function developMode(){
    mdui.prompt('请输入调试地址', '调试模式',
      function (address) {
        mdui.prompt('请输入账号', '调试模式',
          function (account) {
            mdui.prompt('请输入密码', '调试模式',
              function (pwd) {
                $.ajax({
                    type: 'post',
                    url: address + "/auth/login",
                    data: {username: account, password: pwd},
                    dataType: 'text',
                    success: function(data){
                        obj = JSON.parse(data);
                        if (obj.status == "ok"){
                            mdui.snackbar({message:'登录成功，调试已开启'});
                            apiAddress = address;
                            setCookie("username",account,180);
                            setCookie("token",obj.token,180);
                            getDisplayName(getCookie("username"),"myname");
                            closeChatting();
                            document.getElementById("chattinglist").innerHTML = "";
                            refreshFriendlist();
                            refreshGrouplist();
                        }else if(obj.status == "error"){
                            mdui.snackbar({message:'登录失败，错误原因：' + obj.message});
                        }else if(obj.status == "null"){
                            mdui.snackbar({message:'账号不存在'});
                        }else{
                            mdui.snackbar({message:'未知错误'});
                        }
                    }
                });
              },
              function (value) {
                
              }
            );
          },
          function (value) {
            
          }
        );
      },
      function (value) {
        
      }
    );
}

// 复制函数
function copy(copyValue){
    input = document.createElement('input');
    input.value = copyValue;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
	mdui.snackbar({message:'复制成功'});
}