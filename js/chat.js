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
      sendMessage('{"msg_chain":[{"type":"img","msg":"'+base64String+'"}]}');
    });
}

// 发送图片
function sendPhoto() {
    mdui.prompt('请输入图片链接(带http/https)', '发送图片',
      function (value) {
        sendMessage('{"msg_chain":[{"type":"img","msg":"'+value+'"}]}');
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
function sendTexture(){
    mdui.prompt('请输入文本', '发送多行文本',
      function (value) {
        sendMessage('{"msg_chain":[{"type":"text","msg":"'+value+'"}]}');
      },
      function (value) {
        
      },
      {
        type: 'textarea'
      }
    );
}