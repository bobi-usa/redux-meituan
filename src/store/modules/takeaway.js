// 编写store

import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");

const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    // 商品列表
    foodsList: [],
    // 菜单激活下标值
    activeIndex: 0,
    // 购物车列表
    cartList: [],
  },
  reducers: {
    // 更改商品列表
    setFoodsList(state, action) {
      state.foodsList = action.payload
    },
    // 更改activeIndex
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload
    },
    // 添加购物车
    addCart(state, action) {
      // 是否添加过？以action.payload.id去cartList中匹配 匹配到了 说明添加过
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item) {
        item.count++
      } else {
        state.cartList.push(action.payload)
      }
    },
    // count增
    increCart(state, action) {
      // 关键点：找到当前要修改谁的count id
      const item = state.cartList.find(item => item.id === action.payload.id)
      item.count++
    },
    // count减
    decreCart(state, action) {
      // 关键点：找到当前要修改谁的count id
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item.count === 0) return
      item.count--
    },
    // 清除购物车
    clearCart(state, action) {
      state.cartList = []
    }
  },
})

// 异步获取部分
const {
  setFoodsList,
  changeActiveIndex,
  addCart,
  increCart,
  decreCart,
  clearCart,
} = foodsStore.actions

const fetchFoodsList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get('http://localhost:3004/takeaway')
    // 调用dispatch函数提交action
    dispatch(setFoodsList(res.data))
  }
}

export {
  fetchFoodsList,
  changeActiveIndex,
  addCart,
  increCart,
  decreCart,
  clearCart,
}

const foodsReducer = foodsStore.reducer

export default foodsReducer
