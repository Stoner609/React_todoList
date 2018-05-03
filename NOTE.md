# 相關筆記

## 調用 setState之後會發生什麼事情?
在程式碼中調用 setState 之後，React 會將傳入的參數對象跟組件當前的狀態合併，然後觸發**[調合過程 (Reconciliation)](https://reactjs.org/docs/reconciliation.html)**，React 會以相對高效的方式根據新的狀態建構React元素樹並且著手重新渲染整個UI畫面。
在 React 得到元素樹之後，React 會自動計算出新的樹與舊的元素樹節點差異，然後根據差異對介面進行最小化的渲染。在差異計算中，React 能夠相對精準地知道那些位置發生了改變以及應該如何改變，這就保證了按照需求更新，而不是全部重新渲染。

## 在生命週期中的哪一步驟應該發起 AJAX請求
我們應將 AJAX 請求放到 componentDidMount 函數中執行，主要原因是
 - React 下一代(v17)調合算法 Fiber 會通過開始或停止渲染的方式優化應用性能，其會影響到 componentWillMount 的觸發次數，對於 componentWillMount 這個生命週期函數的調用次數會變得不確定，React 可能會多次頻繁調用 componentWillMount。如果我們將 AJAX 放到 componentWillMount 函數中，會被觸發多次，自然就不是好的選擇。

 - 我們不能保證請求僅在組件掛載完成後才會要求響應。如果我們的數據請求在組件掛載之前就完成，並且調用了 setState 函數將數據添加到組件狀態中，對於未掛載的組件會報錯。而在 componentDidMount 函數中進行 AJAX 請求則能有效避免這個問題的發生。

 ## shouldComponentUpdate 的作用
 shouldComponentUpdate 允許我們手動判斷是否要進行組件更新，根據組件的應用場景設置函數的合理返回值，能夠避免不必要的更新。
 (預設是回傳 true，回傳 flase 就會停止更新)

## React 的 keys 的作用是什麼?
Keys 是React用於追蹤那些列表中的元素被修改，被添加或者被移除的輔助標示，在開發過程中我們要確保元素的Key在其同級元素中具有唯一性。在 React Diff 算法中會借助元素的 Key 來判斷該元素是最近創建還是被移動而來的元素，從而減少不必要的渲染。

## React 中哦 refs 的作用是什麼?
Refs 是React

## 傳入 setState 函數的第二個參數的作用是什麼?
```js
this.setState({
    foo: 'bar'   
}, () => console.log('setState 已完成，組件將重新渲染'))

```
