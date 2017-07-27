```javascript
import React, {Component, PropTypes} from 'react';

import ReactDOM, {render} from 'react-dom';

import {Provider, connect} from 'react-redux';

import {createStore, combineReducers, applyMiddleware} from 'redux';

import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
```



redux主要由三部分组成：
>store，reducer，action。

### **store**
是一个对象，它有四个主要的方法：

**1、dispatch:**

> 用于action的分发——在createStore中可以用middleware中间件对dispatch进行改造，比如当action传入dispatch会立即触发reducer，有些时候我们不希望它立即触发，而是等待异步操作完成之后再触发，这时候用redux-thunk对dispatch进行改造，以前只能传入一个对象，改造完成后可以传入一个函数，在这个函数里我们手动dispatch一个action对象，这个过程是可控的，就实现了异步。

**2、subscribe：**

> 监听state的变化——这个函数在store调用dispatch时会注册一个listener监听state变化，当我们需要知道state是否变化时可以调用，它返回一个函数，调用这个返回的函数可以注销监听。

let unsubscribe = store.subscribe(() => {console.log('state发生了变化')})

**3、getState：**

> 获取store中的state——当我们用action触发reducer改变了state时，需要再拿到新的state里的数据，毕竟数据才是我们想要的。getState主要在两个地方需要用到，一是在dispatch拿到action后store需要用它来获取state里的数据，并把这个数据传给reducer，这个过程是自动执行的，二是在我们利用subscribe监听到state发生变化后调用它来获取新的state数据，如果做到这一步，说明我们已经成功了。

**4、replaceReducer:**

> 替换reducer，改变state修改的逻辑。

store可以通过createStore()方法创建，接受三个参数，经过combineReducers合并的reducer和state的初始状态以及改变dispatch的中间件，后两个参数并不是必须的。store的主要作用是将action和reducer联系起来并改变state。

### **action:**

>action是一个对象，其中type属性是必须的，同时可以传入一些数据。action可以用actionCreactor进行创造。dispatch就是把action对象发送出去。

### **reducer:**

>reducer是一个函数，它接受一个state和一个action，根据action的type返回一个新的state。根据业务逻辑可以分为很多个reducer，然后通过combineReducers将它们合并，state树中有很多对象，每个state对象对应一个reducer，state对象的名字可以在合并时定义。

像这个样子：
```javascript
const reducer = combineReducers({

     a: doSomethingWithA,

     b: processB,

     c: c

})
```

**combineReducers:**

>其实它也是一个reducer，它接受整个state和一个action，然后将整个state拆分发送给对应的reducer进行处理，所有的reducer会收到相同的action，不过它们会根据action的type进行判断，有这个type就进行处理然后返回新的state，没有就返回默认值，然后这些分散的state又会整合在一起返回一个新的state树。

接下来分析一下整体的流程，首先调用store.dispatch将action作为参数传入，同时用getState获取当前的状态树state并注册subscribe的listener监听state变化，再调用combineReducers并将获取的state和action传入。combineReducers会将传入的state和action传给所有reducer，reducer会根据state的key值获取与自己对应的state，并根据action的type返回新的state，触发state树的更新，我们调用subscribe监听到state发生变化后用getState获取新的state数据。


## React-Redux

如果只使用redux，那么流程是这样的：

> component --> dispatch(action) --> reducer --> subscribe --> getState --> component

用了react-redux之后流程是这样的：

> component --> actionCreator(data) --> reducer --> component

store的三大功能：dispatch，subscribe，getState都不需要手动来写了。
react-redux帮我们做了这些，同时它提供了两个好基友Provider和connect。

### **Provider**
```javascript
import { Provider } from 'react-redux';     // 引入 react-redux

// ……
render(
    <Provider store={store}>
        <Sample />
    </Provider>,
    document.getElementById('app'),
);
```
是一个组件，它接受store作为props，然后通过context往下传，这样react中任何组件都可以通过contex获取store。也就意味着我们可以在任何一个组件里利用dispatch(action)来触发reducer改变state，并用subscribe监听state的变化，然后用getState获取变化后的值。但是并不推荐这样做，它会让数据流变的混乱，过度的耦合也会影响组件的复用，维护起来也更麻烦。

### **connect**

**`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`**

是一个函数，它接受四个参数并且再返回一个函数--wrapWithConnect，wrapWithConnect接受一个组件作为参数wrapWithConnect(component)，它内部定义一个新组件Connect(容器组件)并将传入的组件(ui组件)作为Connect的子组件然后return出去。

所以它的完整写法是这样的：connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component)

```javascript
// 例子1
const mapStateToProps = (state) => {
    return {
        number: state.changeNumber.number,
        showAlert: state.toggleAlert.showAlert,
    };
};
// 例子2
const mapStateToProps = (state, ownProps) => {
    // state 是 {userList: [{id: 0, name: 'Jack'}, ...]}
    return {
        isMe: state.userList.includes({id: ownProps.userId})
    };
}

/*
在组件中通过this.props.incrementNum()方式来dispatch Action出去，通知Reducer修改state。
如果你对Action比较熟悉的话，可能会疑惑，this.props.incrementNum()只是生成了一个Action，应该是写成：dispatch(this.props. incrementNum())才对吧？
继续看下面介绍的function形式的mapDispatchToProps就能明白，其实dispatch已经被connect封装进去了，因此你不必手动写dispatch了。
*/
const mapDispatchToProps = {
    incrementNum: action.number.incrementNum,
    decrementNum: action.number.decrementNum,
    clearNum: action.number.clearNum,
    toggleAlert: action.alert.toggleAlert,
};

// 例子2
import { bindActionCreators } from 'redux';
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        incrementNum: bindActionCreators(action.number.incrementNum, dispatch),
        decrementNum: bindActionCreators(action.number.decrementNum, dispatch),
        clearNum: bindActionCreators(action.number.clearNum, dispatch),
        toggleAlert: bindActionCreators(action.alert.toggleAlert, dispatch),
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        incrementNum: dispatchProps.incrementNum,  // 只输出incrementNum
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Sample);
```

**`mapStateToProps(state, [ownProps])`：**

>mapStateToProps 接受两个参数，store的state和自定义的props，并返回一个新的对象，
这个对象会作为props的一部分传入ui组件。
我们可以根据组件所需要的数据自定义返回一个对象。
ownProps，看名字就知道是组件自己原始的props（即不包含connect后新增的props）


**`mapDispatchToProps(dispatch, [ownProps])`：**

> mapDispatchToProps如果是对象，那么会和store绑定作为props的一部分传入ui组件。
如果是个函数，它接受两个参数，bindActionCreators会将action和dispatch绑定并返回一个对象，这个对象会和ownProps一起作为props的一部分传入ui组件。
所以不论mapDispatchToProps是对象还是函数，它最终都会返回一个对象，如果是函数，这个对象的key值是可以自定义的
第二个可选参数ownProps和mapStateToProps里作用是一样的，不赘述。
mapDispatchToProps返回的对象其属性其实就是一个个actionCreator，因为已经和dispatch绑定，所以当调用actionCreator时会立即发送action，而不用手动dispatch。ownProps的变化也会触发mapDispatchToProps。

**`mergeProps(stateProps, dispatchProps, ownProps)`：**

> 将mapStateToProps() 与 mapDispatchToProps()返回的对象和组件自身的props合并成新的props并传入组件。
默认返回 Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。
经过conncet的组件的props有3个来源：一是由mapStateToProps将state映射成的props，二是由mapDispatchToProps将Action creator映射成的props，三是组件自身的props。
connect的第三个参数mergeProps也是一个function：`[mergeProps(stateProps, dispatchProps, ownProps): props]`，
参数分别对应了上述props的3个来源，作用是整合这些props。例如过滤掉不需要的props：

**options：**

> pure = true 表示Connect容器组件将在shouldComponentUpdate中对store的state和ownProps进行浅对比，判断是否发生变化，优化性能。为false则不对比。

其实connect函数并没有做什么，大部分的逻辑都是在它返回的wrapWithConnect函数内实现的，确切的说是在wrapWithConnect内定义的Connect组件里实现的。