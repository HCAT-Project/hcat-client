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

// 新建群组
function createGroup() {
    mdui.prompt('请输入群聊名称', '创建群组', function (value) {
        $.ajax({
            type: 'post',
            url: apiAddress + "/group/create_group",
            data: {group_name: value},
            dataType: 'text',
            success: statusProcess
        });
    }, function (value) {

    });
}

// 加群组
function joinGroup() {
    mdui.prompt('请输入您要添加的群组ID', '加入群组', function (name) {
        // 获取进群方式
        $.ajax({
            type: 'post',
            url: apiAddress + "/group/get_verification_method",
            data: {group_id: name},
            dataType: 'text',
            success: function (data) {
                let jsonObj = JSON.parse(data);
                if (statusProcess(data)) {
                    if (jsonObj.data.verification_method === 'fr') {
                        // 自由进出
                        $.ajax({
                            type: 'post',
                            url: apiAddress + "/group/join_group",
                            data: {group_id: name, add_info: '114514'},
                            dataType: 'text',
                            success: statusProcess
                        });
                    } else if (jsonObj.data.verification_method === 'ac') {
                        // 需要管理员同意
                        mdui.prompt('请输入您的附加信息', '加入群组', function (info) {
                            $.ajax({
                                type: 'post',
                                url: apiAddress + "/group/join_group",
                                data: {group_id: name, add_info: info},
                                dataType: 'text',
                                success: statusProcess
                            });
                        }, function (value) {

                        }, {
                            defaultValue: '我是' + getCookie("user_id")
                        });
                    } else if (jsonObj.data.verification_method === 'na') {
                        mdui.snackbar({message: '该群聊不允许新成员加入'});
                    } else if (jsonObj.data.verification_method === 'aw') {
                        // 需要正确回答问题
                        mdui.prompt('加入该群需要您回答以下问题：' + jsonObj.data.question, '加入群组', function (info) {
                            $.ajax({
                                type: 'post',
                                url: apiAddress + "/group/join_group",
                                data: {group_id: name, add_info: info},
                                dataType: 'text',
                                success: statusProcess

                            });
                        }, function (value) {

                        });
                    } else {
                        mdui.snackbar({message: '未知的入群方式：' + jsonObj.data.verification_method});
                    }
                }
            }
        });
    }, function (value) {

    });
}

// 同意群组
function agreeGroup(rid) {
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/agree_join_group_request",
        data: {rid: rid},
        dataType: 'text',
        success: function (data) {
            if (statusProcess(data, true, ['已同意申请', "失败: ", "账号不存在", "未知错误"])) {
                $("#" + rid).remove();
                refreshGroupList();
            }
        }
    });
}

// 刷新群组列表
function refreshGroupList() {
    $.ajax({
        type: 'post', url: apiAddress + "/group/get_groups", data: {}, dataType: 'text', success: function (data) {
            let jsonObj = JSON.parse(data);
            if (statusProcess(data)) {
                let list = jsonObj.data;
                let out = "";
                for (let i in list) {
                    // noinspection JSUnresolvedVariable
                    out += '<li class="mdui-list-item mdui-ripple"><i class="mdui-list-item-avatar mdui-icon material-icons">group</i><div class="mdui-list-item-content">' + list[i].remark + '（' + i + '）</div><a href="javascript:addChattinglist(&quot;' + i + '&quot;,&quot;group&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">message</i></a><a href="javascript:copy(&quot;' + i + '&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">content_copy</i></a><a href="javascript:confirmDeleteGroup(&quot;' + i + '&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">delete</i></a></li>';
                }
                document.getElementById("inner-group-list").innerHTML = out;
            }
        }
    });
}

// 删群组二次确认
function confirmDeleteGroup(name) {
    mdui.dialog({
        title: '二次确认', content: '你真的要删除' + name + '吗？', buttons: [{
            text: '取消'
        }, {
            text: '确认', onClick: function (_) {
                deleteGroup(name);
            }
        }]
    });
}

// 删除群组
function deleteGroup(id) {
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/leave",
        data: {group_id: id},
        dataType: 'text',
        success: function (data) {
            statusProcess(data, true, ["成功退群", "失败: ", "账号不存在", "未知错误"]);
            refreshGroupList()
        }
    });
}

// 将群组名称查询并输出
function getGroupName(groupId) {
    let out;
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/get_name",
        data: {group_id: groupId},
        dataType: 'text',
        async: false,
        success: function (data) {
            let jsonObj = JSON.parse(data);
            if (statusProcess(data, false)) {
                //noinspection JSUnresolvedVariable
                out = jsonObj.remark;
            }

        }
    });
    return out;
}

// 改群组名
function changeGroupName(id) {
    mdui.prompt('请输入新名称', '更改群名', function (group_name) {
        $.ajax({
            type: 'post',
            url: apiAddress + "/group/rename",
            data: {group_id: id, group_name: group_name},
            dataType: 'text',
            success: function (data) {
                if (statusProcess(data, true, ["成功: ", "失败: ", "账号不存在", "未知错误"])) {
                    openChatting(id, 'group');
                    refreshGroupList()
                }
            }
        });
    }, function (value) {

    });
}

// 获取群员列表
function getGroupInfo(id, permission) {
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/get_members",
        data: {group_id: id},
        dataType: 'text',
        success: function (data) {
            let jsonObj = JSON.parse(data);
            if (statusProcess(data)) {
                let memberList = jsonObj.data;
                let out = "";
                for (let i in memberList) {
                    let icon;
                    if (memberList[i].permission === 'owner') {
                        icon = 'star';
                    } else if (memberList[i].permission === 'admin') {
                        icon = 'star_border';
                    } else {
                        icon = 'person';
                    }
                    let other = '';
                    if (permission === 'owner') {
                        other += '<a href="javascript:transferGroup(&quot;' + i + '&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">starr</i></a><a href="javascript:changeAdmin(&quot;' + i + '&quot;,&quot;' + memberList[i].permission + '&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">star_border</i></a>';
                    }
                    if (permission === 'admin' || permission === 'owner') {
                        other += '<a href="javascript:banGroupUser(&quot;' + i + '&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">speaker_notes_off</i></a><a href="javascript:kickMember(&quot;' + i + '&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">close</i></a>';
                    }
                    out += '<li class="mdui-list-item mdui-ripple"><i class="mdui-list-item-avatar mdui-icon material-icons">' + icon + '</i><div class="mdui-list-item-content">' + i + '</div>' + other + '<a href="javascript:addFriendReal(&quot;' + i + '&quot;,&quot;来自群' + id + '&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">add</i></a></li>';
                }
                document.getElementById("inner-group-info").innerHTML = out;
                new mdui.Dialog('#group-info').open();
            }


        }
    });
}

// 封禁成员
function banGroupUser(id) {
    mdui.snackbar({message: '新的对话框被遮挡，请手动关闭成员列表'});
    mdui.prompt('请输入禁言时长（秒数，如600秒为10分钟、3600秒为1小时、86400秒为1天）', '封禁成员' + id, function (value) {
        $.ajax({
            type: 'post',
            url: apiAddress + "/group/ban",
            data: {group_id: chatting, member_id: id, ban_time: value},
            dataType: 'text',
            success: statusProcess
        });
    }, function (value) {

    });
}

// 获取群主
function getGroupOwner(id) {
    let output = '';
    $.ajax({
        type: 'post',
        async: false,
        url: apiAddress + "/group/get_owner",
        data: {group_id: id},
        dataType: 'text',
        success: function (data) {
            let jsonObj = JSON.parse(data);
            if (statusProcess(data, false)) {
                output = jsonObj.data;
            }
        }
    });
    return output;
}

// 获取自己身份
function getSelfPmsInGroup(id) {
    let output = '';
    $.ajax({
        type: 'post',
        async: false,
        url: apiAddress + "/group/get_permission",
        data: {group_id: id},
        dataType: 'text',
        success: function (data) {
            let jsonObj = JSON.parse(data);
            if (statusProcess(data, false)) {
                output = jsonObj.data;
            }
        }
    });
    return output;
}

// 切换管理员
function changeAdmin(id, permission) {
    if (permission === 'member') {
        addAdmin(id);
    } else if (permission === 'admin') {
        removeAdmin(id);
    } else {
        mdui.snackbar({message: '你在干啥？'});
    }
}

// 移除管理员
function removeAdmin(id) {
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/remove_admin",
        data: {group_id: chatting, member_name: id},
        dataType: 'text',
        success: statusProcess
    });
}

// 移除管理员
function addAdmin(id) {
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/add_admin",
        data: {group_id: chatting, member_name: id},
        dataType: 'text',
        success: statusProcess
    });
}

// 转交群
function transferGroup(id) {
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/transfer_ownership",
        data: {group_id: chatting, member_id: id},
        dataType: 'text',
        success: statusProcess

    });
}

// 转交群
function kickMember(id) {
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/kick",
        data: {group_id: chatting, member_id: id},
        dataType: 'text',
        success: statusProcess

    });
}

// 群管理
function manageGroup() {
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/get_setting",
        data: {group_id: chatting},
        dataType: 'text',
        success: function (data) {
            let jsonObj = JSON.parse(data);
            if (statusProcess(data, false)) {
                let list = jsonObj.data;
                document.getElementById("inner-group-setting").innerHTML = '审核方式：<select id="group-setting-select" class="mdui-select" mdui-select><option value="ac">需要管理员同意</option><option value="fr">自由进出</option><option value="aw">需要回答问题</option><option value="na">不允许加入</option></select><div class="mdui-textfield"><label class="mdui-textfield-label">问题</label><textarea class="mdui-textfield-input" id="group-setting-question">' + list.question + '</textarea></div><div class="mdui-textfield"><label class="mdui-textfield-label">答案</label><textarea class="mdui-textfield-input" id="group-setting-answer">' + list.answer + '</textarea></div>';
                $("#group-setting-select").val(list.verification_method);
                new mdui.Dialog('#group-setting').open();
            }
        }
    });
}

// 保存群设置
function saveGroupSetting() {
    let settings = {};
    settings.verification_method = $("#group-setting-select option:selected").val();
    settings.question = $("#group-setting-question").val();
    settings.answer = $("#group-setting-answer").val();
    let post = JSON.stringify(settings);
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/change_group_setting",
        data: {group_id: chatting, setting: post},
        dataType: 'text',
        success: statusProcess

    });
}