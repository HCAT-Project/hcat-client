// 加好友
function addFriend(){
    mdui.prompt('请输入您要添加的好友ID', '添加好友',
      function (name) {
        addFriendReal(name);
      },
      function (value) {
        
      }
    );
}

// 确认加好友
function addFriendReal(name){
    mdui.prompt('请输入您的附加信息', '添加好友',
      function (additional) {
        $.ajax({
            type: 'post',
            url: apiAddress + "/friend/add",
            data: {username: getCookie("username"), token: getCookie("token") ,friend_username: name, additional_information: additional},
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
        
      },
      {
          defaultValue: '我是' + getCookie("username")
      }
    );
}

// 同意好友
function agreeFriend(rid){
    $.ajax({
        type: 'post',
        url: apiAddress + "/friend/agree",
        data: {username: getCookie("username"), token: getCookie("token") ,rid: rid},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'已添加为好友'});
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
        url: apiAddress + "/friend/delete",
        data: {username: getCookie("username"), token: getCookie("token") ,friend_username: name},
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
        url: apiAddress + "/friend/get_friends_list",
        data: {username: getCookie("username"), token: getCookie("token")},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                list = obj.data;
                var out = "";
                for(var i in list) {
                out += '<li class="mdui-list-item mdui-ripple"><i class="mdui-list-item-avatar mdui-icon material-icons">person</i><div class="mdui-list-item-content">' + list[i].nick + '（'+i+'）</div><a href="javascript:addChattinglist(&quot;'+i+'&quot;,&quot;friend&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">message</i></a><a href="javascript:confirmDeleteFriend(&quot;'+i+'&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">delete</i></a></li>';
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

