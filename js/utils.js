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
/**
 * 状态处理函数
 * @param {string} data - json文本
 * @returns {boolean} 是否成功
 */
function statusProcess(data) {

    const jsonObj = JSON.parse(data);
    if (jsonObj.status === "ok") {
        mdui.snackbar({message: '成功' + jsonObj.message});
    } else if (jsonObj.status === "error") {
        mdui.snackbar({message: '失败：' + jsonObj.message});
    } else if (jsonObj.status === "null") {
        mdui.snackbar({message: '账号不存在'});
    } else {
        mdui.snackbar({message: '未知错误'});
    }
    return jsonObj.status === "ok";
}

// token验证
function authenticateToken() {
    let result = null;
    $.ajax({
        type: 'get',
        url: apiAddress + "/account/authenticate_token",
        data: {},
        async: false,
        dataType: 'text',
        success: function (data) {
            result = data
        }
    });
    return statusProcess(result);
}