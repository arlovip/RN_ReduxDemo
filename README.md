# React Native之Redux的使用

## 前言

`Redux`是一个状态管理工具，提供可预测化的状态管理。在应用中，我们经常使用`state`和`props`来管理组件的数据流，以及组件与组件之间的数据传递，然后更新`UI`，通常情况下，如果应用不大，代码规范优秀，业务逻辑处理得当，那么使用`state`和`props`没有任何问题，我们也用不着所谓的`Redux`来管理应用的状态。

但是，随着应用的逐渐庞大，业务逻辑变得越来越复杂，这时候，我们发现，有些组件与组件之间的值的传递（`props`）会变得很困难，修改了这个组件，另一个组件也要保持同步、刷新等等操作，我们会使用`block`、`Notification`、`缓存`等操作来保持应用的最新状态，一不小心，容易出错，在这种情况下，有一个好的工具来替我们来管理整个应用的状态，那就太棒了，而`Redux`正是帮我们做这一复杂逻辑的一个状态管理工具，让我们可以独立地在任何地方获取到整个应用的状态。

[Redux在GitHub地址。](https://github.com/reduxjs/redux)

## 概念

- action

`action`就是一个普通的对象，用来描述某一种行为。

- reducer

`reducer`是一个纯函数，用来计算、合并在产生行为后的`state`数据，返回一个全新的`state`到`store`。之所以叫纯函数，是因为在`reducer`函数中，只做数据的合并、处理操作，不会调用任何`API`，也不会改变外部的`state`数据。

- store

`store`是一个存储整个应用的`state树`，它保存了整个应用的状态信息，重要的是，任何应用，有且只有一个`store`。

## 安装

在使用之前，我们需要安装的三方库如下：

- redux

```
npm install --save redux
```

- react-redux

```
npm install --save react-redux
```

> `react-redux`是`redux`的官方`react`绑定库，提供一些组件关联函数、状态传递`provider`等。

- redux-thunk

```
npm install redux-thunk
```

> `redux-thunk`是一个`Middleware`，与`redux`组合可调用异步函数。

## 使用

#### 效果图：

![gif.gif](https://i.loli.net/2019/11/08/5BjCJyZeXbIQAct.gif)

> 注：假设你已经熟悉创建`React Native`工程，如何创建这里不再详细说明，若不懂的话可移步到：[React Native官网](https://facebook.github.io/react-native/) 或者 [React Native中文网](https://reactnative.cn/)。

#### 工程目录结构

> 注：目录可根据自己需要，并不是觉得，只要你觉得方便、合理、低耦合即可。

![proj_structure](https://i.loli.net/2019/11/08/ORrSku1mWZUzeAa.png)

#### 代码实现

###### Action目录

- ActionType.js

```
export const ADD_NAME = 'ADD_NAME';
```

用于描述`action`的类型，也就是某种行为，一般建议用字符串常量。

- NameAction.js

```
import {ADD_NAME} from "./ActionType";

export const addName = data => ({
    type: ADD_NAME,
    data,
});
```

这个文件主要用于创建`action`对象，根据`Redux`标准，每一个对象，必须有一个`type`字段，用于描述要触发的类型。

###### Reducer目录

- NameReducer.js

```
import {ADD_NAME} from "../Action/ActionType";

const initialState = {
    data: [
        {
            title: 'test0',
        },
    ],
};

export const nameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NAME:
            return {
                ...state,
                data: state.data.concat(action.data),
            };
        default:
            return state;
    }
};
```

创建`reducer`函数即`nameReducer`，接受先前的`state`，默认有一个初始值；第二个参数是`action`，也就是当触发操作后接受到的`action`对象，里面包含了类型`type`和数据（数据是非必须的，根据需要看是否传入）。

如果找不到类型，默认返回先前的`state`状态。

- index.js

```
import {combineReducers} from 'redux';
import {nameReducer} from './NameReducer';

const rootReducer = combineReducers({
    nameReducer,
});

export default rootReducer;
```

通过`redux`提供的`combineReducers`将所有的`reducer`组合成一个`rootReducer`（这里为了方便，只写了一个`reducer`）。

###### Store目录

- Store.js

```
import {createStore} from 'redux';
import rootReducer from "../Reducer";
const store = createStore(rootReducer);
export default store;
```

`store`的职责是维持整个应用的状态，创建`store`也很简单，直接使用`Redux`提供的函数`createStore`，传入上一步创建的`rootReducer`即可，这样，`redux`相关的东西准备得差不多了，接下来该在我们的组件里面，绑定我们的`store`、触发`action`就好了。

###### Component目录

- Home.js

```
import React, {Component} from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';
import {connect} from 'react-redux';
import {addName} from '../Action/NameAction';
import styles from "./styles";

const buttonText = 'Add Name';
let index = 0;

class Home extends Component {

    _addName = () => {
        index += 1;
        const data = [{title: `test${index}`}];
        this.props.addName(data);
    };

    _renderItem = ({item}) => {
        const {title} = item;
        return (<View style={styles.cell}>
            <Text>{title}</Text>
        </View>);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}/>
                <TouchableOpacity onPress={this._addName}>
                    <Text style={styles.nameButtonText}>{buttonText}</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <FlatList
                    renderItem={this._renderItem}
                    data={this.props.data}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

}

const mapStateToProps = state => ({
    data: state.nameReducer.data,
});

const mapDispatchToProps = dispatch => ({
    addName: data => dispatch(addName(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
```

在这个组件中，最重要的一个步骤是使用`react-redux`提供的`connect`函数，将`Home`组件和我们的`redux`关联起来，这样就可以获取到`store`中的`state`，触发`action`。

**mapStateToProps**： 主要用于将`store`中的`state`映射到当前组件的`props`，这样的话，我们就可以在组件中通过`this.props`的形式获取需要的数据。`state.nameReducer.data`中的`nameReducer`就是`Reducer目录`下的`index.js`里面的`nameReducer`，最终其实就是`NameReducer.js`文件中的纯函数`nameReducer`，里面的`data`也就是从`store`取出来的最新`state`数据，在`render`函数里面，我们使用`this.props.data`拿到最新的列表数据。

**mapDispatchToProps：** 主要用于将`dispatch(action)`操作映射到当前的`Home`组件中，我们可以看到，在`_addName`点击事件里面，使用了`this.props.addName(data);`，这个`this.props.addName`就是`mapDispatchToProps`的功劳。`dispatch(addName(data))`中的`addName`就是之前我们创建的`action`对象（你也可以理解成一个函数），即：

```
export const addName = data => ({
    type: ADD_NAME,
    data,
});
```

这样的话，当我们点击按钮来调用`_addName`的使用，通过`dispatch`来触发`addName()`这个`action`，然后触发`nameReducer`，最后通过`this.props.data`获取到最新的`state`数据来刷新`UI`。

- styles.js

这里面都是存储组件里面的样式，使组件里面更加关注业务逻辑。

```
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBar: {
        height: 88,
    },
    nameButtonText: {
        height: 50,
        padding: 15,
        backgroundColor: 'black',
        color: 'white',
        alignSelf: 'center',
        borderRadius: 10,
    },
    cell: {
        height: 50,
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'blue',
    },
    line: {
        marginTop: 15,
        backgroundColor: 'green',
        height: 0.5,
    },
});
```

###### App.js

```
import React, {Component} from 'react';
import Home from "./Redux/Component/Home";
import {Provider} from 'react-redux';
import Store from './Redux/Store/Store';

export default class App extends Component {

    render() {
        return (
            <Provider store={Store}>
                <Home/>
            </Provider>
        );
    }
}
```

`App.js`是最重要的一个节点，因为它是我们的根组件，我要要使用`Redux`并在全局的其他子组件获取到`state`，那么就要在根组件的最外层包括一个`Provider`容器，不必担心，这个在`react-redux`中已经给我们准备好了，我们要做的就是直接导入使用即可。

这里的`Store`也就是我们之前通过`createStore(rootReducer)`创建的并且唯一的一个`store`，它在全局起着至关重要的作用，因为我们所有的数据都是存放在这个`store`中，它维持的是一棵完整的`state`树，有了它，你可以在其他任意组件通过`connect`获取到当前`store`中存储的数据和状态。

## 小结

- action是一个对象，用于描述某一个动作或行为，可以传入数据
- reducer是一个纯函数，主要用于处理`state`数据，返回全新的`state`数据
- store整个应用中只有一个，维持着所有的`state`数据，我们可以在任意组件通过`connect`获取

> 本文虽然引入了`redux-thunk`，由于篇幅有限，并未使用，放在下一篇文章中进行讲解。

本文源码：[RN_ReduxDemo](https://github.com/lchenfox/RN_ReduxDemo)



