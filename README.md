# 介绍

hcat-client是[HCat](https://hcat.online/)的一个JavaScript客户端，本项目使用AGPLv3许可证。

# 安装

由于本项目仅为静态客户端资源，您需要配合[re_hcat-server](https://github.com/HCAT-Project/re_hcat-server)使用。[re_hcat-server](https://github.com/HCAT-Project/re_hcat-server)是[HCAT-Project](https://github.com/HCAT-Project)的核心项目，作为服务端使用，您可以前往其仓库学习安装方法。

在安装完成服务端后，您可以将本项目的静态资源上传至您的Web服务器。我们推荐您将服务端反向代理至客户端的子目录下，这样可以防止一些奇怪的跨域问题产生。接着你需要配置`js/main.js`文件中第二行，请注意：一般情况下，您需要填写的服务端地址类似 https://example.com/api ，如果您在反代过程中将链接后半部分隐去，记得正确配置js文件，这些都是Web基础，不做赘述。

# 功能

同[re_hcat-server](https://github.com/HCAT-Project/re_hcat-server#%E5%B7%B2%E5%AE%9E%E7%8E%B0%E7%9A%84%E5%8A%9F%E8%83%BD)，我们会紧跟服务端的更新。

# 许可证

```
本程序为自由软件，在自由软件联盟发布的GNU通用公共许可协议的约束下，你可以对其进行再发布及修改。协议版本为第三版或（随你）更新的版本。
我们希望发布的这款程序有用，但不保证，甚至不保证它有经济价值和适合特定用途。详情参见GNU通用公共许可协议。
你理当已收到一份GNU通用公共许可协议的副本，如果没有，请查阅<http://www.gnu.org/licenses/>
```

# 免责声明

本项目仅供学习交流使用，使用者应遵守所在国家和地区的相关法律法规，对于任何非法使用所产生的后果，本项目概不负责。
