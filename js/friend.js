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

// 加好友
function addFriend(){
    mdui.prompt('请输入您要添加的好友ID', '添加好友',
      function (name) {
        mdui.prompt('请输入您的附加信息', '添加好友',
          function (info) {
            addFriendReal(name,info);
          },
          function (value) {
            
          },
          {
              defaultValue: '我是' + getCookie("user_id")
          }
        );
      },
      function (value) {
        
      }
    );
}

// 确认加好友
function addFriendReal(name,info){
    $.ajax({
        type: 'post',
        url: apiAddress + "/friend/add_friend",
        data: {user_id: name, add_info: info},
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
}

// 同意好友
function agreeFriend(rid){
    $.ajax({
        type: 'post',
        url: apiAddress + "/friend/agree_friend_require",
        data: {rid: rid},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'已同意请求'});
                $("#"+rid).remove();
                refreshFriendlist();
            }else if(obj.status == "error"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else if(obj.status == "null"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else{
                mdui.snackbar({message:'未知错误'});
            }
        }
    });
}

// 删好友二次确认
function confirmDeleteFriend(name){
    mdui.dialog({
      title: '二次确认',
      content: '你真的要删除'+name+'吗？',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确认',
          onClick: function(inst){
            deleteFriend(name);
          }
        }
      ]
    });
}

// 删除好友
function deleteFriend(name){
    $.ajax({
        type: 'post',
        url: apiAddress + "/friend/delete_friend",
        data: {friend_id: name},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'删除成功'});
                refreshFriendlist();
            }else if(obj.status == "error"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else if(obj.status == "null"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else{
                mdui.snackbar({message:'未知错误'});
            }
        }
    });
}

// 刷新好友列表
function refreshFriendlist(){
    $.ajax({
        type: 'post',
        url: apiAddress + "/friend/get_friend_list",
        data: {},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                list = obj.data;
                var out = "";
                for(var i in list) {
                out += '<li class="mdui-list-item mdui-ripple"><i class="mdui-list-item-avatar mdui-icon material-icons">person</i><div class="mdui-list-item-content">' + getUserName(list[i]) + '（'+list[i]+'）</div><a href="javascript:addChattinglist(&quot;'+list[i]+'&quot;,&quot;friend&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">message</i></a><a href="javascript:confirmDeleteFriend(&quot;'+list[i]+'&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">delete</i></a></li>';
                }
                document.getElementById("inner-friend-list").innerHTML=out;
            }else if(obj.status == "error"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else if(obj.status == "null"){
                mdui.snackbar({message:'NULL'});
            }else{
                mdui.snackbar({message:'未知错误'});
            }
        }
    });
}

// 设置朋友备注
function setFriendNick(){
    mdui.prompt('请输入您给朋友设置的备注（留空重置）', '设置备注',
      function (nick) {
        $.ajax({
            type: 'post',
            url: apiAddress + "/friend/set_friend_nick",
            data: {friend_id: chatting, nick: nick},
            dataType: 'text',
            success: function(data){
                obj = JSON.parse(data);
                if (obj.status == "ok"){
                    mdui.snackbar({message:'设置成功'});
                    openChatting(chatting,'friend');
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
        
      }
    );
}