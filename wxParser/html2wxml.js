// 将 html 通过 html2nodesTree 解析引擎，将标签转化为数组
const utils = require('./utils')
const nodesTree = htmlParser({
  html: html,
  target: that,
})


const htmlParser = ({
  html,
  target
}) => {
  if (Object.prototype.toString.call(html) !== '[object String]') {
    throw new Error('HTML 内容必须是字符串')
  }

  const nodesTree = html2nodesTree(html)

  return nodesTree
}

/**
 * 
 * <div class="container" style = "background: red">
 *  <h1>Hello World</h1>
 *  <p>this is hello world text !</p>
 *  <img src="http://baidu.com" alt=""/>
 * </div>
 */

const html2nodesTree = (html) => {
  
  html = rmDOCTYPE(html)
  html = utils.codeTransformation(html)

  let nodesTree = {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
  }

  return nodesTree
}




/**
 * HTML 解析思路
 * 1. 遇到开始标签
 * - 首先判断其是自闭合还是非自闭合标签
 *  - 如果是自闭合标签，挂载到根节点
 *  - 如果是非自闭合标签，推入缓冲区
 *  - 如果是文本节点，则判断缓存区是否还有节点，有则表明文本节点有父节点，将该节点放到父节点的 children 数组下；如果没有，则挂载到根节点
 *  
 * 2. 遇到结束标签
 * - 比较缓存区的第一个节点
 *  - 如果不对应，则逻辑出错
 *  - 如果对应，则判断缓存区是否有节点
 *   - 如果没有节点，则挂载到根节点
 *   - 如果有，则挂载到父节点的 children 数组下
 */

/**
 * 移除文档头信息 
 * @param {String} str HTML 内容
 * @return {String}
 */
const rmDOCTYPE = (str) => {
  let ret = str.replace(/<\?xml.*\?>\n/, '')
               .replace(/<.*!doctype.*>\n/, '')
               .replace(/<.*!DOCTYPE.*>\n/, '')
  return ret
}

/**
 * 定义栈数据结构
 * @class Stack
 */
class Stack {
  constructor() {
    this.items = []
  }
  // 入栈
  push(arg) {
    this.items.push(arg)
  }
  // 出栈
  pop() {
    return this.items.pop()
  }
  // 获取栈顶数据
  peek() {
    return this.items[this.items.length - 1]
  }
	isEmpty() {
		return this.items.length === 0
	}
	size() {
		return this.items.length
	}
  // 空栈
	clear() {
		this.items = []
	}
	print() {
		console.log(this.items)
	}
}

/**
 * [注] 解析 DOM 的关注点
 * 1. 微信 rich-text 组件原生支持的元素节点类型
 * 2. 部分元素的功能阉割的处理，如 a 标签没有 href 属性
 * 3. rich-text 目前不支持的功能如何进行代码处理方便日后功能增加后好扩展
 */


