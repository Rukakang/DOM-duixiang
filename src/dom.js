window.dom={
    //创建节点的三种方式
    //第一种不能加<span><div>hi</div></span>这种格式
    create1(tagName){
       return document.createElement(tagName);
    },
    //第二种不支持<tr><td></td></tr>
    create2(string){
        const container = document.createElement("div");
        container.innerHTML =string.trim();
        return container.children[0];

    },
    //template可以容纳tr、td标签
    create3(string){
        const container = document.createElement("template");
        container.innerHTML =string.trim();
        return container.content.firstChild;

    },

    //新增弟弟(把创建的节点添加到已有节点后面，渲染页面)
    after(node,node2){
        node.parentNode.insertBefore(node2,node.nextSibling);
    },
    //新增哥哥
    before(node,node2){
        node.parentNode.insertBefore(node2,node);
    },
    //新增儿子
    append(parent,node){
        parent.appendChild(node);
    },
    //新增爸爸
    wrap(node,parent){
        //Text,div4
        dom.before(node,parent);//必须有这句
        dom.append(parent,node);
    },
    //删除节点
    remove(node){
        node.parentNode.removeChild(node);//节点没有父节点的情况下会报错
        //node.remove();也可以，但是可能不支持IE
        return node;
    },
    //移除所有的子节点，包括文本子节点和元素子节点
    empty(node){
        const array = [];
        let x = node.firstChild;
        while(x){
            array.push(dom.remove(x));
            x=node.firstChild
        }
        return array;
    },
    //给元素添加属性，或者读取元素的属性
    attr(node,name,value){//重载
        if(arguments.length === 3){
            node.setAttribute(name,value);
        }else if(arguments.length === 2){
            return node.getAttribute(name);
        }
    },
    //读写文本内容
    text(node,string){//适配-适配不同浏览器
        if(arguments.length===2){
            if('innerText' in node){
                node.innerText = string;//部分IE只支持innerText
            }else{
                node.textContent = string;//谷歌和火狐支持
            }
        }else if(arguments.length===1){
            if('innerText' in node){
                return node.innerText;//部分IE只支持innerText
            }else{
                return node.textContent;//谷歌和火狐支持
            }
        }
        
    },
    //读写html内容
    html(node,string){
        if(arguments.length ===2){
            node.innerHTML = string;
        }else if(arguments.length ===1){
            return node.innerHTML;
        }
    },
    //修改style
    style(node,name,value){
        if(arguments.length ===3){
            //dom.style(div,'color','red')
            node.style[name] =value;
        }else if(arguments.length ===2){
            if(typeof name === 'string'){
                //dom.style(div,'color')
                return node.style[name];
            }else if(name instanceof Object){
                //dom.style(div,{border:1px solide red,'color':'blue'})
                const object = name;
                for(let key in object){
                    //console.log(node.style);
                    node.style[key]=object[key];
                }
            }
        }
    },
    //增删查class
    class:{
        add(node,className){
            node.classList.add(className);
        },
        remove(node,className){
            node.classList.remove(className);
        },
        has(node,className){
           return node.classList.contains(className);
        }
    },
    //添加监听事件
    on(node,eventName,fn){
        node.addEventListener(eventName,fn);
    },
    //删除监听事件
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn);
    },
    //获取标签或标签们
    find(selector,scope){
        return (scope||document).querySelectorAll(selector);
    },
    //获取父标签
    parent(node){
        return node.parentNode;
    },
    //获取子标签
    children(node){
        return node.children;
    },
    //获取兄弟姐妹元素
    sibling(node){
        return Array.from(node.parentNode.children)
        .filter(n=>n!=node)
    },
    //获取弟弟
    next(node){
        let x = node.nextSibling;//下一个节点可能是文本节点
        while(x && x.nodeType ===3){
            x=x.nextSibling;
        }
        return x;
    },
    //获取哥哥
    previous(node){
        let x = node.previousSibling;//下一个节点可能是文本节点
        while(x && x.nodeType ===3){
            x=x.previousSibling;
        }
        return x;
    },
    //遍历所有节点
    each(nodeList,fn){
        for(let i=0;i<nodeList.length;i++){
            fn.call(null,nodeList[i]);
        }

    },
    //获取排行老几
    index(node){
        const list = dom.children(node.parentNode);
        let i;
        for(i=0;i<list.length;i++){
            if(list[i]===node){
                break;
            }
        }
        return i;
    }
}