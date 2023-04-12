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
 * @param {boolean} display
 * @param displayTexts
 * @returns {boolean} 是否成功
 */
function statusProcess(data, display = true, displayTexts = ["成功", "失败: ", "账号不存在", "未知错误"]) {

    const jsonObj = JSON.parse(data);

    if (jsonObj.status === "ok") {
        if (display) {
            mdui.snackbar({message: displayTexts[0] + jsonObj.message});
        }
    } else if (jsonObj.status === "error") {
        mdui.snackbar({message: displayTexts[1] + jsonObj.message});
    } else if (jsonObj.status === "null") {
        mdui.snackbar({message: displayTexts[2]});
    } else {
        mdui.snackbar({message: displayTexts[3]});
    }

    return jsonObj.status === "ok";
}

/**
 * 验证token
 * @param {boolean} display
 * @returns {boolean}
 */
function authenticateToken(display = true) {
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
    return statusProcess(result, display);
}
function checkIfFileInServer(){

}