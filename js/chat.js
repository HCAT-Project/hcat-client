// 发送图片
function sendPhoto(){
    mdui.prompt('请输入图片链接(带http/https)或者<a href="base64.html" target="_blank" title="">base64格式文本</a>', '发送图片',
      function (value) {
        sendMessage('{"msg_chain":[{"type":"img","msg":"'+value+'"}]}');
      },
      function (value) {
        
      }
    );
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