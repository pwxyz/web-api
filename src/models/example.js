
export default {

  namespace: 'example',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      let { pathname } = history.location
      if(pathname==='/'){
        history.push('/home')
      }
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    editorChange(state, action){
      console.log( state, action)
      return { ...state, ...action.payload };
    }
  },

};
