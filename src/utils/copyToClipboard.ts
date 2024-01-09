export function copyToClipboard(value:string) {
    console.log('?????????????????')
    // 创建一个新的textarea元素
    var textarea = document.createElement("textarea");

    // 设置textarea的值为要复制的内容
    textarea.value = value;

    // 将textarea元素添加到DOM中
    document.body.appendChild(textarea);

    // 选择textarea中的文本
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 支持移动端

    // 复制文本到剪贴板
    document.execCommand("copy");

    // 移除textarea元素
    document.body.removeChild(textarea);
}