//创建节点
const div1 = dom.create1("div");
const div2 = dom.create2("<span><div>哥哥</div></span>");
//const div2 = dom.create2("<tr><td>hi</td></tr>");//undefined
const div3 = dom.create3("<tr><td>弟弟</td></tr>");
const div4 = dom.create2("<div>儿子</div>");
const div5 = dom.create2("<div>爸爸</div>");
console.log(div1);
console.log(div2);
console.log(div3);

//增删改查节点
dom.after(test,div3);
dom.before(test,div2);
dom.append(test,div4);
dom.wrap(test,div5);
const a = dom.empty(empty);
console.log(a);//empty的div没有被移除，但所有的文本子节点和元素子节点都被移除了
dom.attr(empty,'title','hi,who are you');
const title = dom.attr(empty,'title');
console.log(title);
dom.text(test,'这是新的我');
dom.style(test,{border:'1px solid red',color:'blue'});
console.log(dom.style(test,'color'));
dom.style(test,'color','red');
dom.class.add(test,'grey');
dom.class.add(test,'blue');
dom.class.remove(test,'blue');
console.log(dom.class.has(test,'grey'));
const fn =()=>{
    console.log('点击了'); 
}
dom.on(test,'click',fn);
dom.off(test,'click',fn);
const testDiv = dom.find('#test1')[0];
console.log(testDiv);
console.log(dom.find('.grey',testDiv)[0]);
console.log(dom.parent(test));
console.log(div5);
console.log(dom.children(div5));

const s2 = dom.find('#s2')[0];
console.log(dom.sibling(s2));
console.log(dom.next(s2));
console.log(dom.previous(s2));

const t = dom.find('#travel')[0];
dom.each(dom.children(t),(n)=>{dom.style(n,'color','red')});

console.log(dom.index(t2));