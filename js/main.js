/*
 * Copyright (C) 2023. HCAT-Project-Team
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// 设置后台地址 请设置您的地址 最好别跨域



let apiAddress = "";

/**
 * 拉到最底部。
 */
function contentScroll() {
    document.getElementById('contentarea').scrollTop = document.getElementById('contentarea').scrollHeight;
}

/**
 * 将指定 ID 的对话移动到顶部。
 * @param {string} id - 要移动的对话的 ID。
 */
function putTop(id) {
    const selector = $("#" + id + "-inlist");// 获取 ID 对应的 jQuery 选择器对象
    selector.parent().prepend(selector);// 拉到顶
}

/**
 * 为指定的元素添加名为 "unread" 的 CSS 类，以实现未读消息的视觉效果。
 * @param {string} id - 要添加未读标记的元素的 ID。
 */
function setUnread(id) {
    $("#" + id + "_chatting").addClass("unread");
}

/**
 * 为指定的元素移除名为 "unread" 的 CSS 类。
 * @param {string} id - 要移除未读标记的元素的 ID。
 */
function setRead(id) {
    $("#" + id + "_chatting").removeClass("unread");
}

/**
 * 在聊天列表中将指定的聊天项高亮显示。
 * @param {string} id - 要高亮显示的聊天项的 ID。
 */
function chatOpened(id) {
    $("#" + id + "-inlist").addClass("mdui-list-item-active");
}

/**
 * 将聊天列表中指定的聊天项取消高亮显示。
 * @param {string} id - 要取消高亮显示的聊天项的 ID。
 */
function chatClosed(id) {
    $("#" + id + "-inlist").removeClass("mdui-list-item-active");
}

/**
 * 设置一个cookie
 *
 * @param {string} cName - 要设置的cookie的名称
 * @param {string} cValue - 要设置的cookie的值
 * @param {number} exDays - cookie过期的天数
 */
function setCookie(cName, cValue, exDays) {
    // 获取当前时间
    let date = new Date();
    // 计算过期时间
    date.setTime(date.getTime() + (exDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    // 设置一个@Yummy_Cookies_S
    // XD,曲奇别打我(光速逃
    // > 夹带私货的hsn就是逊啦!
    document.cookie = `${cName}=${cValue}; ${expires}`;
}

/**
 * 根据cookie名获取对应的cookie值
 * > 参考[这里](https://www.runoob.com/js/js-cookies.html)
 * @param {string} cName - cookie名
 * @return {string} - cookie值
 */
function getCookie(cName) {
    let name = cName + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * 从浏览器中删除指定名称的cookie。
 * @param {string} name - 要删除的cookie的名称。
 */

function delCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

/**
 * 判断传入的值是否为空。
 * @param {*} e - 传入的值。
 * @returns {boolean} 如果传入的值为空，返回 true，否则返回 false。
 */
function isEmpty(e) {
    return !e || e === "0";
}

/**
 * 判断指定 id 的元素是否存在
 * @param {string} id - 要判断的元素的 id
 * @returns {boolean} - 存在返回 true，否则返回 false
 */
function exist(id) {
    return !!document.getElementById(id);

}

/**
 * 判断一个变量是否已经被定义
 * @param {*} a - 要检查的变量
 * @returns {boolean} - 变量是否已经被定义
 */
function isSet(a) {
    return !(typeof (a) == "undefined" || typeof (a) == null);
}

/**
 * 处理按下回车键的事件
 * @param {KeyboardEvent} e 事件对象
 * @return {void}
 */
function keyUpSubmit(e) {
    let evt = window.event || e;
    //这可能会有bug,留意一下
    if (evt.key === 'Enter') {
        let message = $("#inputmessage").val();
        sendMessage('{"msg_chain":[{"type":"text","msg":"' + message + '"}]}');
    }
}

/**
 * 解析收到的聊天消息并返回解析后的文本
 * @param {string} data - 收到的聊天消息
 * @param {number} type - 消息的展示类型
 * @returns {string} - 解析后的文本
 */
function unzipMessage(data, type) {
    // the following line is to prevent WebStorm from complaining about the JSON.parse() function,don't remove it!!!
    // noinspection JSUnresolvedVariable
    let arr = JSON.parse(data)?.msg_chain;
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].type === 'text') {

            if (type === MsgDisplayType.FULL_TEXT || type === MsgDisplayType.PLAIN_TEXT) {
                out += arr[i].msg;
            }
        } else if (arr[i].type === 'img') {
            if (type === MsgDisplayType.FULL_TEXT) {
                out += '<img src="' + arr[i].msg + '" style="height: 150px;" alt="">';
            } else if (type === MsgDisplayType.PLAIN_TEXT) {
                out += '[图片]';
            }
        } else {
            if (type === MsgDisplayType.FULL_TEXT) {
                out += arr[i].msg;
            } else if (type === MsgDisplayType.PLAIN_TEXT) {
                out += '[未知消息类型]';
            }
        }
    }
    return out;
}

let sending = false;

/**
 * 发送消息到聊天室
 * @param {string} message - 要发送的消息内容
 */
function sendMessage(message) {
    if (sending) {
        return;
    }
    if (message === "") {
        return;
    }
    sending = true;
    if (chattingType === "friend") {
        $.ajax({
            type: 'post',
            url: apiAddress + "/chat/send_friend_msg",
            data: {friend_id: chatting, msg: message},
            dataType: 'text',
            success: function (data) {
                let obj = JSON.parse(data);
                if (obj.status === "ok") {
                    document.getElementById(chatting + "_chatting").innerHTML = unzipMessage(message, MsgDisplayType.PLAIN_TEXT);
                    let im = msg[chatting];
                    im += '<div class="username" mdui-tooltip="{content: &apos;' + getCookie("user_id") + ' ' + dateFormat(Date.parse(new Date())) + '&apos;}">' + document.getElementById('myname').innerHTML + '</div><div class="bubble">' + unzipMessage(message, MsgDisplayType.FULL_TEXT) + '</div>';
                    msg[chatting] = im;
                    document.getElementById("content").innerHTML = msg[chatting];
                    document.getElementById("inputmessage").value = "";
                    contentScroll();
                    sending = false;
                    putTop(chatting);
                } else {
                    mdui.snackbar({message: obj.status + ': ' + obj.message});
                    sending = false;
                }
            }
        });
    } else if (chattingType === "group") {
        $.ajax({
            type: 'post',
            url: apiAddress + "/chat/send_group_msg",
            data: {group_id: chatting, msg: message},
            dataType: 'text',
            success: function (data) {
                let jsonObj = JSON.parse(data);
                if (jsonObj.status === "ok") {
                    document.getElementById(chatting + "_chatting").innerHTML = getCookie("user_id") + ': ' + unzipMessage(message, MsgDisplayType.PLAIN_TEXT);
                    let im = msg[chatting];
                    im += '<div class="username">' + getCookie("user_id") + '  (' + dateFormat(Date.parse(new Date())) + ')</div><div class="bubble">' + unzipMessage(message, MsgDisplayType.FULL_TEXT) + '</div>';
                    msg[chatting] = im;
                    document.getElementById("content").innerHTML = msg[chatting];
                    document.getElementById("inputmessage").value = "";
                    contentScroll();
                    sending = false;
                    putTop(chatting);
                } else {
                    mdui.snackbar({message: jsonObj.status + ': ' + jsonObj.message});
                    sending = false;
                }
            }
        });
    } else {
        mdui.snackbar({message: "error"});
        sending = false;
    }
}

/**
 * 创建系统通知。
 * @param {string} message - 系统通知的内容。
 * @param {Date} time - 系统通知发送时间。
 * @returns {void}
 */
function systemNotification(message, time) {
    // 不在会话列表先创建
    if (!exist("系统通知_chatting")) {
        addChattinglist("系统通知", "system");
    }
    // 会话列表最新消息修改
    document.getElementById("系统通知_chatting").innerHTML = message;
    let messageHtml;
    // 更新信息到数组
    messageHtml = msg["系统通知"] ? msg["系统通知"] : "";

    messageHtml += '<div class="username" mdui-tooltip="{content: &apos;' + dateFormat(time) + '&apos;}">系统通知</div><div class="bubble"><span>' + message + '</span></div>';
    msg["系统通知"] = messageHtml;
    // 对话拉到顶
    putTop("系统通知");
    // 如果正在显示就输出，否则不输出并标记未读
    if (chatting === "系统通知") {
        document.getElementById("content").innerHTML = msg["系统通知"];
        contentScroll();
    } else {
        setUnread("系统通知");
    }
    // 如果没关注窗口就提示音
    if (bubbleNotification === "on") {
        document.getElementById("bubble").play();
    }
}

// 查询昵称
function getUserName(id) {
    var out;
    $.ajax({
        type: 'post',
        url: apiAddress + "/account/get_user_name",
        data: {user_id: id},
        async: false,
        dataType: 'text',
        success: function (data) {
            let obj = JSON.parse(data);
            if (obj.status === "ok") {
                if (obj.nick) {
                    out = obj.nick;
                } else {
                    out = obj.data;
                }
            } else if (obj.status === "error") {
                mdui.snackbar({message: '失败：' + obj.message});
            } else if (obj.status === "null") {
                mdui.snackbar({message: '账号不存在'});
            } else {
                mdui.snackbar({message: '未知错误'});
            }
        }
    });
    return out;
}

// 改名字
function changeName() {
    mdui.prompt('请输入您的新昵称', '更改昵称',
        function (value) {
            $.ajax({
                type: 'post',
                url: apiAddress + "/account/rename",
                data: {name: value},
                dataType: 'text',
                success: function (data) {
                    let jsonObj = JSON.parse(data);
                    if (jsonObj.status === "ok") {
                        mdui.snackbar({message: '成功' + jsonObj.message});
                        document.getElementById('myname').innerHTML = getUserName(getCookie("user_id"));
                    } else if (jsonObj.status === "error") {
                        mdui.snackbar({message: '失败：' + jsonObj.message});
                    } else if (jsonObj.status === "null") {
                        mdui.snackbar({message: '账号不存在'});
                    } else {
                        mdui.snackbar({message: '未知错误'});
                    }
                }
            });
        },
        function (value) {

        }
    );
}

// 改密码
function changePassword() {
    mdui.prompt('请输入您的新密码', '更改密码',
        function (newPWD) {
            $.ajax({
                type: 'post',
                url: apiAddress + "/account/change_password",
                data: {password: newPWD},
                dataType: 'text',
                success: statusProcess
            });
        },
        function (value) {

        }
    );
}

// 退出登录
function logout() {
    $.ajax({
        type: 'post',
        url: apiAddress + "/account/logout",
        data: {},
        dataType: 'text',
        success: function (data) {
            if (statusProcess(data)) {
                delCookie("user_id");
                window.location = "login.html";
            }
        }
    });
}

// 获取todolist
function getTodolist() {
    $.ajax({
        type: 'post',
        url: apiAddress + "/account/get_todo_list",
        data: {},
        dataType: 'text',
        success: function (data) {
            let jsonObj = JSON.parse(data);
            let todoList = jsonObj.data;
            if (jsonObj.status === "ok") {

                for (let i = 0; i < todoList.length; i++) {
                    if (todoList[i].type === "friend_request") {
                        // 好友申请
                        let outputHtml = document.getElementById("inner-friend-request").innerHTML;
                        outputHtml += '<li class="mdui-list-item mdui-ripple" id="' + todoList[i].rid + '"><i class="mdui-list-item-avatar mdui-icon material-icons">person</i><div class="mdui-list-item-content">' + todoList[i].user_id + '</div><a href="javascript:agreeFriend(&quot;' + todoList[i].rid + '&quot;)"><i class="mdui-list-item-icon mdui-icon material-icons">playlist_add_check</i></a></li>';
                        document.getElementById("inner-friend-request").innerHTML = outputHtml;
                        systemNotification('您有来自' + todoList[i].user_id + '的好友申请：' + todoList[i].add_info, todoList[i].time);
                    } else if (todoList[i].type === "group_join_request") {
                        // 群组申请
                        let outputHtml = document.getElementById("inner-group-request").innerHTML;
                        outputHtml += '<li class="mdui-list-item mdui-ripple" id="' + todoList[i].rid + '"><i class="mdui-list-item-avatar mdui-icon material-icons">person</i><div class="mdui-list-item-content">' + todoList[i].user_id + '</div><a href="javascript:agreeGroup(&quot;' + todoList[i].rid + '&quot;)"><i class="mdui-list-item-icon mdui-icon material-icons">playlist_add_check</i></a></li>';
                        document.getElementById("inner-group-request").innerHTML = outputHtml;
                        systemNotification('您有来自' + todoList[i].user_id + '的加入' + todoList[i].group_id + '的申请：' + todoList[i].add_info, todoList[i].time);
                    } else if (todoList[i].type === "friend_msg") {
                        // 不在会话列表先创建
                        if (!exist(todoList[i].user_id + "_chatting")) {
                            addChattinglist(todoList[i].user_id, "friend");
                        }
                        // 会话列表最新消息修改
                        document.getElementById(todoList[i].user_id + "_chatting").innerHTML = unzipMessage(JSON.stringify(todoList[i].msg), MsgDisplayType.PLAIN_TEXT);


                        // noinspection JSUnresolvedVariable
                        let nickname = todoList[i].friend_nick ? todoList[i].friend_nick : todoList[i].friend_name;

                        // 更新信息到数组
                        let messageHtml = msg[todoList[i].user_id] ? msg[todoList[i].user_id] : "";

                        messageHtml += '<div class="username" mdui-tooltip="{content: &apos;' + todoList[i].user_id + ' ' + dateFormat(todoList[i].time) + '&apos;}">' + nickname + '</div><div class="bubble">' + unzipMessage(JSON.stringify(todoList[i].msg), MsgDisplayType.FULL_TEXT) + '</div>';

                        msg[todoList[i].user_id] = messageHtml;

                        // 对话拉到顶
                        putTop(todoList[i].user_id);

                        // 如果正在显示就输出，否则不输出并标记未读
                        if (chatting === todoList[i].user_id) {
                            document.getElementById("content").innerHTML = msg[chatting];
                            contentScroll();
                        } else {
                            setUnread(todoList[i].user_id);
                        }

                        // 如果没关注窗口就提示音
                        if (bubbleNotification === "on") {
                            document.getElementById("bubble").play();
                        }
                    } else if (todoList[i].type === "group_msg") {
                        // 不在会话列表先创建
                        if (!exist(todoList[i].group_id + "_chatting")) {
                            addChattinglist(todoList[i].group_id, "group");
                        }
                        // 会话列表最新消息修改
                        document.getElementById(todoList[i].group_id + "_chatting").innerHTML = todoList[i].user_id + ': ' + unzipMessage(JSON.stringify(todoList[i].msg), MsgDisplayType.PLAIN_TEXT);

                        // 更新信息到数组
                        let messageHtml = msg[todoList[i].group_id] ? msg[todoList[i].group_id] : "";

                        messageHtml += '<div class="username">' + todoList[i].user_id + '  (' + dateFormat(todoList[i].time) + ')</div><div class="bubble">' + unzipMessage(JSON.stringify(todoList[i].msg), MsgDisplayType.FULL_TEXT) + '</div>';
                        msg[todoList[i].group_id] = messageHtml;

                        // 对话拉到顶
                        putTop(todoList[i].group_id);

                        // 如果正在显示就输出，否则不输出并标记未读
                        if (chatting === todoList[i].group_id) {
                            document.getElementById("content").innerHTML = msg[chatting];
                            contentScroll();
                        } else {
                            setUnread(todoList[i].group_id);
                        }

                        // 如果没关注窗口就提示音
                        if (bubbleNotification === "on") {
                            document.getElementById("bubble").play();
                        }
                    } else if (todoList[i].type === "friend_agree") {
                        systemNotification(todoList[i].user_id + ' 通过了您的好友请求', todoList[i].time);
                        refreshFriendlist();
                    } else if (todoList[i].type === "friend_deleted") {
                        systemNotification(todoList[i].user_id + ' 删除了您', todoList[i].time);
                        refreshFriendlist();
                    } else if (todoList[i].type === "group_agree") {
                        systemNotification('您成功加入了' + todoList[i].group_id, todoList[i].time);
                        refreshFriendlist();
                    } else if (todoList[i].type === "group_deleted") {
                        systemNotification('您被移出了' + todoList[i].group_id, todoList[i].time);
                        refreshGrouplist();
                    } else if (todoList[i].type === "group_rename") {
                        //noinspection JSUnresolvedVariable
                        systemNotification(todoList[i].group_id + '更改了他们的群名：' + todoList[i].old_name + '→' + todoList[i].new_name, todoList[i].time);
                    } else if (todoList[i].type === "banned") {
                        systemNotification('群' + todoList[i].group_id + '的管理员将您禁言了' + todoList[i].ban_time + '秒', todoList[i].time);
                    } else if (todoList[i].type === "admin_removed") {
                        systemNotification(todoList[i].name + '被' + todoList[i].group_id + '的群主撤销了管理员资格', todoList[i].time);
                    } else if (todoList[i].type === "admin_add") {
                        systemNotification(todoList[i].name + '被' + todoList[i].group_id + '的群主任命为管理员', todoList[i].time);
                    } else if (todoList[i].type === "owner_replaced") {
                        //noinspection JSUnresolvedVariable
                        systemNotification('群' + todoList[i].group_id + '的群主由' + todoList[i].old_owner + '变更为了' + todoList[i].new_name, todoList[i].time);
                    } else if (todoList[i].type === "question") {
                        let param_name = todoList[i].param_name;
                        let rid = todoList[i].rid;
                        mdui.prompt(todoList[i].text, todoList[i].title,
                            function (value) {
                                //noinspection JSUnresolvedVariable
                                $.ajax({
                                    type: 'post',
                                    url: apiAddress + todoList[i].path,
                                    data: JSON.parse('{username:' + getCookie("user_id") + ', token:' + getCookie("token") + ' ,' + param_name + ':' + value + ',rid:' + rid + "}"),
                                    dataType: 'text',
                                    success: statusProcess
                                });
                            },
                            function (value) {
                                //noinspection JSUnresolvedVariable
                                $.ajax({
                                    type: 'post',
                                    url: apiAddress + todoList[i].path,
                                    data: {
                                        username: getCookie("user_id"),
                                        token: getCookie("token"),
                                        param_name: "",
                                        rid: rid
                                    },
                                    dataType: 'text',
                                    success: statusProcess
                                });
                            },
                            {
                                modal: true
                            }
                        );
                    } else {

                    }
                }

            } else if (jsonObj.status === "error") {
                mdui.snackbar({message: '失败：' + jsonObj.message});
                authenticateToken();
            } else if (jsonObj.status === "null") {
                mdui.snackbar({message: 'NULL'});
                authenticateToken();
            } else {
                mdui.snackbar({message: '未知错误'});
                authenticateToken();
            }
        }
    });
}

// 新增会话
function addChattinglist(name, type) {
    let out = document.getElementById("chattinglist").innerHTML;
    if (!exist(name + "_chatting")) {
        if (type === "friend") {
            out += '<li class="mdui-list-item mdui-ripple" onclick="openChatting(&quot;' + name + '&quot;,&quot;friend&quot;)" id="' + name + '-inlist"><i class="mdui-list-item-avatar mdui-icon material-icons">person</i><div class="mdui-list-item-content"><div class="mdui-list-item-title" id="' + name + '-list">' + getUserName(name) + '</div><div class="mdui-list-item-text mdui-list-item-one-line"><span id="' + name + '_chatting" class="">无信息</span></div></div></li>';

        } else if (type === "group") {
            out += '<li class="mdui-list-item mdui-ripple" onclick="openChatting(&quot;' + name + '&quot;,&quot;group&quot;)" id="' + name + '-inlist"><i class="mdui-list-item-avatar mdui-icon material-icons">group</i><div class="mdui-list-item-content"><div class="mdui-list-item-title" id="' + name + '-list">' + getGroupname(name) + '</div><div class="mdui-list-item-text mdui-list-item-one-line"><span id="' + name + '_chatting" class="">无信息</span></div></div></li>';

        } else if (type === "system") {
            out += '<li class="mdui-list-item mdui-ripple" onclick="openChatting(&quot;' + name + '&quot;,&quot;system&quot;)" id="' + name + '-inlist"><i class="mdui-list-item-avatar mdui-icon material-icons">notifications</i><div class="mdui-list-item-content"><div class="mdui-list-item-title" id="' + name + '-list">' + name + '</div><div class="mdui-list-item-text mdui-list-item-one-line"><span id="' + name + '_chatting" class="">无信息</span></div></div></li>';

        } else {

        }
        document.getElementById("chattinglist").innerHTML = out;
    }
}

// 打开会话
function openChatting(name, type) {
    chatClosed(chatting);
    setRead(name);
    if (isEmpty(msg[name])) {
        msg[name] = "";
    }
    chatting = name;
    chattingType = type;
    chatOpened(chatting);
    if (type === "friend") {
        document.getElementById("chatting-title").innerHTML = getUserName(name) + ' (' + name + ')<a href="javascript:setFriendNick();"><i class="mdui-icon material-icons">edit</i></a><span class="mdui-float-right">' + getStatus(name) + '</span>';
        document.getElementById("content").innerHTML = msg[name];
        contentScroll();
        document.getElementById(name + '-list').innerHTML = getUserName(name);
    } else if (type === "group") {
        let permission = getGroupPermission(name);
        let other = '';
        let change = '';
        if (permission === 'owner' || permission === 'admin') {
            other = '<a href="javascript:manageGroup();"><i class="mdui-icon material-icons">settings</i></a>';
            change = '<a href="javascript:changeGroupName(&quot;' + name + '&quot;);"><i class="mdui-icon material-icons">edit</i></a>';
        }
        document.getElementById("chatting-title").innerHTML = getGroupname(name) + change + '<span class="mdui-float-right">' + other + '<a href="javascript:getGroupInfo(&quot;' + name + '&quot;,&quot;' + permission + '&quot;);"><i class="mdui-icon material-icons">more_horiz</i></a></span>';
        document.getElementById("content").innerHTML = msg[name];
        contentScroll();
        document.getElementById(name + '-list').innerHTML = getGroupname(name);
    } else if (type === "system") {
        document.getElementById("chatting-title").innerHTML = name;
        document.getElementById("content").innerHTML = msg[name];
        contentScroll();
    } else {
        mdui.snackbar({message: "error"});
    }

}

// 查询状态
function getStatus(id) {
    let out;
    $.ajax({
        type: 'post',
        url: apiAddress + "/account/status",
        data: {user_id: id},
        dataType: 'text',
        async: false,
        success: function (data) {
            let obj = JSON.parse(data);
            if (obj.status === "online") {
                out = '在线';
            } else {
                out = '离线';
            }
        }
    });
    return out;
}

// 关闭当前会话
function closeChatting() {
    $("#" + chatting + "-inlist").remove();
    document.getElementById("content").innerHTML = '';
    document.getElementById("chatting-title").innerHTML = "";
    chatting = null;
}

// 清屏
function clearComment() {
    if (chatting) {
        msg[chatting] = "";
        document.getElementById("content").innerHTML = "";
        document.getElementById(chatting + "_chatting").innerHTML = "无信息";
    }
}

// 设置背景
function setBackground() {
    mdui.prompt('请输入背景地址', '自定义背景',
        function (value) {
            localStorage.setItem(getCookie("user_id") + "-background", value);
            $('body').css("background-image", "url(" + value + ")");
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
function resetBackground() {
    localStorage.removeItem(getCookie("user_id") + "-background");
    $('body').css("background-image", "url(https://api.kdcc.cn/)");
}

let outputtedStorage;

// 存入缓存
function inputStorage() {
    if (outputtedStorage === "ok") {
        localStorage.setItem(getCookie("user_id") + "-msg", JSON.stringify(msg));
        localStorage.setItem(getCookie("user_id") + "-chattinglist", document.getElementById("chattinglist").innerHTML);
        localStorage.setItem(getCookie("user_id") + "-storage", "ok");
    }
}

// 读取缓存
function outputStorage() {
    if (localStorage.getItem(getCookie("user_id") + "-storage") === "ok") {
        msg = JSON.parse(localStorage.getItem(getCookie("user_id") + "-msg"));
        document.getElementById("chattinglist").innerHTML = localStorage.getItem(getCookie("user_id") + "-chattinglist");
    }
    if (localStorage.getItem(getCookie("user_id") + "-background") !== null) {
        $('body').css("background-image", "url(" + localStorage.getItem(getCookie("user_id") + "-background") + ")");
    }
    $(".mdui-list-item-active").removeClass("mdui-list-item-active");
    outputtedStorage = "ok";
}

// 清除缓存
function deleteStorage() {
    mdui.confirm('您真的要清空缓存吗？这将导致您的缓存消息记录与正在进行的会话被清空！此过程不可逆。', '警告',
        function () {
            localStorage.removeItem(getCookie("user_id") + "-msg");
            localStorage.removeItem(getCookie("user_id") + "-chattinglist");
            closeChatting();
            document.getElementById("chattinglist").innerHTML = "";
        },
        function () {
            mdui.snackbar({message: '已取消'});
        }
    );
}

// 调试模式
function developMode() {
    mdui.prompt('请输入调试地址', '调试模式',
        function (address) {
            mdui.prompt('请输入账号', '调试模式',
                function (account) {
                    mdui.prompt('请输入密码', '调试模式',
                        function (pwd) {
                            $.ajax({
                                type: 'post',
                                url: address + "/account/login",
                                data: {user_id: account, password: pwd},
                                dataType: 'text',
                                success: function (data) {
                                    let obj = JSON.parse(data);
                                    if (obj.status === "ok") {
                                        mdui.snackbar({message: '登录成功，调试已开启'});
                                        apiAddress = address;
                                        setCookie("user_id", account, 180);
                                        document.getElementById('myname').innerHTML = getUserName(getCookie("user_id"));
                                        closeChatting();
                                        document.getElementById("chattinglist").innerHTML = "";
                                        refreshFriendlist();
                                        refreshGrouplist();
                                    } else if (obj.status === "error") {
                                        mdui.snackbar({message: '登录失败，错误原因：' + obj.message});
                                    } else if (obj.status === "null") {
                                        mdui.snackbar({message: '账号不存在'});
                                    } else {
                                        mdui.snackbar({message: '未知错误'});
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
function copy(copyValue) {
    let input = document.createElement('input');
    input.value = copyValue;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
    mdui.snackbar({message: '复制成功'});
}

// 日期格式
function dateFormat(timestamp) {
    timestamp = Math.trunc(timestamp)
    if (String(timestamp).length === 10) {
        timestamp = timestamp * 1000
    }
    const date = new Date(timestamp);
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    if (timestamp !== "") {
        return Y + '-' + (M < 10 ? '0' + M : M) + '-' + (D < 10 ? '0' + D : D) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
    } else {
        return "NaN"
    }
}