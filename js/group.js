// 新建群组
function createGroup(){
    mdui.prompt('请输入群聊名称', '创建群组',
      function (value) {
        $.ajax({
            type: 'post',
            url: apiAddress + "/group/create_group",
            data: {username: getCookie("username"), token: getCookie("token") ,group_name: value},
            dataType: 'text',
            success: function(data){
                obj = JSON.parse(data);
                if (obj.status == "ok"){
                    mdui.snackbar({message:'成功'});
                }else if(obj.status == "error"){
                    mdui.snackbar({message:'失败：' + obj.message});
                }else if(obj.status == "null"){
                    mdui.snackbar({message:'NULL'});
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

// 加群组
function joinGroup(){
    mdui.prompt('请输入您要添加的群组ID', '加入群组',
      function (name) {
        mdui.prompt('请输入您的附加信息', '加入群组',
          function (additional) {
            $.ajax({
                type: 'post',
                url: apiAddress + "/group/join_group",
                data: {username: getCookie("username"), token: getCookie("token") ,group_id: name, additional_information: additional},
                dataType: 'text',
                success: function(data){
                    obj = JSON.parse(data);
                    if (obj.status == "ok"){
                        mdui.snackbar({message:'成功'});
                    }else if(obj.status == "error"){
                        mdui.snackbar({message:'失败：' + obj.message});
                    }else if(obj.status == "null"){
                        mdui.snackbar({message:'NULL'});
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
      },
      function (value) {
        
      }
    );
}

// 同意群组
function agreeGroup(rid){
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/agree_join_group_request",
        data: {username: getCookie("username"), token: getCookie("token") ,rid: rid},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'已同意申请'});
                $("#"+rid).remove();
                refreshGrouplist();
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

// 刷新群组列表
function refreshGrouplist(){
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/get_groups_list",
        data: {username: getCookie("username"), token: getCookie("token")},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                list = obj.data;
                var out = "";
                for(var i in list) {
                    out += '<li class="mdui-list-item mdui-ripple"><i class="mdui-list-item-avatar mdui-icon material-icons">group</i><div class="mdui-list-item-content"><span id="'+i+'-ingrouplist">'+i+'</span>（' + i +'）</div><a href="javascript:addChattinglist(&quot;'+i+'&quot;,&quot;group&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">message</i></a><a href="javascript:copy(&quot;'+i+'&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">content_copy</i></a><a href="javascript:confirmDeleteGroup(&quot;'+i+'&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">delete</i></a></li>';
                    getGroupname(i,i+'-ingrouplist');
                }
                document.getElementById("inner-group-list").innerHTML=out;
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

// 删群组二次确认
function confirmDeleteGroup(name){
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

// 删除群组
function deleteGroup(){
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/leave",
        data: {username: getCookie("username"), token: getCookie("token") ,group_id: chatting},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'成功退群'});
                refreshGrouplist();
            }else if(obj.status == "error"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else if(obj.status == "null"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else{
                mdui.snackbar({message:'未知错误'});
            }
        }
    });
    closeChatting();
}

// 将群组名称查询并输出
function getGroupname(groupId,where){
    $.ajax({
        type: 'get',
        url: apiAddress + "/group/get_group_name/" + groupId,
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                document.getElementById(where).innerHTML = obj.group_name;
            }else if(obj.status == "null"){
                document.getElementById(where).innerHTML = "NULL";
            }else{
                document.getElementById(where).innerHTML = "error";
            }
        }
    });
}

// 改群组名
function changeGroupName(){
    mdui.prompt('请输入您的群组ID', '更改群名',
      function (group_id) {
        mdui.prompt('请输入新名称', '更改群名',
          function (group_name) {
            $.ajax({
                type: 'post',
                url: apiAddress + "/group/group_rename",
                data: {username: getCookie("username"), token: getCookie("token") ,group_id: group_id, group_name: group_name},
                dataType: 'text',
                success: function(data){
                    obj = JSON.parse(data);
                    if (obj.status == "ok"){
                        mdui.snackbar({message:'成功：' + obj.message});
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
      },
      function (value) {
        
      }
    );
}

// 获取群员列表
function getGroupInfo(id,permission){
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/get_group_members_list",
        data: {username: getCookie("username"), token: getCookie("token"), group_id: id},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                list = obj.data;
                var out = "";
                for(var i in list) {
                    var icon;
                    if (list[i].permission == 'owner') {
                        icon = 'star';
                    } else if (list[i].permission == 'admin') {
                        icon = 'star_border';
                    } else {
                        icon = 'person';
                    }
                    var other = '';
                    if (permission == 'owner') {
                        other += '<a href="javascript:transferGroup(&quot;'+i+'&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">starr</i></a><a href="javascript:changeAdmin(&quot;'+i+'&quot;,&quot;'+list[i].permission+'&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">star_border</i></a>';
                    }
                    if (permission == 'admin' || permission == 'owner') {
                        other += '<a href="javascript:banGroupUser(&quot;'+i+'&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">speaker_notes_off</i></a><a href="javascript:kickMember(&quot;'+i+'&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">close</i></a>';
                    }
                    out += '<li class="mdui-list-item mdui-ripple"><i class="mdui-list-item-avatar mdui-icon material-icons">'+icon+'</i><div class="mdui-list-item-content">' + i +'</div>'+other+'<a href="javascript:addFriendReal(&quot;'+i+'&quot;);"><i class="mdui-list-item-icon mdui-icon material-icons">add</i></a></li>';
                }
                document.getElementById("inner-group-info").innerHTML=out;
                new mdui.Dialog('#group-info').open();
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

// 封禁成员
function banGroupUser(id){
    mdui.prompt('请输入禁言时长（秒数，如600秒为10分钟、3600秒为1小时、86400秒为1天）', '封禁成员'+id,
      function (value) {
        $.ajax({
            type: 'post',
            url: apiAddress + "/group/ban",
            data: {username: getCookie("username"), token: getCookie("token") ,group_id: chatting ,member_name: id ,time: value},
            dataType: 'text',
            success: function(data){
                obj = JSON.parse(data);
                if (obj.status == "ok"){
                    mdui.snackbar({message:'操作成功'});
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

// 获取群主
function getGroupOwner(id){
    var output = '';
    $.ajax({
        type: 'post',
        async: false,
        url: apiAddress + "/group/get_group_owner",
        data: {username: getCookie("username"), token: getCookie("token"), group_id: id},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                output = obj.data;
            }else if(obj.status == "error"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else if(obj.status == "null"){
                mdui.snackbar({message:'NULL'});
            }else{
                mdui.snackbar({message:'未知错误'});
            }
        }
    });
    return output;
}

// 获取自己身份
function getGroupPermission(id){
    var output = '';
    $.ajax({
        type: 'post',
        async: false,
        url: apiAddress + "/group/get_permission",
        data: {username: getCookie("username"), token: getCookie("token"), group_id: id},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                output = obj.data;
            }else if(obj.status == "error"){
                mdui.snackbar({message:'失败：' + obj.message});
            }else if(obj.status == "null"){
                mdui.snackbar({message:'NULL'});
            }else{
                mdui.snackbar({message:'未知错误'});
            }
        }
    });
    return output;
}

// 切换管理员
function changeAdmin(id,permission){
    if (permission == 'member') {
        addAdmin(id);
    } else if (permission == 'admin') {
        removeAdmin(id);
    } else {
        mdui.snackbar({message:'你在干啥？'});
    }
}

// 移除管理员
function removeAdmin(id){
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/remove_admin",
        data: {username: getCookie("username"), token: getCookie("token"), group_id: chatting, member_name: id},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'已移除'});
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

// 移除管理员
function addAdmin(id){
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/add_admin",
        data: {username: getCookie("username"), token: getCookie("token"), group_id: chatting, member_name: id},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'已添加'});
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

// 转交群
function transferGroup(id){
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/transfer_ownership",
        data: {username: getCookie("username"), token: getCookie("token"), group_id: chatting, new_owner_name: id},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'已转交'});
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

// 转交群
function kickMember(id){
    $.ajax({
        type: 'post',
        url: apiAddress + "/group/kick",
        data: {username: getCookie("username"), token: getCookie("token"), group_id: chatting, member_name: id},
        dataType: 'text',
        success: function(data){
            obj = JSON.parse(data);
            if (obj.status == "ok"){
                mdui.snackbar({message:'已踢出'});
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