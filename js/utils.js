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
async function uploadFile(file) {
    let result = null;
    await $.ajax({
        type: 'post',
        url: apiAddress + "/file/upload",
        data: {file: file},
        async: true,
        dataType: 'text',
        success: function (data) {
            result = data
        }
    })
    return await result;
}
async function checkIfFileInServer(file) {
    let hash = await calculateSha1(file)
    let result = null;
    await $.ajax({
        type: 'get',
        url: apiAddress + "/file/check_file_exist",
        data: {sha1: hash},
        async: true,
        dataType: 'text',
        success: function (data) {
            result = data
        }
    })
    return await result.status === "ok";
}

function calculateSha1(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('请提供文件'));
        }

        const chunkSize = 3 * 1024 * 1024;
        const chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        const reader = new FileReader();
        const blobSlice = File.prototype.webkitSlice || File.prototype.slice || File.prototype.mozSlice;
        const hasher = CryptoJS.algo.SHA1.create();

        function loadNextChunk() {
            const start = currentChunk * chunkSize;
            const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
            reader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        reader.onload = function (evt) {
            const fileStr = evt.target.result;
            const tmpWordArray = arrayBufferToWordArray(fileStr);
            hasher.update(tmpWordArray);
            currentChunk += 1;

            if (currentChunk < chunks) {
                loadNextChunk();
            } else {
                const hash = hasher.finalize();
                resolve(hash.toString());
            }
        };

        reader.onerror = function () {
            reject(new Error('计算SHA1值错误!!!'));
        };

        loadNextChunk();
    });
}

function arrayBufferToWordArray(ab) {
    const i8a = new Uint8Array(ab);
    const a = [];
    for (let i = 0; i < i8a.length; i += 4) {
        a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
}
