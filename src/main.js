const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')//找到li里面的最后一个last,
const x = localStorage.getItem('x')
const xObject = JSON.parse(x) //读取当前网站下的x，并把它变成一个对象
const hashMap = xObject || [
    { logo: 'J', url: 'https://juejin.cn' },
    { logo: 'F', url: 'https://www.figma.com' }
]//把对象放在hashMap里面，如果不行就初始化为含有两项的数组，

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //转义字符，删除/开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()//渲染hashMap之前，找到所有的li，唯独不要最后一个,并清空
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
         <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon" >
                 <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()//声明了之后需要调用

$('.addButton').on('click', () => {
    let url = window.prompt('请输入添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: "text",
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap) //把对象变成字符串
    localStorage.setItem('x', string)
} //关闭页面时会把当前hashMap存在x里面

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
