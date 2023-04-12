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

// 发送base64图片
function sendBase64Photo() {
    selectAndConvertToBase64((base64String) => {
        // 发送base64字符串
        sendMessage('{"msg_chain":[{"type":"img","msg":"' + base64String + '"}]}');
    });
}

// 发送图片
function sendPhoto() {
    mdui.prompt('请输入图片链接(带http/https)', '发送图片',
        function (value) {
            sendMessage('{"msg_chain":[{"type":"img","msg":"' + value + '"}]}');
        },
        function (value) {

        }
    );
}

// 加载图片 爱来自ChatGPT
function selectAndConvertToBase64(callback) {
    // 创建一个<input>元素来选择文件
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    // 当用户选择文件时
    input.onchange = (event) => {
        const file = event.target.files[0];
        // 创建一个FileReader来读取文件
        const reader = new FileReader();
        // 当文件加载完成时
        reader.onload = () => {
            // 将结果转换为Data URL并传递给回调函数
            const dataURL = reader.result;
            callback(dataURL);
        };
        // 读取文件并将其转换为Data URL
        reader.readAsDataURL(file);
    };
    // 触发选择文件操作
    input.click();
}


// 发送多行文本
function sendTexture() {
    mdui.prompt('请输入文本', '发送多行文本',
        function (value) {
            // 有bug,不过别修了,下次上富文本编辑器
            sendMessage('{"msg_chain":[{"type":"text","msg":"' + value + '"}]}');
        },
        function (value) {

        },
        {
            type: 'textarea'
        }
    );
}

// 以下部分为拖拽上传
const dropArea = document.getElementById('comment-data-2');

// 阻止默认行为以便支持拖拽上传
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// 处理拖拽上传事件
dropArea.addEventListener('drop', handleDrop, false);

// 防止浏览器默认事件
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// 处理拖拽上传事件
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    // 如果有文件，则处理上传
    if (files.length > 0) {
        handleFiles(files).then(r => {
        });
    } else {
        mdui.alert('暂不支持文件上传', '失败');
    }
}

// 处理上传文件
async function handleFiles(files) {
    console.log(await calculateSha1(files[0]))
    // 处理文件，转换成 base64 格式并返回
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
        const base64String = reader.result.split(',')[1];

        mdui.alert('<img src="data:image/png;base64,' + base64String + '" class="mdui-center" style="height: 300px">', '确认发送？', function () {
            sendMessage('{"msg_chain":[{"type":"img","msg":"data:image/png;base64,' + base64String + '"}]}');
        });
    };
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

    reader.onload = function(evt) {
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

    reader.onerror = function() {
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


// 发送截图
async function sendScreenshot() {
    const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    stream.getTracks().forEach(track => track.stop());
    const base64String = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    mdui.alert('<img src="data:image/png;base64,' + base64String + '" class="mdui-center" style="height: 300px">', '确认发送？', function () {
        sendMessage('{"msg_chain":[{"type":"img","msg":"data:image/png;base64,' + base64String + '"}]}');
    });
}

// 放大预览图片
function enlargeImage(img) {
    // 创建一个新的 <div> 元素
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
    overlay.style.zIndex = 9999;

    // 创建一个新的 <img> 元素，并设置其 src 属性
    const imgLarge = document.createElement("img");
    imgLarge.src = img.src;
    imgLarge.style.position = "absolute";
    imgLarge.style.top = "50%";
    imgLarge.style.left = "50%";
    imgLarge.style.transform = "translate(-50%, -50%)";
    imgLarge.style.maxWidth = "90%";
    imgLarge.style.maxHeight = "90%";
    imgLarge.style.borderRadius = "4px";

    // 将 <img> 元素添加到 <div> 中
    overlay.appendChild(imgLarge);

    // 将 <div> 添加到文档中
    document.body.appendChild(overlay);

    // 点击 <div> 以关闭放大的图像
    overlay.onclick = function () {
        document.body.removeChild(overlay);
    };
}