# React的生命週期

## Life Cycle
Component method 分成三種生命週期的描述
 - Mounting：元件初始化
 - Updating：元件更新
 - Unmounting：元件卸載

Mounting 跟 Updating 都會觸發元件內的函數 render()，當props或者是state改變的時候，都會重新渲染DOM(re-render)。

componentWill 和 componentDid 分別是render前後會觸發的函數。

Unmounting 不會觸發 render，也沒有 componentDid 函數，但有 componentWill 函數。

---
### **Mounting**

1. getDefaultProps()
	- React.createClass時觸發（早於 constructor）
	- 只會在 Mounting 時呼叫一次
	- 不能使用 setState() （尚未初始化）
	- 回傳的值將設為 props 的預設值 （若回傳物件，是傳址）
	> React.createClass 已經在 React16.0.0版本之後被移除了

2. getInitialState()
	- React.createElement時觸發 （渲染前觸發） << 感覺是網路上打錯
	- 只會在 Mounting 時呼叫一次
	- 不能使用 setState() （尚未初始化）
	- 回傳的值將設為 state 的初始值 （回傳物件或null）
	> React.createClass 已經在 React16.0.0版本之後被移除了

2. constructor()
	- 只會在 Mounting 時呼叫一次
	- 不能使用 setState() （尚未初始化）
	- 回傳的值將設為 state 的初始值 （回傳物件或null）
	> ES6: constructor()，ES5: getInitialState()

3. componentWillMount()
	- 只會在 Mounting 時呼叫一次
	- 使用 setState 不會再觸發一次 render，會立即更新

4. render()
	- 不能使用 setState() （無限遞迴）
	- 結束後會造成子元件的 Mounting，意即，子元件的生命周期由此開始

5. componentDidMount()
	- 只會在 Mounting 時呼叫一次
	- 子元件 Mounting 完後才會觸發
	- 適合存取DOM

### **Updating**：元件接收的 props 改變時
1. componentWillReceiveProps(nextProps)
	- 使用 setState 不會再觸發一次 render，會立即更新
	- 若該元件有傳入的 props，則父元件 Updating-render 時會觸發（因為會重傳 props）
	- 若沒有 props，此函數將不會被觸發

2. shouldComponentUpdate(nextProps, nextState)
	- 不能使用 setState() （無限遞迴）
	- 回傳false的話這次更新直接結束
	- 優化效能用的
	- 一般來說是在調教效能的時候使用，因為不希望畫面做不必要的re-render，React也提供React.PureComponent，來幫忙判斷shouldComponentUpdate比對的結果，也建議使用React.PureComponent來提升整體效能。不過，要特別注意的是，因為props和state可能會是object和array型態，React.PureComponent只提供shallow comparison。

3. componentWillUpdate(nextProps, nextState)
	- 不能使用 setState() （無限遞迴）

4. render()
	- 結束後會造成子元件的 Mounting、Updating、Unmounting

5. componentDidUpdate(prevProps, prevState)

---

- Updating：元件內部的 state 改變時 (setState) (在這裡任何地方使用 setState 都會造成無限遞迴，除了 componentDidUpdate)
同 Update-props 之 2 ~ 5，不再贅述
	1. shouldComponentUpdate(nextProps, nextState)
	2. componentWillUpdate(nextProps, nextState)
	3. render()
	4.componentDidUpdate(prevProps, prevState)

- Updating：使用 forceUpdate 時
同 Update-props 之 3 ~ 5，不再贅述
	1. componentWillUpdate(nextProps, nextState)
	2. render()
	3. componentDidUpdate(prevProps, prevState)

- Unmount：元件卸載時
	1. componentWillUnmount()

- 使用 setState 不會再觸發一次 render，會立即更新
	1. componentWillMount()
	2. componentWillReceiveProps()